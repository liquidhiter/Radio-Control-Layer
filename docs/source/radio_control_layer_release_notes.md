## Introduction

The Radio Control Layer (RCL) component for the LPF3 SDK consists of:

- High-level Radio Control Layer driver providing scheduling and power management
- Low-level RF protocol implementation
- Radio core firmware images
- API documentation

## Disaclaimer

This version has changes in the command status codes and the type of the `RCL_init()` function from the 7.20 version.
See [Upgrade and Compatibility Information](#upgrade-and-compatibility-information)
for details.

## Documentation

The following documentation is included in RCL.

- [API documentation](./html/index.html)
- [Release Notes](rcl_release_notes.html) (this document)

## Build Size

The following is the output of the TI ARM Clang size tool:

Component | Flash Size (Bytes)  | RAM Size (Bytes)
--------- |---------------------|------------------
$SIZE_LIST

Note this is the total size of the archive, not necessarily the size of the
final linked program.

## Dependencies

- coresdk_lpf3: $CORESDK_VER
- TI ARM LLVM: $TIARMLLVM_VER
- GCC: $GCC_VER
- IAR: $IAR_VER
- Radioconfig: $RADIOCONFIG_VER

## Hardware Setup

This release is tested with the following hardware:

* LP_EM_CC2340R5

No hardware modifications are required.

## What's New

This list contains all new features since: v$JIRA_MAJOR_MINOR_DOTTED

$${JQL:project in (RCL) AND issuetype = Story AND resolution != unresolved AND fixVersion >= "LOKI_RCL_$JIRA_MAJOR_MINOR_VERSION" AND fixVersion <="LOKI_RCL_$JIRAVERSION" AND labels in (ReleaseNote) AND Platform = cc23x0 ORDER BY project desc, priority}

## Fixed Issues

This list contains all bugfixes since: v$JIRA_MAJOR_MINOR_DOTTED

$${JQL:project in (RCL) AND issuetype in (Bug, Task) AND resolution != unresolved AND fixVersion >= "LOKI_RCL_$JIRA_MAJOR_MINOR_VERSION" AND fixVersion <="LOKI_RCL_$JIRAVERSION" AND labels in (ReleaseNote) AND Platform = cc23x0 ORDER BY project desc, priority}

## Known Issues

$${JQL:project in (RCL) AND issueType in (Bug) AND resolution = unresolved AND affectedVersion <= "LOKI_RCL_$JIRAVERSION" AND labels in (ReleaseNote) AND Platform = cc23x0 ORDER BY project desc, priority}

## Upgrade and Compatibility Information

This version provides more detailed information in the status field of an RCL command that has been stopped.
This means that the identifiers of the `RCL_CommandStatus` enum have changed.
The values have also changed; named identifiers should always be used when addressing variables of type `RCL_CommandStatus`.

|Identifier in RCL version 7.20  |Identifier in this RCL version            |Description                                                                                          |
|--------------------------------|------------------------------------------|-----------------------------------------------------------------------------------------------------|
|`RCL_CommandStatus_Descheduled` |`RCL_CommandStatus_DescheduledApi`        |Command was descheduled before starting running in the radio because `RCL_CommandStop()` was called  |
|`RCL_CommandStatus_Descheduled` |`RCL_CommandStatus_DescheduledScheduling` |Command was descheduled before starting running in the radio due to scheduling of another command    |
|`RCL_CommandStatus_GracefulStop`|`RCL_CommandStatus_GracefulStopTimeout`   |Command ended because time set in `timing.relGracefulStopTime` was reached                           |
|`RCL_CommandStatus_GracefulStop`|`RCL_CommandStatus_GracefulStopApi`       |Command ended gracefully because `RCL_CommandStop()` was called with `RCL_StopType_Graceful` argument|
|`RCL_CommandStatus_GracefulStop`|`RCL_CommandStatus_GracefulStopScheduling`|Command ended due to scheduling where interrupting command had `RCL_ConflictPolicy_Polite`           |
|`RCL_CommandStatus_HardStop`    |`RCL_CommandStatus_HardStopTimeout`       |Command ended because time set in `timing.relHardStopTime` was reached                               |
|`RCL_CommandStatus_HardStop`    |`RCL_CommandStatus_HardStopApi`           |Command ended because `RCL_CommandStop()` was called with `RCL_StopType_Hard` argument               |
|`RCL_CommandStatus_HardStop`    |`RCL_CommandStatus_HardStopScheduling`    |Command ended due to scheduling where interrupting command had `RCL_ConflictPolicy_AlwaysInterrupt`  |

Code that previously checked for one of the statuses for version 7.20 or earlier, should check for any of the corresponding new statuses. The macros
`RCL_CommandStatus_isAnyDescheduled()`, `RCL_CommandStatus_isAnyGracefulStop()`, and `RCL_CommandStatus_isAnyHardStop()` may be used for that purpose;
these macros will give the same behavior as in the 7.20 version.

This version has changed the `RCL_init()` function from returning an `int` to being `void`:
```C
void RCL_init(void);
```
The return value would previously always be 0, and any code that used to check the returned value should behave as if 0 was returned.

## Known Limitations

The following scenarios have limited test coverage in the RCL module tests:

- Stress testing or throughput testing of connection
- Testing of adding buffers to the radio while it is running
- The testing of fields in the `stats` structures

The SW has the following limitations:

- Advertising Extensions content is alpha quality, and not integrated with TI's BLE-Stack.
  There will be no support provided for integration of these alpha APIs

## Versioning

This product's version follows a version format, **M.mm.pp.bb**, where **M** is a single digit Major number, **mm** is 2 digit minor number, **pp** is a 2 digit patch number, and **b** is an unrestricted set of digits used as an incrementing build counter.
