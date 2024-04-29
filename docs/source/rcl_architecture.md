\page rcl_architecture RCL Architecture

The following pages provide information about the architecture of the RCL, starting from a high level description of the RCL to more specific details such as buffer management and power management.

- \subpage rcl_high_level_architecture - Explores how the RCL integrates into the hardware and software environment, providing a high-level architecture perspective.
- \subpage rcl_scheduler - Discusses the RCL's scheduling mechanism, detailing how it manages command timing requirements effectively.
- \subpage command_life_cycle - Explores the stages and transitions of commands within the RCL, outlining their possible states and associated processes.
- \subpage rcl_command_handlers - Provides in-depth information about the various supported command handlers within the RCL.
    + [BLE Command Handlers](ble_command_handlers.html)
    + [Generic Command Handlers](generic_command_handlers.html)
    + [NESB Command Handlers](nesb_command_handlers.html)
- \subpage hwi_usage - Describes how the RCL utilizes different priority levels to meet timing constraints effectively.
- \subpage rcl_buffer_management - Explores the use of buffers by the RCL for handling incoming and outgoing packets.
- \subpage rcl_power_management - Details the features and mechanisms integrated into the RCL for power management and optimization.
- \subpage rcl_hfxt_swtcxo - Discusses the temperature compensation features embedded in the RCL for optimal performance under varying temperature conditions.
