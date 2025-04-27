
export interface chats {
  message: string,
  isReply?: boolean
}

export interface chatsUser {
  id : string;
  profilePicture: string;
  email: string;
  firstName : string ;
  lastName : string ;
  expertiseArea : string;
  interests : string ;
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