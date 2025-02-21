import { configureStore } from '@reduxjs/toolkit'

import batchesReducer from "../Features/Batch/BatchSlice/BatchSlice"
import admissionsReducer from "../Features/Admissions/AdmissionsSlice/AdmissionsSlice"
import transectionsReducer from "../Features/Fees/TransectionsSlice/TransectionsSlice"
import smsReducer from "../Features/Sms/SmsSlice/SmsSlice"
export const store = configureStore({
  reducer: {

    batches: batchesReducer,
    admissions : admissionsReducer,
    transections : transectionsReducer,
    sms : smsReducer,

  },


})
