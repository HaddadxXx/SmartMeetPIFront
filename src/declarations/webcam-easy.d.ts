declare module 'webcam-easy' {
    class Webcam {
      constructor(
        videoElement: HTMLVideoElement,
        facingMode: string,
        canvasElement?: HTMLCanvasElement
      );
      start(): Promise<void>;
      stop(): void;
      snap(): string;
    }
    export default Webcam;
  }