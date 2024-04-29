\page command_life_cycle Command Life Cycle

A command is an object that includes among other things the payload and the protocol specific information about the operation that the radio must execute. Its life cycle consists of three stages from the moment that it is scheduled to the moment that it is executed.

![Command Life Cycle](docs/rcl/source/images/command_life_cycle.png)

1. Scheduled: Prior to being scheduled, the command is initialized. Once it is scheduled, it remains in this state until it becomes active.

2. Active:

	* If it's the first command after opening the RCL component or changing PHYs, run a configuration step to load the appropriate LRF image and PHY settings to the radio.

	* Enter into a self-contained FSM that takes care of the command parameters, the payload, and the interrupt handling during the execution of the command.

	* Return once the command has executed and invoke the appropriate callback (if any).

The following diagram shows an example of the life cycle of a BLE command.

\startuml

participant Client as c
participant RCL as rcl
participant HandlerFSM as hnd
participant LRF as lrf

activate c
c -> rcl: Submit
deactivate c

rcl -> lrf: Load settings
activate lrf
rcl -> hnd: invoke()

loop Loop over channel 37, 38, 39
activate hnd
hnd -> lrf: Load command\nparameters
hnd -> lrf: Start OP_ADV
deactivate hnd
lrf ->: TX packet
lrf -> lrf: RX
lrf -> hnd: opDone
activate hnd
hnd -> hnd: Update channel\nparameter
end

hnd -> rcl: cmdDone
deactivate hnd

rcl -> c: Callback (if any)

\enduml

