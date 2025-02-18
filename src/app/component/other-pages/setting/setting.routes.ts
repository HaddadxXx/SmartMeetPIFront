import { Routes } from "@angular/router";
import { SettingHomeComponent } from "./setting-home/setting-home.component";
import { SettingComponent } from "./setting.component";
import { SettingPersonalNotificationComponent } from "./setting-personal-notification/setting-setting-personal-notification.component";
import { SettingPersonalAccountComponent } from "./setting-personal-account/setting-personal-account.component";
import { SettingPersonalPrivacyComponent } from "./setting-personal-privacy/setting-personal-privacy.component";
import { SettingPersonalStoryComponent } from "./setting-personal-story/setting-personal-story.component";
import { HelpSupportComponent } from "../help-support/help-support.component";

export default [
    {
        path: '',
        component: SettingComponent,
        children: [
            {
                path: 'home',
                component: SettingHomeComponent
            },
            {
                path: 'personal-info',
                component: SettingPersonalNotificationComponent
            },
            {
                path: 'account',
                component: SettingPersonalAccountComponent
            },
            {
                path: 'privacy',
                component: SettingPersonalPrivacyComponent
            },
            {
                path: 'notifications',
                component: SettingPersonalNotificationComponent
            },
            {
                path: 'story',
                component: SettingPersonalStoryComponent
            },
            {
                path: 'help-support',
                component: HelpSupportComponent
            },
        ]
    },
] as Routes;