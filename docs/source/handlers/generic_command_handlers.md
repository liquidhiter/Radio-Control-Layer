\page generic_command_handlers Generic Command Handlers

# Introduction

Generic command handlers target Proprietary RF and provide a simple way to transmit or receive packets without the need of a complex communication protocol. All of this while keeping power consumption low and code size to a minimum.

The following command handlers are currently available in the RCL:

- \subpage generic_fs_handler - Frequency programming command
- \subpage generic_fs_off_handler - Stop frequency synthesizer command
- \subpage generic_tx_handler - Command to transmit a packet
- \subpage generic_tx_repeat_handler - Command to transmit a packet repeatedly
- \subpage generic_tx_test_handler - Command to transmit continuously, either a modulated signal or a continuous wave
- \subpage generic_rx_handler - Command to receive a packet


