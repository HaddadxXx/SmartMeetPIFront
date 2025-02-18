import { Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { ActivityFeedComponent } from "./activity-feed/activity-feed.component";
import { FriendsProfileComponent } from "./friends-profile/friends-profile.component";
import { FriendsComponent } from "./friends/friends.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { TabComponent } from "./tab/tab.component";
import { TimelineComponent } from "./timeline/timeline.component";

export default [
    {
        path: '',
        children: [
            {
                path: 'timeline',
                component: TimelineComponent,
            },
            {
                path: 'about',
                component: AboutComponent,
            },
            {
                path: 'friends',
                component: FriendsComponent,
            },
            {
                path: 'gallery',
                component: GalleryComponent,
            },{
                path: 'activity-feed',
                component: ActivityFeedComponent,
            },
            {
                path: 'tab',
                component: TabComponent,
            },
            {
                path: 'friend-profile',
                component: FriendsProfileComponent,
            },
        ]
    },
] as Routes;