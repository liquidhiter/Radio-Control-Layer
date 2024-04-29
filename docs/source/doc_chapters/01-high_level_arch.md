\page rcl_high_level_architecture High Level Architecture

The objective of the RCL component is to offer a simplified and efficient way to control the radio on the LPF3 devices so that developers can focus on higher abstraction layers. The RCL communicates with the LRF which takes care of building the radio packets and transitioning between Rx and Tx.

# HW/SW Ecosystem

The following graphic gives an overview of how the RCL component fits into the HW/SW ecosystem.

![HW/SW Ecosystem](docs/rcl/source/images/hw_sw_ecosystem.png)

The RCL component directly interacts with:

* LRF (Radio IP).
* Driver Porting Layer (DPL): In order to keep OS dependability to a minimum,  only the Hardware Interrupt module (HwiP) and the Semaphore module (SemaphoreP) are used.
* SYSTIMER: Three dedicated SYSTIMER channels for radio operations. Interrupts proxied via LRF-vectors to avoid sharing interrupt priorities with other components (for example, the clock system).
* Power driver: Provides automatic power management and control of the real time clock (RTC) to wake up the device. Furthermore, the RTC communicates with the clock module (CKM) to perform pre-wake up of the XTAL so that enough time is give to the XTAL to stabilize before waking up the device. Finally, the Power driver can also optionally provide temperature compensation of HFXT (High Frequency Xtal) to ensure RF stability across temperature.

# RCL Logical Driver Split {#logical_driver_split}

The structure of the RCL component can be divided into what is known as RCL "High" and RCL "Low".

![RCL Logical Driver Split](docs/rcl/source/images/overall-arch.png)

## RCL "High" {#rcl_high}

Takes care of command scheduling, programming the LRF images, programming the SYSTIMER for a wake-up, etc.

## RCL "Low" {#rcl_low}

Takes care of protocol specific operations. This includes the command handlers which deal with everything that occurs during the command life cycle (for example, interrupts coming from the LRF).
