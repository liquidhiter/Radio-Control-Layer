\page connect_handler Connection Command Handler


# Introduction

# Usage

# Architecture

## Events

The following tables list the events handled.

| RCL Event (In)              | Description                 |
|-----------------------------|-----------------------------|
| ::RCL_EventSetup            | Setup has been performed    |
| ::RCL_EventTimerStart       | Timer-based start signalled |

| RCL Event (Out)             | Description                                        |
|-----------------------------|----------------------------------------------------|
| ::RCL_EventCmdStarted       | Command handler has accepted and started executing |
| ::RCL_EventLastCmdDone      | The RCL is finished with the command               |
| ::RCL_EventRxEntryAvail     | An RX entry has been made available                |
| ::RCL_EventRxBufferFinished | An RX multi-buffer is finished                     |
| ::RCL_EventTxBufferFinished | A TX buffer is finished                            |

| LRF Event                   | Description                                                       |
|-----------------------------|-------------------------------------------------------------------|
| ::LRF_EventOpDone           | The PBE operation has finished                                    |
| ::LRF_EventOpError          | Something went wrong. Cause located in the PBE ENDCAUSE register  |
| ::LRF_EventRxOk             | Packet received with CRC OK and not to be ignored by the MCU      |
| ::LRF_EventRxNok            | Packet received with CRC error                                    |
| ::LRF_EventRxIgnored        | Packet received, but may be ignored by MCU                        |
| ::LRF_EventRxEmpty          | Empty packet received                                             |
| ::LRF_EventTxDone           | Packet transmitted. Note: In this handler, this also means the packet is ACK'd. |
