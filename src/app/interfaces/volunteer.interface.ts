import { Time } from "@angular/common";

export default interface Volunteer{
  id?: string;
  name: string;
  phone: string;
  email: string;
  shirt: string;
  dayOne: boolean;
  dayTwo: boolean;
  timeRegisteredOne: string;
  timeOutOne: string;
  timeRegisteredTwo: string;
  timeOutTwo: string;
}
