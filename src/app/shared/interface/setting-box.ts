export interface settingBox {
    settingBoxList: setting[];
}

export interface setting {
    title: true;
    tab: string;
    data: data[];
}

export interface data {
    id: number;
    image: string;
    title: string;
    path: string;
}