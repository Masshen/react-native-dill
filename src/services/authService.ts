import http from "./authConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN = "regard_token";
const REFRESH_TOKEN = "regard_refresh_token";

class AuthApi {
  async refreshToken() {
    const refresh_token = await this.getRefreshToken();
    let rep = false;
    if (refresh_token) {
      await http
        .post("/auth/refresh", { refresh_token })
        .then((response) => response.data)
        .then((response) => {
          if (response.token) {
            rep = true;
            AsyncStorage.setItem(TOKEN, response.token);
            AsyncStorage.setItem(REFRESH_TOKEN, response.refresh_token);
          }
        })
        .catch((e) => console.warn("Error", e));
    }
    return rep;
  }

  async logout() {
    await AsyncStorage.removeItem(TOKEN);
    await AsyncStorage.removeItem(REFRESH_TOKEN);
  }

  async getToken() {
    return await AsyncStorage.getItem(TOKEN);
  }

  async setToken(value: string) {
    return await AsyncStorage.setItem(TOKEN, value);
  }

  async getRefreshToken() {
    return await AsyncStorage.getItem(REFRESH_TOKEN);
  }
}

export default new AuthApi();
