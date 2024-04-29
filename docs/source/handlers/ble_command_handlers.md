\page ble_command_handlers BLE Command Handlers

# Introduction

[Bluetooth&reg; Low Energy (BLE)] (https://www.bluetooth.com/learn-about-bluetooth/tech-overview/) has become as a fundamental wireless communication technology known for its energy efficient design and versatility making it suitable for low power applications operating in the 2.4GHz unlicensed ISM frequency band.

When considering BLE's architecture from a high-level perspective, it can be visualized as a layered system (commonly referred to as the BLE stack) in which each distinct layer serves a specific function. Of these layers, the RCL is only concerned with the two lowest layers (i.e. [Link Layer](rcl_glossary.html##link-layer), [Physical Layer](rcl_glossary.html##phy-layer)) which deal with tasks such as connection establishment, data packet formatting and error control, and lower level tasks such as the actual transmission of data and control of hardware aspects such as radio frequencies and modulation.

This is accomplished in the RCL with the definition of command handlers which take care of the four fundamental operations that govern communication between devices: advertising, connection, scanning, initiating, and some additional command handlers useful for testing.

The following command handlers are currently available in the RCL:

- \subpage advertiser_handler
- \subpage auxiliary_advertiser_handler
- \subpage scan_init_handler
- \subpage connect_handler
- \subpage dtm_tx_handler
- \subpage ble5_generic_rx_handler
- \subpage ble5_generic_tx_handler
- \subpage ble5_tx_test_handler

# Usage

# Architecture
