import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

// Farm Configuration
const FARM_CONFIG = {
    NUM_COLS: 50,
    NUM_ROWS: 20,
    BLOCK_SIZE: 1.5,
    BLOCK_SPACING: 0.5,
    get BLOCK_HEIGHT() { return this.BLOCK_SIZE * 5 },
    NUM_PLANT_ROWS: 5,
    NUM_PLANTS_PER_ROW: 25,
    COLORS: ["#10B981", "#6EE7B7"],
    HIGHLIGHT_COLOR: "#BEF264",
    BLOCKED_COLOR: "#4B5563",
    SELECTED_COLOR: "#FACC15",
    SOLD_PLANT_COLOR: "#000000",
    BLOCKED_CONTAINERS: [15, 28, 45, 67, 89],
    BLOCKED_PLANTS: ['58-2-4', '58-3-1', '100-0-8', '100-4-24', '101-3-2'],
};

const Farm = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const containerRef = useRef(null);

    useEffect(() => {
        if (!loading && !user) {
            navigate('/auth');
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        if (!user || !containerRef.current)
            return;

        const farmHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Interactive 3D Farm</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
              body, html {
                  margin: 0;
                  padding: 0;
                  width: 100%;
                  height: 100%;
                  overflow: hidden;
                  font-family: 'Inter', sans-serif;
              }
              #canvas-container {
                  width: 100%;
                  height: 100%;
                  display: block;
                  cursor: pointer;
              }
              .popup {
                  position: absolute;
                  display: none;
                  padding: 8px 12px;
                  background-color: rgba(1, 22, 13, 0.8);
                  backdrop-filter: blur(5px);
                  border: 1px solid #15803d;
                  border-radius: 8px;
                  color: #d1d5db;
                  z-index: 10;
                  pointer-events: none;
                  transform: translate(15px, 15px);
              }
          </style>
      </head>
      <body style="background: linear-gradient(135deg, #065f46, #047857, #059669);">
          <!-- Main Container -->
          <div class="container mx-auto p-4 sm:p-8">
              <!-- Header -->
              <header class="text-center mb-8">
                  <h1 class="text-4xl md:text-5xl font-bold text-green-100">The Future of Farming</h1>
                  <p class="mt-2 text-lg text-green-300">Select your fresh, locally-grown produce directly from our interactive vertical farm.</p>
              </header>

              <!-- Main Interactive Section -->
              <main class="relative">
                  <div class="w-full max-w-6xl mx-auto aspect-video rounded-xl overflow-hidden shadow-2xl shadow-green-900/50 border-2 border-green-800">
                      <div id="canvas-container"></div>
                  </div>
                  
                  <!-- UI Overlays -->
                  <div class="absolute top-0 left-0 p-4 sm:p-6 text-gray-300 pointer-events-none w-full z-10">
                      <div id="selection-status" class="text-lime-400 h-6 font-semibold"></div>
                  </div>
                  <button id="back-button" class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-opacity opacity-0 pointer-events-none z-10">
                      Back to Grid
                  </button>
              </main>

              <!-- Cart Section -->
              <section class="mt-12 max-w-6xl mx-auto">
                  <div class="bg-green-900/50 border border-green-800 rounded-xl p-6">
                      <h2 class="text-2xl font-bold text-green-100 border-b border-green-700 pb-3 mb-4">Your Cart</h2>
                      <div id="cart-summary" class="flex justify-between items-center text-lg mb-4">
                          <span>Total Items:</span>
                          <span id="cart-count" class="font-bold text-lime-400">0</span>
                      </div>
                      
                      <!-- Confirmation Section -->
                      <div id="confirmation-section" class="hidden mb-4 pb-4 border-b border-green-700">
                          <h3 class="text-base font-bold text-white">Confirm Action</h3>
                          <p class="text-sm text-gray-300"><span class="font-semibold">Plant:</span> <span id="confirm-plant-name"></span></p>
                          <button id="confirm-action-button" type="button" class="mt-2 w-full text-white font-bold py-2 px-4 rounded transition-colors">
                              Confirm
                          </button>
                      </div>

                      <ul id="cart-items-list" class="space-y-2 h-48 overflow-y-auto pr-2">
                          <p id="cart-placeholder" class="text-green-300">Your cart is empty. Click on a container to start selecting plants!</p>
                      </ul>
                      <button id="clear-cart-button" class="mt-4 w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors">
                          Clear Cart
                      </button>
                  </div>
              </section>
          </div>

          <!-- Popups -->
          <div id="hover-popup-grid" class="popup"></div>
          <div id="hover-popup-plant" class="popup !transform-none"></div>

          <script type="importmap">
              {
                  "imports": {
                      "three": "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js",
                      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/",
                      "gsap": "https://unpkg.com/gsap@3.12.5/index.js"
                  }
              }
          </script>

          <script type="module">
              import * as THREE from 'three';
              import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
              import gsap from 'gsap';

              // Configuration
              const CONFIG = {
                  NUM_COLS: ${FARM_CONFIG.NUM_COLS},
                  NUM_ROWS: ${FARM_CONFIG.NUM_ROWS},
                  BLOCK_SIZE: ${FARM_CONFIG.BLOCK_SIZE},
                  BLOCK_SPACING: ${FARM_CONFIG.BLOCK_SPACING},
                  get BLOCK_HEIGHT() { return this.BLOCK_SIZE * 5 },
                  NUM_PLANT_ROWS: ${FARM_CONFIG.NUM_PLANT_ROWS},
                  NUM_PLANTS_PER_ROW: ${FARM_CONFIG.NUM_PLANTS_PER_ROW},
                  COLORS: ${JSON.stringify(FARM_CONFIG.COLORS)}.map(c => new THREE.Color(c)),
                  HIGHLIGHT_COLOR: new THREE.Color("${FARM_CONFIG.HIGHLIGHT_COLOR}"),
                  BLOCKED_COLOR: new THREE.Color("${FARM_CONFIG.BLOCKED_COLOR}"),
                  SELECTED_COLOR: new THREE.Color("${FARM_CONFIG.SELECTED_COLOR}"),
                  SOLD_PLANT_COLOR: new THREE.Color("${FARM_CONFIG.SOLD_PLANT_COLOR}"),
                  BLOCKED_CONTAINERS: ${JSON.stringify(FARM_CONFIG.BLOCKED_CONTAINERS)},
                  BLOCKED_PLANTS: ${JSON.stringify(FARM_CONFIG.BLOCKED_PLANTS)},
              };

              // State Management
              const cart = new Set();
              let plantObjects = {};
              let currentView = 'grid';
              let hoveredInstanceId = null;
              let hoveredPlant = null;
              let detailGroup = null;
              let clickedPlant = null;

              // Scene Setup
              const scene = new THREE.Scene();
              scene.background = new THREE.Color(0x064e3b);
              const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
              camera.position.set(0, 80, 1);
              const initialCameraPosition = camera.position.clone();

              const renderer = new THREE.WebGLRenderer({ antialias: true });
              const canvasContainer = document.getElementById('canvas-container');
              renderer.setSize(window.innerWidth, window.innerHeight);
              renderer.setPixelRatio(window.devicePixelRatio);
              canvasContainer.appendChild(renderer.domElement);

              // Controls
              const controls = new OrbitControls(camera, renderer.domElement);
              controls.enableDamping = true;
              controls.dampingFactor = 0.05;
              controls.screenSpacePanning = true;
              controls.maxPolarAngle = Math.PI;
              controls.maxDistance = 120;

              // Lighting
              const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
              scene.add(ambientLight);
              const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
              directionalLight.position.set(50, 50, 50);
              scene.add(directionalLight);

              // Instanced Mesh Setup
              const totalInstances = CONFIG.NUM_COLS * CONFIG.NUM_ROWS;
              const geometry = new THREE.BoxGeometry(CONFIG.BLOCK_SIZE, CONFIG.BLOCK_HEIGHT, CONFIG.BLOCK_SIZE);
              const material = new THREE.MeshStandardMaterial({ roughness: 0.6, metalness: 0.2, transparent: true });
              const instancedMesh = new THREE.InstancedMesh(geometry, material, totalInstances);
              scene.add(instancedMesh);

              // Instance Data Setup
              const instanceData = [];
              const dummy = new THREE.Object3D();
              let instanceIdx = 0;
              const totalWidth = CONFIG.NUM_COLS * (CONFIG.BLOCK_SIZE + CONFIG.BLOCK_SPACING);
              const totalDepth = CONFIG.NUM_ROWS * (CONFIG.BLOCK_SIZE + CONFIG.BLOCK_SPACING);

              for (let row = 0; row < CONFIG.NUM_ROWS; row++) {
                  for (let col = 0; col < CONFIG.NUM_COLS; col++) {
                      const x = col * (CONFIG.BLOCK_SIZE + CONFIG.BLOCK_SPACING) - totalWidth / 2;
                      const z = row * (CONFIG.BLOCK_SIZE + CONFIG.BLOCK_SPACING) - totalDepth / 2;
                      dummy.position.set(x, CONFIG.BLOCK_HEIGHT / 2, z);
                      dummy.updateMatrix();
                      instancedMesh.setMatrixAt(instanceIdx, dummy.matrix);
                      const isBlocked = CONFIG.BLOCKED_CONTAINERS.includes(instanceIdx);
                      const color = isBlocked ? CONFIG.BLOCKED_COLOR : CONFIG.COLORS[(col + row) % 2];
                      instancedMesh.setColorAt(instanceIdx, color);
                      instanceData[instanceIdx] = { isBlocked, originalColor: color, hasSelection: false };
                      instanceIdx++;
                  }
              }
              instancedMesh.instanceMatrix.needsUpdate = true;
              instancedMesh.instanceColor.needsUpdate = true;

              // Event Listeners
              window.addEventListener('mousemove', onMouseMove);
              canvasContainer.addEventListener('click', onCanvasClick);
              backButton.addEventListener('click', () => { 
                  if (currentView === 'detail') transitionToGridView(); 
              });
              document.getElementById('confirm-action-button').addEventListener('click', handlePlantAction);
              document.getElementById('clear-cart-button').addEventListener('click', clearCart);

              // Functions
              function onMouseMove(event) {
                  const rect = canvasContainer.getBoundingClientRect();
                  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
                  
                  document.getElementById('hover-popup-plant').style.left = \`\${event.clientX}px\`;
                  document.getElementById('hover-popup-plant').style.top = \`\${event.clientY}px\`;
              }

              function onCanvasClick() {
                  if (currentView === 'grid') {
                      if (hoveredInstanceId !== null && !instanceData[hoveredInstanceId].isBlocked) {
                          document.getElementById('selection-status').textContent = \`Selected: Container \${hoveredInstanceId}\`;
                          transitionToDetailView(hoveredInstanceId);
                      }
                  } else if (currentView === 'detail') {
                      const intersects = raycaster.intersectObjects(detailGroup.plants);
                      if (intersects.length > 0) {
                          const newClickedPlant = intersects[0].object;
                          if (newClickedPlant.userData.isBlocked) return;
                          if (clickedPlant && clickedPlant !== newClickedPlant && !cart.has(clickedPlant.userData.uniqueId)) {
                              revertPlantColor(clickedPlant);
                          }
                          clickedPlant = newClickedPlant;
                          if (!cart.has(clickedPlant.userData.uniqueId)) {
                              clickedPlant.material.color.set(CONFIG.SELECTED_COLOR);
                              clickedPlant.material.emissive.set(CONFIG.SELECTED_COLOR);
                          }
                          showConfirmationUI(clickedPlant);
                      }
                  }
              }

              // --- Basic Setup ---
              const scene = new THREE.Scene();
              scene.background = new THREE.Color(0x047857); // Green background

              const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
              camera.position.set(0, 80, 1); 
              const initialCameraPosition = camera.position.clone();

              const renderer = new THREE.WebGLRenderer({ antialias: true });
              const canvasContainer = document.getElementById('canvas-container');
              renderer.setSize(window.innerWidth, window.innerHeight);
              renderer.setPixelRatio(window.devicePixelRatio);
              canvasContainer.appendChild(renderer.domElement);

              // --- Controls ---
              const controls = new OrbitControls(camera, renderer.domElement);
              controls.enableDamping = true;
              controls.dampingFactor = 0.05;
              controls.screenSpacePanning = true;
              controls.maxPolarAngle = Math.PI;

              // --- Lighting ---
              const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
              scene.add(ambientLight);
              const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
              directionalLight.position.set(50, 50, 50);
              scene.add(directionalLight);

              // --- Configuration ---
              const NUM_COLS = 50;
              const NUM_ROWS = 20;
              const BLOCK_SIZE = 1.5;
              const BLOCK_HEIGHT = BLOCK_SIZE * 5;
              const NUM_PLANT_ROWS = 5;
              const NUM_PLANTS_PER_ROW = 5;
              const BLOCK_SPACING = 0.5;
              const COLORS = ["#34D399", "#A7F3D0"].map(c => new THREE.Color(c)); 
              const HIGHLIGHT_COLOR = new THREE.Color("#FFFFFF");

              // --- Instanced Mesh Setup ---
              const totalInstances = NUM_COLS * NUM_ROWS;
              const geometry = new THREE.BoxGeometry(BLOCK_SIZE, BLOCK_HEIGHT, BLOCK_SIZE);
              const material = new THREE.MeshStandardMaterial({
                  roughness: 0.6,
                  metalness: 0.2,
                  transparent: true,
              });
              
              const instancedMesh = new THREE.InstancedMesh(geometry, material, totalInstances);
              scene.add(instancedMesh);

              const dummy = new THREE.Object3D();
              const originalColors = [];
              let instanceIdx = 0;
              const totalWidth = NUM_COLS * (BLOCK_SIZE + BLOCK_SPACING);
              const totalDepth = NUM_ROWS * (BLOCK_SIZE + BLOCK_SPACING);

              for (let row = 0; row < NUM_ROWS; row++) {
                  for (let col = 0; col < NUM_COLS; col++) {
                      const x = col * (BLOCK_SIZE + BLOCK_SPACING) - totalWidth / 2;
                      const z = row * (BLOCK_SIZE + BLOCK_SPACING) - totalDepth / 2;
                      dummy.position.set(x, BLOCK_HEIGHT / 2, z);
                      dummy.updateMatrix();
                      instancedMesh.setMatrixAt(instanceIdx, dummy.matrix);

                      const color = COLORS[(col + row) % 2];
                      instancedMesh.setColorAt(instanceIdx, color);
                      originalColors[instanceIdx] = color;
                      
                      instanceIdx++;
                  }
              }
              instancedMesh.instanceMatrix.needsUpdate = true;
              instancedMesh.instanceColor.needsUpdate = true;
              
              // --- State and Interactivity ---
              let currentView = 'grid';
              let hoveredInstanceId = null;
              let hoveredPlant = null;
              let detailGroup = null;

              const raycaster = new THREE.Raycaster();
              const mouse = new THREE.Vector2();
              
              const selectionStatusEl = document.getElementById('selection-status');
              const hoverPopupGridEl = document.getElementById('hover-popup-grid');
              const hoverPopupPlantEl = document.getElementById('hover-popup-plant');
              const popupIdEl = document.getElementById('popup-id');
              const popupPlantNameEl = document.getElementById('popup-plant-name');
              const backButton = document.getElementById('back-button');

              function onMouseMove(event) {
                  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
                  
                  const popup = currentView === 'grid' ? hoverPopupGridEl : hoverPopupPlantEl;
                  popup.style.left = \`\${event.clientX + 15}px\`;
                  popup.style.top = \`\${event.clientY + 15}px\`;
              }
              window.addEventListener('mousemove', onMouseMove);

              function onMouseClick(event) {
                  if (currentView !== 'grid' || hoveredInstanceId === null) return;
                  
                  const instanceId = hoveredInstanceId;
                  selectionStatusEl.textContent = \`Selected: Container \${instanceId}\`;

                  transitionToDetailView(instanceId);
              }
              window.addEventListener('click', onMouseClick);

              backButton.addEventListener('click', () => {
                  if (currentView !== 'detail') return;
                  transitionToGridView();
              });

              // --- Transitions ---
              function createDetailView(position, color) {
                  detailGroup = new THREE.Group();
                  detailGroup.position.copy(position);
                  detailGroup.plants = [];

                  const shellGeo = new THREE.BoxGeometry(BLOCK_SIZE, BLOCK_HEIGHT, BLOCK_SIZE);
                  const shellMat = new THREE.MeshStandardMaterial({
                      color: color, transparent: true, opacity: 0, roughness: 0.6, metalness: 0.2
                  });
                  const shell = new THREE.Mesh(shellGeo, shellMat);
                  detailGroup.add(shell);

                  const plantGeo = new THREE.SphereGeometry(BLOCK_SIZE * 0.1, 8, 6);
                  const plantMat = new THREE.MeshStandardMaterial({ color: 0x84cc16, roughness: 0.8 });
                  
                  const rowHeight = BLOCK_HEIGHT / NUM_PLANT_ROWS;
                  const plantSpacing = (BLOCK_SIZE * 0.8) / (NUM_PLANTS_PER_ROW -1);

                  for (let r = 0; r < NUM_PLANT_ROWS; r++) {
                      for (let p = 0; p < NUM_PLANTS_PER_ROW; p++) {
                          const plant = new THREE.Mesh(plantGeo, plantMat.clone());
                          plant.material.opacity = 0;
                          
                          const y = (r * rowHeight) - (BLOCK_HEIGHT / 2) + (rowHeight / 2);
                          const x = (p * plantSpacing) - (BLOCK_SIZE * 0.4);
                          plant.position.set(x, y, BLOCK_SIZE * 0.25);
                          
                          plant.userData = { name: \`Basil - R\${r+1}, P\${p+1}\` };
                          plant.originalScale = plant.scale.clone();
                          plant.originalEmissive = plant.material.emissive.getHex();

                          detailGroup.add(plant);
                          detailGroup.plants.push(plant);
                      }
                  }
                  scene.add(detailGroup);
              }

              function transitionToDetailView(instanceId) {
                  currentView = 'detail';
                  controls.enabled = false;
                  hoverPopupGridEl.style.display = 'none';

                  const matrix = new THREE.Matrix4();
                  instancedMesh.getMatrixAt(instanceId, matrix);
                  const position = new THREE.Vector3().setFromMatrixPosition(matrix);
                  const color = originalColors[instanceId];

                  createDetailView(position, color);

                  const tl = gsap.timeline();
                  tl.to(instancedMesh.material, { opacity: 0, duration: 0.5 })
                    .to(camera.position, {
                        x: position.x, y: position.y, z: position.z + BLOCK_HEIGHT * 1.5,
                        duration: 1, ease: 'power3.inOut'
                    }, 0)
                    .to(controls.target, {
                        x: position.x, y: position.y, z: position.z,
                        duration: 1, ease: 'power3.inOut',
                        onComplete: () => { backButton.classList.remove('opacity-0', 'pointer-events-none'); }
                    }, 0);
                  
                  detailGroup.children.forEach(child => {
                      let targetOpacity = 1;
                      if (child.isMesh && child.geometry.type === 'BoxGeometry') {
                          targetOpacity = 0.2;
                      }
                      gsap.to(child.material, { opacity: targetOpacity, duration: 0.5, delay: 0.3 });
                  });
              }

              function transitionToGridView() {
                  currentView = 'transitioning'; 
                  backButton.classList.add('opacity-0', 'pointer-events-none');
                  hoverPopupPlantEl.style.display = 'none';
                  hoverPopupGridEl.style.display = 'none';

                  if (detailGroup) {
                      detailGroup.children.forEach(child => {
                          gsap.to(child.material, { opacity: 0, duration: 0.5, onComplete: () => {
                              if (detailGroup) {
                                  detailGroup.traverse(obj => {
                                      if (obj.isMesh) {
                                          if(obj.geometry) obj.geometry.dispose();
                                          if(obj.material && obj.material.dispose) obj.material.dispose();
                                      }
                                  });
                                  scene.remove(detailGroup);
                                  detailGroup = null;
                              }
                          }});
                      });
                  }

                  const tl = gsap.timeline({
                      onComplete: () => {
                          controls.target.set(0, 0, 0);
                          controls.enabled = true;
                          controls.update();
                          currentView = 'grid'; 
                      }
                  });
                  tl.to(camera.position, {
                      x: initialCameraPosition.x, y: initialCameraPosition.y, z: initialCameraPosition.z,
                      duration: 1.2, ease: 'power3.inOut'
                  }, 0)
                  .to(controls.target, {
                      x: 0, y: 0, z: 0,
                      duration: 1.2, ease: 'power3.inOut'
                  }, 0)
                  .to(instancedMesh.material, { 
                      opacity: 1, duration: 0.5, delay: 0.2
                  }, 0);
              }

              // --- Animation Loop ---
              function animate() {
                  requestAnimationFrame(animate);
                  controls.update();
                  raycaster.setFromCamera(mouse, camera);

                  if (currentView === 'grid') {
                      const intersects = raycaster.intersectObject(instancedMesh);
                      if (intersects.length > 0) {
                          const instanceId = intersects[0].instanceId;
                          if (hoveredInstanceId !== instanceId) {
                              if (hoveredInstanceId !== null) instancedMesh.setColorAt(hoveredInstanceId, originalColors[hoveredInstanceId]);
                              hoveredInstanceId = instanceId;
                              instancedMesh.setColorAt(hoveredInstanceId, HIGHLIGHT_COLOR);
                              instancedMesh.instanceColor.needsUpdate = true;
                              popupIdEl.textContent = hoveredInstanceId;
                              hoverPopupGridEl.style.display = 'block';
                          }
                      } else {
                          if (hoveredInstanceId !== null) {
                              instancedMesh.setColorAt(hoveredInstanceId, originalColors[hoveredInstanceId]);
                              instancedMesh.instanceColor.needsUpdate = true;
                              hoveredInstanceId = null;
                          }
                          hoverPopupGridEl.style.display = 'none';
                      }
                  } else if (currentView === 'detail' && detailGroup) {
                      const plantIntersects = raycaster.intersectObjects(detailGroup.plants);
                      if (plantIntersects.length > 0) {
                          const plant = plantIntersects[0].object;
                          if (hoveredPlant !== plant) {
                              if (hoveredPlant) {
                                  gsap.to(hoveredPlant.scale, { ...hoveredPlant.originalScale, duration: 0.2 });
                                  hoveredPlant.material.emissive.setHex(hoveredPlant.originalEmissive);
                              }
                              hoveredPlant = plant;
                              gsap.to(hoveredPlant.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.2 });
                              hoveredPlant.material.emissive.setHex(0xffffff);
                              popupPlantNameEl.textContent = hoveredPlant.userData.name;
                              hoverPopupPlantEl.style.display = 'block';
                          }
                      } else {
                          if (hoveredPlant) {
                              gsap.to(hoveredPlant.scale, { ...hoveredPlant.originalScale, duration: 0.2 });
                              hoveredPlant.material.emissive.setHex(hoveredPlant.originalEmissive);
                              hoveredPlant = null;
                          }
                          hoverPopupPlantEl.style.display = 'none';
                      }
                  }
                  
                  renderer.render(scene, camera);
              }

              // --- Responsive Design ---
              window.addEventListener('resize', () => {
                  camera.aspect = window.innerWidth / window.innerHeight;
                  camera.updateProjectionMatrix();
                  renderer.setSize(window.innerWidth, window.innerHeight);
              });

              // Start Animation
              animate();
              playIntroAnimation();
          </script>
      </body>
      </html>
    `;

        // Create and inject iframe
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        containerRef.current.appendChild(iframe);

        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(farmHTML);
            iframeDoc.close();
        }

        return () => {
            if (containerRef.current && iframe) {
                containerRef.current.removeChild(iframe);
            }
        };
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
            <Header />
            <div className="relative pt-20 pb-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                            Interactive <span className="text-green-600">Farm Experience</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Explore our cutting-edge vertical farming technology. Click and interact with each growing container to see our crops in action.
                        </p>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4">
                            <h2 className="text-2xl font-bold">3D Interactive Farm</h2>
                            <p className="text-green-100">Click containers to explore • Drag to rotate • Scroll to zoom</p>
                        </div>
                        <div 
                            ref={containerRef} 
                            className="w-full h-[500px] md:h-[600px] bg-gradient-to-br from-green-800 to-emerald-800" 
                            style={{ position: 'relative' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Farm;