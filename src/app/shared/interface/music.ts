export interface yourFavoriteArtist {
    favoriteArtist: artist[]
}

export interface artist {
    name: string;
    fans: string;
    images: string;
}

export interface playlist {
    favoritePlaylist: singer[];
}

export interface singer {
    image: string;
    singerName: string;
    songs: string;
    songName: string;
    view: string;
    favorite: boolean;
}

export interface popularSongs {
    popularSongs: song[];
}

export interface song {
    id: number;
    songName: string;
    singerName: string;
    isShow: boolean;
}

export interface song {
    songList: songs[];
}

export interface songs {
    id:number;
    title: string;
    artist: string;
    link: string;
    thumb: string;
}
