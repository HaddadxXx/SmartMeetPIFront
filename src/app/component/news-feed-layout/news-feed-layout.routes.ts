import { Routes } from "@angular/router";
import { Style1Component } from "./style-1/style-1.component";
import { Style10Component } from "./style-10/style-10.component";
import { Style11Component } from "./style-11/style-11.component";
import { Style12Component } from "./style-12/style-12.component";
import { Style2Component } from "./style-2/style-2.component";
import { Style3Component } from "./style-3/style-3.component";
import { Style4Component } from "./style-4/style-4.component";
import { Style5Component } from "./style-5/style-5.component";
import { Style6Component } from "./style-6/style-6.component";
import { Style7Component } from "./style-7/style-7.component";
import { Style8Component } from "./style-8/style-8.component";
import { Style9Component } from "./style-9/style-9.component";

export default [
    {
        path: '',
        children: [
            {
                path: 'style-1',
                component: Style1Component,
            },
            {
                path: 'style-2',
                component: Style2Component,
            },
            {
                path: 'style-3',
                component: Style3Component,
            },
            {
                path: 'style-4',
                component: Style4Component,
            },{
                path: 'style-5',
                component: Style5Component,
            },
            {
                path: 'style-6',
                component: Style6Component,
            },
            {
                path: 'style-7',
                component: Style7Component,
            },
            {
                path: 'style-8',
                component: Style8Component,
            },
            {
                path: 'style-9',
                component: Style9Component,
            },
            {
                path: 'style-10',
                component: Style10Component,
            },
            {
                path: 'style-11',
                component: Style11Component,
            },
            {
                path: 'style-12',
                component: Style12Component,
            },
        ]
    },

] as Routes;