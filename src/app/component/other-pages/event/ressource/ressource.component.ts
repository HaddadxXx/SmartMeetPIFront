// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { RessourceService } from '../../../../shared/services/ressource.service';
// import { EventSectionComponent } from '../../../../shared/components/common/event-section/event-section.component';
// import { CommonService } from '../../../../shared/services/common.service';
// import { EventSkeletonComponent } from "../../../../shared/skeleton-loader/others-pages-skeleton/event-skeleton/event-skeleton.component";
// import { FeatherComponent } from '../../../element-pages/icons/feather/feather.component';
// import { FeatherIconComponent } from "../../../../shared/components/common/feather-icon/feather-icon.component";

// @Component({
//   selector: 'app-ressource',
//   standalone: true,
//   imports: [CommonModule, FormsModule, EventSectionComponent, EventSkeletonComponent, FeatherComponent, FeatherIconComponent],
//   templateUrl: './ressource.component.html',
//   styleUrl: './ressource.component.scss'
// })
// export class RessourceComponent {
//   RessourceArray: any[] = [];
//   name: string = '';
//   typeR: string = '';
//   quantite: number = 0;
//   statutR: string = '';
//   currentRessourceID: string = "";
//   serverErrors: any = {};
//   //////////////////////////
//   showModall: boolean = false;
//   selectedRessourceId: string = '';
//   selectedSessionId: string = '';
//   sessionArray: any[] = [];


//   constructor(private ressourceService: RessourceService, public commonServices :CommonService) {
//     this.getAllRessources();
//   }

//   /**
//    * Enregistre ou met à jour une ressource
//    */
//   saveRess(): void {
//     this.serverErrors = {};

//    /* // Vérification des champs obligatoires
//     if (!this.name.trim() || !this.typeR.trim() || this.quantite <= 0 || !this.statutR.trim()) {
//       alert("Veuillez remplir tous les champs correctement !");
//       return;
//     }*/

//     if (this.currentRessourceID === '') {
//       this.register();
//     } else {
//       this.updateRess();
//     }
//   }

//   /**
//    * Création d'une nouvelle ressource
//    */
//   register(): void {
//     const bodyData = this.getRessourcePayload();

//     this.ressourceService.createRessource(bodyData).subscribe({
//       next: () => {
//         alert("Resource added successfully!");
//         this.refreshData();
//       },
//       error: (error) => this.handleError(error)
//     });
//   }

//   /**
//    * Récupère toutes les ressources
//    */
//   getAllRessources(): void {
//     this.ressourceService.getAllRessources().subscribe({
//       next: (data: any) => {
//         this.RessourceArray = data;
//       },
//       error: (error) => console.error("Error retrieving resources:", error)
//     });
//   }
  
//   /**
//    * Prépare la mise à jour d'une ressource
//    */
//   setUpdateRess(data: any): void {
//     this.name = data.name;
//     this.typeR = data.typeR;
//     this.quantite = data.quantite;
//     this.statutR = data.statutR;
//     this.currentRessourceID = data.id;
//   }

//   /**
//    * Mise à jour d'une ressource existante
//    */
//   updateRess(): void {
//     if (!this.currentRessourceID) {
//       alert("Error: No resource ID selected!");
//       return;
//     }

//     const bodyData = this.getRessourcePayload();

//     this.ressourceService.updateRessource(this.currentRessourceID, bodyData).subscribe({
//       next: () => {
//         alert("Resource updated successfully!");
//         this.refreshData();
//       },
//       error: (error) => this.handleError(error)
//     });
//   }

//   /**
//    * Suppression d'une ressource
//    */
//   setDeleteRess(data: any): void {
//     if (!confirm("Do you really want to delete this resource?")) {
//       return;
//     }

//     this.ressourceService.deleteRessource(data.id).subscribe({
//       next: () => {
//         alert("Resource deleted successfully !");
//         this.refreshData();
//       },
//       error: (error) => console.error("Error during deletion:", error)
//     });
//   }

