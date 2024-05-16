import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { BackHandler, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import { setAppTitle } from "../redux/userReducer";
import { WebviewScreenRouteProp } from "../utils/routes/interface";
import { Appbar } from "react-native-paper";
import { RootState } from "../redux/store";

export function WebviewScreen() {
  const route = useRoute<WebviewScreenRouteProp>();
  const [url, setUrl] = React.useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const title = useSelector((state: RootState) => state.user.title);

  function handleBack() {
    navigation.goBack();
  }

  React.useEffect(() => {
    setUrl(route.params?.url);
    dispatch(setAppTitle(route.params.title ?? "Webview"));
  }, [route]);

  React.useEffect(() => {
    const backAction = () => {
      handleBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: "#f1f1f1" }}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title={title} color="#111" />
      </Appbar.Header>
      <WebView
        source={{ uri: url }}
        injectedJavaScript={`
            document.getElementsByTagName('header')[0].style.display = 'none';
            document.getElementsByTagName('footer')[0].style.display = 'none'
          `}
      />
    </SafeAreaView>
  );
}
