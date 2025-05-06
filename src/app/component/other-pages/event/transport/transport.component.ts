import { Component, OnInit } from '@angular/core';
import { TransportService } from '../../../../shared/services/transport.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventSkeletonComponent } from "../../../../shared/skeleton-loader/others-pages-skeleton/event-skeleton/event-skeleton.component";
import { FeatherIconComponent } from "../../../../shared/components/common/feather-icon/feather-icon.component";
import { CommonService } from '../../../../shared/services/common.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarEvent } from 'angular-calendar';
import { MonthViewDay } from 'calendar-utils';
import { isSameDay, parse, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

// Define the Transport interface
interface Transport {
  id: string;
  type: string;
  capacite: number;
  statut: string;
  selected?: boolean; // Optional for bulk actions
}

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
  TransportArray: Transport[] = [];
  filteredTransportArray: Transport[] = [];
  paginatedTransportArray: Transport[] = [];
  type: string = '';
  capacite: number = 0;
  statut: string = '';
  currentTransportID: string = '';
  serverErrors: { [key: string]: string } = {};
  showModal: boolean = false;
  selectedTransportId: string = '';
  selectedEventId: string = '';
  eventArray: { idEvent: string; nomEvent: string; dateDebut: string; dateFin: string }[] = [];
  viewDate: Date = new Date();
  calendarEvents: CalendarEvent[] = [];
  selectedTransportForCalendar: Transport | null = null;
  filterStatus: string = '';
  filterType: string = '';
  sortField: keyof Transport = '' as keyof Transport;
  sortDirection: 'asc' | 'desc' = 'asc';
  stats: { available: number; reserved: number } = { available: 0, reserved: 0 };

  // Bulk action properties
  selectedTransports: Transport[] = [];
  isAllSelected: boolean = false;

  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

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
      next: (data: Transport[]) => {
        this.TransportArray = data.map((item: Transport) => ({ ...item, selected: false }));
        this.calculateStats();
        this.applyFiltersAndSort();
        if (this.selectedTransportForCalendar) {
          this.loadCalendarEvents(this.selectedTransportForCalendar);
        }
      },
      error: (error) => console.error("Error while retrieving transports:", error)
    });
  }

  setUpdateTransport(data: Transport): void {
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

  setDeleteTransport(data: Transport): void {
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
    this.selectedTransports = [];
    this.isAllSelected = false;
  }

  showCalendar(transport: Transport): void {
    this.selectedTransportForCalendar = transport;
    this.loadCalendarEvents(transport);
  }

  loadCalendarEvents(transport: Transport): void {
    this.transportService.getAssignments(transport.id).subscribe({
      next: (assignments: { dateDebut: string; dateFin: string; event: { nomEvent: string } }[]) => {
        this.calendarEvents = assignments.map((assignment) => {
          const start = parse(assignment.dateDebut, 'yyyy-MM-dd', new Date());
          const end = parse(assignment.dateFin, 'yyyy-MM-dd', new Date());
          return {
            start,
            end,
            title: `Assigned to ${assignment.event.nomEvent}`,
            color: { primary: '#1e90ff', secondary: '#D1E8FF' },
            allDay: true
          } as CalendarEvent & { end: Date };
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
        alert(`Transport is  "${event.title}" from ${event.start.toISOString().split('T')[0]} to ${event.end.toISOString().split('T')[0]}.`);
      } else {
        alert('Transport is assigned, but date range is unavailable.');
      }
    } else {
      alert('Transport is available on this day.');
    }
  }

  openAffectationModal(transport: Transport): void {
    this.selectedTransportId = transport.id;
    this.showModal = true;

    this.transportService.getAllEvents().subscribe((resultData: any) => {
      this.eventArray = resultData.map((event: any) => ({
        idEvent: event.idEvent,
        nomEvent: event.nomEvent,
        dateDebut: event.dateDebut,
        dateFin: event.dateFin
      }));
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedTransportId = '';
    this.selectedEventId = '';
  }

  affecterTransport(): void {
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

        if (this.sortField === 'capacite') {
          return ((valueA as number) - (valueB as number)) * direction;
        } else {
          return (valueA as string).localeCompare(valueB as string) * direction;
        }
      });
    }

    this.filteredTransportArray = filteredArray;
    this.updatePagination();
  }

  sortBy(field: keyof Transport): void {
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

  // Pagination methods
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredTransportArray.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTransportArray = this.filteredTransportArray.slice(startIndex, endIndex);
    this.updateSelectedTransports();
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

  // Bulk Action Methods
  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.paginatedTransportArray.forEach(transport => transport.selected = checked);
    this.updateSelectedTransports();
    this.isAllSelected = checked;
  }

  onSelectionChange(): void {
    this.updateSelectedTransports();
    this.isAllSelected = this.paginatedTransportArray.every(transport => transport.selected);
  }

  private updateSelectedTransports(): void {
    this.selectedTransports = this.TransportArray.filter(transport => transport.selected);
  }

  bulkDelete(): void {
    if (this.selectedTransports.length === 0) {
      alert('No transports selected for deletion!');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${this.selectedTransports.length} transport(s)?`)) {
      return;
    }

    const deletePromises = this.selectedTransports.map(transport =>
      this.transportService.deleteTransport(transport.id).toPromise()
    );

    Promise.all(deletePromises)
      .then(() => {
        alert(`${this.selectedTransports.length} transport(s) deleted successfully!`);
        this.refreshData();
      })
      .catch(error => {
        console.error('Error during bulk deletion:', error);
        alert('An error occurred while deleting some transports. Please try again!');
      });
  }
}