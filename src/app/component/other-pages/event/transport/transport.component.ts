// import { Component, OnInit } from '@angular/core';
// import { TransportService } from '../../../../shared/services/transport.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { EventSkeletonComponent } from "../../../../shared/skeleton-loader/others-pages-skeleton/event-skeleton/event-skeleton.component";
// import { FeatherIconComponent } from "../../../../shared/components/common/feather-icon/feather-icon.component";
// import { CommonService } from '../../../../shared/services/common.service';
// import { CalendarModule, DateAdapter } from 'angular-calendar';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// import { CalendarEvent } from 'angular-calendar';
// import { MonthViewDay } from 'calendar-utils';import { isSameDay, parse } from 'date-fns';
// import { ChartConfiguration, ChartType } from 'chart.js'; // Import Chart.js types
// import { BaseChartDirective } from 'ng2-charts'; // Import the standalone BaseChartDirective
// import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

// // Register the required Chart.js components
// Chart.register(PieController, ArcElement, Tooltip, Legend);
// @Component({
//   selector: 'app-transport',
//   standalone: true,
//   imports: [CommonModule, FormsModule, EventSkeletonComponent, FeatherIconComponent, CalendarModule, BaseChartDirective], // Add NgChartsModule
//   templateUrl: './transport.component.html',
//   styleUrl: './transport.component.scss'
// })
// export class TransportComponent implements OnInit {
//   TransportArray: any[] = [];
//   filteredTransportArray: any[] = [];
//   type: string = '';
//   capacite: number = 0;
//   statut: string = '';
//   currentTransportID: string = '';
//   serverErrors: any = {};
//   showModal: boolean = false;
//   selectedTransportId: string = '';
//   selectedEventId: string = '';
//   eventArray: any[] = [];
//   viewDate: Date = new Date();
//   calendarEvents: CalendarEvent[] = [];
//   selectedTransportForCalendar: any = null;
//   filterStatus: string = '';
//   filterType: string = '';
//   sortField: string = '';
//   sortDirection: 'asc' | 'desc' = 'asc';
//   stats: { available: number; reserved: number } = { available: 0, reserved: 0 };

//   // Chart configuration
//   public pieChartOptions: ChartConfiguration['options'] = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Transport Status Distribution'
//       }
//     }
//   };
//   public pieChartType: ChartType = 'pie';
//   public pieChartData: ChartConfiguration['data'] = {
//     labels: ['Available', 'Reserved'],
//     datasets: [{
//       data: [0, 0], // Will be updated in calculateStats
//       backgroundColor: ['#28a745', '#dc3545'], // Green for Available, Red for Reserved
//       hoverBackgroundColor: ['#218838', '#c82333']
//     }]
//   };

//   constructor(private transportService: TransportService, public commonServices: CommonService) {
//     this.getAllTransport();
//   }

//   ngOnInit(): void {}

//   saveTransport(): void {
//     this.serverErrors = {};

//     if (this.currentTransportID === '') {
//       this.register();
//     } else {
//       this.updateTransport();
//     }
//   }

//   register(): void {
//     const bodyData = this.getTransportPayload();

//     this.transportService.createTransport(bodyData).subscribe({
//       next: () => {
//         alert("Transport added successfully!");
//         this.refreshData();
//       },
//       error: (error) => this.handleError(error)
//     });
//   }

//   getAllTransport(): void {
//     this.transportService.getAllTransports().subscribe({
//       next: (data: any) => {
//         this.TransportArray = data;
//         this.calculateStats();
//         this.applyFiltersAndSort();
//         if (this.selectedTransportForCalendar) {
//           this.loadCalendarEvents(this.selectedTransportForCalendar);
//         }
//       },
//       error: (error) => console.error("Error while retrieving transports:", error)
//     });
//   }

//   setUpdateTransport(data: any): void {
//     this.type = data.type;
//     this.capacite = data.capacite;
//     this.statut = data.statut;
//     this.currentTransportID = data.id;
//   }

//   updateTransport(): void {
//     if (!this.currentTransportID) {
//       alert("Error: No transport ID selected!");
//       return;
//     }

//     const bodyData = this.getTransportPayload();

//     this.transportService.updateTransport(this.currentTransportID, bodyData).subscribe({
//       next: () => {
//         alert("Transport updated successfully!");
//         this.refreshData();
//       },
//       error: (error) => this.handleError(error)
//     });
//   }

//   setDeleteTransport(data: any): void {
//     if (!confirm("Do you really want to delete this transport?")) {
//       return;
//     }

