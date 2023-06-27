import { configureStore } from '@reduxjs/toolkit';
import wordsetListSlice from './SliceWordsetList';
import warnFuncSlice from './SliceWarnFunc';
import modalWarnSlice from './SliceModalWarn';
import modalWordAddSlice from './SliceModalWordAdd';
import wordsetIdxSlice from './SliceWordsetIdx';
import modalWordModSlice from './SliceModalWordMod';
import modalWordDelSlice from './SliceModalWordDel';
import modalWordsetAMSlice from './SliceModalWordsetAddMod';
import modalWordsetDelSlice from './SliceModalWordsetDel';
import updateIdSlice from './SliceUpdateId';
import wordsetSlice from './SliceWordset';
import questionIdxSlice from './SliceQuestionIdx';
import tapSlice from './SliceTap';

const store = configureStore({
  reducer: {
  wordsetList: wordsetListSlice.reducer,
  wordsetIdx: wordsetIdxSlice.reducer,
  updateId: updateIdSlice.reducer,
  warnFunc: warnFuncSlice.reducer,
  modalWarn: modalWarnSlice.reducer,
  modalWordAdd : modalWordAddSlice.reducer,
  modalWordMod : modalWordModSlice.reducer,
  modalWordDel : modalWordDelSlice.reducer,
  modalWordsetAM : modalWordsetAMSlice.reducer,
  modalWordsetDel : modalWordsetDelSlice.reducer,
  wordset: wordsetSlice.reducer,
  questionIdx : questionIdxSlice.reducer,
  tap : tapSlice.reducer,
},
});
export default store;
