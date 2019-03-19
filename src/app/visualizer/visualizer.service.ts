import {Injectable} from '@angular/core';
import {AmbientLight, DirectionalLight, Box3, BoxGeometry, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene} from 'three';
import GLTFLoader from 'three-gltf-loader';

@Injectable({
  providedIn: 'root'
})
export class VisualizerService {
  public scene: Scene;
  public camera: PerspectiveCamera;
  public death_star: any;
  public view: any = {
    angle: 45,
    aspect: 16 / 9,
    near: 1,
    far: 1000
  };

  constructor() {
  }

  staging() {
    // scene
    this.scene = new Scene();
    this.scene.position.set(0, 0, 0);
    // camera
    this.camera = new PerspectiveCamera(this.view.angle, this.view.aspect, this.view.near, this.view.far);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 10;
    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);
    // lights
    const spotLight = new DirectionalLight(0xffffff, 1.75);
    spotLight.position.set(0, 0, 1000);
    spotLight.castShadow = true;
    this.scene.add(spotLight);
  }

  buildDeathStar() {
    // death_star
    const loader = new GLTFLoader();
    loader.load('../../assets/models/3death_star.gltf', (gltf) => {
      const space = gltf.scene;
      this.death_star = space.children[2];
      this.scene.add(this.death_star);
      console.log(this.death_star);
    });
  }
}