//   /**
//    * Réinitialise le formulaire
//    */
//   resetForm(): void {
//     this.name = '';
//     this.typeR = '';
//     this.quantite = 0;
//     this.statutR = '';
//     this.currentRessourceID = '';
//     this.serverErrors = {};
//   }

//   /**
//    * Gère les erreurs du backend et met à jour `serverErrors`
//    */
//   private handleError(error: any): void {
//     console.error("Erreur:", error);
//     if (error.status === 400) {
//       this.serverErrors = error.error;
//     } else {
//       alert("An error occurred, please try again!");
//     }
//   }

//   /**
//    * Récupère l'objet ressource à envoyer à l'API
//    */
//   private getRessourcePayload(): any {
//     return {
//       name: this.name.trim(),
//       typeR: this.typeR.trim(),
//       quantite: this.quantite,
//       statutR: this.statutR.trim()
//     };
//   }

//   /**
//    * Rafraîchit la liste des ressources et réinitialise le formulaire
//    */
//   private refreshData(): void {
//     this.getAllRessources();
//     this.resetForm();
//   }

//   // Ouvrir la modal et charger les événements
//   // openAffectationModall(ressource: any) {
//   //   this.selectedRessourceId = ressource.id;
//   //   this.showModall = true;

//   //   this.ressourceService.getAllSessions().subscribe((resultData: any) => {
//   //     this.sessionArray = resultData;
//   //   });
//   // }
//   openAffectationModall(ressource: any) {
//     this.selectedRessourceId = ressource.id;
//     this.showModall = true;

//     this.ressourceService.getAllSessions().subscribe((resultData: any) => {
//       this.sessionArray = resultData.map((session: any) => ({
//         idSession: session.idSession, // Utiliser idSession
//         titre: session.titre,         // Utiliser titre
//         date: session.date           // Utiliser date
//       }));
//     });
//   }

//   // Fermer la modal
//   closeModall() {
//     this.showModall = false;
//     this.selectedRessourceId = '';
//     this.selectedSessionId = '';
//   }

//   // Affecter un transport à un événement
//   affecterRessource() {
//     if (!this.selectedRessourceId || !this.selectedSessionId) {
//       alert("Please select a session!");
//       return;
//     }

//     this.ressourceService.affecterRessource(this.selectedSessionId, this.selectedRessourceId)
//       .subscribe(
//         (resultData) => {
//           alert("Ressource successfully assigned!");
//           this.closeModall();
//         },
//         (error) => {
//           console.error("Error during assignment:", error);
//           alert("The ressource is already assigned to this session!");
//         }
//       );
//   }
// }import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RessourceService } from '../../../../shared/services/ressource.service';
import { EventSectionComponent } from '../../../../shared/components/common/event-section/event-section.component';
import { CommonService } from '../../../../shared/services/common.service';
import { EventSkeletonComponent } from "../../../../shared/skeleton-loader/others-pages-skeleton/event-skeleton/event-skeleton.component";
import { FeatherComponent } from '../../../element-pages/icons/feather/feather.component';
import { FeatherIconComponent } from "../../../../shared/components/common/feather-icon/feather-icon.component";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarEvent } from 'angular-calendar';
import { MonthViewDay } from 'calendar-utils';
import { isWithinInterval, parse, startOfDay, endOfDay } from 'date-fns';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import { Component, OnInit } from '@angular/core';

