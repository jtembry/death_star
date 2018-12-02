import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

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
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private death_star: any;
  constructor() {
  }

  ngOnInit() {
    this.container = this.containerRef.nativeElement;
    this.startAnimate();
  }

  private startAnimate() {
    this.staging();
    this.render();
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
  //getAudio() {
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

  staging() {
    // window
    const self: VisualizerComponent = this;
    // scene
    this.scene = new THREE.Scene();
    this.scene.position.set(0, 0, 0);
    this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    this.renderer.shadowMap.enabled = true;
    // camera
    this.camera = new THREE.PerspectiveCamera(45, (15 / 9), 1, 1000);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 10;
    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);
    // lights
    const spotLight = new THREE.DirectionalLight(0xffffff, 1.75);
    spotLight.position.set(0, 0, 1000);
    spotLight.castShadow = true;
    this.scene.add(spotLight);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);
    const loader = new GLTFLoader();
    loader.load('../../assets/models/3death_star.gltf', function (gltf) {
      const scene = gltf.scene;
      self.death_star = scene.children[2];
      console.log(self.death_star);
      self.scene.add(self.death_star);
      self.render();
    });
  }

  render() {
    const self: VisualizerComponent = this;
    (function render() {
      requestAnimationFrame(render);
      self.renderer.render(self.scene, self.camera);
      if (self.death_star) {
        self.death_star.rotation.y += .009;
      }
    }());
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}

//   ngOnDestroy() {
//     this.unsubscribe.forEach(u => u.unsubscribe());
//     this.unsubscribe.length = 0;
//   }
// }

