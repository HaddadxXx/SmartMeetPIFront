import { Routes } from "@angular/router";
import { FavoriteAboutComponent } from "./favorite-about/favorite-about.component";
import { FavoritePhotosComponent } from "./favorite-photos/favorite-photos.component";
import { PageHomeComponent } from "./page-home/page-home.component";
import { PageListingComponent } from "./page-listing/page-listing.component";
import { ReviewComponent } from "./review/review.component";

export default [
    {
        path: '',
        children: [
            {
                path: 'page-listing',
                component: PageListingComponent,
            },
            {
                path: 'page-home',
                component: PageHomeComponent,
            },
            {
                path: 'tab',
                component: PageHomeComponent,
            },
            {
                path: 'about',
                component: FavoriteAboutComponent,
            },{
                path: 'review',
                component: ReviewComponent,
            },
            {
                path: 'gallery',
                component: FavoritePhotosComponent,
            },
           
        ]
    },
] as Routes;