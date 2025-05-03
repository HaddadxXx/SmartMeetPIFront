import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class VoiceRecognitionService {
  recognition: any;
  isListening = false;

  // Mapping vocal → noms des champs du formulaire
  voiceToFieldMap: { [key: string]: string } = {
    'event name': 'nomEvent',
    'description': 'description',
    'theme': 'theme',
    'capacity': 'capacite',
    'location': 'lieu',
    'time': 'horaire',
    'begin date': 'dateDebut',
    'end date': 'dateFin'
  };

  constructor() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
  }

  startListening(form: FormGroup) {
    if (this.isListening) return;

    this.isListening = true;
    console.log('🎤 Démarrage de la reconnaissance vocale...');
    this.recognition.start();

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log('📝 Résultat vocal :', transcript);

      // Exemple : "event name is Cyber Security"
      const parts = transcript.split(' is ');
      if (parts.length === 2) {
        const fieldLabel = parts[0].trim();
        const value = parts[1].trim();

        const fieldName = this.voiceToFieldMap[fieldLabel];
        if (fieldName && form.controls[fieldName]) {
          form.controls[fieldName].setValue(value);
          console.log(`📝 Champ "${fieldName}" rempli avec :`, value);
        } else {
          console.warn(`❓ Aucun champ associé à : "${fieldLabel}"`);
        }
      }
    };

    this.recognition.onerror = (event: any) => {
      console.error('❌ Erreur reconnaissance vocale :', event.error);
      if (event.error === 'no-speech') {
        console.warn('🔁 Redémarrage suite à no-speech...');
        this.recognition.stop();
        setTimeout(() => this.recognition.start(), 500);
      }
    };

    this.recognition.onend = () => {
      console.log('🔁 Fin de session, redémarrage automatique...');
      if (this.isListening) {
        this.recognition.start();
      }
    };
  }

  stopListening() {
    this.isListening = false;
    this.recognition.stop();
    console.log('⏹️ Reconnaissance vocale arrêtée.');
  }
}
