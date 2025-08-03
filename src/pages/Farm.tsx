import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

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
    if (!user || !containerRef.current) return;

    // Create and inject the 3D farm content
    const farmHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Interactive 3D Instanced Grid</title>
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
              }
              .popup {
                  position: absolute;
                  display: none;
                  padding: 12px;
                  background-color: rgba(31, 41, 55, 0.8);
                  backdrop-filter: blur(5px);
                  border: 1px solid #4b5563;
                  border-radius: 8px;
                  color: #d1d5db;
                  pointer-events: none;
                  transition: opacity 0.2s;
                  z-index: 10;
              }
          </style>
      </head>
      <body class="bg-gray-900 text-white">

          <!-- UI Overlays -->
          <div class="absolute top-0 left-0 p-4 sm:p-6 text-gray-300 pointer-events-none w-full">
              <h1 class="text-2xl md:text-3xl font-bold text-gray-100">Interactive Vertical Farm</h1>
              <div id="status" class="mt-2 text-gray-400">
                  Left-Click & Drag: Rotate | Right-Click & Drag: Pan | Scroll: Zoom
              </div>
              <div id="selection-status" class="mt-1 text-cyan-400 h-6 font-semibold"></div>
          </div>
          
          <button id="back-button" class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-opacity opacity-0 pointer-events-none">
              Back to Grid
          </button>

          <!-- Popups -->
          <div id="hover-popup-grid" class="popup">
              <h3 class="font-bold text-white mb-1">Container #<span id="popup-id"></span></h3>
              <ul>
                  <li>- Hydroponic Lettuce</li>
                  <li>- Basil</li>
                  <li>- Cherry Tomatoes</li>
              </ul>
          </div>
          <div id="hover-popup-plant" class="popup">
              <p id="popup-plant-name" class="font-bold text-white"></p>
          </div>

          <!-- Canvas Container -->
          <div id="canvas-container"></div>

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

              // --- Basic Setup ---
              const scene = new THREE.Scene();
              scene.background = new THREE.Color(0x111827); // bg-gray-900

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
              // CHANGED: Colors now match the provided website theme
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

                      // CHANGED: Create a checkerboard pattern with the two green shades
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
                  detailGroup.plants = []; // Array to hold plant meshes for raycasting

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
                          targetOpacity = 0.2; // Make shell transparent
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

              // --- Responsive Design ---
              window.addEventListener('resize', () => {
                  camera.aspect = window.innerWidth / window.innerHeight;
                  camera.updateProjectionMatrix();
                  renderer.setSize(window.innerWidth, window.innerHeight);
              });

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

              animate();
          </script>

      </body>
      </html>
    `;

    // Create iframe and inject the content
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    
    containerRef.current.appendChild(iframe);
    
    // Write the content to iframe
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(farmHTML);
    iframeDoc.close();

    return () => {
      if (containerRef.current && iframe) {
        containerRef.current.removeChild(iframe);
      }
    };
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="w-full h-screen" ref={containerRef}>
      {/* The 3D farm will be injected here */}
    </div>
  );
};

export default Farm;