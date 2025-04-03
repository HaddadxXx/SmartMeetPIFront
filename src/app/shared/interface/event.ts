import { Session } from "./Session";
export interface eventCategory {
    eventCategory: Event[]
}

export interface Event {
    isInterested: boolean;
  //  date: string | number | Date;
    idEvent ? : string ;
    name: string;
    fans: number;
    images: string;
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
}
