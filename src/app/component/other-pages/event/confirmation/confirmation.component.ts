import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { InscriptionService } from '../../../../shared/services/inscription.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ConfirmationComponent implements OnInit {
  inscriptionId: string | null = null;
  qrCodeUrl: SafeUrl | null = null;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private inscriptionService: InscriptionService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.inscriptionId = this.route.snapshot.paramMap.get('id');
    if (this.inscriptionId) {
      this.loadQRCode(this.inscriptionId);
    }
  }

  loadQRCode(inscriptionId: string): void {
    this.inscriptionService.getQRCode(inscriptionId).subscribe({
      next: (blob: Blob) => {
        const objectUrl = URL.createObjectURL(blob);
        this.qrCodeUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      },
      error: (err) => {
        this.errorMessage = 'Failed to load QR code: ' + err.message;
      }
    });
  }

  downloadQRCode(): void {
    if (this.qrCodeUrl) {
      const link = document.createElement('a');
      link.href = this.qrCodeUrl.toString();
      link.download = 'qrcode.png';
      link.click();
    }
  }
}