// Register Chart.js components for the pie chart
Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-ressource',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EventSectionComponent,
    EventSkeletonComponent,
    FeatherComponent,
    FeatherIconComponent,
    CalendarModule,
    BaseChartDirective
  ],
  templateUrl: './ressource.component.html',
  styleUrl: './ressource.component.scss'
})
export class RessourceComponent implements OnInit {
  RessourceArray: any[] = [];
  filteredRessourceArray: any[] = [];
  paginatedRessourceArray: any[] = [];
  name: string = '';
  typeR: string = '';
  quantite: number = 0;
  statutR: string = '';
  currentRessourceID: string = '';
  serverErrors: any = {};
  showModall: boolean = false;
  selectedRessourceId: string = '';
  selectedSessionId: string = '';
  sessionArray: any[] = [];
  viewDate: Date = new Date();
  calendarEvents: CalendarEvent[] = [];
  selectedRessourceForCalendar: any = null;
  filterStatus: string = '';
  filterType: string = '';
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  stats: { available: number; reserved: number } = { available: 0, reserved: 0 };

  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  // Pie chart configuration
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Resource Status Distribution' },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = this.stats.available + this.stats.reserved;
            const value = context.raw as number;
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${context.label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartConfiguration['data'] = {
    labels: ['Available', 'Reserved'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#28a745', '#dc3545'],
      hoverBackgroundColor: ['#218838', '#c82333']
    }]
  };

  constructor(
    private ressourceService: RessourceService,
    public commonServices: CommonService
  ) {
    this.getAllRessources();
  }

  ngOnInit(): void {}

  saveRess(): void {
    this.serverErrors = {};

    if (this.currentRessourceID === '') {
      this.register();
    } else {
      this.updateRess();
    }
  }

  register(): void {
    const bodyData = this.getRessourcePayload();
    this.ressourceService.createRessource(bodyData).subscribe({
      next: () => {
        alert('Resource added successfully!');
        this.refreshData();
      },
      error: (error) => this.handleError(error)
    });
  }

  getAllRessources(): void {
    this.ressourceService.getAllRessources().subscribe({
      next: (data: any) => {
        this.RessourceArray = data;
        this.calculateStats();
        this.applyFiltersAndSort();
        if (this.selectedRessourceForCalendar) {
          this.loadCalendarEvents(this.selectedRessourceForCalendar);
        }
      },
      error: (error) => console.error('Error retrieving resources:', error)
    });
  }

  setUpdateRess(data: any): void {
    this.name = data.name;
    this.typeR = data.typeR;
    this.quantite = data.quantite;
    this.statutR = data.statutR;
    this.currentRessourceID = data.id;
  }

  updateRess(): void {
    if (!this.currentRessourceID) {
      alert('Error: No resource ID selected!');
      return;
    }

    const bodyData = this.getRessourcePayload();
    this.ressourceService.updateRessource(this.currentRessourceID, bodyData).subscribe({
      next: () => {
        alert('Resource updated successfully!');
        this.refreshData();
      },
      error: (error) => this.handleError(error)
    });
  }

  setDeleteRess(data: any): void {
    if (!confirm('Do you really want to delete this resource?')) {
      return;
    }

    this.ressourceService.deleteRessource(data.id).subscribe({
      next: () => {
        alert('Resource deleted successfully!');
        this.refreshData();
      },
      error: (error) => console.error('Error during deletion:', error)
    });
  }

  resetForm(): void {
    this.name = '';
    this.typeR = '';
    this.quantite = 0;
    this.statutR = '';
    this.currentRessourceID = '';
    this.serverErrors = {};
  }

  private handleError(error: any): void {
    console.error('Erreur:', error);
    if (error.status === 400) {
      this.serverErrors = error.error;
    } else {
      alert('An error occurred, please try again!');
    }
  }

  private getRessourcePayload(): any {
    return {
      name: this.name.trim(),
      typeR: this.typeR.trim(),
      quantite: this.quantite,
      statutR: this.statutR.trim()
    };
  }

  private refreshData(): void {
    this.getAllRessources();
    this.resetForm();
  }

  // Calendar Integration
  showCalendar(ressource: any): void {
    this.selectedRessourceForCalendar = ressource;
    this.loadCalendarEvents(ressource);
  }

