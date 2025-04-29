import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { InscriptionService, Inscription } from '../../../../shared/services/inscription.service';
import { AnimationEmojiComponent } from "../../../widgets/animation-emoji/animation-emoji.component";

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
  standalone: true,
  imports: [CommonModule, ZXingScannerModule, AnimationEmojiComponent]
})
export class QrScannerComponent {
  scannerEnabled = true;
  result: string | null = null;
  verificationResult: Inscription | null = null;
  errorMessage = '';

  constructor(private inscriptionService: InscriptionService) {}

  onCodeResult(result: string) {
    this.result = result;
    this.scannerEnabled = false;

    const inscriptionIdMatch = result.match(/Inscription ID: ([^\n]+)/);
    if (inscriptionIdMatch && inscriptionIdMatch[1]) {
      const inscriptionId = inscriptionIdMatch[1];
      this.verifyInscription(inscriptionId);
    } else {
      this.errorMessage = 'Invalid QR code format';
    }
  }

  verifyInscription(inscriptionId: string) {
    this.inscriptionService.verifyInscription(inscriptionId).subscribe({
      next: (inscription: Inscription) => {
        this.verificationResult = inscription;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Verification failed: ' + err.message;
        this.verificationResult = null;
      }
    });
  }

  resetScanner() {
    this.scannerEnabled = true;
    this.result = null;
    this.verificationResult = null;
    this.errorMessage = '';
  }
}