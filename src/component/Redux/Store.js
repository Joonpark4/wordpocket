import { configureStore } from '@reduxjs/toolkit';
import wordsetSelectSlice from './SliceWordsetSelect';
import wordsetListSlice from './SliceWordsetList';
import warnFuncSlice from './SliceWarnFunc';
import modalWarnSlice from './SliceModalWarn';

const store = configureStore({
  reducer: {wordsetSelect: wordsetSelectSlice.reducer,
  wordsetList: wordsetListSlice.reducer,
  warnFunc: warnFuncSlice.reducer,
  modalWarn: modalWarnSlice.reducer,
},
});
export default store;