//     this.transportService.deleteTransport(data.id).subscribe({
//       next: () => {
//         alert("Transport deleted successfully!");
//         this.refreshData();
//       },
//       error: (error) => console.error("Error during deletion:", error)
//     });
//   }

//   resetForm(): void {
//     this.type = '';
//     this.capacite = 0;
//     this.statut = '';
//     this.currentTransportID = '';
//     this.serverErrors = {};
//   }

//   private handleError(error: any): void {
//     console.error("Erreur:", error);
//     if (error.status === 400) {
//       this.serverErrors = error.error;
//     } else {
//       alert("An error occurred, please try again!");
//     }
//   }

//   private getTransportPayload(): any {
//     return {
//       type: this.type.trim(),
//       capacite: this.capacite,
//       statut: this.statut.trim()
//     };
//   }

//   private refreshData(): void {
//     this.getAllTransport();
//     this.resetForm();
//   }

//   showCalendar(transport: any): void {
//     this.selectedTransportForCalendar = transport;
//     this.loadCalendarEvents(transport);
//   }

//   loadCalendarEvents(transport: any): void {
//     this.transportService.getAssignments(transport.id).subscribe({
//       next: (assignments: any[]) => {
//         this.calendarEvents = assignments.map((assignment: any) => ({
//           start: parse(assignment.assignmentDate, 'yyyy-MM-dd', new Date()),
//           title: `Assigned to ${assignment.event.name}`,
//           color: { primary: '#1e90ff', secondary: '#D1E8FF' },
//           allDay: true
//         }));
//       },
//       error: (error) => console.error("Error fetching assignments:", error)
//     });
//   }

//   dayClicked({ day }: { day: MonthViewDay<any> }): void {
//     const date = day.date;
//     const hasEvent = this.calendarEvents.some(event => isSameDay(event.start, date));
//     if (hasEvent) {
//       const event = this.calendarEvents.find(event => isSameDay(event.start, date));
//       alert(`Transport is assigned to "${event?.title}" on this day.`);
//     } else {
//       alert('Transport is available on this day.');
//     }
//   }

//   openAffectationModal(transport: any) {
//     this.selectedTransportId = transport.id;
//     this.showModal = true;

//     this.transportService.getAllEvents().subscribe((resultData: any) => {
//       this.eventArray = resultData;
//     });
//   }

//   closeModal() {
//     this.showModal = false;
//     this.selectedTransportId = '';
//     this.selectedEventId = '';
//   }

//   affecterTransport() {
//     if (!this.selectedTransportId || !this.selectedEventId) {
//       alert("Please select an event!");
//       return;
//     }

//     const selectedEvent = this.eventArray.find(event => event.id === this.selectedEventId);
//     if (!selectedEvent) {
//       alert("Selected event not found!");
//       return;
//     }

//     this.transportService.checkAvailability(this.selectedTransportId, selectedEvent.dateE).subscribe({
//       next: (isAvailable: boolean) => {
//         if (!isAvailable) {
//           alert("This transport is already assigned to another event on this date!");
//           return;
//         }

//         this.transportService.affecterTransport(this.selectedEventId, this.selectedTransportId).subscribe({
//           next: (result) => {
//             alert(`Transport successfully assigned to "${selectedEvent.name}"! Its status has been updated to Reserved.`);
//             this.closeModal();
//             this.refreshData();
//           },
//           error: (error) => {
//             console.error("Error during assignment:", error);
//             if (error.status === 409) {
//               alert("This transport is not available on this date!");
//             } else {
//               alert(error.error || "The transport is already assigned to this event!");
//             }
//           }
//         });
//       },
//       error: (error) => {
//         console.error("Error checking availability:", error);
//         alert("Error checking availability. Please try again.");
//       }
//     });
//   }

//   applyFiltersAndSort(): void {
//     let filteredArray = [...this.TransportArray];

//     if (this.filterStatus) {
//       filteredArray = filteredArray.filter(transport => transport.statut === this.filterStatus);
//     }
//     if (this.filterType) {
//       filteredArray = filteredArray.filter(transport => 
//         transport.type.toLowerCase().includes(this.filterType.toLowerCase())
//       );
//     }

//     if (this.sortField) {
//       filteredArray.sort((a, b) => {
//         const valueA = a[this.sortField];
//         const valueB = b[this.sortField];
//         const direction = this.sortDirection === 'asc' ? 1 : -1;

