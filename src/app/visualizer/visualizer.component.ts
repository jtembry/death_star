import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VisualizerService} from './visualizer.service';
import {WebGLRenderer} from 'three';
import {partial, get} from 'lodash';

@Component({
  selector: 'pm-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})

export class VisualizerComponent implements OnInit {
  @ViewChild('container') containerRef: ElementRef;
  // @ViewChild('theFile') theFileRef: ElementRef;
  // @ViewChild('audio') audioRef: ElementRef;
  // @ViewChild('label.file') labelRef: ElementRef;
  private container: HTMLElement;
  private renderer: WebGLRenderer;
  public renderFn: Function = partial((self) => {
    requestAnimationFrame(self.renderFn);
    self.renderer.render(self.visualizer.scene, self.visualizer.camera);
    if (self.visualizer.death_star) {
      self.visualizer.death_star.rotation.y += .009;
    }
  }, this);

  constructor(public visualizer: VisualizerService) {
  }

  ngOnInit() {
    this.visualizer.staging();
    this.visualizer.buildDeathStar();
    this.renderer = new WebGLRenderer({antialias: true, alpha: true});
    this.renderer.shadowMap.enabled = true;
    this.container = this.containerRef.nativeElement;
    this.container.appendChild(this.renderer.domElement);
    this.adjustCanvas(this.width, this.height);
    this.renderFn();
  }

  public get width() {
    return window.innerWidth;
  }

  public get height() {
    return window.innerHeight - 50;
  }

// Web AUDIO EXAMPLE 1
  // getAudio() {
  //   const file = this.theFileRef;
  //   const audio = this.audioRef;
  //   const fileLabel = this.labelRef;
  //   this.container.appendChild(this.renderer.domElement);
  //   document.onload = function (e) {
  //     console.log(e);
  //     audio.play();
  //     play();
  //   };
  // }

  //   Web Audio Ex .2
  // getAudio() {
  // const URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3';
  // const context = new AudioContext();
  // const playButton = document.querySelector('#play');
  //
  // let yodelBuffer;
  //   window.fetch(URL)
  //   .then(response => response.arrayBuffer())
  //   .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
  //   .then(audioBuffer => {
  //     playButton.disabled = false;
  //     yodelBuffer = audioBuffer;
  //   });
  //
  //   playButton.onclick = () => play(yodelBuffer);
  //
  //   play(audioBuffer) {
  //       const source = context.createBufferSource();
  //       source.buffer = audioBuffer;
  //       source.connect(context.destination);
  //       source.start();
  //     }
  //   }());
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.visualizer.camera !== undefined) {
      this.renderer.render(this.visualizer.scene, this.visualizer.camera);
      this.adjustCanvas(this.width, this.height);
      this.visualizer.camera.updateProjectionMatrix();
    }
  }

  adjustCanvas(width, height) {
    this.renderer.setSize(width, height);
    this.renderer.setViewport(0, 0, width, height);
    this.visualizer.camera.aspect = 16 / 9;
  }
}

//   ngOnDestroy() {
//     this.unsubscribe.forEach(u => u.unsubscribe());
//     this.unsubscribe.length = 0;
//   }
// }

