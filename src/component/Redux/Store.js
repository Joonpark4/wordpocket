import { configureStore } from '@reduxjs/toolkit';
import wordsetListSlice from './SliceWordsetList';
import warnFuncSlice from './SliceWarnFunc';
import wordsetIdxSlice from './SliceWordsetIdx';
import updateIdSlice from './SliceUpdateId';
import wordsetSlice from './SliceWordset';
import questionIdxSlice from './SliceQuestionIdx';
import tapSlice from './SliceTap';
import modalSlice from './SliceModal';

const store = configureStore({
  reducer: {
  wordsetList: wordsetListSlice.reducer,
  wordsetIdx: wordsetIdxSlice.reducer,
  updateId: updateIdSlice.reducer,
  warnFunc: warnFuncSlice.reducer,
  wordset: wordsetSlice.reducer,
  questionIdx : questionIdxSlice.reducer,
  tap : tapSlice.reducer,
  modal : modalSlice.reducer,
},
});
export default store;
