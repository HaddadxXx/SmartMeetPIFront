import { User } from "../services/user.service";

export interface Participate {
    idParticipate: string; // Maps to idParticpate in the Java Participate class
    user: User; // Reference to the User interface, not 'any'
    event: Event; // Reference to the Event interface
    filePath?: string; // Optional, maps to filePath in the Java Participate class
    dateOfParticipation?: string; // Optional, maps to dateOfParticpation in the Java Participate class (use string for ISO date)
  }