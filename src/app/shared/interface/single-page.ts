export interface hobbyInterest {
    title: string;
    value: value[];
}

export interface value {
    title: string;
    content: string;
}

export interface photosGallery {
    album: album[];
    gallery: gallery[];
    galleryOpen: gallery[];
}

export interface gallery {
    image: string;
}

export interface album {
    title: string;
    image: string;
}
