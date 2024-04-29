Radio Control Layer (RCL)
===========================================

# Product Overview

The radio control layer (RCL) module provides access to the radio for LPF3 devices. It offers a high-level interface for command execution while also ensuring the lowest possible power consumption by providing automatic [power management](rcl_power_management.html) that is fully transparent to the application.

![HW/SW Ecosystem](docs/rcl/source/images/overall-arch.png)

Conceptually, the RCL module can be divided into [RCL "High"](rcl_high_level_architecture.html#logical_driver_split) and [RCL "Low"](rcl_high_level_architecture.html#logical_driver_split). [RCL High](rcl_high_level_architecture.html#rcl_high) takes care aspects such as [command scheduling](rcl_scheduler.html) and [buffer management](rcl_buffer_management.html), while [RCL Low](high_level_architecture.html#rcl_low) takes care of protocol specific operations through [command handlers](rcl_command_handlers.html). Finally, to ensure that critical sections are reduced and timing constraints are met, the RCL module uses [three different priority interrupts](hwi_usage.html) depending on the operation.

For more detailed information about the different components of the Radio Control Layer, see the [RCL Architecture](rcl_architecture.html) page.

## Usage

The bare minimum for using the RCL component involves:

1. Initializing the RCL by calling ::RCL_init
2. Initializing an RCL client instance with ::RCL_open
3. Declaring an RCL command
4. Configuring the RCL command
5. Submitting the RCL command with ::RCL_Command_submit
6. Waiting for the command to conclude using ::RCL_Command_pend or the configured Callback function.
7. Closing the RCL client and deallocating open resources with ::RCL_Command_stop.

The following example simple that uses the [Generic Tx Test](generic_tx_test_handler.html) illustrates how the RCL component is used.

\snippet source/generic_examples/generic_tx_test/generic_tx_test.c genericTxTest_example_snippet
