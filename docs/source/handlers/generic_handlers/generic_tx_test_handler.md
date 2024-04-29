\page generic_tx_test_handler Generic Tx Test Command Handler


# Introduction

The generic Tx Test command allows to continuously transmit a modulated signal or Continuous Wave (CW), which is useful when characterizing a PHY or testing against an instrument. The following sections describe how the command can be configured and used, its life cycle, and how it fits into the RCL architecture.

In order to submit a Generic Tx Test command, the following steps must have taken place:

1. RCL has been initialized (See ::RCL_init) and a handle must exist (See ::RCL_open).
2. The ::RCL_CMD_GENERIC_TX_TEST_t command has been initialized and configured.
3. The command has been configured according to the needs of the user.

Once these steps have been completed, ::RCL_Command_submit and ::RCL_Command_pend are called to effectively send and then wait for the command to conclude. Once this has happened, the callback and the command status can be used for error checking and the application can proceed according to its specification.

# Usage

The Generic Tx Test command is normally employed when the user wants to do Tx testing (for example CW tests). For this reason, the application needs to define not only the type of test signal to be used, but also the stop conditions.

Since no actual packet is meant to be transmitted with this command, there is no need to set up and configure a Tx buffer. The following code snippet shows a normal use-case for the command.

\snippet source/generic_examples/generic_tx_test/generic_tx_test.c genericTxTest_example_snippet

# Architecture

The Generic Tx Test command handler has a life cycle that corresponds to the duration of the transmission. Since the transmission is continuous, there is no implicit stop time. The duration of the command needs to be set up with a hard stop time, or the application needs to explicitly stop the transmission using the ::RCL_Command_stop API.

\startuml "Generic Tx Test handler state machine"
hide empty description

TxScheduled : Program synth\nSet PBE registers\nEnter Tx test configuration\nEnable radio\nEnable LRF interrupts
TxOngoing : Sending test signal\nWait for LRF events
TxFailed : Find error cause\nSet end status
TxSuccessful : Set end status
Done : Disable radio

[*] --> Idle
Idle --> TxScheduled
TxScheduled --> TxOngoing: Setup was successful\nand Timer-based start signalled
TxScheduled --> TxFailed : Synth error\nor start time too late
TxOngoing --> TxFailed : LRF event\nwas opError
TxFailed --> Done
TxOngoing --> TxStop : Hard Stop\ntime reached
TxStop --> TxSuccessful : LRF event\nwas opDone
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
