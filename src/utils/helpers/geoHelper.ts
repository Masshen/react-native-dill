import { AsYouType } from "libphonenumber-js";

export function getPhoneValue(number: string): AsYouType {
  const phone = new AsYouType();
  phone.input(number);
  return phone;
}
