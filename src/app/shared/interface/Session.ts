
import { Event } from "@angular/router";
export interface Session {
    idSession ? : string ;
    titre : string ;
    date : string ;

    nomEvent: string;  // Ajoutez cette ligne
    evenement?: {     // Optionnel si vous voulez accéder à l'objet complet
        idEvent?: string;
        nomEvent?: string;
        // autres champs si nécessaires
      };
}