import { Routes } from "@angular/router";
import { ButtonsComponent } from "./buttons/buttons.component";
import { CalenderComponent } from "./calender/calender.component";
import { IconsComponent } from "./icons/icons.component";
import { MapsComponent } from "./maps/maps.component";
import { ModalComponent } from "./modal/modal.component";
import { SidebarWidgetsComponent } from "./sidebar-widgets/sidebar-widgets.component";
import { TypographyComponent } from "./typography/typography.component";

export default [
    {
        path: '',
        children: [
            {
                path: 'typography',
                component: TypographyComponent,
            },
            {
                path: 'sidebar-widgets',
                component: SidebarWidgetsComponent,
            },
            {
                path: 'calender',
                component: CalenderComponent,
            },
            {
                path: 'maps',
                component: MapsComponent,
            },{
                path: 'icons',
                component: IconsComponent,
            },
            {
                path: 'modal',
                component: ModalComponent,
            },
            {
                path: 'buttons',
                component: ButtonsComponent,
            },
        ]
    },
] as Routes;