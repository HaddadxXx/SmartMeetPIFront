import { hobbyInterest } from "../../interface/single-page"

export interface data {
   title: string,
   value?: string,
   image?: string
}

export interface pageListingImg {
   image: string;
}
export const profile: data[] = [
   {
      title: 'follow',
      value: '56'
   },
   {
      title: 'follower',
      value: '954'
   },
   {
      title: 'likes',
      value: '968'
   },
   {
      title: 'post',
      value: '036'
   },
   {
      title: 'Usa',
      image: 'assets/images/flag.jpg'
   },
]

export const socialMediaFavorite = [
   {
      media: 'facebook',
      svgIcon: 'facebook',
      class: 'facebook'
   },
   {
      media: 'twitter',
      svgIcon: 'twitter',
      class: 'twitter'
   },
   {
      media: 'whatsapp',
      svgIcon: 'whatsapp',
      class: 'whatsapp'
   },
   {
      media: 'instagram',
      svgIcon: 'instagram',
      class: 'instagram'
   },
   {
      media: 'youtube',
      svgIcon: 'youtube',
      class: 'youtube'
   },
]

export const pageListing : pageListingImg[]= [
   {
      image: 'assets/images/cover/9.jpg'
   },
   {
      image: 'assets/images/cover/10.jpg'
   },
   {
      image: 'assets/images/cover/11.jpg'
   },
   {
      image: 'assets/images/cover/12.jpg'
   },
   {
      image: 'assets/images/cover/13.jpg'
   },
   {
      image: 'assets/images/cover/14.jpg'
   },
   {
      image: 'assets/images/cover/15.jpg'
   },
]



export const review = [
   {
      rating: 5,
      width: '75%',
      title: "stars"
   },
   {
      rating: 4,
      width: '70%',
      title: "star"
   },
   {
      rating: 3,
      width: '55%',
      title: "star"
   },
   {
      rating: 2,
      width: '30%',
      title: "star"
   },
   {
      rating: 1,
      width: '10%',
      title: "star"
   },
]

export const hobbyInterestSingle: hobbyInterest[] = [
   {
      title: 'Hobbies & Interest',
      value: [
         {
            title: "overview",
            content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia consequuntur voluptate, autem asperiores facilis ea voluptatibus nisi deleniti repudiandae! Ut autem facere eius sed quis quidem explicabo assumenda placeat voluptatem."
         },
         {
            title: "Mission",
            content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia consequuntur voluptate, autem asperiores facilis ea voluptatibus nisi deleniti repudiandae! Ut autem facere eius sed quis quidem explicabo assumenda placeat voluptatem."
         },
         {
            title: "Timings",
            content: "Mon to Sat: 8 to 10"
         },
         {
            title: "Service",
            content: "learn all types of dance"
         },
         {
            title: "Website",
            content: "danceacadamy.com"
         },
         {
            title: "Started",
            content: "june 20, 2010"
         },
         {
            title: "Email",
            content: "billyerds&#64;gmail.com"
         },
         {
            title: "Phone No",
            content: "041 985 245 210"
         }
      ]
   }
]
