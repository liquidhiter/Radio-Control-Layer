\page generic_fs_off_handler Generic FS Off Command Handler

# Introduction

The Generic FS Off command handler corresponds to the opposite action of the [Generic FS](generic_fs_handler.html) handler (that is, it stops the frequency synthesizer if it is running).

In order to submit a Generic FS Off command, the following steps must have taken place:

1. RCL has been initialized (See ::RCL_init) and a handle must exist (See ::RCL_open).
2. The ::RCL_CMD_GENERIC_FS_OFF_t command has been initialized and configured.

Once these steps have been completed, ::RCL_Command_submit and ::RCL_Command_pend are called to effectively send and then wait for the command to conclude. Once this has happened, the callback and the command status can be used for error checking and the application can proceed according to its specification.

# Usage

The Generic FS Off command is normally used after the user has executed a command that programmed the frequency synthesizer.

```c
/* Declare command */
RCL_CmdGenericFsOff cmd;
cmd = RCL_CmdGenericFsOff_DefaultRuntime();

/* Common configuration */
cmd.common.scheduling = RCL_Schedule_AbsTime;
cmd.common.runtime.callback = defaultCallback;
cmd.common.runtime.rclCallbackMask = RCL_EventLastCmdDone;

```

It's worth mentioning that just like the [Generic FS](generic_fs_handler.html) command handler, the use of this command handler should not be necessary in an normal use case. And it is not needed after running an Rx or Tx command which turns off the FS after executing (i.e. the default behavior).

# Architecture

Just like with the Generic FS handler, the Generic FS Off command handler has a short life cycle. Additionally, it has the same implications on how the device conducts its power management. Once the operation succeeds, and the LRF event received is the expected one (that is, ::LRF_EventOpDone), power constraints are released, which now allows the device to go into standby according to the power policy in use.

\startuml "Generic FS Off handler state machine"
hide empty description

OpScheduled : Enable radio
OpOngoing : Wait for LRF events
OpFailed : Find error cause\nSet end status
OpSuccessful : Release power constraints\nSet end status
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

| RCL Event (Out) | Description                                        |
|-----------------|----------------------------------------------------|
| _lastCmdDone_   | The RCL is finished with the command               |

| LRF Event   | Description                                                       |
|-------------|-------------------------------------------------------------------|
| _opDone_    | The PBE operation has finished                                    |
| _opError_   | Something went wrong. Cause located in the PBE ENDCAUSE register  |

