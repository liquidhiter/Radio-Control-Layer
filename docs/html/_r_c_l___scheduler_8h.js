var _r_c_l___scheduler_8h =
[
    [ "RCL_SchedulerStopInfo", "_r_c_l___scheduler_8h.html#struct_r_c_l___scheduler_stop_info", [
      [ "cmdStopEnabled", "_r_c_l___scheduler_8h.html#af4430a09070d7d7edf0e3c9784003596", null ],
      [ "schedStopEnabled", "_r_c_l___scheduler_8h.html#aee0b2f1e4ea9c0a152160882f4ab8efa", null ],
      [ "apiStopEnabled", "_r_c_l___scheduler_8h.html#afd1ec98879a89a79d1136bac439d9496", null ],
      [ "stopReason", "_r_c_l___scheduler_8h.html#aaaefc83b1d1059bb828c2f15d8c4abb9", null ],
      [ "cmdStopTime", "_r_c_l___scheduler_8h.html#adee3b597d7afeaddcfecd68d2ebc3954", null ],
      [ "schedStopTime", "_r_c_l___scheduler_8h.html#a24834207dc9d406ce19df1ef5f25301f", null ]
    ] ],
    [ "RCL_SchedulerState", "_r_c_l___scheduler_8h.html#struct_r_c_l___scheduler_state", [
      [ "currCmd", "_r_c_l___scheduler_8h.html#a6944c5f69bdcbce404aa646d36438dcd", null ],
      [ "nextWantsStop", "_r_c_l___scheduler_8h.html#af5f102b07d02f01143dd82e7c8ca3c97", null ],
      [ "stopTimeState", "_r_c_l___scheduler_8h.html#a9ed100e84fa4921c22f99a7802444d2b", null ],
      [ "descheduleReason", "_r_c_l___scheduler_8h.html#ab6f266229db238461409ceb2e1bef465", null ],
      [ "postedRclEvents", "_r_c_l___scheduler_8h.html#aa43f1e744d652c2986c29ac9606459a2", null ],
      [ "actualStartTime", "_r_c_l___scheduler_8h.html#af237bc62dd8f945eaf34c45ab663b62b", null ],
      [ "hardStopInfo", "_r_c_l___scheduler_8h.html#a5ea096bf6cf46b5d5e5eb4cf60f65532", null ],
      [ "gracefulStopInfo", "_r_c_l___scheduler_8h.html#a8116bdd0f82a079a1f117ef0526e5011", null ],
      [ "requestedPhyFeatures", "_r_c_l___scheduler_8h.html#ab62ff0b7ab803fbc649fa8e2a3050034", null ]
    ] ],
    [ "RCL_SCHEDULER_SYSTIM_US", "_r_c_l___scheduler_8h.html#acdfb6b54cdc9e000704111729a8319a7", null ],
    [ "RCL_SCHEDULER_SYSTIM_MS", "_r_c_l___scheduler_8h.html#a3e9853df4fabb086f8d7e97da69dcfd7", null ],
    [ "ABS_START_TIME_OFFSET", "_r_c_l___scheduler_8h.html#a0e30b0cf378780bb06416ccf4541a413", null ],
    [ "IMM_START_TIME_OFFSET", "_r_c_l___scheduler_8h.html#ac70f3d5a81b961d21424efd806df998d", null ],
    [ "RCL_SCHEDULER_MARGIN_ARM", "_r_c_l___scheduler_8h.html#aa956e5782c4ab4b9b6b8b28cb0d9c62a", null ],
    [ "RCL_SCHEDULER_MARGIN_CONFIGURE", "_r_c_l___scheduler_8h.html#a1c7ede758c229bee586a745e69d2a1c5", null ],
    [ "RCL_SCHEDULER_MARGIN_LOAD", "_r_c_l___scheduler_8h.html#a707b07fcb695cae602a07d8b0ae2fe43", null ],
    [ "RCL_SCHEDULER_SLEEP_CUTOFF", "_r_c_l___scheduler_8h.html#a5a8204fc65530470400946e0c450d75c", null ],
    [ "RCL_SCHEDULER_TRIG_NOW_DELAY", "_r_c_l___scheduler_8h.html#aa04a59d786fb582b9a72cc2a1f9b4044", null ],
    [ "RCL_SCHEDULER_WAKEUP_MARGIN", "_r_c_l___scheduler_8h.html#ab358f949e3981f3dd0bb0bf101687791", null ],
    [ "RCL_SchedulerStopReason", "_r_c_l___scheduler_8h.html#a40165cb20c671703e230d134b5f677ea", [
      [ "RCL_SchedulerStopReason_None", "_r_c_l___scheduler_8h.html#a40165cb20c671703e230d134b5f677eaa3fc27563f46433e93d2cd4eb30ad8ae5", null ],
      [ "RCL_SchedulerStopReason_Timeout", "_r_c_l___scheduler_8h.html#a40165cb20c671703e230d134b5f677eaa637e154412cb0dc6008dd89d5d93fe66", null ],
      [ "RCL_SchedulerStopReason_Scheduling", "_r_c_l___scheduler_8h.html#a40165cb20c671703e230d134b5f677eaa264b1276b110a7cde3f3ab5bfd440edd", null ],
      [ "RCL_SchedulerStopReason_Api", "_r_c_l___scheduler_8h.html#a40165cb20c671703e230d134b5f677eaa8c8727ce289b7d6b52f8b3f8d5d3e924", null ]
    ] ],
    [ "RCL_SchedulerStopTimeState", "_r_c_l___scheduler_8h.html#aef2945008b45ab0e3e6e1dccb10b41af", [
      [ "RCL_SchedulerStopTimeState_Init", "_r_c_l___scheduler_8h.html#aef2945008b45ab0e3e6e1dccb10b41afae07bf9f7627d4a15416d5f201b5cbcaf", null ],
      [ "RCL_SchedulerStopTimeState_Found", "_r_c_l___scheduler_8h.html#aef2945008b45ab0e3e6e1dccb10b41afa2677557c956f2656284b5d1cd45a97f7", null ],
      [ "RCL_SchedulerStopTimeState_Programmed", "_r_c_l___scheduler_8h.html#aef2945008b45ab0e3e6e1dccb10b41afa88c9c386c4621ead29667449cd908f07", null ]
    ] ],
    [ "RCL_Scheduler_findStopStatus", "group__timing_handler_functions.html#gaf719295162cbabd94e6045714011c8b9", null ],
    [ "RCL_Scheduler_setStartStopTime", "group__timing_handler_functions.html#ga9a93d1a685d45c7c76d99e214617b03f", null ],
    [ "RCL_Scheduler_setStartStopTimeEarliestStart", "group__timing_handler_functions.html#ga50bb4d92a9e8fcdb424387b7b21fff66", null ],
    [ "RCL_Scheduler_setCmdStopTimeNoStartTrigger", "group__timing_handler_functions.html#ga5a2723fbaa6f62e474e40b68bdcde140", null ],
    [ "RCL_Scheduler_setNewStartNow", "group__timing_handler_functions.html#gab708667473f02ae1e56d6bc7a891b160", null ],
    [ "RCL_Scheduler_setNewStartAbsTime", "group__timing_handler_functions.html#ga1d022e011a155c3941e63b9f80876537", null ],
    [ "RCL_Scheduler_setNewStartRelTime", "group__timing_handler_functions.html#gacd173eac228c5848bd17b6eed77d5898", null ],
    [ "RCL_Scheduler_setStopTimes", "group__timing_handler_functions.html#gab77782ad69707cc082dc7bb5f8305142", null ],
    [ "RCL_Scheduler_isLater", "group__timing_api_functions.html#ga19720a21d52e8f22ec2a6bf0304376a6", null ],
    [ "RCL_Scheduler_delta", "group__timing_api_functions.html#ga475afa367f1ef67449e31b174af705ed", null ],
    [ "RCL_Scheduler_getCurrentTime", "group__timing_api_functions.html#gadf6e67c88e75cbe44f52b5b93eecdd09", null ],
    [ "RCL_Scheduler_setSchedStopTime", "group__timing_api_functions.html#gaecdb8291a0f926bbea44c73c01ef7ec8", null ],
    [ "RCL_Scheduler_postEvent", "group__timing_api_functions.html#ga4930c2dc02885349130768195667eb65", null ],
    [ "rclSchedulerState", "_r_c_l___scheduler_8h.html#ab71ca56aa368757c989e37f450cb27a6", null ]
];