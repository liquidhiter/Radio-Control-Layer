\page advertiser_handler Advertiser Command Handler


# Introduction

In [Bluetooth&reg; Low Energy (BLE)](https://www.bluetooth.com/learn-about-bluetooth/tech-overview/), the process of "advertising" is a critical part of the communication protocol, serving as a means for devices to broadcast their presence and capabilities to potential counterparts. Furthermore, with the introduction of [extended advertising](rcl_glossary.html##extended-advertising), the capabilities of traditional or [legacy advertising](rcl_glossary.html##legacy-advertising) are augmented offering enhanced features for more extensive communication between BLE devices.

Regardless of whether legacy or extended advertising is used, [advertising PDUs](rcl_glossary.html##advertising-pdu) are used as information carriers during the advertising process and the specific type of [PDU](rcl_glossary.html##pdu) plays a significant role in the way that the command handler and the RCL behave. Therefore, before describing how the advertising command works, it is worth mentioning the different advertising PDUs involved in the command handler's lifecycle.

| PDU Type |        PDU Name       | Physical Channel       | LE 1M | LE 2M | LE Coded | Currently Supported |
|:--------:|:---------------------:|------------------------|:-----:|:-----:|:--------:|:-------------------:|
|  0b0000  |        ADV_IND        | Primary                |   *   |       |          |          *          |
|  0b0001  |     ADV_DIRECT_IND    | Primary                |   *   |       |          |          *          |
|  0b0010  |    ADV_NONCONN_IND    | Primary                |   *   |       |          |          *          |
|  0b0011  |        SCAN_REQ       | Primary                |   *   |       |          |          *          |
|  0b0011  |      AUX_SCAN_REQ     | Secondary              |   *   |   *   |     *    |                     |
|  0b0100  |        SCAN_RSP       | Primary                |   *   |       |          |          *          |
|  0b0101  |      CONNECT_IND      | Primary                |   *   |       |          |          *          |
|  0b0101  |    AUX_CONNECT_REQ    | Secondary              |   *   |   *   |     *    |                     |
|  0b0110  |      ADV_SCAN_IND     | Primary                |   *   |       |          |          *          |
|  0b0111  |      ADV_EXT_IND      | Primary                |   *   |       |     *    |          *          |
|  0b0111  |      AUX_ADV_IND      | Secondary              |   *   |   *   |     *    |          *          |
|  0b0111  |      AUX_SCAN_RSP     | Secondary              |   *   |   *   |     *    |                     |
|  0b0111  |      AUX_SYNC_IND     | Periodic               |   *   |   *   |     *    |                     |
|  0b0111  |     AUX_CHAIN_IND     | Secondary and Periodic |   *   |   *   |     *    |          *          |
|  0b0111  | AUX_SYNC_SUBEVENT_IND | Periodic               |   *   |   *   |     *    |                     |
|  0b0111  | AUX_SYNC_SUBEVENT_RSP | Periodic               |   *   |   *   |     *    |                     |
|  0b1000  |    AUX_CONNECT_RSP    | Secondary              |   *   |   *   |     *    |                     |


Please note that legacy advertising PDUs are limited to [primary advertising channels](rcl_glossary.html##primary-advertising-channel) and have a specific payloads, while extended advertising PDUs share the same PDU payload format known as the [Common Extended Advertising Payload Format](rcl_glossary.html##common-extended-advertising-payload-format).

The advertiser command handler supports both legacy and extended advertising by extracting the PDU type and if needed, the AdvMode associated with the PDU.

![Advertising Physical Channel PDU](docs/rcl/source/images/advertising_physical_channel_pdu.png)

# Usage

How the advertiser command handler is configured and used depends on the type of PDU that is supposed to be sent. Nevertheless, the following basic steps must have taken place before submitting the an advertiser command:

1. RCL has been initialized (See ::RCL_init) and a handle must exist (See ::RCL_open).
2. The ::RCL_CMD_BLE5_ADV_t command has been initialized and configured.
3. The necessary Tx buffer(s) have been initialized and configured.
4. If needed, the necessary Multibuffer for reception has been initialized and configured.

Once these steps have been completed, ::RCL_Command_submit is called to start the command. Once submitted, the caller can either use ::RCL_Command_pend or a callback to wait for the command's conclusion and proceed with any additional tasks such as post-processing or the submitting of new commands.

As an example, the following code snippet shows how the advertiser command handler can be used to start an extended advertising event composed by one AXU_ADV_IND PDU and one or more AUX_CHAIN_IND PDUs.

\snippet source/ble_example/ble_example.c extendedAdv_code_snippet

Configuration of the command is the same regardless of whether the caller wants to use legacy advertising or extended advertising. Nevertheless, it is the job of the caller to provide the appropriate number of Tx buffers with the appropriate structure for the type of advertising.

In legacy advertising, either one or two Tx buffers will be needed, depending on whether a scan response is required by the type of advertising.

In extended advertising, at least two buffers must be present in the Tx buffer list at command start. One of these Tx buffers corresponds to the EXT_ADV_IND PDU sent over the [primary advertising channels](rcl_glossary.html##primary-advertising-channel), while the second Tx Buffer in the list corresponds to the AUX_ADV_IND PDU that indicates the start of the [auxiliary advertising segment](rcl_glossary.html##auxiliary-advertising-segment).

In any case, the command handler will inspect the provided Tx Buffer(s), and based on the type of advertising, it will determine whether it's legacy advertising or extended advertising.

In the previous code snippet Tx buffers are built with helper functions which populate the Tx buffer with appropriate values for each of the fields present in the [Common Extended Advertising Payload Format](rcl_glossary.html##common-extended-advertising-payload-format).

\snippet source/ble_example/ble_example.c setAdvExtBuffer_code_snippet

\snippet source/ble_example/ble_example.c setAuxAdvBuffer_code_snippet

Notice how the [AuxPtr](rcl_glossary.html##aux-pointer) previously defined are used to populate the Tx Buffer with the help of a C struct. Additionally, keep in mind that the extended header length field indicates the size of the extended header field and that it varies depending on the event type (i.e. the fields permitted in the PDU). For this particular example the ADV_EXT_IND corresponds to an event of type "Non-Connectable/Non-Scannable Undirected with Auxiliary Packet", and the AUX_ADV_IND corresponds to an event of type "Non-Connectable/Non-Scannable Undirected".

\snippet source/ble_example/ble_example.c auxPtr_code_snippet

Furthermore, in the case of extended advertising, the command handler raises an RCL event indicating that a Tx Buffer is finished (see ::RCL_EventTxBufferFinished), so that the caller is made aware (through the callback) that it can add additional Tx buffers to the Tx buffer list.

In this particular example, the callback is used to put a Tx buffer corresponding to the first AUX_CHAIN_IND PDU of the extended advertising event.

Finally, it is worth mentioning that depending on the values used in the [AuxPtr](rcl_glossary.html##aux-pointer) the command handler will either automatically take care of the AuxPtr calculation for the current packet and submit the next chained packet as soon as possible, or it will simply send the current packet and then finish the operation (meaning that it is up to the caller to schedule a secondary channel advertiser for the next chained packet).

This is accomplished by defining the "invalid" combination of [AuxOffset](rcl_glossary.html##aux-pointer-aux-offset) = 0 and [OffsetUnits](rcl_glossary.html##aux-pointer-offset-units) = 1. If this invalid combination is used, the command handler will automatically automatically take care of the AuxPtr calculation. Otherwise, the caller must take care of using the correct AuxPtr values and scheduling the next [auxiliary advertising segment](rcl_glossary.html##auxiliary-advertising-segment).


# Architecture

The life cycle of the advertiser command handler depends on the type of advertising and more specifically the PDU type. The PDU type will determine aspects such as the number of Tx buffers needed for the operation, or whether the operation involves both Tx and Rx, or just Tx. It is the responsibility of the caller to provide a Tx Buffer containing a valid advertising physical channel PDU.

Furthermore, unlike other command handlers, the advertiser command handler supports the possibility to do [PHY switching](rcl_glossary.html##phy-switching) (as required by extended advertising). The following activity diagram illustrates the behavior of the advertiser command handler.


@startuml
:Start;
:Prepare LRF (enable Refsys, get FIFO
config, set PHY, program Tx power);
:- Initialize RF FIFOS
- Enter own address;
:Go to next Tx packet;
switch ( PDU type? )
case ( ADV_IND )
  :- Enable Rx
  - Disable AE;
case ( ADV_DIRECT_IND )
  :- Enable Rx
  - Disable AE
  - Enter peer address;
case ( ADV_NONCONN_IND )
  :- Disable Rx
  - Disable AE;
case ( ADV_SCAN_IND )
  :- Enable Rx
  - Disable AE;
case ( ADV_EXTENDED )
  :Enable AE;
  switch ( AdvMode? )
  case ( NC/NS )
    :Disable Rx;
    :Get AuxPointer
    info from Tx Buffer;
  case ( Other )
    :Not supported;
    :Done;
    stop
  endswitch
endswitch
:Enter Tx Buffer(s);
:- Configure PBE RAM regs
- Configure filter list (if applicable);
if ( AE enabled? ) then (yes)
:- Free Tx Buffer
- Raise RCL event;
endif
repeat :Program channel from channel map;
if ( AE enabled? ) then (yes)
:Recalculate AuxPointer
to update Tx FIFO;
endif
: Send packet on primary
advertising channel;
if ( PDU type != ADV_NONCONN_IND and AE disabled? ) then (yes)
if ( Packet received and accepted? ) then (yes)
switch ( Response PDU? )
case ( CONNECT_IND )
  if ( PDU Type is  ADV_IND or ADV_DIRECT_IND? ) then (yes)
  :Correctly received CONNECT_IND;
  :- Commit packet
  - Raise RCL event;
  :Done;
  stop
  endif
case ( SCAN_REQ )
  if ( PDU Type is  ADV_IND or ADV_SCAN_IND? ) then (yes)
  :Correctly received SCAN_REQ;
  :- Commit packet
  - Raise RCL event;
  :Send SCAN_RSP;
  endif
endswitch
endif
endif
backward: Repeat Tx packet;
repeat while (All primary channels visited?) is (no)
if ( AE enabled? ) then (yes)
if ( AuxOffset = 0 and OffsetUnits = 1? ) then (yes)
:Switch PHY (if needed);
repeat :Program channel from\ncurrent Aux Pointer;
  :Go to next packet;
  switch ( AdvMode? )
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
else (no)
:Done;
stop
endif
@enduml


| RCL Event (In)              | Description                     |
|-----------------------------|---------------------------------|
| ::RCL_EventSetup            | Setup has been performed        |
| ::RCL_EventTimerStart       | Timer-based start signalled     |
| ::RCL_EventHandlerCmdUpdate | PHY switch has been performed   |
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
| ::RCL_EventPartialSetup     | Partial setup is required by handler to perform a PHY switch  |


| LRF Event            | Description                                                       |
|----------------------|-------------------------------------------------------------------|
| ::LRF_EventOpDone    | The PBE operation has finished                                    |
| ::LRF_EventOpError   | Something went wrong. Cause located in the PBE ENDCAUSE register  |
| ::LRF_EventRxOk      | Packet received with CRC OK and not to be ignored by the MCU      |
| ::LRF_EventRxNok     | Packet received with CRC error                                    |
| ::LRF_EventRxIgnored | Packet received, but may be ignored by MCU                        |
