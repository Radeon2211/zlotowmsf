import { combineReducers } from 'redux';
import dataReducer from './dataReducer/dataReducer';
import newsReducer from './newsReducer/newsReducer';
import galleryReducer from './galleryReducer/galleryReducer';
import uiReducer from './uiReducer/uiReducer';

const rootReducer = combineReducers({
  data: dataReducer,
  news: newsReducer,
  gallery: galleryReducer,
  ui: uiReducer,
});

export default rootReducer;
