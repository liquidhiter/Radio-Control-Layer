\page nesb_prx_handler NESB PRX Command Handler

# Introduction

A PRX device normally acts as the main receiver in an NESB network. Depending on user configuration, the handler acts similarly to the Generic Rx Command handler, or it can add automatic acknowledgement and address filtering.

The following sections describe how the command can be configured and used, its life cycle, and how it fits into the RCL architecture.

# Usage

In order to submit a PRX command, the following steps must have taken place:

1. RCL has been initialized (See ::RCL_init) and a handle must exist (See ::RCL_open).
2. The ::RCL_CMD_NESB_PRX_t command has been initialized and configured.
3. A Multibuffer has been set up to receive the incoming packets.

Once these steps have been completed, ::RCL_Command_submit and ::RCL_Command_pend are called to effectively begin the RX operation, and then wait for the command to conclude.

Command configuration and submitting is similar to generic command handlers, but depending on the desired auto acknowledgment behavior, it might be necessary to also configure the sycnword specific behavior.

\snippet source/nesb_examples/nesb_prx_example/nesb_prx_example.c nesbPrx_example_snippet


# Architecture

The NESB Prx command handler has a life cycle that depends on several things. If configuration is such that an acknowledgement is expected, the device will automatically switch from Rx mode to Tx mode to send an acknowledge to the specific PTX device that started the packet transaction. Furthermore, the PRX device performs address filtering so that it can ignore packets coming from PTX devices not associated with the network. If a valid packet from a valid address is received, the command can either continue listening for additional packets until a graceful or hard stop ends the operation. Once this has happened, the callback and the command status can be used for error checking and the application can proceed according to its specification.

\startuml "NESB PRX handler state machine"
hide empty description

RxScheduled : Program synth\nSet PBE registers\n\Configure Auto ACK\nConfigure demodulator correlator engine\nEnable radio\nSet up sync found capture\nPrepare Rx FIFO\nEnable LRF interrupts
RxStart : Search for sync\nPend for Rx stop (graceful or hard)
RxOngoing : Check LRF events\nReceive packet\nCopy received packet from LRF FIFO to buffer\nAdjust effective FIFO size\nUpdate Rx Stats\nPend for Rx stop (graceful or hard)
SwitchToTx : Turnaround from Rx to Tx
TxOngoing : Send Acknowledge
SwitchToRx : Turnaround from Tx to Rx
RxStop : Check LRF events
RxFailed: Get error cause\nSet end status
RxSuccessful : Update Rx stats\nSet end status
Done : Disable radio

[*] --> Idle
Idle --> RxScheduled
RxScheduled --> RxStart : Setup was successful\nand Timer-based start signalled
RxScheduled --> RxFailed : Synth error, or\nstart time too late
RxStart --> RxOngoing : Sync found\n
RxOngoing --> SwitchToTx : Valid SEQ, NoAck, and CRC
SwitchToTx --> TxOngoing
TxOngoing --> SwitchToRx : ACK was sent
SwitchToRx --> RxStart : Search for\nsync after\nsuccessful packet
SwitchToRx --> RxStop : Rx was supposed to\nend after one packet
RxStart --> RxStop : Rx stop received\n(graceful or hard)\nbefore sync\nwas found
RxOngoing --> RxFailed : LRF event\nwas OpError
RxOngoing --> RxStop : Rx Stop received\n(graceful or hard), or\nRx was supposed to\nend after one packet
RxStop --> RxFailed : LRF event was\nrxNok, or sync\n was never found
RxStop --> RxSuccessful : LRF event was\nrxOk and opDone
RxFailed--> Done
RxSuccessful --> Done
Done --> [*]

\enduml


| RCL Event (In)  | Description                 |
|-----------------|-----------------------------|
| _setup_         | Setup has been performed    |
| _timerStart_    | Timer-based start signalled |
| _rxBufferUpdate_| RX buffer has been updated  |

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
