
export interface popularYourFriends {
    popularYourFriends: popularYourFriendsData[];
}

export interface popularYourFriendsData {
    image: string;
    userName: string;
    fiends: string;
}

export interface topGames {
    topFiveGames : topFiveGames[];
}

export interface topFiveGames{
    image:string;
    gameName:string;
    type:string;
    user:string;
    active:boolean;
}

export interface allGamesList {
    allGamesData : allGames[]
}

export interface allGames{
    id:number;
    image:string;
    title:string;
    subTitle:string;
    description:string;
    type:string;
}