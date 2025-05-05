import { Session } from "./Session";
import { User, UserService } from "../services/user.service";
export interface eventCategory {
    eventCategory: Event[]
}

export interface Event {
  participantsEmails?: string[]; // Optionnel et correctement typé
    idEvent ?: string ;
    nomEvent :string ;
    theme : string ;
    description: string ;
    dateDebut: string ;
    dateFin : string ;
    capacite : number ;
    budget : number ;
    typeEvent : string;
   sessions?: Session[]; 
    horaire: string ;
    lieu : string ;
    photo : string ;
    name: string;
    fans: number;
    images: string;
    participations?: any[]; // Rendre optionnel ou fournir une valeur par défaut
    class?: string;
    ownerId : string ;
    nbParticipations: number; // champ temporaire reçu du backend
    tendanceRank: number;     // rang dans le top 5
    pourcentageParticipation: number;

}
