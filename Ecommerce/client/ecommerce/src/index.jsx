import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import reduxStore from "../redux.jsx";
import Global from "./page/global/Global.jsx";
const { store, persistor } = reduxStore();
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Global>
        <App />
      </Global>
    </PersistGate>
  </Provider>
);
