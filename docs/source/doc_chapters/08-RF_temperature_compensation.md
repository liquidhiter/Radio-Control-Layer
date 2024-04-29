\page rcl_hfxt_swtcxo RF Temperature Compensation

The RCL component supports software-based temperature compensation of the HFXT (High Frequency Xtal), to ensure that the radio frequency remains stable within +/- 40 ppm across temperature.

This relies on the Power driver to perform temperature compensation of the system clock, CLKSVT, and the same compensation factor is picked up by RCL and applied to the RF reference clock (CLKREF). When this feature is enabled, the ambient temperature will be continuously monitored, and the radio frequency will be automatically adjusted to compensate for the HFXT offset when a radio command is initiated.

# Usage

The feature is optional, and can be enabled/disabled through the Device Configuration. The characteristics of the crystal can be fully configured, as well as the sensitivity and threshold for when temperature compensation should be applied. Currently, the programmed radio frequency will only be compensated when a radio command is initiated, but not while the command is in progress. The feature is fully controlled through the Device Configuration, and no further action is required through the RCL API.
