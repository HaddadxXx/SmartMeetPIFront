
import { Routes } from "@angular/router";
import { CareerDetailComponent } from "./career-detail/career-detail.component";
import { ComingSoonComponent } from "./coming-soon/coming-soon.component";
import { CompanyAboutComponent } from "./company-about/company-about.component";
import { CompanyBlogDetailsComponent } from "./company-blog-details/company-blog-details.component";
import { CompanyBlogComponent } from "./company-blog/company-blog.component";
import { CompanyCareerComponent } from "./company-career/company-career.component";
import { CompanyFAQComponent } from "./company-faq/company-faq.component";
import { CompanyHomeComponent } from "./company-home/company-home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ContactsUsComponent } from "./contacts-us/contacts-us.component";

export default [
    {
        path: '',
        children: [
            {
                path: 'home',
                component: CompanyHomeComponent
            },
            {
                path: 'about',
                 component : CompanyAboutComponent
            },
            {
                path: 'blog',
                component:CompanyBlogComponent
            },
            {
                path: 'blog-details',
                component: CompanyBlogDetailsComponent
            },
            {
                path: 'faq',
                component : CompanyFAQComponent
            },
            {
                path: 'career',
                 component : CompanyCareerComponent
            },
            {
                path: 'career-details',
                component:CareerDetailComponent
            },
            {
                path: 'contact-us',
                component:ContactsUsComponent
            },
            {
                path: 'coming-soon',
                component: ComingSoonComponent
            },
            {
                path: '404',
                component : NotFoundComponent
            },
        ]
    },
] as Routes;