/**
 * @format
 */
import "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

export default function Main() {
  return (
    <PaperProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
