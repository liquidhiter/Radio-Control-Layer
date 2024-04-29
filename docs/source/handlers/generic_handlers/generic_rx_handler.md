\page generic_rx_handler Generic Rx Command Handler


# Introduction

The generic Rx command allows to receive packets at a specific RF frequency and with a specific syncword. The following sections describe how the command can be configured and used, its life cycle, and how it fits into the RCL architecture.

In order to submit a Generic Rx command, the following steps must have taken place:

1. RCL has been initialized (See ::RCL_init) and a handle must exist (See ::RCL_open).
2. The ::RCL_CMD_GENERIC_RX_t command has been initialized and configured.
3. A Multibuffer has been initialized and set up.
4. An entry has been added to the buffer, that is, an element has been placed at the end of the Rx Buffer list.

Once these steps have been completed, ::RCL_Command_submit and ::RCL_Command_pend are called to effectively send and then wait for the command to conclude. Once this has happened, the callback and the command status can be used for error checking and the application can proceed according to its specification.

# Usage

The Generic Rx command is normally employed when the user wants to receive a packet where the RCL does not provide a dedicated handler for the communication protocol. In this case, it is up to the application to define how packets are built (for the Tx side) and how they are meant to be received (for the Rx side). All of this while also considering the [internal packet format](rcl_command_handlers.html) in which packets are stored in the LRF FIFOs.

Just as with any command, it's necessary to declare it and configure it before submitting it. However, since this is a Rx operation, in addition to performing the command configuration, it is also necessary to set up the Rx buffers to store the packets. Furthermore, the timing information stored in the common command configuration can be used to set graceful stop and hard stop times.

One particularity about the Generic Rx command handler is that if supported on the PHY, it is possible to configure the LRF so that it listens to two different syncwords (known as SyncwordA and SyncwordB).

\snippet source/generic_examples/generic_rx/generic_rx.c genericRx_example_snippet


# Architecture

The Generic Rx command handler has a life cycle that depends on several things. For instance, the operation can be configured so that it concludes once a correct or incorrect packet is received. It can also conclude after having received several packets due to a graceful (or hard) stop. The operation can also conclude when the LRF hasn't found a sync after a specific amount of time set by the protocol, or by a graceful (or hard) stop.

\startuml "Generic Rx handler state machine"
hide empty description

RxScheduled : Program synth\nSet PBE registers\nConfigure demodulator correlator engine\nEnable radio\nSet up sync found capture\nPrepare Rx FIFO\nEnable LRF interrupts
RxStart : Search for sync\nPend for Rx stop (graceful or hard)
RxOngoing: Check LRF events\nReceive packet\nCopy received packet from LRF FIFO to buffer\nAdjust effective FIFO size\nUpdate Rx Stats\nPend for Rx stop (graceful or hard)
RxStop : Check LRF events
RxFailed: Get error cause\nSet end status
RxSuccessful : Update Rx stats\nSet end status
Done : Disable radio

[*] --> Idle
Idle --> RxScheduled
RxScheduled --> RxStart : Setup was successful\n and Timer-based start signalled
RxScheduled --> RxFailed : Synth error, or\nstart time too late
RxStart --> RxOngoing : Sync found\n
RxOngoing --> RxStart : Search for\nsync after\nsuccessful packet
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

