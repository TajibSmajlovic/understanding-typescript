import React from "react";
import { Provider } from "react-redux";

import Root from "components/Root/Root";
import { configureStore } from "redux/configureStore";

const store = configureStore();

const App: React.FC = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

export default App;
