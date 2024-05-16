import AsyncStorage from "@react-native-async-storage/async-storage";
import { upperFirst, upperCase, isEmpty, toUpper } from "lodash";
import userService from "../../services/userService";
import {
  setAllUsers,
  setCurrentEdition,
  setUserAdmin,
  setUserProfil,
  setUserResponsible,
  setUserRoles,
  setUserStudent,
  setUserTeacher,
} from "../../redux/userReducer";
import levelService from "../../services/levelService";
import { setAllLevels } from "../../redux/levelReducer";
import bookService from "../../services/bookService";
import { setAllBooks } from "../../redux/booksReducer";
import subjectService from "../../services/subjectService";
import { setAllSubjects } from "../../redux/subjectReducer";
import programService from "../../services/programService";
import {
  setAllPrograms,
  setCalendarPrograms,
} from "../../redux/programReducer";
import dateHelpers from "./dateHelpers";
import programHelper from "./programHelper";
import bookHelper from "./bookHelper";
import studentHelper from "./studentHelper";
import sectorService from "../../services/sectorService";
import { setAllSectors } from "../../redux/sectorReducer";
import schoolHelper from "./schoolHelper";
import quizHelper from "./quizHelper";

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
      dispatch(setUserProfil(item));
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
      dispatch(setUserProfil({}));
    }
  }

  async getUserProfil() {
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

  async getAllLevels(dispatch: any) {
    let items: any[] = [];
    await levelService
      .getByKey(`order[promotion]=desc&order[reference]=asc`)
      .then((response) => {
        const data: any = levelService.getData(response);
        items = data;
        items = items.sort((a, b) => a.promotion - b.promotion);
        if (typeof dispatch === "function") {
          dispatch(setAllLevels(items ?? []));
        }
      })
      .catch((reason) => {});
    return items;
  }

  async getAllSubjects(dispatch: any) {
    let items: any[] = [];
    await subjectService
      .getByKey(`order[title]=asc`)
      .then((response) => {
        const data: any = subjectService.getData(response);
        items = data;
        if (typeof dispatch === "function") {
          dispatch(setAllSubjects(items ?? []));
        }
      })
      .catch((reason) => {});
    return items;
  }

  async getAllSectors(dispatch: any) {
    let items: any[] = [];
    await sectorService
      .getByKey(`order[name]=asc`)
      .then((response) => {
        const data: any = sectorService.getData(response);
        items = data;
        if (typeof dispatch === "function") {
          dispatch(setAllSectors(items ?? []));
        }
      })
      .catch((reason) => {});
    return items;
  }

  async getAllPrograms(dispatch: any) {
    const user = await this.getUserProfil();
    let query = `order[name]=asc`;
    const level = user.students?.level?.uid;
    const teachings: any[] = user.teacher?.teachings;
    if (!isEmpty(level)) {
      query += `&subject.level=${level}`;
    } else if (teachings?.length > 0) {
      teachings.forEach((p) => {
        if (p.edition?.isActive) {
          query += `&subject[]=${p.subject?.uid}`;
        }
      });
    }
    let items: any[] = [];
    await programService
      .getByKey(query)
      .then((response) => {
        const data: any = programService.getData(response);
        items = data;
        if (typeof dispatch === "function") {
          const elements: any[] = programHelper.getProgramCalendar(items);
          dispatch(setAllPrograms(items));
          dispatch(setCalendarPrograms(elements));
        }
      })
      .catch((reason) => {});
    return items;
  }

  async initData(userUid: string, dispatch?: any) {
    const user = await this.getUserProfil();
    const level = user.students?.level?.uid;
    const teachings: any[] = user.teacher?.teachings;
    if (!isEmpty(level)) {
      studentHelper.getStudentLevel(level, dispatch);
      studentHelper.getStudentSubjects(level, dispatch);
      studentHelper.getStudents(level, dispatch);
    }
    await schoolHelper.getAllPeriods(dispatch);
    await schoolHelper.getAllFees(dispatch);
    this.getAllUsers(dispatch);
    this.getAllLevels(dispatch);
    this.getAllSectors(dispatch);
    bookHelper.getAllBooks(dispatch);
    this.getAllSubjects(dispatch);
    this.getAllPrograms(dispatch);
    await this.getDashboard(dispatch);
    //quiz
    await quizHelper.getAllLevels(dispatch);
    await quizHelper.getAllSubjects(dispatch);
    await quizHelper.getQuizzes(dispatch);
  }

  async getDashboard(dispatch?: any) {
    const user = await this.getUserProfil();
    let item: any = {};
    if (!isEmpty(user)) {
      await userService
        .getDashboard(`${user.uid}`)
        .then((response) => {
          const data: any = userService.getData(response);
          item = data;
          if (typeof dispatch === "function") {
            const { roles, admin, student, responsible, teacher, edition } =
              item;
            dispatch(setUserRoles(roles ?? []));
            dispatch(setUserAdmin(admin ?? {}));
            dispatch(setUserStudent(student ?? {}));
            dispatch(setUserTeacher(teacher ?? {}));
            dispatch(setUserResponsible(responsible ?? {}));
            dispatch(setCurrentEdition(edition ?? {}));
          }
        })
        .catch(() => {});
    }
    return item;
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
