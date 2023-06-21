import { configureStore } from '@reduxjs/toolkit';
import wordsetSelectSlice from './SliceWordsetSelect';
import wordsetListSlice from './SliceWordsetList';
import warnFuncSlice from './SliceWarnFunc';
import modalWarnSlice from './SliceModalWarn';
import wordsSlice from './SliceWords';

const store = configureStore({
  reducer: {wordsetSelect: wordsetSelectSlice.reducer,
  wordsetList: wordsetListSlice.reducer,
  warnFunc: warnFuncSlice.reducer,
  modalWarn: modalWarnSlice.reducer,
  wordsR: wordsSlice.reducer,
},
});
export default store;
