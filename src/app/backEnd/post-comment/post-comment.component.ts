import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostService } from '../../shared/services/news-feed-layout/post.service';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  @ViewChild('chart', { static: true }) chartElement!: ElementRef;
  private chart!: ApexCharts;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    const options = {
      chart: {
        type: 'bar',  // Graphique en barres
        height: 350,
        toolbar: { show: false }  // Désactiver la barre d'outils
      },
      plotOptions: {
        bar: {
          horizontal: false,  // Affichage des barres verticales
          endingShape: 'rounded',
        }
      },
      series: [{
        name: 'Nombre de posts',
        data: []  // Valeur initiale vide ou 0
      }],
      xaxis: {
        categories: [],  // Liste des dates
        title: {
          text: 'Dates',  // Légende de l'axe X
        },
      },
      yaxis: {
        title: {
          text: 'Nombre de posts',  // Légende de l'axe Y
        },
      },
      dataLabels: {
        enabled: true,  // Afficher les valeurs sur les barres
      },
      title: {
        text: 'Nombre de posts par jour',
        align: 'center',
      },
    };

    // Initialisation et rendu du graphique
    this.chart = new ApexCharts(this.chartElement.nativeElement, options);
    this.chart.render();

    // Appeler le service pour obtenir le nombre de posts par jour
    this.postService.getPostsCountPerDay().subscribe({
      next: (data) => {
        const dates = data.map(item => item.date);
        const counts = data.map(item => item.count);

        // Mettre à jour les options du graphique
        this.chart.updateOptions({
          xaxis: {
            categories: dates,  // Mettre à jour les catégories (dates)
          },
        });

        // Mettre à jour la série avec les données (comptage des posts)
        this.chart.updateSeries([{
          name: 'Nombre de posts',
          data: counts,  // Valeurs à afficher (nombre de posts)
        }]);
      },
      error: (err) => console.error('Erreur récupération des posts par jour', err),
    });
  }

  ngOnDestroy(): void {
    // Détruire le graphique lorsque le composant est détruit
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
