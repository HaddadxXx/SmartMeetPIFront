export interface birthday {
    birthdayList: birthdayList[];
}

export interface birthdayList {
    title: string;
    list: lists[];
}

export interface lists {
    image: string;
    userName: string;
    age?: string;
    birthday?: string;
}