//         if (typeof valueA === 'string') {
//           return valueA.localeCompare(valueB) * direction;
//         }
//         return (valueA - valueB) * direction;
//       });
//     }

//     this.filteredTransportArray = filteredArray;
//   }

//   sortBy(field: string): void {
//     if (this.sortField === field) {
//       this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
//     } else {
//       this.sortField = field;
//       this.sortDirection = 'asc';
//     }
//     this.applyFiltersAndSort();
//   }

//   private calculateStats(): void {
//     const available = this.TransportArray.filter(transport => transport.statut === 'Available').length;
//     const reserved = this.TransportArray.filter(transport => transport.statut === 'Reserved').length;
//     this.stats = { available, reserved };
//     // Update chart data, ensure non-zero values to avoid rendering issues
//     this.pieChartData.datasets[0].data = [available || 0.1, reserved || 0.1]; // Use 0.1 as a small placeholder to avoid rendering issues
//   }
import { Component, OnInit } from '@angular/core';
import { TransportService } from '../../../../shared/services/transport.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventSkeletonComponent } from "../../../../shared/skeleton-loader/others-pages-skeleton/event-skeleton/event-skeleton.component";
import { FeatherIconComponent } from "../../../../shared/components/common/feather-icon/feather-icon.component";
import { CommonService } from '../../../../shared/services/common.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarEvent} from 'angular-calendar';
import { MonthViewDay } from 'calendar-utils';
import { isSameDay, parse, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-transport',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EventSkeletonComponent,
    FeatherIconComponent,
    CalendarModule,
    BaseChartDirective
  ],
  templateUrl: './transport.component.html',
  styleUrl: './transport.component.scss'
})
export class TransportComponent implements OnInit {
  TransportArray: any[] = [];
  filteredTransportArray: any[] = [];
  type: string = '';
  capacite: number = 0;
  statut: string = '';
  currentTransportID: string = '';
  serverErrors: any = {};
  showModal: boolean = false;
  selectedTransportId: string = '';
  selectedEventId: string = '';
  eventArray: any[] = [];
  viewDate: Date = new Date();
  calendarEvents: CalendarEvent[] = [];
  selectedTransportForCalendar: any = null;
  filterStatus: string = '';
  filterType: string = '';
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  stats: { available: number; reserved: number } = { available: 0, reserved: 0 };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Transport Status Distribution'
      },
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

  constructor(private transportService: TransportService, public commonServices: CommonService) {
    this.getAllTransport();
  }

  ngOnInit(): void {}

  saveTransport(): void {
    this.serverErrors = {};

    if (this.currentTransportID === '') {
      this.register();
    } else {
      this.updateTransport();
    }
  }

  register(): void {
    const bodyData = this.getTransportPayload();

    this.transportService.createTransport(bodyData).subscribe({
      next: () => {
        alert("Transport added successfully!");
        this.refreshData();
      },
      error: (error) => this.handleError(error)
    });
  }

  getAllTransport(): void {
    this.transportService.getAllTransports().subscribe({
      next: (data: any) => {
        this.TransportArray = data;
        this.calculateStats();
        this.applyFiltersAndSort();
        if (this.selectedTransportForCalendar) {
          this.loadCalendarEvents(this.selectedTransportForCalendar);
        }
      },
      error: (error) => console.error("Error while retrieving transports:", error)
    });
  }

  setUpdateTransport(data: any): void {
    this.type = data.type;
    this.capacite = data.capacite;
    this.statut = data.statut;
    this.currentTransportID = data.id;
  }

  updateTransport(): void {
    if (!this.currentTransportID) {
      alert("Error: No transport ID selected!");
      return;
    }

    const bodyData = this.getTransportPayload();

    this.transportService.updateTransport(this.currentTransportID, bodyData).subscribe({
      next: () => {
        alert("Transport updated successfully!");
        this.refreshData();
      },
      error: (error) => this.handleError(error)
    });
  }

  setDeleteTransport(data: any): void {
    if (!confirm("Do you really want to delete this transport?")) {
      return;
    }

    this.transportService.deleteTransport(data.id).subscribe({
      next: () => {
        alert("Transport deleted successfully!");
        this.refreshData();
      },
      error: (error) => console.error("Error during deletion:", error)
    });
  }

  resetForm(): void {
    this.type = '';
    this.capacite = 0;
    this.statut = '';
    this.currentTransportID = '';
    this.serverErrors = {};
  }

  private handleError(error: any): void {
    console.error("Erreur:", error);
    if (error.status === 400) {
      this.serverErrors = error.error;
    } else {
      alert("An error occurred, please try again!");
    }
  }

  private getTransportPayload(): any {
    return {
      type: this.type.trim(),
      capacite: this.capacite,
      statut: this.statut.trim()
    };
  }

  private refreshData(): void {
    this.getAllTransport();
    this.resetForm();
  }

  showCalendar(transport: any): void {
    this.selectedTransportForCalendar = transport;
    this.loadCalendarEvents(transport);
  }

  loadCalendarEvents(transport: any): void {
    this.transportService.getAssignments(transport.id).subscribe({
      next: (assignments: any[]) => {
        this.calendarEvents = assignments.map((assignment: any) => {
          const start = parse(assignment.dateDebut, 'yyyy-MM-dd', new Date());
          const end = parse(assignment.dateFin, 'yyyy-MM-dd', new Date());
          return {
            start,
            end, // Ensure end is always defined
            title: `Assigned to ${assignment.event.nomEvent}`,
            color: { primary: '#1e90ff', secondary: '#D1E8FF' },
            allDay: true
          } as CalendarEvent & { end: Date }; // Assert that end is not undefined
        });
      },
      error: (error) => console.error("Error fetching assignments:", error)
    });
  }

  dayClicked({ day }: { day: MonthViewDay<any> }): void {
    const date = day.date;
    const hasEvent = this.calendarEvents.some(event => 
      isWithinInterval(date, {
        start: startOfDay(event.start),
        end: endOfDay(event.end as Date) // Assert that end is defined
      })
    );
    if (hasEvent) {
      const event = this.calendarEvents.find(event => 
        isWithinInterval(date, {
          start: startOfDay(event.start),
          end: endOfDay(event.end as Date) // Assert that end is defined
        })
      );
      if (event && event.end) { // Additional null check for safety
        alert(`Transport is assigned to "${event.title}" from ${event.start.toISOString().split('T')[0]} to ${event.end.toISOString().split('T')[0]}.`);
      } else {
        alert('Transport is assigned, but date range is unavailable.');
      }
    } else {
      alert('Transport is available on this day.');
    }
  }

  openAffectationModal(transport: any) {
    this.selectedTransportId = transport.id;
    this.showModal = true;

    this.transportService.getAllEvents().subscribe((resultData: any) => {
      this.eventArray = resultData;
    });
  }

  closeModal() {
    this.showModal = false;
    this.selectedTransportId = '';
    this.selectedEventId = '';
  }

  affecterTransport() {
    if (!this.selectedTransportId || !this.selectedEventId) {
      alert("Please select an event!");
      return;
    }

    const selectedEvent = this.eventArray.find(event => event.idEvent === this.selectedEventId);
    if (!selectedEvent) {
      alert("Selected event not found!");
      return;
    }

    this.transportService.checkAvailability(this.selectedTransportId, selectedEvent.dateDebut, selectedEvent.dateFin).subscribe({
      next: (isAvailable: boolean) => {
        if (!isAvailable) {
          alert("This transport is already assigned to another event during this period!");
          return;
        }

        this.transportService.affecterTransport(this.selectedEventId, this.selectedTransportId).subscribe({
          next: (result) => {
            alert(`Transport successfully assigned to "${selectedEvent.nomEvent}"! Its status has been updated to Reserved.`);
            this.closeModal();
            this.refreshData();
          },
          error: (error) => {
            console.error("Error during assignment:", error);
            if (error.status === 409) {
              alert("This transport is not available during this period!");
            } else {
              alert(error.error || "The transport is already assigned to this event!");
            }
          }
        });
      },
      error: (error) => {
        console.error("Error checking availability:", error);
        alert("Error checking availability. Please try again.");
      }
    });
  }

  applyFiltersAndSort(): void {
    let filteredArray = [...this.TransportArray];

    if (this.filterStatus) {
      filteredArray = filteredArray.filter(transport => transport.statut === this.filterStatus);
    }
    if (this.filterType) {
      filteredArray = filteredArray.filter(transport => 
        transport.type.toLowerCase().includes(this.filterType.toLowerCase())
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

    this.filteredTransportArray = filteredArray;
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

  private calculateStats(): void {
    const available = this.TransportArray.filter(transport => transport.statut === 'Available').length;
    const reserved = this.TransportArray.filter(transport => transport.statut === 'Reserved').length;
    this.stats = { available, reserved };
    this.pieChartData.datasets[0].data = [available || 0.1, reserved || 0.1];
  }
}