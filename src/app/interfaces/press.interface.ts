import { Time } from "@angular/common";

export default interface Press{
  id?: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  dayOne: boolean;
  dayTwo: boolean;
  timeRegisteredOne: string;
}
