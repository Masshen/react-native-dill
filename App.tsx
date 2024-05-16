import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar, BackHandler } from "react-native";
import { ThemeProvider as ElementThemeProvider } from "@rneui/themed";
import {
  elementTheme,
  navigatorTheme,
  paperTheme,
} from "./src/utils/themes/theme";
import { NavigationContainer } from "@react-navigation/native";
import { RootState } from "./src/redux/store";
import { ThemeProvider } from "react-native-paper";
import { RootStackParamList } from "./src/utils/routes/interface";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colorPrimary } from "./src/utils/themes/colors";
import NetInfo from "@react-native-community/netinfo";
import { setConnection } from "./src/redux/themeReducer";
import { ConfirmDialog } from "react-native-simple-dialogs";
import { SplashScreen } from "./src/screens/splash";
import { HomeScreen } from "./src/screens/home";
import { WebviewScreen } from "./src/screens/webview";

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const isConnected = useSelector(
    (state: RootState) => state.theme.isConnected,
  );
  const title = useSelector((state: RootState) => state.user.title);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch(setConnection(state.isConnected ?? false));
    });
  }, []);

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSeconds(seconds => seconds + 1);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <React.Fragment>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/** @ts-ignore  */}
        <ThemeProvider theme={paperTheme(mode)}>
          <ElementThemeProvider theme={elementTheme(mode)}>
            <NavigationContainer theme={navigatorTheme(mode)}>
              <StatusBar
                //backgroundColor={mode === 'dark' ? '#111' : '#f1f1f1'}
                animated
                backgroundColor={"#f1f1f1"}
                //barStyle={mode === 'dark' ? 'dark-content' : 'light-content'}
                barStyle="dark-content"
              />
              <Stack.Navigator
                screenOptions={{
                  animation: "slide_from_left",
                  animationTypeForReplace: "push",
                  // statusBarAnimation: 'slide',
                  //statusBarColor: mode === 'dark' ? '#222' : '#f1f1f1',
                  //statusBarStyle: mode === 'dark' ? 'light' : 'dark',
                  statusBarColor: "#f1f1f1",
                  statusBarStyle: "dark",
                }}
              >
                <Stack.Screen
                  name="Splash"
                  component={SplashScreen}
                  options={{
                    animation: "slide_from_bottom",
                    headerShown: false,
                    statusBarHidden: true,
                    statusBarColor: colorPrimary,
                  }}
                />
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                    animation: "flip",
                    headerShown: false,
                    statusBarHidden: false,
                  }}
                />
                <Stack.Screen
                  name="Webview"
                  component={WebviewScreen}
                  options={{
                    animation: "slide_from_bottom",
                    headerShown: false,
                    title: title,
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </ElementThemeProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </React.Fragment>
  );
}

export default App;
