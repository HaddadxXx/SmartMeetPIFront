import { Routes } from "@angular/router";
import { HelpArticleComponent } from "../../component/other-pages/help-article/help-article.component";
import { HelpSupportComponent } from "../../component/other-pages/help-support/help-support.component";
import { LoginComponent } from "../../component/other-pages/login/login.component";
import { MessengerComponent } from "../../component/other-pages/messenger/messenger.component";
import { RegisterComponent } from "../../component/other-pages/register/register.component";
import { SettingComponent } from "../../component/other-pages/setting/setting.component";

export const fullRoutes: Routes = [
    {
        path: 'others/login',
        component: LoginComponent,
    },
    {
        path: 'others/register',
        component: RegisterComponent,
    },
    {
        path: 'others/help-support',
        component: HelpSupportComponent,
    },
    {
        path: 'others/messenger',
        component: MessengerComponent,
    },
    {
        path: 'others/setting',
        component: SettingComponent,
    },
    {
        path: 'others/help-article',
        component: HelpArticleComponent,
    },
    {
        path: 'others/setting',
        loadChildren: () => import('../../component/other-pages/setting/setting.routes')
    },
    {
        path: 'company',
        loadChildren: () => import('../../component/company-pages/company-pages.routes')
    },
    {
        path: 'element',
        loadChildren: () => import('../../component/element-pages/element-pages.routes')
    },
]