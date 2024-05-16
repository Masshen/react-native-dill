import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  View,
  useWindowDimensions,
} from "react-native";
import * as Anim from "react-native-animatable";
import { colorPrimary } from "../utils/themes/colors";
import { StackActions, useNavigation } from "@react-navigation/native";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import userHelper from "../utils/helpers/userHelper";
import authService from "../services/authService";
import { jwtDecode } from "jwt-decode";
import dateHelpers from "../utils/helpers/dateHelpers";

export function SplashScreen() {
  const dim = useWindowDimensions();
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.user.profile);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setTimeout(async () => {
      await onLoad();
    }, 2500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLoad = React.useCallback(async () => {
    await init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function init() {
    const diff = dateHelpers.getDifference(new Date(), "2024-07-30", "day");
    if (diff > 0) {
      navigation.dispatch(StackActions.replace("Expiration"));
      return;
    }
    const token = await authService.getToken();
    if (!isEmpty(token)) {
      const decoded: any = jwtDecode(token ?? "");
      const exp = decoded?.exp ?? null;
      if (exp > 0) {
        const date = new Date(exp * 1000);
        const hour = dateHelpers.getDifference(date, new Date(), "hour");
        if (hour < 1) {
          navigation.dispatch(StackActions.replace("Home"));
          return;
        }
      }
    } else {
      navigation.dispatch(StackActions.replace("Home"));
      return;
    }
    setLoading(true);
    if (isEmpty(user.uid)) {
      const current = await userHelper.getUserProfile();
      if (isEmpty(current)) {
        navigation.dispatch(StackActions.replace("Home"));
      } else {
        await userHelper.setCurrentUser(current, dispatch);
        await initData();
        navigation.dispatch(StackActions.replace("Home"));
      }
    } else {
      await initData();
      navigation.dispatch(StackActions.replace("Home"));
    }
    setLoading(false);
  }

  async function initData() {
    await userHelper.initData(dispatch);
  }

  return (
    <>
      <StatusBar hidden />
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colorPrimary,
        }}
      >
        {/* <Anim.View
                    style={{position:"absolute",top:0,height:5,width:"100%",backgroundColor:colorPrimary}}
                    animation="bounceInLeft"
                    iterationDelay={500}
                /> */}
        {/* <Anim.View
                    style={{position:"absolute",bottom:0,height:5,width:"100%",backgroundColor:colorPrimary}}
                    animation="bounceInRight"
                    iterationDelay={1500}
                /> */}
        {/* <Anim.View
                    style={{position:"absolute",top:0,height:"100%",left:0,width:5,backgroundColor:colorPrimary}}
                    animation="fadeIn"
                    iterationDelay={1000}
                /> */}
        {/* <Anim.View
                    style={{position:"absolute",top:0,height:"100%",right:0,width:5,backgroundColor:colorPrimary}}
                    animation="fadeIn"
                    iterationDelay={2000}
                /> */}
        {/* <Image
                    source={require("../assets/images/logo.png")}
                    style={{width:120,height:120}}
                 /> */}
        <Anim.View
          style={{
            alignSelf: "center",
            position: "absolute",
            width: dim.height > dim.width ? dim.height * 2 : dim.width * 2,
            borderRadius:
              dim.height > dim.width ? dim.height * 2 : dim.width * 2,
            backgroundColor: "#fff",
            height: dim.height > dim.width ? dim.height * 2 : dim.width * 2,
          }}
          animation={"zoomIn"}
          easing="ease-in-sine"
          duration={1000}
          iterationDelay={1000}
          //iterationCount="infinite"
        />
        <Anim.Image
          source={require("../assets/images/logo-regard.jpg")}
          animation="zoomIn"
          style={{ width: 180, height: 180 }}
          iterationDelay={2000}
          easing="ease-out-sine"
        />
        {loading && (
          <View style={{ position: "absolute", right: 16, bottom: 16 }}>
            <ActivityIndicator />
          </View>
        )}
      </SafeAreaView>
    </>
  );
}
