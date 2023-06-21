import { configureStore } from '@reduxjs/toolkit';
import wordsetSelectSlice from './SliceWordsetSelect';
import wordsetListSlice from './SliceWordsetList';
import warnFuncSlice from './SliceWarnFunc';
import SliceModal from './SliceModalWarn';

const store = configureStore({
  reducer: {
    wordsetSelect: wordsetSelectSlice.reducer,
    wordsetList: wordsetListSlice.reducer,
    warnFunc: warnFuncSlice.reducer,
    modal: SliceModal.reducer,
  },
});
export default store;
