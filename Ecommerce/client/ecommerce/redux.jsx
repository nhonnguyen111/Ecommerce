import { persistStore } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./src/store/reducers/rootReducer";
import { thunk } from "redux-thunk";
const reduxStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);
  return { store, persistor };
};

export default reduxStore;
