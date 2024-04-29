\page generic_fs_handler Generic FS Command Handler


# Introduction

The Generic Fs command handler is the simplest way to program the frequency synthesizer. The opposite action can be achieved with the [Generic FS Off](generic_fs_off_handler.html) handler.

In order to submit a Generic FS command, the following steps must have taken place:

1. RCL has been initialized (See ::RCL_init) and a handle must exist (See ::RCL_open).
2. The ::RCL_CMD_GENERIC_FS_t command has been initialized and configured.

Once these steps have been completed, ::RCL_Command_submit and ::RCL_Command_pend are called to effectively send and then wait for the command to conclude. Once this has happened, the callback and the command status can be used for error checking and the application can proceed according to its specification.

# Usage

The Generic FS command is normally used when the user wants to program the frequency synthesizer without starting to transmit or receive anything.

```c
/* Declare command */
RCL_CmdGenericFs cmd;
cmd = RCL_CmdGenericFs_DefaultRuntime();

/* Common configuration */
cmd.common.scheduling = RCL_Schedule_AbsTime;
cmd.common.runtime.callback = defaultCallback;
cmd.common.runtime.rclCallbackMask = RCL_EventLastCmdDone;

/* Protocol specific configuration */
cmd.rfFrequency = 2450000000;
cmd.fsType = RCL_FsType_Tx; /* Program synth as for TX operation */
```

Once the command executes, it's important to keep in mind that a following RX or TX command must be started with frequency set to 0 to avoid new frequency programming. Therefore, the use of this command is normally discouraged.

# Architecture

The Generic FS command handler has a particular short life cycle since it does not transmit or receive anything. Having said this, it has significant implications on how the device conducts its power management. Once the operation succeeds, and the LRF event received is the expected one (that is, ::LRF_EventOpDone), power constraints are set to keep the device from going into the standby power mode, and are only released once the equivalent Generic FS Off command is used.

\startuml "Generic FS handler state machine"
hide empty description

OpScheduled : Program synth\nSet PBE registers\nEnable radio
OpOngoing : Wait for LRF events
OpFailed : Find error cause\nSet end status
OpSuccessful : Set power constraints\nSet end status
Done : Disable radio

[*] --> Idle
Idle --> OpScheduled
OpScheduled --> OpOngoing: Setup was successful\n and Timer-based start signalled
OpScheduled --> OpFailed : Start time too late
OpOngoing --> OpFailed : LRF event\nwas OpError
OpFailed --> Done
OpOngoing --> OpSuccessful : LRF event\nwas OpDone
OpSuccessful --> Done
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


