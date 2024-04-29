var _r_c_l___command_8h =
[
    [ "RCL_CommandRuntime", "_r_c_l___command_8h.html#struct_r_c_l___command_runtime__s", [
      [ "handler", "_r_c_l___command_8h.html#ab44d48e3d466705b2213c477c895894e", null ],
      [ "client", "_r_c_l___command_8h.html#a78b739c32b8bede4de39ecd266628b9c", null ],
      [ "lrfCallbackMask", "_r_c_l___command_8h.html#a323468ce2870e24af8b7a501ecb118fd", null ],
      [ "rclCallbackMask", "_r_c_l___command_8h.html#a1be6dd3357ba0b66157eaa97a96be72e", null ],
      [ "callback", "_r_c_l___command_8h.html#a20712bfd48c11a731ed6a922deb27c48", null ]
    ] ],
    [ "RCL_CommandTiming", "_r_c_l___command_8h.html#struct_r_c_l___command_timing__s", [
      [ "absStartTime", "_r_c_l___command_8h.html#a49fa577fa9e896b24fdb60d22470e33a", null ],
      [ "relMinTime", "_r_c_l___command_8h.html#a74306e2128360f7340ecc6b75f52e9d4", null ],
      [ "relGracefulStopTime", "_r_c_l___command_8h.html#a5231a5ab54e083610eb4350864af16af", null ],
      [ "relHardStopTime", "_r_c_l___command_8h.html#a8974ff99f2eb8319ab867b06e2158b99", null ]
    ] ],
    [ "RCL_Command", "_r_c_l___command_8h.html#struct_r_c_l___command__s", [
      [ "cmdId", "_r_c_l___command_8h.html#a91cf89edfdd9c01d003982bb8f211447", null ],
      [ "phyFeatures", "_r_c_l___command_8h.html#af58f0c54c581e346603a1ed225c22cd7", null ],
      [ "scheduling", "_r_c_l___command_8h.html#a30b89f7bfb9c78e5414537e26f6a7823", null ],
      [ "status", "_r_c_l___command_8h.html#a658680bb120e0689003ac66533a8887c", null ],
      [ "conflictPolicy", "_r_c_l___command_8h.html#a463f9c93780f826804804c0bde0716b4", null ],
      [ "allowDelay", "_r_c_l___command_8h.html#abb3318e1862319439444f0d87fb4c516", null ],
      [ "runtime", "_r_c_l___command_8h.html#a4fd86d50ed4453368072779086a924e9", null ],
      [ "timing", "_r_c_l___command_8h.html#a8c83cb34f39c129c9cb73d852527885d", null ]
    ] ],
    [ "RCL_CommandStatus_isAnyStop", "_r_c_l___command_8h.html#a592bdb46e1c885ab78582259341c0f72", null ],
    [ "RCL_CommandStatus_isAnyDescheduled", "_r_c_l___command_8h.html#a9a8875bcf953c6ccad435b0277fc85c7", null ],
    [ "RCL_CommandStatus_isAnyGracefulStop", "_r_c_l___command_8h.html#a568bbb7bd572591503e7ba18a349e686", null ],
    [ "RCL_CommandStatus_isAnyHardStop", "_r_c_l___command_8h.html#adfc836f1303a9fa17c132fcfcb894d92", null ],
    [ "RCL_CommandStatus_isAnyTimeoutStop", "_r_c_l___command_8h.html#a59512b8ed73fc3e4425e3b890452b86d", null ],
    [ "RCL_CommandStatus_isAnyApiStop", "_r_c_l___command_8h.html#a699a492efb212773a29a1a26651e9b26", null ],
    [ "RCL_CommandStatus_isAnySchedulingStop", "_r_c_l___command_8h.html#ab2a4034749765a2dbd171ee7370a6afc", null ],
    [ "RCL_Command_Default", "_r_c_l___command_8h.html#a6dd4c8cd56eb6e1dba2e9048120620f4", null ],
    [ "RCL_Command_DefaultRuntime", "_r_c_l___command_8h.html#a9b8e5a275a28b78671bf3edb9befbc3d", null ],
    [ "RCL_CommandHandler", "_r_c_l___command_8h.html#a327dfaae689817a2cf45e10107811405", null ],
    [ "RCL_Callback", "_r_c_l___command_8h.html#a38e0184e881b03b751edc82c18cc0f66", null ],
    [ "RCL_Command_TxPower", "_r_c_l___command_8h.html#a85c15c163e880bc0c78a38e84266b9eb", null ],
    [ "RCL_CommandStatus", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cd", [
      [ "RCL_CommandStatus_Idle", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda1097a97f59467483fb55c8b471cb3036", null ],
      [ "RCL_CommandStatus_Queued", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda7f94452604506b5f80886594fb7ac8c6", null ],
      [ "RCL_CommandStatus_Scheduled", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cdae108db1fb28a1e7664f2ba6df393f373", null ],
      [ "RCL_CommandStatus_Active", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cdaf7d7f20a2d4466b56609a6a81f8e54be", null ],
      [ "RCL_CommandStatus_Suspended", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cdabe9dd4500096cb5e2336063e4757a9ab", null ],
      [ "RCL_CommandStatus_Deferred", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda776642885c8ca57f1b9c89726228ef44", null ],
      [ "RCL_CommandStatus_Finished", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cdad0edd51e1efee38e7057f3ab8c39523a", null ],
      [ "RCL_CommandStatus_ChannelIdle", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cdad0a04a5d62d4606f129a4c1ffe8f627d", null ],
      [ "RCL_CommandStatus_ChannelBusy", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda7b91f33b909fd5c4cb4598bbafc84b0b", null ],
      [ "RCL_CommandStatus_RxTimeout", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda362190347f4236e9fc41633f2e7c580a", null ],
      [ "RCL_CommandStatus_NoSync", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda11b38f14badba68ccd07ed96d95f748d", null ],
      [ "RCL_CommandStatus_RxErr", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda11cd53fe7e9c9e4e172675d5700ab9ae", null ],
      [ "RCL_CommandStatus_RejectedStart", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda265acd944e09c01ab6af44ee8011322c", null ],
      [ "RCL_CommandStatus_UnexpectedMdrRx", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda2fb48bc6b289cfe04e28eacc953e43c6", null ],
      [ "RCL_CommandStatus_DescheduledApi", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda2ec17e767511a972101df4828fdb8a30", null ],
      [ "RCL_CommandStatus_DescheduledScheduling", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda8c79c9927acb362e8b24606a068c7c8a", null ],
      [ "RCL_CommandStatus_GracefulStopTimeout", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cdacfd3b1a2a4394088b04fb896b86b4f01", null ],
      [ "RCL_CommandStatus_GracefulStopApi", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda379a737134a96c259a5a0bbd4260db09", null ],
      [ "RCL_CommandStatus_GracefulStopScheduling", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda1f0d802ee29468a614b0347ac584923d", null ],
      [ "RCL_CommandStatus_HardStopTimeout", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda9c7d7f8e068cd9df4196ab9061e8bfe4", null ],
      [ "RCL_CommandStatus_HardStopApi", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cdaba769d4a3507ff40d87f712bd0bd5d3a", null ],
      [ "RCL_CommandStatus_HardStopScheduling", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda12cda9e1164f311b82025675483d0cf2", null ],
      [ "RCL_CommandStatus_Connect", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cdae20e0abd68ad1e75296fee625f80c106", null ],
      [ "RCL_CommandStatus_MaxNak", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cdab13e9908d500cdb97d554036337c08f9", null ],
      [ "RCL_CommandStatus_Error", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cdacda453ceb0b4bbb9916de47ba60d88d6", null ],
      [ "RCL_CommandStatus_Error_Setup", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda7300078043301708baabd482403b0d10", null ],
      [ "RCL_CommandStatus_Error_Param", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda8cab1eef2fcfe5163c2350736709158b", null ],
      [ "RCL_CommandStatus_Error_MissingTxBuffer", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cdac4198c7c5810233fa0ecf88ec06ede8e", null ],
      [ "RCL_CommandStatus_Error_TxBufferCorruption", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda35602d0954d56c585acfa6c29af7ed4b", null ],
      [ "RCL_CommandStatus_Error_RxBufferCorruption", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cdab8741ab829874cbb5e917e18b3dce22e", null ],
      [ "RCL_CommandStatus_Error_StartTooLate", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda6915b2ba59ad4d6f30f15afce61b73a7", null ],
      [ "RCL_CommandStatus_Error_TxFifo", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cdacf268e2369b6efa341c71c4ff16564a8", null ],
      [ "RCL_CommandStatus_Error_RxFifo", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda38faed754c11280782f20a224dd1ba29", null ],
      [ "RCL_CommandStatus_Error_Synth", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda4725098d01f9107034ff5fcc57a47d9c", null ],
      [ "RCL_CommandStatus_Error_UnknownOp", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda8bd40acb6264d1c405c97c30ae4c02ca", null ],
      [ "RCL_CommandStatus_Error_AlreadySubmitted", "_r_c_l___command_8h.html#ae591a974abf55ca701cf33c61554e0cda9500078961a629dc750afc316601164f", null ]
    ] ],
    [ "RCL_StopType", "_r_c_l___command_8h.html#ac4545314b04cf935cdf6dd709c181873", [
      [ "RCL_StopType_None", "_r_c_l___command_8h.html#ac4545314b04cf935cdf6dd709c181873a5796771c712d3627385e4efdd5df018a", null ],
      [ "RCL_StopType_DescheduleOnly", "_r_c_l___command_8h.html#ac4545314b04cf935cdf6dd709c181873a14f89e126fa8774518f529a15e615221", null ],
      [ "RCL_StopType_Graceful", "_r_c_l___command_8h.html#ac4545314b04cf935cdf6dd709c181873a8a9c3c84301b00a49418b288d2eab811", null ],
      [ "RCL_StopType_Hard", "_r_c_l___command_8h.html#ac4545314b04cf935cdf6dd709c181873a97d0d7c91726e34df64f04870960a25b", null ]
    ] ],
    [ "RCL_ScheduleType", "_r_c_l___command_8h.html#ade08c929505da062070474163417817d", [
      [ "RCL_Schedule_Now", "_r_c_l___command_8h.html#ade08c929505da062070474163417817da39c41d2c31edf75e6c226a4613d313cb", null ],
      [ "RCL_Schedule_AbsTime", "_r_c_l___command_8h.html#ade08c929505da062070474163417817da36e4eb855b1a8b435564f5911266a55b", null ]
    ] ],
    [ "RCL_ConflictPolicy", "_r_c_l___command_8h.html#a5ef3e78c3d1ae20c4ecc30bd75b04881", [
      [ "RCL_ConflictPolicy_AlwaysInterrupt", "_r_c_l___command_8h.html#a5ef3e78c3d1ae20c4ecc30bd75b04881ac6d604d2b917f462fe3a9fd020bb6019", null ],
      [ "RCL_ConflictPolicy_Polite", "_r_c_l___command_8h.html#a5ef3e78c3d1ae20c4ecc30bd75b04881a847a5ca2c401f4e5234b884104585757", null ],
      [ "RCL_ConflictPolicy_NeverInterrupt", "_r_c_l___command_8h.html#a5ef3e78c3d1ae20c4ecc30bd75b04881ab13f334e0650c1a10f40defdf32cd00b", null ]
    ] ],
    [ "RCL_Command_setRawTxPower", "_r_c_l___command_8h.html#a5c910b17bbd419ba042b8d8f226a17ea", null ]
];