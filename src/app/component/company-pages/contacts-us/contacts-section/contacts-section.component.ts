import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SponsoringOfferService } from 'c:/Users/acer/Desktop/SmartMeetPIFront-main (2)/SmartMeetPIFront-main/src/app/shared/services/sponsoring-offer.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'c:/Users/acer/Desktop/SmartMeetPIFront-main (2)/SmartMeetPIFront-main/src/app/shared/services/auth.service';
import {  BaseChartDirective } from 'ng2-charts';
import { registerables } from 'chart.js';
import { Chart } from 'chart.js';

import { OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ChartOptions } from 'chart.js';
@Component({
  selector: 'app-contacts-section',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './contacts-section.component.html',
  styleUrl: './contacts-section.component.scss'
})
export class ContactsSectionComponent implements OnInit {
  statistics: { sponsored: number, nonSponsored: number } | null = null;

  // Configuration du graphique
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Distribution of offers' }
    }
  };

  public chartData: ChartConfiguration['data'] = {
    labels: ['Assigned offers', 'Unassigned offers'],
    datasets: [{
      data: [0, 0],
      backgroundColor: [
        '#1877f2', // Bleu Friendbook primaire
        '#e4e6eb'   // Gris pour éléments secondaires
      ],
      hoverBackgroundColor: [
        '#166fe5', // Variation bleu foncé au survol
        '#d8dade'   // Variation gris foncé au survol
      ],
      borderColor: '#ffffff', // Bordure blanche pour séparation
    }]
  };

  constructor(private http: HttpClient) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getStatistics();
  }

  private getStatistics(): void {
    this.http.get<{ sponsored: number; nonSponsored: number }>('http://localhost:8084/api/offers/statistics')
      .subscribe({
        next: (data) => {
          this.statistics = data;
          this.chartData.datasets[0].data = [data.sponsored, data.nonSponsored];
        },
        error: (error) => {
          console.error("Erreur de récupération des statistiques :", error);
          this.statistics = null;
        }
      });
  }
}

// Register Chart.js components
const { register } = Chart;
Chart.register(...registerables);