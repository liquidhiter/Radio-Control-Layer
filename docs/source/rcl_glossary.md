\page rcl_glossary Glossary

# Access Address {#access-address}

A unique 32-bit address used for identifying BLE packet boundaries and distinguishing packets from different connections.

# Accept list {#ble-acceptlist}

A feature in BLE that allows a device to specify a list of trusted peer devices that can connect, enhancing security and reducing unwanted connections.

# Advertising Channel {#advertising-channel}

Specific radio channels used by BLE devices to advertise data to facilitate discovery and connection establishment.

# Advertising Physical Channel PDU {#advertising-pdu}

Specific type of BLE [PDU](rcl_glossary.html##pdu)s used during the advertising process that contain information about the advertising device such as the device's address or the type of device. They can be transmitted either on primary advertising physical channels or on secondary advertising physical channels.

# Advertising Interval {#advertising-interval}

The time between consecutive advertising events, where a device broadcasts its presence to enable discovery by other devices.

# Auxiliary Advertising Segment {#auxiliary-advertising-segment}

Part of an advertising event that provides additional data beyond the primary advertising data sent over a primary advertising channel.

# Aux Pointer {#aux-pointer}

A 3-octets field included in extended advertising packets to indicate that some or all od the advertising data is in a subsequent auxiliary packet. Among other things, it serves as a reference to the starting point of the the auxiliary data, enabling scanning devices to efficiently listen to the auxiliary advertising at the correct time.

| Channel Index |    CA   | Offset Units | AUX Offset | AUX PHY  |
|:-------------:|:-------:|:------------:|:----------:|----------|
|    (6 bits)   | (1 bit) |    (1 bit)   |  (13 bits) | (3 bits) |


# Aux Offset Field of Aux Pointer {#aux-pointer-aux-offset}

Contains the time from the reference point to the approximate start of the auxiliary packet, where the reference point is the start of the packet containing the AuxPtr field. The value of the Aux Offset is in the unit of time indicated by the Offset Units field (i.e. the offset is determined by multiplying the value by the unit.

# Aux Phy Field of Aux Pointer {#aux-pointer-aux-phy}

Indicates the PHY used to transmit the auxiliary packet.

# Bluetooth Address {#ble-address}

A unique 48-bit address assigned to each BLE device, used for identification and addressing.

# Bluetooth Header {#ble-header}

The part of the BLE packet containing control information, specifying the PDU type, packet length, and CRC information.

# Central Device {#central-device}

The device that initiates and controls the connection, determining the timing and communication parameters in a BLE link.

# Channel Map {#channel-map}

A list of channels a BLE device uses for communication, indicating which channels it can transmit and receive on.

# Channel Index Field of Aux Pointer {#aux-pointer-ch-index}

Contains the general-purpose channel index used to transmit the auxiliary packet.

# Clock Accuracy Field of Aux Pointer {#aux-pointer-ca}

Contains the clock accuracy of the advertiser that will be used between the packet containing this data and the auxiliary packet. If "0", the advertiser's clock accuracy is between 51 ppm and 500 ppm. If "1", the advertiser's clock accuracy is between 0 ppm and 50 ppm.

# Command handler {#command-handler}

Self contained state machine that takes care of the command parameters, the payload, and the interrupt handling needed during the execution of radio commands.

# Connection Event {#connection-event}

A period during which data is exchanged between connected BLE devices, consisting of multiple data transmission and reception windows.

# Connection Interval {#connection-interval}

The time between two consecutive connection events, defining how often data is exchanged in a BLE connection.

# Common Extended Advertising Payload Format {#common-extended-advertising-payload-format}

Standardized format for organizing and transmitting additional data alongside advertising packets in extended advertising events.

| Extended Header Length |  AdvMode | Extended Header |     AdvData    |
|:----------------------:|:--------:|:---------------:|:--------------:|
|        (6 bits)        | (2 bits) |  (0-63 octets)  | (0-254 octets) |

# Data channel {#data-channel}

Channels used for data exchange after a connection is established, with the primary and secondary advertising channels repurposed for this purpose.

# Extended advertising {#extended-advertising}

An enhanced advertising feature introduced in the [Bluetooth&reg; 5 Low Energy (BLE)](https://www.bluetooth.com/learn-about-bluetooth/tech-overview/) specification. It allows for more extensive and flexible advertising packet formats, enabling the transmission of larger amounts of data and providing support for advanced advertising scenarios. Extended advertising provides greater versatility for applications that require more complex advertising schemes and increased data throughput during the advertising process. Extended advertising makes use of both [primary advertising channels](rcl_glossary.html##primary-advertising-channel) and [secondary advertising channels](rcl_glossary.html##secondary-advertising-channel).

# Extended header {#extended-header}

Variable length header that is present if, and only if, the Extended Header field is non-zero. It is composed by a group of fields that provide information about the type of advertising.

| Extended Header Flags | Advertiser's Address | Target's Address |  CTE Info | AdvData Info | AuxPtr     | SyncInfo    | TxPower   | ACAD     |
|:---------------------:|:--------------------:|:----------------:|:---------:|--------------|------------|-------------|-----------|----------|
|       (1 octet)       |      (6 octets)      |    (6 octets)    | (1 octet) | (2 octets)   | (3 octets) | (18 octets) | (1 octet) | (varies) |


# Extended header flags {#extended-header-flags}

Collection of flags part of the Extended Header that indicate if an extended header field is present or not. The extended header fields that are present are always in the same order as the flags in the extended header flags. Whether an extended header flag and corresponding extended header field is mandatory, optional, or reserved for future use is depends on the [Advertising Physical Channel PDU](rcl_glossary.html##advertising-pdu) in which the extended header is used.

# Frequency Hopping {#frequency-hopping}

In the context of BLE, a technique used to switch between 40 different radio frequencies within the 2.4 GHz ISM band to reduce interference and enhance reliability.

# Legacy advertising {#legacy-advertising}

Original advertising method defined in the BLE specification. It involves transmitting advertising packets that are limited in data size and typically used for simple device discovery and connection establishment. Legacy advertising packets are sent over [primary advertising channels](rcl_glossary.html##primary-advertising-channel) and have a fixed format suitable for basic use cases.

# Link Layer (LL) {#link-layer}

In the context of BLE, the Link Layer defines the several types of packet that are transmitted over the air and the associated air interface protocol. Aspects such as radio channel selection and classification are defined in the link layer specification.

# LRF {#lrf}

The Radio IP in charge of Low Power Radio communications.

# LRF event {#lrf-event}

Signals sent from the LRF to the command handlers and the RCL that contain information about radio-specific events.

# LRF image {#lrf-image}

Protocol-specific firmware used by the LRF.

# Offset Units Field of Aux Pointer {#aux-pointer-offset-units}

Indicates the units used by the Aux Offset field. If "0", the units are 30us, if "1", the units are 300 us.

# Packet Format {#packet-format}

In the context of BLE, the structure of BLE data packets, including preamble, access address, header, and payload.

# PDU {#pdu}

Stands for Protocol Data Unit which is the basic unit of data exchanged between BLE devices. PDUs contain information such as advertising data, control commands, and user data. Thee packets are used to establish connections, exchange data and manage the communication between BLE devices.

# Peripheral Device {#peripheral-device}

The device that responds to the central and follows the central's timing in a BLE link.

# PHY Config {#phy-config}

Set of register values describing parameters of a specific radio PHY. Meant to
be generated via a tool. It's uploaded to the device as binary arrays which are then
directly applied to TOPSM registers.

# Physical Layer {#phy-layer}

The Physical Layer defines how the radio transmitter/receiver is used to encode and decode digital data for transmission and receipt. It deals with aspects like modulation, frequency hopping, power control, and signal strength. The PHY layer translates the bits generated by the Link Layer into radio waves for wireless communication.

# PHY switching {#phy-switching}

In the context of extended advertising, PHY switching refers to the ability to change the physical layer (PHY) used for transmitting and receiving advertising packets during an extended advertising event. PHY switching allows for improved performance and efficiency by utilizing different radio characteristics (e.g., data rate, range) for different parts of the advertising event, optimizing the connection between the advertiser and scanner based on environmental conditions and power consumption requirements.

# Preamble {#preamble}

A known bit sequence at the start of each packet, aiding in synchronization between devices.

# Primary Advertising Channel {#primary-advertising-channel}

The first three (channels 37, 38 and 39) of the forty BLE channels within the 2.4GHz ISM band. Used for the initial exchange of advertising data.

# PSDU {#psdu}

Physical (layer) Service Data Unit - often (for example in IEEE 802.15.4) used
to describe PHY payload in communication protocols. This does not include any
synchronization headers, PHY headers of footers. This does include MAC headers
or footers and MAC payloads.

# Random Device Address {#random-device-address}

An address used to enhance privacy and prevent tracking, periodically changing to reduce traceability.
# RCL event {#rcl-event}

Signals sent from the RCL to the command handlers (and vice versa) that contain information about the radio operation.

# Secondary Advertising Channel {#secondary-advertising-channel}

The remaining 37 channels (channels 0 to 36) which are used for additional advertising (extended advertising) or for scanning and connection requests during some BLE procedures.

# Systimer {#systimer}

Timer running at a resolution of 250 [ns], used by the RCL for all scheduling-related operations.
