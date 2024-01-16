import { Time } from "@angular/common";

export default interface Vip{
  id?: string;
  name: string;
  phone: string;
  email: string;
  dayOne: boolean;
  dayTwo: boolean;
  company: string;
  timeRegisteredOne: Time;
}
