import { Time } from "@angular/common";
import Participant from "./participant.interface";

export default interface Coach{
  id?: string;
  name: string;
  phone: string;
  email: string;
  school: string;
  shirt: string;
  dayOne: boolean;
  dayTwo: boolean;
  participants: Array<Participant>;
  timeRegisteredOne: Time;
  timeRegisteredTwo: Time;
}
