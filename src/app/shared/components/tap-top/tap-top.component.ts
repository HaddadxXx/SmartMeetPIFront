import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-tap-top',
  standalone: true,
  imports: [],
  templateUrl: './tap-top.component.html',
  styleUrl: './tap-top.component.scss'
})

export class TapTopComponent {

   public isShow : boolean = false;
   constructor(private viewScroller: ViewportScroller) {}
 
   // @HostListener Decorator
   @HostListener("window:scroll", [])
   onWindowScroll() {
     let number =
       window.pageYOffset ||
       document.documentElement.scrollTop ||
       document.body.scrollTop ||
       0;
     if (number > 600) {
       this.isShow = true;
     } else {
       this.isShow = false;
     }
   }
 
   tapToTop() {
     this.viewScroller.scrollToPosition([0, 0]);
   }
}
