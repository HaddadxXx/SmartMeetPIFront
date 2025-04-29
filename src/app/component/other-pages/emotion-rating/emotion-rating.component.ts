// import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
// import * as faceapi from 'face-api.js';
// import Webcam from 'webcam-easy';
// import { CommonModule } from '@angular/common';

// // Define a custom type for emotion probabilities (excluding asSortedArray)
// interface EmotionProbabilities {
//   happy: number;
//   sad: number;
//   angry: number;
//   surprised: number;
//   fearful: number;
//   disgusted: number;
//   neutral: number;
// }

// @Component({
//   selector: 'app-emotion-rating',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './emotion-rating.component.html',
//   styleUrls: ['./emotion-rating.component.scss']
// })
// export class EmotionRatingComponent implements OnInit, AfterViewInit, OnDestroy {
//   @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
//   @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

//   webcam!: Webcam;
//   detectedEmotion: string = 'None';
//   emotionProbabilities: EmotionProbabilities = {
//     happy: 0,
//     sad: 0,
//     angry: 0,
//     surprised: 0,
//     fearful: 0,
//     disgusted: 0,
//     neutral: 0
//   };
//   appRating: number = 50;
//   ratingHistory: number[] = [];

//   // Define the list of emotions for iteration in the template
//   emotionKeys: (keyof EmotionProbabilities)[] = [
//     'happy',
//     'sad',
//     'angry',
//     'surprised',
//     'fearful',
//     'disgusted',
//     'neutral'
//   ];

//   constructor() {}

//   async ngOnInit() {
//     // Load models from the local assets folder
//     const modelPath = '/assets/face-api-models/';
//     await faceapi.nets.tinyFaceDetector.loadFromUri(modelPath);
//     await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
//     await faceapi.nets.faceExpressionNet.loadFromUri(modelPath);
//   }

//   async ngAfterViewInit() {
//     const videoEl = this.videoElement.nativeElement;
//     this.webcam = new Webcam(videoEl, 'user', this.canvasElement.nativeElement);
    
//     try {
//       await this.webcam.start();
//       this.detectEmotions();
//     } catch (error) {
//       console.error('Error accessing webcam:', error);
//       alert('Could not access webcam. Please ensure you have granted permissions.');
//     }
//   }

//   async detectEmotions() {
//     const videoEl = this.videoElement.nativeElement;
//     const canvas = this.canvasElement.nativeElement;
//     const displaySize = { width: videoEl.width, height: videoEl.height };
//     faceapi.matchDimensions(canvas, displaySize);

//     setInterval(async () => {
//       const detections = await faceapi
//         .detectAllFaces(videoEl, new faceapi.TinyFaceDetectorOptions())
//         .withFaceLandmarks()
//         .withFaceExpressions();

//       const resizedDetections = faceapi.resizeResults(detections, displaySize);
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         faceapi.draw.drawDetections(canvas, resizedDetections);
//         faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//       }

//       if (detections.length > 0) {
//         const expressions = detections[0].expressions as faceapi.FaceExpressions;
//         // Map FaceExpressions to EmotionProbabilities
//         this.emotionProbabilities = {
//           happy: expressions.happy,
//           sad: expressions.sad,
//           angry: expressions.angry,
//           surprised: expressions.surprised,
//           fearful: expressions.fearful,
//           disgusted: expressions.disgusted,
//           neutral: expressions.neutral
//         };

//         const expressionKeys = this.emotionKeys;
//         const dominantEmotion = expressionKeys.reduce((a, b) =>
//           this.emotionProbabilities[a] > this.emotionProbabilities[b] ? a : b
//         );
//         this.detectedEmotion = dominantEmotion;

//         this.updateAppRating(dominantEmotion, this.emotionProbabilities[dominantEmotion]);
//       }
//     }, 100);
//   }

//   updateAppRating(emotion: keyof EmotionProbabilities, probability: number) {
//     const emotionImpact: Partial<Record<keyof EmotionProbabilities, number>> = {
//       happy: 10,
//       surprised: 5,
//       neutral: 0,
//       sad: -5,
//       angry: -10,
//       fearful: -8,
//       disgusted: -10
//     };

//     const adjustment = (emotionImpact[emotion] || 0) * probability;
//     this.appRating = Math.max(0, Math.min(100, this.appRating + adjustment));

//     this.ratingHistory.push(this.appRating);
//     if (this.ratingHistory.length > 100) {
//       this.ratingHistory.shift();
//     }
//   }

//   getAverageRating(): number {
//     if (this.ratingHistory.length === 0) return 50;
//     const sum = this.ratingHistory.reduce((a, b) => a + b, 0);
//     return Math.round(sum / this.ratingHistory.length);
//   }

