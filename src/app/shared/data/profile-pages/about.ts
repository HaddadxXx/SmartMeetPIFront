import { hobbyInterest } from "../../interface/single-page";
import { introMySelf } from "./time-line";

export interface friends {
    data: friendsList[]
}

export interface friendsList {
    image: string;
    friend_Name: string;
    home: string;
    isOpen: boolean;
}

export const hobbyInterests: hobbyInterest[] = [
    {
        title: 'Hobbies & Interest',
        value: [
            {
                title: "Hobbies",
                content: "In my spare time, I enjoy going to the gym and regularly partake in charity runs around the UK in order to help the community and to stay fit and healthy. I also enjoy keeping up to date with the current affairs, both national and international events, which helps me to get inspiration for the stories that I produce when I am working."
            },
            {
                title: "Favourite Movies",
                content: "the pursuit of happiness, forrest gump, inception, the prestige, searching, coco, toy story, harry potter, parasite,the sixth sense, shutter island"
            },
            {
                title: "favourite books",
                content: "the monk who have sold his ferrari, who will cry when you die, the alchemist, 5 AM club, the power of subconsious mind, the old man and his god"
            },
            {
                title: "favourite games",
                content: "assassin's creed valhalla, minecraft, story about my uncle, cyberpunk 2077, the last of us part ii, pubg, call of duty warzone, fortnite, rainbow six siege"
            },
            {
                title: "Favourite Bands / Artists",
                content: "Talking Heads, Carl Perkins, Iron Maiden, one direction, the police, onerepublic, the cure"
            },
            {
                title: "Favourite series",
                content: "breaking bad, stranger things, money heist, lost in space, find yourself, 13 Reasons Why, Ozark , Black Mirror, The Witcher, Riverdale, The Crown"
            },
            {
                title: "other interest",
                content: "Sports, Blogging, Volunteering, Traveling, Yoga, Strategic Gaming"
            }
        ]
    }
]

export const educationWork: hobbyInterest[] = [
    {
        title: 'Education & Work',
        value: [
            {
                title: "Junior Architect",
                content: "Lopez & Zhang Architects, San Diego, CA / August 2024—present"
            },
            {
                title: "Architect intern",
                content: "Goldberg & Richards, Los Angeles, CA / August 2024—August 2024"
            },
            {
                title: "Master of Architecture",
                content: "Woodbury Univercity, 2013-2024"
            },
            {
                title: "bachlor of architecture",
                content: "Woodbury Univercity, 2009-2013"
            }
        ]
    }
]

export const introMySelfAbout: introMySelf[] = [
    {
        icon: 'user',
        title: 'About',
        sunTitle: 'Hello, I’m a kelin jasen, web-developer based on Paris. I have rich experience in web site design.',
        type: 'feather'
    },
    {
        icon: 'cake',
        title: 'Birthday ',
        sunTitle: '27th Aug, 1994',
        type: 'svg'
    },
    {
        icon: 'phone',
        title: 'Phone',
        sunTitle: '041 985 245 210',
        type: 'feather'
    },
    {
        icon: 'user',
        title: 'gender',
        sunTitle: 'men',
        type: 'feather'
    },
    {
        icon: 'heart',
        title: 'relationship status',
        sunTitle: 'single',
        type: 'feather'
    },
    {
        icon: 'map-pin',
        title: 'lived in london',
        sunTitle: 'last 5 year',
        type: 'feather'
    },
    {
        icon: 'blood-drop',
        title: 'blood group',
        sunTitle: 'A+ positive',
        type: 'svg'
    },
    {
        icon: 'mail',
        title: 'email address',
        sunTitle: 'billyerds@gmail.com',
        type: 'feather'
    },
    {
        icon: 'at-sign',
        title: 'website',
        sunTitle: 'friendbook.com',
        type: 'feather'
    },
    {
        icon: 'link',
        title: 'join',
        sunTitle: 'june 20, 2010',
        type: 'feather'
    },
]

export const friendList: friends[] = [
    {
        data: [
            {
                image: 'assets/images/user-sm/1.jpg',
                friend_Name: 'Paige Turner',
                home: 'alabma, USA',
                isOpen: false
            },
            {
                image: 'assets/images/user-sm/2.jpg',
                friend_Name: 'Josephin water',
                home: 'alabma, USA',
                isOpen: false
            },
            {
                image: 'assets/images/user-sm/3.jpg',
                friend_Name: 'Petey Cruiser',
                home: 'alabma, USA',
                isOpen: false
            },
        ]
    },
    {
        data: [
            {
                image: 'assets/images/user-sm/4.jpg',
                friend_Name: 'Anna Sthesia',
                home: 'alabma, USA',
                isOpen: false
            },
            {
                image: 'assets/images/user-sm/5.jpg',
                friend_Name: 'Anna Mull',
                home: 'alabma, USA',
                isOpen: false
            },
            {
                image: 'assets/images/user-sm/6.jpg',
                friend_Name: 'Paul Molive',
                home: 'alabma, USA',
                isOpen: false
            },
        ]
    },
]

export const friends = [
    {
        image: 'assets/images/user-sm/1.jpg',
    },
    {
        image: 'assets/images/user-sm/2.jpg',
    },
    {
        image: 'assets/images/user-sm/3.jpg',
    },
    {
        image: 'assets/images/user-sm/4.jpg',
    },
    {
        image: 'assets/images/user-sm/5.jpg',
    },
    {
        image: 'assets/images/user-sm/6.jpg',
    },
    {
        image: 'assets/images/user-sm/7.jpg',
    },
    {
        image: 'assets/images/user-sm/8.jpg',
    },
    {
        image: 'assets/images/user-sm/9.jpg',
    },
    {
        image: 'assets/images/user-sm/10.jpg',
    },
    {
        image: 'assets/images/user-sm/11.jpg',
    },
    {
        image: 'assets/images/user-sm/12.jpg',
    }
]