//import { getWeek, startOfWeek } from "date-fns";
import moment from "moment";
import "moment/locale/fr";

class DateHelper {
  getDate(date: any, format: string) {
    moment.locale("fr");
    if (date === null) return null;
    return moment(date).format(format);
  }

  getAge(date: any) {
    moment.locale("fr");
    const diff = moment().diff(date, "years");
    if (diff > 0) {
      return `${diff} ans`;
    }
    return "";
  }

  getDateOnly(date: any) {
    if (date === null) return null;
    return moment(date);
  }

  isSameDay(date1: any, date2: any) {
    if (
      date1 === null ||
      date1 === undefined ||
      date2 === null ||
      date2 === undefined
    ) {
      return false;
    }
    return moment(date1).isSame(date2, "day");
  }

  /*getWeekDays(date: Date): Date[] {
    const response = [];
    const startDate = startOfWeek(date, { weekStartsOn: 1 });
    for (let index = 0; index < 7; index++) {
      const value = moment(startDate).add("d", index);
      response.push(value.toDate());
    }
    return response;
  }

  getCurrentWeek() {
    return getWeek(new Date());
  }*/

  getDifference(date1: any, date2: any, unitOfTime: moment.unitOfTime.Diff) {
    if (
      date1 === undefined ||
      date2 === undefined ||
      date1 === null ||
      date2 === null
    ) {
      return -1;
    }
    return moment(date1).diff(moment(date2), unitOfTime);
  }
}

export default new DateHelper();
