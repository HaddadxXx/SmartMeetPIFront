import { Routes } from "@angular/router";

export const contentRoutes: Routes = [
    {
        path: 'news-feed-layout',
        loadChildren: () => import('../../component/news-feed-layout/news-feed-layout.routes')
    },
    {
        path: 'profile',
        loadChildren: () => import('../../component/profile-pages/profile-pages.routes')
    },
    {
        path: 'favorite',
        loadChildren: () => import('../../component/favorite-page/favorite-Page.routes')
    },
    {
        path: 'others',
        loadChildren: () => import('../../component/other-pages/other-pages.routes')
    },
]