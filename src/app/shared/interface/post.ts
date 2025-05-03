export interface post {
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
}

export interface profileDataSection {
    class: string;
    showPost?: boolean;
    children: profile[];
}

export interface profile {
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




