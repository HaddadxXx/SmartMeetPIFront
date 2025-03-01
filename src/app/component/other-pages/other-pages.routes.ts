import { Routes } from "@angular/router";
import { BirthdayComponent } from "./birthday/birthday.component";
import { EventComponent } from "./event/event.component";
import { GamesComponent } from "./games/games.component";
import { MusicComponent } from "./music/music.component";
import { WeatherComponent } from "./weather/weather.component";
import { AddEventComponent } from "./event/add-event/add-event.component";

export default [
    {
        path: '',
        children: [
           
            {
                path: 'event-calendar',
                component: EventComponent
            },
            
            {
                path: 'birthday',
                 component : BirthdayComponent
            },
            {
                path: 'weather',
                component:WeatherComponent
            },
            {
                path: 'music',
                component: MusicComponent
            },
            {
                path: 'games',
                component : GamesComponent
            },
            {
                path : 'add-event',
                component : AddEventComponent
            },
        ]
    },
] as Routes;