\page nesb_command_handlers NESB Command Handlers

# Introduction

[Nordic Enhanced ShockBurst (NESB)] (https://infocenter.nordicsemi.com/topic/com.nordic.infocenter.sdk5.v12.0.0/esb_users_guide.html) is a basic protocol which supports two-way data packet communication with the following features:

- Packet acknowledgement
- Automatic retransmission of lost packets
- Variable packet length

It provides a simple bidirectional data link in which a device can act as either primary transmitter (PTX) or as primary receiver (PRX).

- \subpage nesb_ptx_handler
- \subpage nesb_prx_handler

# Packet transaction

A simple packet transaction involves the PTX device sending a packet which is received and acknowledged by the PRX device. Once the PTX device receives the acknowledge, a new packet can be sent or both devices return to an "Idle" state.

@startuml
hide time-axis
concise "PTX" as PTX
concise "PRX" as PRX

PTX is Idle #palegreen
PRX is Idle #palegreen

@PTX
30 is "Send Packet" #lightblue
50 is "Tx/Rx" #pink
60 is "Listen to ACK" #red
80 is Idle #palegreen
@50 <-> @+10 : Turnaround

@PRX
20 is Listen #red
50 is "Rx/Tx" #pink
60 is "Send ACK" #lightblue
80 is "Tx/Rx" #pink
90 is Listen #red
130 is Idle #palegreen
note top of PRX : Command ends because\nof a graceful stop
@enduml

If an ACK sent by the PRX device does not reach the PTX device, the PTX will assume that the packet was lost and will retransmit the packet considering a retransmission delay set by the user. This will continue to happen until an ACK is received or until the maximum number of retransmission attempts is reached.

@startuml
hide time-axis
concise "PTX" as PTX
concise "PRX" as PRX

PTX is Idle #palegreen
PRX is Idle #palegreen

@PTX
30 is "Send Packet" #00A5CFB7
PTX@+20 -> PRX@+20
70 is "Tx/Rx" #41CF00FF
80 is "Listen to ACK" #FF0008D8
110 is "Rx/Tx" #41CF00FF
120 is "Waiting" #LightCyan;line:Aqua
140 is "Retransmit" #00A5CFB7
180 is "Tx/Rx" #41CF00FF
190 is "Listen to ACK" #FF0008D8
PRX@+15 -> PTX@+15
220 is "Idle" #palegreen
@30 <-> @140 : Retransmission delay

@PRX
20 is "Listen for packet" #FF0008D8
70 is "Rx/Tx" #41CF00FF
80 is "Send ACK" #00A5CFB7
110 is "Tx/Rx" #41CF00FF
120 is "Listen for packet" #FF0008D8
PTX@+40 -> PRX@+40
180 is "Rx/Tx" #41CF00FF
190 is "Send ACK" #00A5CFB7
220 is Idle #palegreen

highlight 30 to 70 #FFF7003F;line:DimGrey : Packet is sent and received
highlight 140 to 180 #FFF7003F;line:DimGrey : Packet is sent and received
highlight 80 to 110 #FF00EA1E;line:DimGrey : ACK fails to reach\nthe PTX
highlight 190 to 220 #FFF7003F;line:DimGrey : ACK is sent and\nreceived
@enduml

In simple terms, the NESB command handlers can be described as extensions of the generic command handlers in which the LRF can automatically switch between Tx and Rx, or vice versa. The time that it takes to switch between these to states is called the turnaround time.

# Packet format

The NESB protocol has a specific over-the-air packet format in which all data is assumed to be transmitted and received most-significant-bit first.

![NESB packet format (over-the-air)](docs/rcl/source/images/ota_packet_format_nesb.png)

Additionally, the NESB header is divided into three fields.

![NESB header format](docs/rcl/source/images/header_format_nesb.png)

