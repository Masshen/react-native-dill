import AsyncStorage from "@react-native-async-storage/async-storage";
import { upperFirst, upperCase, isEmpty, toUpper } from "lodash";
import userService from "../../services/userService";
import { setAllUsers, setUserProfile } from "../../redux/userReducer";

class UserHelper {
  private key: string = "@regard_user";
  private setting_allow_sync_contacts: string =
    "@school_setting@allow_sync_contact";
  private setting_contact_sync_date: string =
    "@school_setting@contact_sync_date";

  async setCurrentUser(user: any, dispatch?: any) {
    let item: any = user;
    if (typeof dispatch === "function") {
      await userService
        .get(user.uid)
        .then((response) => {
          item = response.data;
        })
        .catch(() => {});
      dispatch(setUserProfile(item));
    }
    await AsyncStorage.setItem(this.key, JSON.stringify(item));
    return item;
  }

  getUserName(user: any) {
    return `${upperFirst(user.firstName)} ${upperCase(user.lastName)}`;
  }

  setLogout(dispatch?: any) {
    AsyncStorage.removeItem(this.key);
    if (typeof dispatch === "function") {
      dispatch(setUserProfile({}));
    }
  }

  async getUserProfile() {
    let item: any = await AsyncStorage.getItem(this.key);
    if (item != null) {
      const data = JSON.parse(item);
      return data;
    }
    return null;
  }

  async setUserSetting(
    type: "setting-contact-allow-sync" | "setting-contact-sync-date",
    value: any
  ) {
    let elementKey = "";
    if (type === "setting-contact-allow-sync") {
      elementKey = this.setting_allow_sync_contacts;
    } else if (type === "setting-contact-sync-date") {
      elementKey = this.setting_contact_sync_date;
    }
    await AsyncStorage.setItem(elementKey, JSON.stringify(value));
  }

  async getUserSetting(
    type: "setting-contact-allow-sync" | "setting-contact-sync-date"
  ) {
    let elementKey = "";
    if (type === "setting-contact-allow-sync") {
      elementKey = this.setting_allow_sync_contacts;
    } else if (type === "setting-contact-sync-date") {
      elementKey = this.setting_contact_sync_date;
    }
    let item: any = await AsyncStorage.getItem(elementKey);
    if (item != null) {
      const data = JSON.parse(item);
      return data;
    }
    return null;
  }

  async getAllUsers(dispatch?: any, query?: string) {
    let items: any[] = [];
    await userService
      .getByKey(`order[firstName]=asc&order[lastName]=asc&${query ?? ""}`)
      .then((response) => {
        const data: any = userService.getData(response);
        items = data;
        if (typeof dispatch === "function") {
          dispatch(setAllUsers(items ?? []));
        }
      })
      .catch(() => {});
    return items;
  }

  async initData(dispatch?: any) {
    const user = await this.getUserProfile();
    console.warn(user);
    console.warn(dispatch);
  }

  getTitle(user: any) {
    const { firstName, lastName } = user;
    let result = "";
    if ((firstName ?? "").length > 0) {
      result = firstName.substring(0, 1);
    }
    if ((lastName ?? "").length > 0) {
      result += lastName.substring(0, 1);
    }
    return toUpper(result);
  }

  addMeta(
    value: string,
    name: string,
    type: "string" | "phone" | "text" | "email" | "web"
  ) {
    let meta = null;
    if (!isEmpty(value)) {
      meta = {
        metaKey: name,
        metaValue: value,
        metaType: type,
      };
    }
    return meta;
  }

  isAdmin = (roles: any[]) => roles.findIndex((p) => p === "ROLE_ADMIN") !== -1;
  isStudent = (roles: any[]) =>
    roles.findIndex((p) => p === "ROLE_STUDENT") !== -1;
  isResponsible = (roles: any[]) =>
    roles.findIndex((p) => p === "ROLE_RESPONSIBLE") !== -1;
  isTeacher = (roles: any[]) =>
    roles.findIndex((p) => p === "ROLE_TEACHER") !== -1;
}

export default new UserHelper();
