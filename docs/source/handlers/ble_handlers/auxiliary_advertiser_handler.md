\page auxiliary_advertiser_handler Secondary Channel Advertiser Command Handler


# Introduction

The secondary channel advertiser command handler is a "special" handler meant for testing purposes that can be used for starting advertising on a [secondary advertising channel](rcl_glossary.html##secondary-advertising-channel). Unlike the advertiser handler, this command handler **only** supports [extended advertising](rcl_glossary.html##extended-advertising) PDUs which use the [secondary physical channel](rcl_glossary.html##secondary-advertising-channel).

| PDU Type |        PDU Name       | Physical Channel       | LE 1M | LE 2M | LE Coded | Currently Supported |
|:--------:|:---------------------:|------------------------|:-----:|:-----:|:--------:|:-------------------:|
|  0b0111  |      AUX_ADV_IND      | Secondary              |   *   |   *   |     *    |          *          |
|  0b0111  |      AUX_SCAN_RSP     | Secondary              |   *   |   *   |     *    |                     |
|  0b0111  |      AUX_SYNC_IND     | Periodic               |   *   |   *   |     *    |                     |
|  0b0111  |     AUX_CHAIN_IND     | Secondary and Periodic |   *   |   *   |     *    |          *          |
|  0b0111  | AUX_SYNC_SUBEVENT_IND | Periodic               |   *   |   *   |     *    |                     |
|  0b0111  | AUX_SYNC_SUBEVENT_RSP | Periodic               |   *   |   *   |     *    |                     |
|  0b1000  |    AUX_CONNECT_RSP    | Secondary              |   *   |   *   |     *    |                     |


# Usage

How the secondary advertiser command handler is configured and used depends on the type of PDU that is supposed to be sent. Nevertheless, the following basic steps must have taken place before submitting the an advertiser command:

1. RCL has been initialized (See ::RCL_init) and a handle must exist (See ::RCL_open).
2. The ::RCL_CMD_BLE5_AUX_ADV_t command has been initialized and configured.
3. The necessary Tx buffer(s) have been initialized and configured.
4. If needed, the necessary Multibuffer for reception has been initialized and configured.

Once these steps have been completed, ::RCL_Command_submit and ::RCL_Command_pend are called to effectively send a packet and then wait for the command to conclude. Alternatively, callbacks can be used for post-processing and the submitting of new commands.

Command configuration and submitting is similar to the advertiser command handler, with the exception that the command handler requires the configuration of a channel to start the operation.

\snippet source/ble_example/ble_example.c secondaryAdv_code_snippet

Notice how the [AuxPtr](rcl_glossary.html##aux-pointer) previously defined are used to populate the Tx Buffer with the help of a C struct.

\snippet source/ble_example/ble_example.c auxPtr_code_snippet

# Architecture

The life cycle of the secondary advertiser command handler depends on the type advertising and more specifically the PDU type. The PDU type will determine aspects such as the number of Tx buffers needed for the operation, or whether the operation involves both Tx and Rx, or just Tx. It is the responsibility of the caller to provide a Tx Buffer containing a valid advertising physical channel PDU.

Furthermore, unlike the advertiser command handler, this command handler does not support the possibility to do [PHY switching](rcl_glossary.html##phy-switching) as this is meant to be handled during the primary channel advertising.

The following activity diagram illustrates the behavior of the secondary channel advertiser command handler.


@startuml
:Start;
:Prepare LRF (enable Refsys, get FIFO
config, set PHY, program Tx power);
:- Initialize RF FIFOS
- Enter own address;
:Go to next Tx packet;
if ( PDU_type is ADV_EXTENDED ) then (yes)
switch ( Check AdvMode? )
  case ( NC/NS )
    :Disable Rx;
    :Get AuxPointer
    info from Tx Buffer;
  case ( Other )
    :Not supported;
    :Done;
    stop
endswitch
else (no)
:Done;
stop
endif
:Enter Tx Buffer(s);
:- Configure PBE RAM regs
- Configure filter list (if applicable);
:- Free Tx Buffer
- Raise RCL event;
:Program channel from AuxPointer;
:Recalculate AuxPointer
to update Tx FIFO;
: Send packet on secondary
advertising channel;
if ( Rx Enabled? ) then (yes)
:Not supported;
:Done;
stop
else (no)
if ( AuxOffset = 0 and OffsetUnits = 1? ) then (yes)
repeat :Program channel from\ncurrent Aux Pointer;
  :Go to next packet;
  switch ( Check AdvMode? )
    case ( NC/NS )
      :Get AuxPointer
      info from Tx Buffer;
    case ( Other )
      :Not supported;
      :Done;
      stop
    endswitch
  :Enter Tx Buffer;
  :Recalculate AuxPointer
  to update Tx FIFO;
  :Send packet on secondary
  advertising channel;
  :- Free Tx Buffer
  - Raise RCL event;
repeat while (AuxOffset = 0 and OffsetUnits = 1?) is (yes)
:Done;
stop
else (no)
:Done;
stop
endif
endif
@enduml


| RCL Event (In)              | Description                     |
|-----------------------------|---------------------------------|
| ::RCL_EventSetup            | Setup has been performed        |
| ::RCL_EventTimerStart       | Timer-based start signalled     |
| ::RCL_EventGracefulStop     | Graceful stop has been observed |
| ::RCL_EventHardStop         | Hard stop has been observed     |
| ::RCL_EventRxBufferUpdate   | RX buffer has been updated      |

| RCL Event (Out)             | Description                                                   |
|-----------------------------|---------------------------------------------------------------|
| ::RCL_EventLastCmdDone      | The RCL is finished with the command                          |
| ::RCL_EventCmdStarted       | Command handler has accepted and started executing            |
| ::RCL_EventRxBufferFinished | An RX multi-buffer is finished                                |
| ::RCL_EventRxEntryAvail     | An RX entry has been made available                           |
| ::RCL_EventTxBufferFinished | An TX buffer is finished                                      |

| LRF Event            | Description                                                       |
|----------------------|-------------------------------------------------------------------|
| ::LRF_EventOpDone    | The PBE operation has finished                                    |
| ::LRF_EventOpError   | Something went wrong. Cause located in the PBE ENDCAUSE register  |
| ::LRF_EventRxOk      | Packet received with CRC OK and not to be ignored by the MCU      |
| ::LRF_EventRxNok     | Packet received with CRC error                                    |
| ::LRF_EventRxIgnored | Packet received, but may be ignored by MCU                        |
