\page rcl_scheduler Scheduler

The RCL module provides a way to schedule commands considering the various timing requirements of each command.

This gives the user the possibility to:

- Schedule a command so that is sent as soon as possible.
- Schedule a command so that it starts some time in the future (not accepting any delays).
- Schedule a command so that it starts some time in the future (accepting possible delays that may occur after scheduler processing).

Furthermore, the RCL module implements various command statuses that provide information about the current state of the command.




