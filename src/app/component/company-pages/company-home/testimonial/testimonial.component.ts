import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss'
})

export class TestimonialComponent {

  public reviews = [
    {
      image: 'assets/images/user-sm/1.jpg'
    },
    {
      image: 'assets/images/user-sm/2.jpg'
    },
    {
      image: 'assets/images/user-sm/3.jpg'
    },
    {
      image: 'assets/images/user-sm/4.jpg'
    },
    {
      image: 'assets/images/user-sm/5.jpg'
    },
    {
      image: 'assets/images/user-sm/6.jpg'
    },
  ]

  public countStatus = [
    {
      title:'1M+',
      subTitle : 'total users'
    },
    {
      title:'50+',
      subTitle : 'unique features'
    },
    {
      title:'10K+',
      subTitle : 'user reviews'
    },
  ]

}
