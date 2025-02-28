// Create a new file called three-models.js with this content
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class ModelViewer {
  constructor(containerId, modelPath, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container with ID "${containerId}" not found.`);
      return;
    }
    
    this.modelPath = modelPath;
    this.options = Object.assign({
      backgroundColor: 0x162d47,
      ambientLightColor: 0xffffff,
      ambientLightIntensity: 0.5,
      directionalLightColor: 0xffffff,
      directionalLightIntensity: 0.8,
      cameraPosition: { x: 5, y: 2, z: 5 },
      autoRotate: true,
      autoRotateSpeed: 1.0
    }, options);
    
    this.init();
  }
  
  init() {
    // Get container dimensions
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.options.backgroundColor);
    
    // Create camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(
      this.options.cameraPosition.x,
      this.options.cameraPosition.y,
      this.options.cameraPosition.z
    );
    
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(
      this.options.ambientLightColor,
      this.options.ambientLightIntensity
    );
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(
      this.options.directionalLightColor,
      this.options.directionalLightIntensity
    );
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);
    
    // Add grid (optional)
    const gridHelper = new THREE.GridHelper(10, 10);
    this.scene.add(gridHelper);
    
    // Add water plane for underwater vehicles
    if (this.options.addWater) {
      const waterGeometry = new THREE.PlaneGeometry(20, 20);
      const waterMaterial = new THREE.MeshStandardMaterial({
        color: 0x0077be,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      });
      const water = new THREE.Mesh(waterGeometry, waterMaterial);
      water.rotation.x = -Math.PI / 2;
      water.position.y = -0.5;
      this.scene.add(water);
    }
    
    // Add controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.autoRotate = this.options.autoRotate;
    this.controls.autoRotateSpeed = this.options.autoRotateSpeed;
    
    // Load model
    this.loadModel();
    
    // Handle window resize
    window.addEventListener('resize', this.onResize.bind(this));
    
    // Start animation loop
    this.animate();
  }
  
  loadModel() {
    const loader = new GLTFLoader();
    
    // Show loading indicator
    const loadingElem = document.createElement('div');
    loadingElem.style.position = 'absolute';
    loadingElem.style.top = '50%';
    loadingElem.style.left = '50%';
    loadingElem.style.transform = 'translate(-50%, -50%)';
    loadingElem.style.color = 'white';
    loadingElem.style.fontSize = '16px';
    loadingElem.textContent = 'Loading model...';
    this.container.appendChild(loadingElem);
    
    loader.load(
      this.modelPath,
      (gltf) => {
        // Success callback
        this.model = gltf.scene;
        
        // Center model
        const box = new THREE.Box3().setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Normalize and center
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3 / maxDim;
        this.model.scale.set(scale, scale, scale);
        this.model.position.sub(center.multiplyScalar(scale));
        
        // Add model to scene
        this.scene.add(this.model);
        
        // Remove loading indicator
        this.container.removeChild(loadingElem);
        
        // Add model info if provided
        if (this.options.modelInfo) {
          this.addModelInfo(this.options.modelInfo);
        }
      },
      (xhr) => {
        // Progress callback
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        loadingElem.textContent = `Loading model... ${Math.round(percentComplete)}%`;
      },
      (error) => {
        // Error callback
        console.error('Error loading model:', error);
        loadingElem.textContent = 'Error loading model';
      }
    );
  }
  
  addModelInfo(info) {
    const infoElem = document.createElement('div');
    infoElem.className = 'model-info';
    infoElem.style.position = 'absolute';
    infoElem.style.bottom = '10px';
    infoElem.style.left = '10px';
    infoElem.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    infoElem.style.color = 'white';
    infoElem.style.padding = '10px';
    infoElem.style.borderRadius = '5px';
    infoElem.style.maxWidth = '250px';
    infoElem.style.fontSize = '14px';
    infoElem.innerHTML = `
      <h3 style="margin: 0 0 5px 0;">${info.name}</h3>
      <p style="margin: 0;">${info.description}</p>
    `;
    this.container.appendChild(infoElem);
  }
  
  onResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
  
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

// Export for use in main script
export default ModelViewer;