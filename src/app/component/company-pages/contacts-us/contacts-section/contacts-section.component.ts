import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-contacts-section',
  standalone: true,
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './contacts-section.component.html',
  styleUrl: './contacts-section.component.scss'
})
export class ContactsSectionComponent {
  statistics: { sponsored: number, nonSponsored: number } | null = null;
  
  public chartOptions: any = {
    series: [0, 0],
    chart: {
      type: 'donut',
      height: 350
    },
    labels: ['Assigned offers', 'Unassigned offers'],
    colors: ['#1877f2', '#e4e6eb'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    legend: {
      position: 'top'
    },
    title: {
      text: 'Distribution of offers',
      align: 'center',
      style: {
        fontSize: '16px'
      }
    }
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getStatistics();
  }

  private getStatistics(): void {
    this.http.get<{ sponsored: number; nonSponsored: number }>('http://localhost:8889/api/offers/statistics')
      .subscribe({
        next: (data) => {
          this.statistics = data;
          this.chartOptions.series = [data.sponsored, data.nonSponsored];
          // Créer un nouvel objet pour forcer la détection des changements
          this.chartOptions = {...this.chartOptions};
        },
        error: (error) => {
          console.error("Erreur de récupération des statistiques :", error);
          this.statistics = null;
        }
      });
  }
}