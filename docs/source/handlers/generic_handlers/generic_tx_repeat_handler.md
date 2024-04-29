\page generic_tx_repeat_handler Generic Tx Repeat Command Handler


# Introduction

The generic Tx Repeat command allows to repeatedly transmit a packet. The following sections describe how the command can be configured and used, its life cycle, and how it fits into the RCL architecture.

In order to submit a Generic Tx Repeat command, the following steps must have taken place:

1. RCL has been initialized (See ::RCL_init) and a handle must exist (See ::RCL_open).
2. The ::RCL_CMD_GENERIC_TX_REPEAT_t command has been initialized and configured.
3. A data entry (packet) has been set up.
4. The command has been configured according to the needs of the user

Once these steps have been completed, ::RCL_Command_submit and ::RCL_Command_pend are called to effectively send and then wait for the command to conclude. Once this has happened, the callback and the command status can be used for error checking and the application can proceed according to its specification.

# Usage

The Generic Tx Repeat command can be employed for various reasons. It is mostly meant to be used for testing purposes, but it can also be used for periodic transmissions of the same packet. This means that the application must also consider the time period or repeated transmissions (back-to-back), and the number of times that the packet is to be sent.

The following code snippet shows a normal use-case for the command.

\snippet source/generic_examples/generic_repeat_tx/generic_repeat_tx.c genericTxRepeat_example_snippet

Just like a regular Generic Tx command, it is up to the application to define how the packet is built while also considering the internal packet format used to store packets in the LRF FIFOs.

This can be accomplished by using a struct to define the various fields that need to be considered when building the the packet.

\snippet source/generic_examples/generic_repeat_tx/generic_repeat_tx.c genericHdrDef_snippet

The following function serves as an example of how packets can be generated so that they are compatible with the internal packet format of the LRF.

\snippet source/generic_examples/generic_repeat_tx/generic_repeat_tx.c generatePackets_snippet

It's worth mentioning the that use of the Generic Tx Repeat command for periodic transmissions is discouraged, given that it keeps the device from going into a low power mode during the waiting period between transmissions.

# Architecture

The Generic Tx Repeat command handler has a life cycle that mostly depends on the packet being sent, the number of times that is supposed to be sent and the time period.

\startuml "Generic Tx Repeat handler state machine"
hide empty description

TxScheduled : Program synth\nSet PBE registers\nPrepare Tx FIFO\nEnable radio\nEnable LRF interrupts
TxOngoing : Sending packet //i// of //n//\nWait configured time between transmissions
TxFailed : Find error cause\nTurn off synth (if needed)\nSet end status
TxSuccessful : Set end status
Done : Disable radio

[*] --> Idle
Idle --> TxScheduled
TxScheduled --> TxOngoing: Setup was successful\nand Timer-based start signalled
TxScheduled --> TxFailed : Missing Tx Buffer,\nsynth error or\nstart time too late
TxOngoing --> TxOngoing : **//i//** < **//n//**\n(more packets\nto be sent)
TxOngoing --> TxSuccessful : **//i//** = **//n//**\n(all packets sent)
TxOngoing --> TxFailed : LRF event\nwas opError
TxFailed --> Done
TxOngoing --> TxStop : Graceful (or hard)\nstop received
TxStop --> TxSuccessful : LRF event\nwas opDone
TxSuccessful --> Done
Done --> [*]
\enduml



| RCL Event (In) | Description                             |
|----------------|-----------------------------------------|
| _setup_        | Setup has been performed                |
| _timerStart_   | Timer-based start signalled             |
| _hardStop_     | Timer/api-based hard-stop signalled     |
| _gracefulStop_ | Timer/api-based graceful-stop signalled |

| RCL Event (Out) | Description                                        |
|-----------------|----------------------------------------------------|
| _lastCmdDone_   | The RCL is finished with the command               |
| _cmdStarted_    | Command handler has accepted and started executing |

| LRF Event   | Description                                                       |
|-------------|-------------------------------------------------------------------|
| _opDone_    | The PBE operation has finished                                    |
| _opError_   | Something went wrong. Cause located in the PBE ENDCAUSE register  |
| _systim1_   | SYSTIM1 event indicating that a graceful stop wsa observed        |

