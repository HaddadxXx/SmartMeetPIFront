import { Routes } from "@angular/router";
import { BirthdayComponent } from "./birthday/birthday.component";
import { EventComponent } from "./event/event.component";
import { GamesComponent } from "./games/games.component";
import { MusicComponent } from "./music/music.component";
import { WeatherComponent } from "./weather/weather.component";

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
        ]
    },
] as Routes;