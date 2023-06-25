import { configureStore } from '@reduxjs/toolkit';
// import wordsetSelectSlice from './SliceWordsetSelect';
import wordsetListSlice from './SliceWordsetList';
import warnFuncSlice from './SliceWarnFunc';
import modalWarnSlice from './SliceModalWarn';
// import wordsSlice from './SliceWords';
import modalWordAddSlice from './SliceModalWordAdd';
import wordsetIdxSlice from './SliceWordsetIdx';
import modalWordModSlice from './SliceModalWordMod';
import modalWordDelSlice from './SliceModalWordDel';
import modalWordsetAMSlice from './SliceModalWordsetAddMod';
import modalWordsetDelSlice from './SliceModalWordsetDel';
import updateIdSlice from './SliceUpdateId';
import wordsetSlice from './SliceWordset';

const store = configureStore({
  reducer: {
  // wordsetSelect: wordsetSelectSlice.reducer,
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
  // wordsR: wordsSlice.reducer,
  wordset: wordsetSlice.reducer,
},
});
export default store;
