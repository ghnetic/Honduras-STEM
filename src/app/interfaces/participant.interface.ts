import { Time } from "@angular/common";

export default interface Participant{
  id?: string;
  name: string;
  shirt: string;
  dayOne: boolean;
  timeRegistered: Time;
}
