export interface events {
    image?: string;
    title?: string;
    subTitle?: string;
    desc?: string;
    span?: string;
    link?: string;
    video?: string;
    class?:string;
}

export interface title {
    title?: string,
    subTitle?: string
}

export interface friendsConversation {
    friendsConversationList: friendsList[];
}

export interface friendsList {
    heading: string;
    isCollapsed: boolean,
    data: data[];
}

export interface data {
    image: string,
    title: string,
    city: string,
    class: string,
    status?: string,
}

export interface storySlider {
    story: storyList[];
}

export interface storyList {
    images: string;
    plusImg?: string;
    uname: string;
    class: string;
    status?: string;
}

export interface friend {
    friendSuggestion: friendSuggestion[];
}

export interface friendSuggestion {
    images: string,
    name: string,
    title: string,
    class: string
}

export interface liked {
    likedPages: likedPages[];
}

export interface likedPages {
    image: string,
    title: string,
    subTitle: string,
    friends: number;
    favorite: boolean
}

export interface gallery {
    galleryRecord: galleryRecord[];
}

export interface galleryRecord {
    image?: string,
    previewImage?: string,
    class: string,
    images?: images[];
}

export interface images {
    image: string,
    previewImage: string,
    class: string,
}

export interface blogTitle {
    title?: string,
    pages?: string
  }
  