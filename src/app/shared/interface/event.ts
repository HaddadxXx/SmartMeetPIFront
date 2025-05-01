import { Session } from "./Session";
import { User, UserService } from "../services/user.service";
export interface eventCategory {
    eventCategory: Event[]
}

export interface Event {
    idEvent ? : string ;
    nomEvent :string ;
    theme : string ;
    description: string ;
    dateDebut: string ;
    dateFin : string ;
    capacite : number ;
    typeEvent : string;
   sessions?: Session[]; 
    horaire: string ;
    lieu : string ;
    photo : string ;
    name: string;
    fans: number;
    images: string;

    class?: string;
}
