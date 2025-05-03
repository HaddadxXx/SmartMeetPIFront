import { Routes } from "@angular/router";
import { FavoriteAboutComponent } from "./favorite-about/favorite-about.component";
import { FavoritePhotosComponent } from "./favorite-photos/favorite-photos.component";
import { PageHomeComponent } from "./page-home/page-home.component";
import { PageListingComponent } from "./page-listing/page-listing.component";
import { ReviewComponent } from "./review/review.component";
import { GroupListingComponent } from "./group-listing/group-listing.component";

export default [
    {
        path: '',
        children: [
            {
                path: 'page-listing',
                component: PageListingComponent,
            },
            {
                path: 'group-listing',
                component: GroupListingComponent,
            },
            {
                path: 'page-home',
                component: PageHomeComponent,
            },
            {
                path: 'page-home/:groupId',
                component: PageHomeComponent,
            },
            {
                path: 'tab/:groupId',
                component: PageHomeComponent,
            },
            {
                path: 'about/:groupId',
                component: FavoriteAboutComponent,
            },{
                path: 'review/:groupId',
                component: ReviewComponent,
            },
            {
                path: 'gallery/:groupId',
                component: FavoritePhotosComponent,
            },
           
        ]
    },
] as Routes;