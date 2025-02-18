
export interface chats {
  message: string,
  isReply?: boolean
}

export interface chatsUser {
  id : number;
  image: string;
  user: string;
  time: string;
  status: string;
  message: string;
  count?: number;
}

export const popularTopics = [
  {
    icon: 'assets/svg/help-topics/profile.svg',
    title: 'your profile',
    desc: 'learn how to change or edit profile setting and managed post in your timeline'
  },
  {
    icon: 'assets/svg/help-topics/post.svg',
    title: 'your post',
    desc: 'learn how to post your photos or album and how to tag or remove taged friends'
  },
  {
    icon: 'assets/svg/help-topics/message.svg',
    title: 'messanger',
    desc: 'learn how to delete message, hide message, change background color etc.'
  },
  {
    icon: 'assets/svg/help-topics/feed.svg',
    title: 'your feed',
    desc: 'learn how to manage your feed, how to hide post from timeline'
  },
  {
    icon: 'assets/svg/help-topics/security.svg',
    title: 'security',
    desc: 'learn how to secure your account and two step authentication'
  },
  {
    icon: 'assets/svg/help-topics/video.svg',
    title: 'live video',
    desc: 'learn how to do live video and how to save that video and share that video'
  },
]

export const footerRouter = [
  {
    title: 'my account',
    ul: [
      {
        path: '/profile/timeline',
        pages: 'timeline'
      },
      {
        path: '/company/about',
        pages: 'about'
      },
      {
        path: '/profile/friends',
        pages: 'friends'
      },
      {
        path: '/profile/gallery',
        pages: 'gallery'
      },
      {
        path: '/others/setting/home',
        pages: 'settings'
      }
    ]
  },
  {
    title: 'quick links',
    ul: [
      {
        path: '/others/setting/home',
        pages: 'settings'
      },
      {
        path: '/others/help-support',
        pages: 'help & support'
      },
      {
        path: '/others/messenger',
        pages: 'messenger'
      },
      {
        path: '/company/home',
        pages: 'pages'
      },
      {
        path: '/company/about',
        pages: 'company'
      }
    ]
  },
  {
    title: 'pages',
    ul: [
      {
        path: '/others/event-calendar',
        pages: 'event'
      },
      {
        path: '/others/birthday',
        pages: 'birthday'
      },
      {
        path: '/others/weather',
        pages: 'weather'
      },
      {
        path: '/others/music',
        pages: 'music'
      },
      {
        path: '/others/event-register',
        pages: 'register'
      }
    ]
  },
  {
    title: 'company',
    ul: [
      {
        path: '/profile/about',
        pages: 'about us'
      },
      {
        path: '/favorite/about',
        pages: 'blog'
      },
      {
        path: '/company/contact-us',
        pages: 'contact us'
      },
      {
        path: '/company/faq',
        pages: 'faq'
      },
      {
        path: '/company/career',
        pages: 'careers'
      }
    ]
  }
]

export const chatUser: chatsUser[] = [
  {
    id: 1,
    image: 'assets/images/user/2.jpg',
    user: 'Paul Molive',
    time: '2.40 PM',
    status: 'online',
    message: 'How are you ?'
  },
  {
    id: 2,
    image: 'assets/images/user/3.jpg',
    user: 'Anna Sthesia',
    time: '2.40 PM',
    status: 'online',
    message: 'i have arranged the meeting at 2.30',
    count: 4
  },
  {
    id: 3,
    image: 'assets/images/user/1.jpg',
    user: 'Petey Cruiser',
    time: '2.40 PM',
    status: 'online',
    message: 'i m waiting for your reply.'
  },
  {
    id: 4,
    image: 'assets/images/user/4.jpg',
    user: 'Anna Mull',
    time: '2.40 PM',
    status: 'online',
    message: 'sure you did!'
  },
  {
    id: 5,
    image: 'assets/images/user/5.jpg',
    user: 'Paige Turner',
    time: '2.40 PM',
    status: 'online',
    message: 'How are you ?'
  },
  {
    id: 6,
    image: 'assets/images/user/6.jpg',
    user: 'Bob Frapples',
    time: '2.40 PM',
    status: 'online',
    message: 'How are you ?'
  },
  {
    id: 7,
    image: 'assets/images/user/7.jpg',
    user: 'Paul Molive',
    time: '2.40 PM',
    status: 'online',
    message: 'How are you ?'
  },
  {
    id: 8,
    image: 'assets/images/user/8.jpg',
    user: 'Paul Molive',
    time: '2.40 PM',
    status: 'online',
    message: 'How are you ?'
  },
  {
    id: 9,
    image: 'assets/images/user/9.jpg',
    user: 'Paul Molive',
    time: '2.40 PM',
    status: 'online',
    message: 'How are you ?'
  },
  {
    id: 10,
    image: 'assets/images/user/10.jpg',
    user: 'Paul Molive',
    time: '2.40 PM',
    status: 'online',
    message: 'How are you ?'
  },
  {
    id: 11,
    image: 'assets/images/user/11.jpg',
    user: 'Paul Molive',
    time: '2.40 PM',
    status: 'online',
    message: 'How are you ?'
  },
  {
    id: 12,
    image: 'assets/images/user/12.jpg',
    user: 'Paul Molive',
    time: '2.40 PM',
    status: 'online',
    message: 'How are you ?'
  },
]

export const chat: chats[] = [
  {
    message: 'Well, I thought the main character’s situation was interesting, but his attitude toward women bothered me.'
  },
  {
    isReply: true,
    message: 'I can see that. It definitely seemed like he had some problems with women.'
  },
  {
    message: 'I would have liked to understand how that started. I mean, the book didn’t go into too much detail about why he felt that way.'
  },
  {
    isReply: true,
    message: 'I agree with that. I think the author could have handled that part better. I did enjoy the descriptions, though.'
  },
  {
    message: 'Oh yes, the writing was beautiful! That just made me more disappointed in the character.'
  },
  {
    isReply: true,
    message: 'Well, this is just my opinion, but maybe the character would have been easier to understand if the writing had been simpler. It seemed like the author spent a lot of time on the descriptions, when he could have spent more time on the character’s thoughts.'
  },
  {
    message: 'I’m not sure if I agree with that. I just think that the writing could have been more thoughtful while still being beautiful, if that makes sense.'
  }
]

export const socialMediaMessenger = [
  {
    id: 1,
    image: 'assets/images/post/2.jpg'
  },
  {
    id: 1,
    image: 'assets/images/post/4.jpg'
  },
  {
    id: 1,
    image: 'assets/images/post/11.jpg'
  },
]