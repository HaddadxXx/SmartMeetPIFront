
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

@Component({
  selector: 'app-call',
  standalone: true,
  template: `<div id="video-call-container" style="width: 100vw; height: 100vh;"></div>`,
})
export class CallComponent implements OnInit {
  private userId = '680fe0938fbb0010da0aad53'; // Remplacez par l'ID de l'utilisateur authentifié
  private requestId = '68196126f710826dfef77297'; // Remplacez par l'ID de la requête d'appel

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const roomId = '71104fae-3176-4c4b-85ee-ca449f84b309';
    const appID = 776652534;
    const serverSecret = '951431284ec01b593b4ff1ad5ca966b8';
    const userID = Math.floor(Math.random() * 10000) + '';
    const userName = 'User_' + userID;
  
    const token = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, userID, userName);
  
    const zp = ZegoUIKitPrebuilt.create(token);
    const container = document.querySelector('#video-call-container');
    if (container instanceof HTMLElement) {
      zp.joinRoom({
        container,
        sharedLinks: [{ name: 'Lien test', url: window.location.href }],
        scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
        turnOnMicrophoneWhenJoining: true,
        turnOnCameraWhenJoining: true,
        showMyCameraToggleButton: true,
        showMyMicrophoneToggleButton: true,
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: true,
        showTextChat: true,
        showUserList: true,
        maxUsers: 2,
        layout: "Auto",
        showLayoutButton: false,
      });
    }
  }
}