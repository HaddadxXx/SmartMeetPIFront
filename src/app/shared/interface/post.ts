export interface post {
    comments: Comment[];
    userId: string;
    firstName: string;
    lastName: string;
    content: string;
    isViolent?: boolean;
    feeling: string;
    createdAt: string;
    translatedContent?: string;
    id: string;
    user?: {
        firstName?: string;
        lastName?: string;
        profileImage: string;
      };

     
      replies?: Reply[];
      files?: { url: string }[];
    profileImage?: string; // Optionnel
    style1: profile[];
    homePost: profile[];
    reviewPost: profile[];
    style2: profile[];
    style3: profile[];
    style4: profile[];
    style5: profileDataSection[];
    style6: profileDataSection[];
    style7: profile[];
    style8: profileDataSection[];
    style9: profile[];
    style10: profileDataSection[];
    style11: profile[];
    style12: profile[];
    timeline: profile[];
    activityFeed: profile[];
    friendProfile: profile[];
    isShow?: boolean;
     // <-- Utilisez postImg ici pour les fichiers Cloudinary
    postImage?: string;
  images?: postImg[];
  carousel?: carousel[];
  gallerySrc?: gallerySrc[];
  isUrl?: boolean;
  isMap?: boolean;
  video?: string;
  uploadTime?: string; // <-- Ajoutez pour le HTML
}

    


export interface profileDataSection {
    class: string;
    showPost?: boolean;
    children: profile[];
}

export interface profile {
    user: User; 
    createdAt: string;
    content?: string;
    // Ajout du champ user
    isUrl: string;
    id: number,
    isDescription: boolean,
    active: boolean;
    profileImage: string,
    video: string;
    userName: string,
    uploadTime: string,
    postImage: string,
    isMap: boolean,
    title: string,
    spanTag: string,
    details?: string;
    tag: string,
    description: string,
    span?: string;
    class: string,
    images: postImg[],
    react: boolean,
    share: boolean;
    carousel?: carousel[];
    gallerySrc?: gallerySrc[];
    userId?: string; // Si userId est un string, ajoute-le ici
    text?: string; // Si text est un string, ajoute-le ici
    
}


export interface ReReply {
  firstName?: string;
  lastName?: string;
  user?: {
    firstName?: string;
    lastName?: string;
  };
  text?: string;
  userId?: string;
  createdAt?: Date;
}

  
  interface Reply {
    id: string;
    text: string;
    userId: string; // ← utilisé pour savoir si c’est "Vous"
    firstName: string;
    lastName: string;
    createdAt: string; // ← utilisé pour l’affichage de la date
    showReReplies?: boolean; // ← utilisé pour afficher/masquer les sous-réponses
    user?: {
      firstName: string;
      lastName: string;
    };
    reReplies?: Reply[]; // ← sous-réponses
  }

export interface User {
    
    firstName: string;
    lastName: string;
    id: string;
    profileImage: string;
    role?: Role; // <-- Ajouter le rôle
    // Ajoute ici d'autres détails que tu veux inclure sur l'utilisateur
}

export interface Role {
    name: string; // Ex: 'ROLE_SPONSOR'
    permissions?: string[];
  }

export interface Comment {
    userFirstName: string;
    userLastName: string;
    id: string;
    text: string;
    createdAt: string;
    profile: profile;
    style1: profile[];
    replies?: Reply[];
    showReplies?: boolean;
    isShow?: boolean;
    profileImage?: string;
  }

// Exemple : interface Story (ou storyList)
export interface Story {
  
  images?: string;
  imageUrl?: string;
  plusImg?: string;
  uname?: string;
  status?: string;
  class?: string;
  cssClass?: string;
  user?: {
    firstName: string;
    lastName: string;
  };
}
  
export interface storySlider {
  story: Story[];
}
  

export interface postImg {
    url: string;
    name: string;
}

export interface carousel {
    src: string;
    discount: boolean;
    title: string
    desc: string;
}
export interface gallerySrc {
    url?: string;
    class?: string;
    subClass?: subClass[];
}

export interface subClass {
    url: string;
    class: string;
    more?: string;
    moreClass?: string;
}




