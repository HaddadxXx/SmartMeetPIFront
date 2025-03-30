export interface eventCategory {
    eventCategory: Event[]
}

export interface Event {
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
}
