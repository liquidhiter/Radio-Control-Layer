\page generic_tx_handler Generic Tx Command Handler


# Introduction

The generic Tx command allows to transmit a packet at a specific RF frequency and with a specific syncword. The following sections describe how the command can be configured and used, its life cycle, and how it fits into the RCL architecture.

In order to submit a Generic Tx command, the following steps must have taken place:

1. RCL has been initialized (See ::RCL_init) and a handle must exist (See ::RCL_open).
2. The ::RCL_CMD_GENERIC_TX_t command has been initialized and configured.
3. A Tx buffer has been initialized.
4. An entry has been added to the buffer, that is, an element has been placed at the end of the Tx Buffer list.

Once these steps have been completed, ::RCL_Command_submit and ::RCL_Command_pend are called to effectively send and then wait for the command to conclude. Once this has happened, the callback and the command status can be used for error checking and the application can proceed according to its specification.

# Usage

The Generic Tx command is normally employed when the user wants to transmit a packet for which the RCL does not provide a dedicated handler for the communication protocol. In this case, it is up to the application to define how packets are built considering the internal packet format used to store packets in the LRF FIFOs.

This can be accomplished by using a struct to define the various fields that need to be considered when building the packet.

\snippet source/generic_examples/generic_tx/generic_tx.c genericHdrDef_snippet

Just as with any command, it's necessary to declare it and configure it before submitting it. However, since this is a Tx operation, in addition to performing the command configuration, it is also necessary to set up the Tx buffers and build the packets.

\snippet source/generic_examples/generic_tx/generic_tx.c genericTx_example_snippet

The following function serves as an example of how packets can be generated so that they are compatible with the internal packet format of the LRF.

\snippet source/generic_examples/generic_tx/generic_tx.c generatePackets_snippet

# Architecture

The Generic Tx command handler life cycle is relatively simple in that mostly depends on the packet being sent. Unlike the Generic Rx command handler, the operation itself is not bound by a timeout, and once the packet is sent and an LRF event is received, the command will end.

\startuml "Generic Tx handler state machine"
hide empty description

TxScheduled : Program synth\nSet PBE registers\nEnable radio\nPrepare Tx FIFO\nEnable LRF interrupts
TxOngoing : Sending packet\nWait for LRF events
TxFailed : Find error cause\nSet end status
TxSuccessful : Set end status
Done : Disable radio

[*] --> Idle
Idle --> TxScheduled
TxScheduled --> TxOngoing: Setup was successful\nand Timer-based start signalled
TxScheduled --> TxFailed : Missing Tx Buffer,\nsynth error\nor start time too late
TxOngoing --> TxFailed : LRF event\nwas opError
TxFailed --> Done
TxOngoing --> TxSuccessful : LRF event\nwas opDone
TxSuccessful --> Done
Done --> [*]
\enduml


| RCL Event (In) | Description                 |
|----------------|-----------------------------|
| _setup_        | Setup has been performed    |
| _timerStart_   | Timer-based start signalled |

| RCL Event (Out) | Description                                        |
|-----------------|----------------------------------------------------|
| _lastCmdDone_   | The RCL is finished with the command               |
| _cmdStarted_    | Command handler has accepted and started executing |

| LRF Event   | Description                                                       |
|-------------|-------------------------------------------------------------------|
| _opDone_    | The PBE operation has finished                                    |
| _opError_   | Something went wrong. Cause located in the PBE ENDCAUSE register  |

