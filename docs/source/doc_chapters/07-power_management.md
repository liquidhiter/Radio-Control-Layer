\page rcl_power_management Power Management

The RCL component automatically provides the following power optimization features:

* Power-down on inactivity
* Deferred dispatching of commands

This is accomplished by using the Power Manager to timely set and release power constraints to allow the MCU to go from active states to sleep states and vice versa.

# Usage

Given that power management is automatically handled by the RCL, the user is not expected to do anything about it.

By default, the device is allowed to go into the standby sleep state. Power constraints to disallow the standby state are only set once the radio has been set up, and the command handler is about to be invoked, and they are released as soon as the RCL is finished with the radio command.

The aforementioned also implies that the RCL supports the deferred dispatching of commands. So if a radio command is to take place later in the future and there is enough time for the device to benefit from being in a sleep state, the device will schedule the radio operation, setup an appropriate wake time and let the Power Manager take control of the power state of the MCU.

Once the device comes back from the sleep state, it will proceed with the scheduled radio operation, which includes setting up the radio and setting the power constraint to disallow the standby state.

## Particular use cases

A specific use-case in which power constraints are handled differently is when using the [Generic FS](generic_fs_handler.html) command handler, the [Generic FS Off](generic_fs_off_handler.html) command handler, or when configuring a specific command so that Frequency Synthesizer (FS) is kept on (See the [Command Handlers](rcl_command_handlers.html) chapter for more information). For this particular use case, additional power constraints are set that keep the device from going into the standby state while the FS is on, and is necessary to use the [Generic FS Off](generic_fs_off_handler.html) command handler to release them.