//   stopWebcam() {
//     if (this.webcam) {
//       this.webcam.stop();
//     }
//   }

//   ngOnDestroy() {
//     this.stopWebcam();
//   }
// }
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as faceapi from 'face-api.js';
import Webcam from 'webcam-easy';
import { CommonModule } from '@angular/common';

// Define a custom type for emotion probabilities (excluding asSortedArray)
interface EmotionProbabilities {
  happy: number;
  sad: number;
  angry: number;
  surprised: number;
  fearful: number;
  disgusted: number;
  neutral: number;
}

@Component({
  selector: 'app-emotion-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emotion-rating.component.html',
  styleUrls: ['./emotion-rating.component.scss']
})
export class EmotionRatingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  webcam!: Webcam;
  detectedEmotion: string = 'None';
  emotionProbabilities: EmotionProbabilities = {
    happy: 0,
    sad: 0,
    angry: 0,
    surprised: 0,
    fearful: 0,
    disgusted: 0,
    neutral: 0
  };
  appRating: number = 50;
  ratingHistory: number[] = [];

  // Define the list of emotions for iteration in the template
  emotionKeys: (keyof EmotionProbabilities)[] = [
    'happy',
    'sad',
    'angry',
    'surprised',
    'fearful',
    'disgusted',
    'neutral'
  ];

  // Add properties for consent popup
  showConsentPopup: boolean = true;
  webcamStarted: boolean = false;
  declinedConsent: boolean = false; // Track if user declined consent

  constructor() {}

  async ngOnInit() {
    // Load models from the local assets folder
    const modelPath = '/assets/face-api-models/';
    await faceapi.nets.tinyFaceDetector.loadFromUri(modelPath);
    await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
    await faceapi.nets.faceExpressionNet.loadFromUri(modelPath);
  }

  ngAfterViewInit() {
    // We won't start the webcam here; it will start after consent
  }

  async startWebcam() {
    if (!this.videoElement || !this.canvasElement) {
      console.error('Video or canvas element not found.');
      return;
    }

    const videoEl = this.videoElement.nativeElement;
    const canvasEl = this.canvasElement.nativeElement;
    this.webcam = new Webcam(videoEl, 'user', canvasEl);
    
    try {
      await this.webcam.start();
      this.webcamStarted = true;
      this.detectEmotions();
    } catch (error) {
      console.error('Error accessing webcam:', error);
      alert('Could not access webcam. Please ensure you have granted permissions.');
    }
  }

  // Method to handle consent
  consentToWebcam() {
    this.showConsentPopup = false;
    this.startWebcam();
  }

  // Method to handle decline
  declineWebcamAccess() {
    this.showConsentPopup = false;
    this.declinedConsent = true;
  }

  async detectEmotions() {
    const videoEl = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const displaySize = { width: videoEl.width, height: videoEl.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoEl, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      }

      if (detections.length > 0) {
        const expressions = detections[0].expressions as faceapi.FaceExpressions;
        // Map FaceExpressions to EmotionProbabilities
        this.emotionProbabilities = {
          happy: expressions.happy,
          sad: expressions.sad,
          angry: expressions.angry,
          surprised: expressions.surprised,
          fearful: expressions.fearful,
          disgusted: expressions.disgusted,
          neutral: expressions.neutral
        };

        const expressionKeys = this.emotionKeys;
        const dominantEmotion = expressionKeys.reduce((a, b) =>
          this.emotionProbabilities[a] > this.emotionProbabilities[b] ? a : b
        );
        this.detectedEmotion = dominantEmotion;

        this.updateAppRating(dominantEmotion, this.emotionProbabilities[dominantEmotion]);
      }
    }, 100);
  }

  updateAppRating(emotion: keyof EmotionProbabilities, probability: number) {
    const emotionImpact: Partial<Record<keyof EmotionProbabilities, number>> = {
      happy: 10,
      surprised: 5,
      neutral: 0,
      sad: -5,
      angry: -10,
      fearful: -8,
      disgusted: -10
    };

    const adjustment = (emotionImpact[emotion] || 0) * probability;
    this.appRating = Math.max(0, Math.min(100, this.appRating + adjustment));

    this.ratingHistory.push(this.appRating);
    if (this.ratingHistory.length > 100) {
      this.ratingHistory.shift();
    }
  }

  getAverageRating(): number {
    if (this.ratingHistory.length === 0) return 50;
    const sum = this.ratingHistory.reduce((a, b) => a + b, 0);
    return Math.round(sum / this.ratingHistory.length);
  }

  stopWebcam() {
    if (this.webcam) {
      this.webcam.stop();
      this.webcamStarted = false;
    }
  }

  ngOnDestroy() {
    this.stopWebcam();
  }
}