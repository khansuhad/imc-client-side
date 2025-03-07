import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice/userSlice'
import admissionReducer from './features/admissions/admissionSlice/admissionSlice'
import batchReducer from './features/batch/batchSlice/batchSlice'
import feesReducer from './features/fees/feesSlice/feesSlice'
import smsReducer from './features/sms/smsSlice/smsSlice.jsx'
import noticesReducer from './features/notice/noticeSlice/noticeSlice'
import galleryReducer from "./features/gallery/gallerySlice/gallerySlice"
export default configureStore({
  reducer: {
    users: userReducer,
    batches: batchReducer,
    admissions: admissionReducer,
    fees: feesReducer,
    sms: smsReducer,
    notices: noticesReducer,
    gallery : galleryReducer
  }
})
