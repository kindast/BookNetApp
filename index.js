import React from "react";
import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ReduxApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

registerRootComponent(ReduxApp);
