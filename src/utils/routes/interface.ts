import type { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Webview: { url: string; title?: string };
  Home: any;
  Splash: any;
  Index: any;
  Profile: any;
};

export type WebviewScreenRouteProp = RouteProp<RootStackParamList, "Webview">;
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Profile">;

export declare type eventType = "info" | "success" | "wrong" | "warning";
