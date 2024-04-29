\page nesb_ptx_handler NESB PTX Command Handler


# Introduction

A PTX device normally acts as the main transmitter in an NESB network. Depending on user configuration, the handler acts similarly to the Generic Tx Command handler, or it can add automatic retransmission of unacknowledged packets.

The following sections describe how the command can be configured and used, its life cycle, and how it fits into the RCL architecture.

# Usage

In order to submit a PTX command, the following steps must have taken place:

1. RCL has been initialized (See ::RCL_init) and a handle must exist (See ::RCL_open).
2. The ::RCL_CMD_NESB_PTX_t command has been initialized and configured.
3. The Tx buffer has been set up.
4. An RX buffer has been set up to receive the ACK (if configuration demands it).

Once these steps have been completed, ::RCL_Command_submit and ::RCL_Command_pend are called to effectively send a packet and then wait for the command to conclude.

As with any command handler, the application must built packets so that it is compatible with the internal packet format used in the LRF. Having said this, NESB packets also have a specific packet format that needs to be considered at the application level.

This can be accomplished by using a struct to define the various fields that need to be considered when building or checking the content of the packet.

\snippet examples/source/nesb_examples/nesb_ptx_example/nesb_ptx_example.c nesbHdrDef_snippet

Taking this into consideration, packet generation needs to consider how the 11-bit header is placed in the LRF FIFO. the following function shows one way to accomplish this:

\snippet examples/source/nesb_examples/nesb_ptx_example/nesb_ptx_example.c generateNesbPackets_snippet

Command configuration and submitting is similar to generic command handlers.

\snippet examples/source/nesb_examples/nesb_ptx_example/nesb_ptx_example.c nesbPtx_example_snippet

# Architecture

The NESB Ptx command handler has a life cycle that depends on several things. If configuration is such that an acknowledgement is expected, the device will automatically switch from Tx mode to Rx mode to listen for an acknowledge coming from an associated PRX device in the network. Furthermore, if retransmission of unacknowledged packets is enabled, the PTX command handler will automatically switch back and forth between Tx mode and Rx mode in order to retransmit the packet. This will go on for a user-defined number of times and with a user-defined retransmission delay. If a valid acknowledgement is received, or if a packet is transmitted and no acknowledgement is expected, the command will conclude not before incrementing a sequence number that is used by the PRX device to differentiate between new packets and retransmitted packets.

Once this has happened, the callback and the command status can be used for error checking and the application can proceed according to its specification.

\startuml "NESB PTX handler state machine"
hide empty description

OpScheduled : Program synth\nSet PBE registers\nConfigure retransmission\nEnable radio\nPrepare Tx and Rx FIFOs\nEnable LRF interrupts
TxOngoing : Sending packet\nWait for LRF events
RxStart : Search for sync
RxOngoing : Receive Acknowledge
SwitchToRx : Turnaround from Tx to Rx
TxRetransmit : Update SEQ number\nIncrement retransmission counter\nReschedule packet\nSwitch back to Tx
RxStop : Check LRF events
OpFailed: Get error cause\nSet end status
OpSuccessful : Set end status
Done : Disable radio

[*] --> Idle
Idle --> OpScheduled
OpScheduled --> TxOngoing : Setup was successful\nand Timer-based start signalled
OpScheduled --> OpFailed : Synth error,\nmissing Tx buffer, or\nstart time too late
TxOngoing --> SwitchToRx : Packet was sent\nand ACK is expected
TxOngoing --> OpSuccessful : LRF event was opDone,\nno ACK is expected
TxOngoing --> OpFailed: LRF event\nwas opError
SwitchToRx --> RxStart
RxStart --> RxOngoing : Sync found
RxStart --> TxRetransmit: No sync found
TxRetransmit --> TxOngoing : Retransmission counter\nless than maximum\nnumber of retransmissions
TxRetransmit --> OpFailed : Maximum number\nof retransmissions\n reached
RxOngoing --> RxStop : ACK received
RxOngoing --> OpFailed : LRF event was\nrxNok
RxStop --> OpSuccessful : LRF event was\nrxOk and opDone
OpFailed --> Done
OpSuccessful --> Done
Done --> [*]

\enduml


| RCL Event (In)  | Description                 |
|-----------------|-----------------------------|
| _setup_         | Setup has been performed    |
| _timerStart_    | Timer-based start signalled |

| RCL Event (Out)    | Description                                        |
|--------------------|----------------------------------------------------|
| _lastCmdDone_      | The RCL is finished with the command               |
| _cmdStarted_       | Command handler has accepted and started executing |
| _rxBufferFinished_ | An RX multi-buffer is finished                     |
| _rxEntryAvail_     | An RX entry has been made available                |

| LRF Event   | Description                                                       |
|-------------|-------------------------------------------------------------------|
| _opDone_    | The PBE operation has finished                                    |
| _opError_   | Something went wrong. Cause located in the PBE ENDCAUSE register  |
| _rxOk_      | Packet received with CRC OK and not to be ignored by the MCU      |
| _rxNok_     | Packet received with CRC error                                    |
