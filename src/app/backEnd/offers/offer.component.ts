import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent, ApexChart, ApexAxisChartSeries, ApexXAxis } from 'ng-apexcharts';
import { SponsoringOfferService } from 'c:/Users/acer/Desktop/SmartMeetPIFront-main (2)/SmartMeetPIFront-main/src/app/shared/services/sponsoring-offer.service';
import { HttpClient } from '@angular/common/http';
import { SponsoringOfferComponent } from '../../component/other-pages/music/sponsor/sponsor.component';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css'
})
export class OfferComponent {
    offerArray: any[] = [];
    eventArray: any[] = []; // Liste des événements à afficher dans la modale
    title: string = '';
    description: string = '';
    amount: number = 0;
    creationDate: Date = new Date();
    status: string = '';
    currentOfferID: string = '';
    dateError: string | null = null;
    creationDateString: string = new Date().toISOString().split('T')[0];
    minDate: string = new Date().toISOString().split('T')[0];
    submitted = false;
    serverErrors: any = {};
    showModal: boolean = false;
    selectedOfferId: string = '';
    selectedEventId: string = '';
    currentPage: number = 1;
    itemsPerPage: number = 3;
    contractId?: string; // optionnel
    
     constructor(private sponsoringOfferService:  SponsoringOfferService, private http: HttpClient) {
          this.getAllOffers();
        }
    getAllOffers(): void {
        this.sponsoringOfferService.getAllOffers().subscribe({
          next: (data: any) => {
            this.offerArray = data;
          },
          error: (error) => console.error("Error retrieving offers:", error)
        });
      }
      private refreshData(): void {
        this.getAllOffers();
        
      }
      setDeleteOffer(data: any): void {
        if (!confirm("Are you sure you want to delete this offer?")) {
          return;
        }
    
        this.sponsoringOfferService.deleteOffer(data.id).subscribe({
          next: () => {
            alert("Offer successfully deleted! ");
            this.refreshData();
          },
          error: (error) => console.error("Error deleting:", error)
        });
      }
      get paginatedOffers() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.offerArray.slice(startIndex, startIndex + this.itemsPerPage);
      }
      
      get totalPages(): number {
        return Math.ceil(this.offerArray.length / this.itemsPerPage);
      }
}
