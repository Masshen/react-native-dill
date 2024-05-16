import { Theme } from "@react-navigation/native";
import { defaultTheme as defaultElementTheme } from "@rneui/base";
import { CreateThemeOptions } from "@rneui/themed";
import React from "react";
import {
  DefaultTheme,
  configureFonts,
  MD2LightTheme,
  MD2DarkTheme,
} from "react-native-paper";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

export function paperTheme(
  mode?: "dark" | "light"
  /*@ts-ignore*/
): ReactNativePaper.Theme | undefined {
  /*@ts-ignore*/
  const light: ReactNativePaper.Theme = {
    ...DefaultTheme,
    ...MD2LightTheme,
    colors: {
      ...DefaultTheme.colors,
      accent: lightTheme.accent,
      background: lightTheme.background,
      primary: lightTheme.primary,
      text: lightTheme.text,
      onSurface: lightTheme.background,
    },
    fonts: configureFonts({
      config: {
        android: {
          regular: {
            fontFamily: "OpenSans-Regular",
            fontWeight: "normal",
          },
          medium: {
            fontFamily: "OpenSans-Medium",
            fontWeight: "normal",
          },
          light: {
            fontFamily: "OpenSans-Light",
            fontWeight: "normal",
          },
          thin: {
            fontFamily: "OpenSans-Medium",
            fontWeight: "normal",
          },
        },
        ios: {
          regular: {
            fontFamily: "OpenSans-Regular",
            fontWeight: "normal",
          },
          medium: {
            fontFamily: "OpenSans-Medium",
            fontWeight: "normal",
          },
          light: {
            fontFamily: "OpenSans-Light",
            fontWeight: "normal",
          },
          thin: {
            fontFamily: "OpenSans-Medium",
            fontWeight: "normal",
          },
        },
      },
      isV3: false,
    }),
  };
  /*@ts-ignore*/
  const dark: ReactNativePaper.Theme = {
    ...DefaultTheme,
    ...MD2DarkTheme,
    colors: {
      ...DefaultTheme.colors,
      accent: darkTheme.accent,
      background: darkTheme.background,
      primary: darkTheme.primary,
      text: darkTheme.text,
      onSurface: darkTheme.background,
    },
    fonts: configureFonts({
      config: {
        android: {
          regular: {
            fontFamily: "OpenSans-Regular",
            fontWeight: "normal",
          },
          medium: {
            fontFamily: "OpenSans-Medium",
            fontWeight: "normal",
          },
          light: {
            fontFamily: "OpenSans-Light",
            fontWeight: "normal",
          },
          thin: {
            fontFamily: "Explora-Regular",
            fontWeight: "normal",
          },
        },
        ios: {
          regular: {
            fontFamily: "OpenSans-Regular",
            fontWeight: "normal",
          },
          medium: {
            fontFamily: "OpenSans-Medium",
            fontWeight: "normal",
          },
          light: {
            fontFamily: "OpenSans-Light",
            fontWeight: "normal",
          },
          thin: {
            fontFamily: "Explora-Regular",
            fontWeight: "normal",
          },
        },
      },
      isV3: false,
    }),
  };
  return mode === "dark" ? dark : light;
}

export function navigatorTheme(mode: "dark" | "light"): Theme {
  const light: Theme = {
    colors: {
      primary: "#fff",
      background: "#f1f1f1",
      border: "#fff",
      card: "#f1f1f1",
      notification: "#000",
      text: "#000",
    },
    dark: false,
  };
  const dark: Theme = {
    colors: {
      primary: "#111",
      background: "#111",
      border: "#fff",
      card: "#222",
      notification: "#fff",
      text: "#fff",
    },
    dark: true,
  };
  return mode === "dark" ? dark : light;
}

export function elementTheme(mode: "dark" | "light"): CreateThemeOptions {
  const theme: CreateThemeOptions = {
    ...defaultElementTheme,
    mode: mode,
    lightColors: {
      black: "#111",
      background: "#fff",
    },
    darkColors: {
      black: "#fff",
      background: "#111",
    },
  };
  return theme;
}