  loadCalendarEvents(ressource: any): void {
    this.ressourceService.getAssignments(ressource.id).subscribe({
      next: (assignments: any[]) => {
        this.calendarEvents = assignments.map((assignment: any) => {
          const start = parse(assignment.date, 'yyyy-MM-dd', new Date());
          const end = parse(assignment.date, 'yyyy-MM-dd', new Date());
          return {
            start,
            end,
            title: `Assigned to ${assignment.titre}`,
            color: { primary: '#1e90ff', secondary: '#D1E8FF' },
            allDay: true
          } as CalendarEvent & { end: Date };
        });
      },
      error: (error) => console.error('Error fetching assignments:', error)
    });
  }

  dayClicked({ day }: { day: MonthViewDay<any> }): void {
    const date = day.date;
    const hasEvent = this.calendarEvents.some(event =>
      isWithinInterval(date, {
        start: startOfDay(event.start),
        end: endOfDay(event.end as Date)
      })
    );
    if (hasEvent) {
      const event = this.calendarEvents.find(event =>
        isWithinInterval(date, {
          start: startOfDay(event.start),
          end: endOfDay(event.end as Date)
        })
      );
      if (event && event.end) {
        alert(`Resource is assigned to "${event.title}" on ${event.start.toISOString().split('T')[0]}.`);
      } else {
        alert('Resource is assigned, but date range is unavailable.');
      }
    } else {
      alert('Resource is available on this day.');
    }
  }

  openAffectationModall(ressource: any) {
    this.selectedRessourceId = ressource.id;
    this.showModall = true;

    this.ressourceService.getAllSessions().subscribe((resultData: any) => {
      this.sessionArray = resultData.map((session: any) => ({
        idSession: session.idSession,
        titre: session.titre,
        date: session.date
      }));
    });
  }

  closeModall() {
    this.showModall = false;
    this.selectedRessourceId = '';
    this.selectedSessionId = '';
  }

  affecterRessource() {
    if (!this.selectedRessourceId || !this.selectedSessionId) {
      alert('Please select a session!');
      return;
    }

    const selectedSession = this.sessionArray.find(session => session.idSession === this.selectedSessionId);
    if (!selectedSession) {
      alert('Selected session not found!');
      return;
    }

    this.ressourceService.affecterRessource(this.selectedSessionId, this.selectedRessourceId).subscribe({
      next: () => {
        alert(`Resource successfully assigned to "${selectedSession.titre}"! Its status has been updated to Reserved.`);
        this.closeModall();
        this.refreshData();
      },
      error: (error) => {
        console.error('Error during assignment:', error);
        if (error.status === 400 && error.error === 'ALREADY_ASSIGNED') {
          alert('The resource is already assigned to this session!');
        } else {
          alert('Error during assignment. Please try again.');
        }
      }
    });
  }

  // Filtering and Sorting
  applyFiltersAndSort(): void {
    let filteredArray = [...this.RessourceArray];

    if (this.filterStatus) {
      filteredArray = filteredArray.filter(resource => resource.statutR === this.filterStatus);
    }
    if (this.filterType) {
      filteredArray = filteredArray.filter(resource =>
        resource.typeR.toLowerCase().includes(this.filterType.toLowerCase())
      );
    }

    if (this.sortField) {
      filteredArray.sort((a, b) => {
        const valueA = a[this.sortField];
        const valueB = b[this.sortField];
        const direction = this.sortDirection === 'asc' ? 1 : -1;

        if (typeof valueA === 'string') {
          return valueA.localeCompare(valueB) * direction;
        }
        return (valueA - valueB) * direction;
      });
    }

    this.filteredRessourceArray = filteredArray;
    this.updatePagination();
  }

  sortBy(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applyFiltersAndSort();
  }

  // Statistics
  private calculateStats(): void {
    const available = this.RessourceArray.filter(resource => resource.statutR === 'Available').length;
    const reserved = this.RessourceArray.filter(resource => resource.statutR === 'Reserved').length;
    this.stats = { available, reserved };
    this.pieChartData.datasets[0].data = [available || 0.1, reserved || 0.1];
  }

  // Pagination
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredRessourceArray.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedRessourceArray = this.filteredRessourceArray.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }
}