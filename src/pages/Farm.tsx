import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  container: string;
  quantity?: number;
}

interface CartState {
  items: CartItem[];
  count: number;
}

export const FarmInteractive = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create and inject the farm HTML content with improved styling
    const farmHTML = `
      <div class="container mx-auto p-4 sm:p-8">
        <!-- Header -->
        <header class="text-center mb-8">
          <h1 class="text-4xl md:text-5xl font-bold text-green-100">The Future of Farming</h1>
          <p class="mt-2 text-lg text-green-300">Select your fresh, locally-grown produce directly from our interactive vertical farm.</p>
        </header>

        <!-- Main Interactive Section -->
        <main class="relative">
          <!-- 3D Canvas Card -->
          <div class="w-full max-w-6xl mx-auto aspect-video rounded-xl overflow-hidden shadow-2xl shadow-green-900/50 border-2 border-green-800">
             <div id="canvas-container"></div>
          </div>
         
          <!-- UI Overlays for the Canvas -->
          <div class="absolute top-0 left-0 p-4 sm:p-6 text-gray-300 pointer-events-none w-full z-10">
            <div id="selection-status" class="text-lime-400 h-6 font-semibold"></div>
          </div>
          <button id="back-button" class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-opacity opacity-0 pointer-events-none z-10">
            Back to Grid
          </button>
        </main>

        <!-- Cart and Checkout Section -->
        <section class="mt-12 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <!-- Cart -->
            <div class="bg-green-900/50 border border-green-800 rounded-xl p-6">
                <h2 class="text-2xl font-bold text-green-100 border-b border-green-700 pb-3 mb-4">Your Cart</h2>
                <div id="cart-summary" class="flex justify-between items-center text-lg mb-4">
                    <span>Total Items:</span>
                    <span id="cart-count" class="font-bold text-lime-400">0</span>
                </div>
                
                <ul id="cart-items-list" class="space-y-2 h-48 overflow-y-auto pr-2">
                    <!-- Cart items will be dynamically added here -->
                     <p id="cart-placeholder" class="text-green-300">Your cart is empty. Click on a container to start selecting plants!</p>
                </ul>
                <button id="clear-cart-button" class="mt-4 w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors">
                    Clear Cart
                </button>
            </div>

            <!-- Checkout -->
            <div class="bg-green-900/50 border border-green-800 rounded-xl p-6">
                <h2 class="text-2xl font-bold text-green-100 border-b border-green-700 pb-3 mb-4">Checkout</h2>
                <form id="checkout-form">
                    <div class="space-y-4">
                        <div>
                            <label for="name" class="block text-sm font-medium text-green-200">Full Name</label>
                            <input type="text" id="name" name="name" class="form-input mt-1 block w-full rounded-md shadow-sm" required>
                        </div>
                        <div>
                            <label for="address" class="block text-sm font-medium text-green-200">Delivery Address</label>
                            <input type="text" id="address" name="address" class="form-input mt-1 block w-full rounded-md shadow-sm" required>
                        </div>
                        <div>
                            <label for="card-number" class="block text-sm font-medium text-green-200">Card Number</label>
                            <input type="text" id="card-number" name="card-number" class="form-input mt-1 block w-full rounded-md shadow-sm" placeholder="•••• •••• •••• ••••" required>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label for="expiry" class="block text-sm font-medium text-green-200">Expiry (MM/YY)</label>
                                <input type="text" id="expiry" name="expiry" class="form-input mt-1 block w-full rounded-md shadow-sm" placeholder="MM/YY" required>
                            </div>
                            <div>
                                <label for="cvv" class="block text-sm font-medium text-green-200">CVV</label>
                                <input type="text" id="cvv" name="cvv" class="form-input mt-1 block w-full rounded-md shadow-sm" placeholder="•••" required>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="mt-6 w-full bg-lime-600 hover:bg-lime-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg text-lg transition-colors">
                        Place Order
                    </button>
                </form>
            </div>
        </section>
      </div>

      <!-- Popups for 3D Scene -->
      <div id="hover-popup-grid" class="popup"></div>
      <div id="hover-popup-plant" class="popup !transform-none"></div>
    `;

    containerRef.current.innerHTML = farmHTML;

    // Create and inject styles
    const style = document.createElement('style');
    style.textContent = `
      body, html {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
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
    `;
    document.head.appendChild(style);

    // Load and execute the Three.js script
    const loadScript = () => {
      const importMap = document.createElement('script');
      importMap.type = 'importmap';
      importMap.textContent = JSON.stringify({
        imports: {
          "three": "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js",
          "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/",
          "gsap": "https://unpkg.com/gsap@3.12.5/index.js"
        }
      });
      document.head.appendChild(importMap);

      const script = document.createElement('script');
      script.type = 'module';
      script.innerHTML = `
        import * as THREE from 'three';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
        import gsap from 'gsap';

        // --- Configuration ---
        const CONFIG = {
            NUM_COLS: 50,
            NUM_ROWS: 20,
            BLOCK_SIZE: 1.5,
            BLOCK_SPACING: 0.5,
            get BLOCK_HEIGHT() { return this.BLOCK_SIZE * 5 },
            NUM_PLANT_ROWS: 5,
            NUM_PLANTS_PER_ROW: 25,
            COLORS: ["#10B981", "#6EE7B7"].map(c => new THREE.Color(c)),
            HIGHLIGHT_COLOR: new THREE.Color("#BEF264"),
            BLOCKED_COLOR: new THREE.Color("#4B5563"),
            SELECTED_COLOR: new THREE.Color("#FACC15"),
            SOLD_PLANT_COLOR: new THREE.Color("#000000"),
            BLOCKED_CONTAINERS: [15, 28],
            BLOCKED_PLANTS: ['58-2-4', '58-3-1', '100-0-8', '100-4-24','101-3-2'],
        };

        // --- State Management ---
        const cart = new Set();
        let plantObjects = {};
        let currentView = 'grid'; 
        let hoveredInstanceId = null;
        let hoveredPlant = null;
        let detailGroup = null;
        let clickedPlant = null;

        // --- DOM Element References ---
        const canvasContainer = document.getElementById('canvas-container');
        const selectionStatusEl = document.getElementById('selection-status');
        const backButton = document.getElementById('back-button');
        const cartCountEl = document.getElementById('cart-count');
        const clearCartButton = document.getElementById('clear-cart-button');
        const hoverPopupPlantEl = document.getElementById('hover-popup-plant');
        const cartItemsList = document.getElementById('cart-items-list');
        const cartPlaceholder = document.getElementById('cart-placeholder');
        const checkoutForm = document.getElementById('checkout-form');

        // --- Basic Setup ---
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x064e3b);
        const camera = new THREE.PerspectiveCamera(75, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
        camera.position.set(0, 80, 1); 
        const initialCameraPosition = camera.position.clone();
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        canvasContainer.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = true;
        controls.maxPolarAngle = Math.PI;
        controls.maxDistance = 120;
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position.set(50, 50, 50);
        scene.add(directionalLight);

        // --- Instanced Mesh Setup ---
        const totalInstances = CONFIG.NUM_COLS * CONFIG.NUM_ROWS;
        const geometry = new THREE.BoxGeometry(CONFIG.BLOCK_SIZE, CONFIG.BLOCK_HEIGHT, CONFIG.BLOCK_SIZE);
        const material = new THREE.MeshStandardMaterial({ roughness: 0.6, metalness: 0.2, transparent: true });
        const instancedMesh = new THREE.InstancedMesh(geometry, material, totalInstances);
        scene.add(instancedMesh);

        // --- Instance Data Setup ---
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
        
        // --- Event Listeners ---
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        window.addEventListener('mousemove', onMouseMove);
        canvasContainer.addEventListener('click', onCanvasClick);
        backButton.addEventListener('click', () => { if (currentView === 'detail') transitionToGridView(); });
        if (clearCartButton) clearCartButton.addEventListener('click', clearCart);
        if (checkoutForm) checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if(cart.size === 0) {
                alert("Your cart is empty!");
                return;
            }
            alert("Thank you for your order! (This is a demo)");
            clearCart();
            checkoutForm.reset();
        });
        
        function onMouseMove(event) {
            const rect = canvasContainer.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            hoverPopupPlantEl.style.left = event.clientX + 'px';
            hoverPopupPlantEl.style.top = event.clientY + 'px';
        }
        
        window.addEventListener('resize', () => {
            camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        });

        function onCanvasClick() {
            if (currentView === 'grid') {
                if (hoveredInstanceId !== null && !instanceData[hoveredInstanceId].isBlocked) {
                    selectionStatusEl.textContent = 'Selected: Container ' + hoveredInstanceId;
                    transitionToDetailView(hoveredInstanceId);
                }
            } else if (currentView === 'detail') {
                const intersects = raycaster.intersectObjects(detailGroup.plants);
                if (intersects.length > 0) {
                    const newClickedPlant = intersects[0].object;
                    if (newClickedPlant.userData.isBlocked) return;
                    
                    if (cart.has(newClickedPlant.userData.uniqueId)) {
                        deselectPlant(newClickedPlant.userData.uniqueId);
                    } else {
                        selectPlant(newClickedPlant.userData.uniqueId);
                    }
                }
            }
        }

        // --- Cart and UI Logic ---
        function updateCartUI() {
            // Update both internal DOM and external React cart
            if (cartCountEl) cartCountEl.textContent = cart.size;
            if (cartItemsList) {
                cartItemsList.innerHTML = '';
                if (cart.size === 0) {
                    if (cartPlaceholder) cartPlaceholder.classList.remove('hidden');
                } else {
                    if (cartPlaceholder) cartPlaceholder.classList.add('hidden');
                    cart.forEach(uniqueId => {
                        const plant = plantObjects[uniqueId];
                        if (plant) {
                            const li = document.createElement('li');
                            li.textContent = plant.userData.name + ' (Container ' + uniqueId.split('-')[0] + ')';
                            li.className = 'text-green-200';
                            cartItemsList.appendChild(li);
                        }
                    });
                }
            }
            
            // Update external React cart via custom event
            const cartData = Array.from(cart).map(uniqueId => {
                const plant = plantObjects[uniqueId];
                return plant ? {
                    id: uniqueId,
                    name: plant.userData.name,
                    container: uniqueId.split('-')[0]
                } : null;
            }).filter(Boolean);
            
            window.dispatchEvent(new CustomEvent('farmCartUpdate', { 
                detail: { cart: cartData, count: cart.size } 
            }));
        }

        function selectPlant(uniqueId) {
            cart.add(uniqueId);
            const instanceIdParts = uniqueId.split('-');
            const instanceId = parseInt(instanceIdParts[0], 10);
            const plantMesh = plantObjects[uniqueId];
            if (plantMesh) {
                plantMesh.material.color.set(CONFIG.SELECTED_COLOR);
                plantMesh.material.emissive.set(CONFIG.SELECTED_COLOR);
            }
            instanceData[instanceId].hasSelection = true;
            updateContainerColor(instanceId);
            updateCartUI();
        }

        function deselectPlant(uniqueId) {
            cart.delete(uniqueId);
            const instanceIdParts = uniqueId.split('-');
            const instanceId = parseInt(instanceIdParts[0], 10);
            revertPlantColor(plantObjects[uniqueId]);

            let hasOtherSelection = false;
            for (const id of cart) {
                if (id.startsWith(instanceId + '-')) {
                    hasOtherSelection = true;
                    break;
                }
            }
            instanceData[instanceId].hasSelection = hasOtherSelection;
            updateContainerColor(instanceId);
            updateCartUI();
        }
        
        function revertPlantColor(plant) {
            if (plant && !plant.userData.isBlocked) {
                plant.material.color.set(0x84cc16);
                plant.material.emissive.set(plant.originalEmissive);
            }
        }

        function clearCart() {
            cart.forEach(uniqueId => {
                const instanceIdParts = uniqueId.split('-');
                const instanceId = parseInt(instanceIdParts[0], 10);
                instanceData[instanceId].hasSelection = false;
                updateContainerColor(instanceId);
            });
            if (currentView === 'detail' && detailGroup) {
                detailGroup.plants.forEach(plant => {
                    if (cart.has(plant.userData.uniqueId)) {
                        revertPlantColor(plant);
                    }
                });
            }
            cart.clear();
            updateCartUI();
        }
        
        // Listen for external clear cart events
        window.addEventListener('clearFarmCart', clearCart);
        
        // Listen for cart events from external components
        window.addEventListener('quantityChanged', (event) => {
          const { id, quantity } = event.detail;
          if (quantity === 0) {
            if (cart.has(id)) {
              deselectPlant(id);
            }
          }
        });
        
        window.addEventListener('removeFromCart', (event) => {
          const { id } = event.detail;
          if (cart.has(id)) {
            deselectPlant(id);
          }
        });

        function updateContainerColor(id) {
            if (id === null) return;
            const data = instanceData[id];
            const color = data.hasSelection ? CONFIG.SELECTED_COLOR : data.originalColor;
            instancedMesh.setColorAt(id, color);
            instancedMesh.instanceColor.needsUpdate = true;
        }

        // --- View Transitions ---
        function createDetailView(instanceId, position, color) {
            detailGroup = new THREE.Group();
            detailGroup.position.copy(position);
            detailGroup.plants = [];
            plantObjects = {};

            const shellGeo = new THREE.BoxGeometry(CONFIG.BLOCK_SIZE, CONFIG.BLOCK_HEIGHT, CONFIG.BLOCK_SIZE);
            const shellMat = new THREE.MeshStandardMaterial({ color, transparent: true, opacity: 0 });
            const shell = new THREE.Mesh(shellGeo, shellMat);
            shell.visible = false;
            detailGroup.add(shell);

            const plantGeo = new THREE.SphereGeometry(CONFIG.BLOCK_SIZE * 0.1, 8, 6);
            const plantMat = new THREE.MeshStandardMaterial({ color: 0x84cc16, roughness: 0.8 });
            
            const rowHeight = CONFIG.BLOCK_HEIGHT / CONFIG.NUM_PLANT_ROWS;
            
            const numPlants = CONFIG.NUM_PLANTS_PER_ROW;
            const plantDiameter = CONFIG.BLOCK_SIZE * 0.2;
            const fixedGap = CONFIG.BLOCK_SIZE * 0.15;
            const totalRowWidth = (numPlants * plantDiameter) + (Math.max(0, numPlants - 1) * fixedGap);
            const startX = -totalRowWidth / 2;

            for (let r = 0; r < CONFIG.NUM_PLANT_ROWS; r++) {
                for (let p = 0; p < numPlants; p++) {
                    const plant = new THREE.Mesh(plantGeo, plantMat.clone());
                    plant.material.opacity = 0;
                    const y = (r * rowHeight) - (CONFIG.BLOCK_HEIGHT / 2) + (rowHeight / 2);
                    const x = startX + (plantDiameter / 2) + (p * (plantDiameter + fixedGap));
                    plant.position.set(x, y, 0);
                    
                    const uniqueId = instanceId + '-' + r + '-' + p;
                    const isBlocked = CONFIG.BLOCKED_PLANTS.includes(uniqueId);
                    plant.userData = { name: 'Basil - R' + (r+1) + ', P' + (p+1), uniqueId, isBlocked };
                    plant.originalEmissive = plant.material.emissive.getHex();

                    if (isBlocked) {
                        plant.material.color.set(CONFIG.SOLD_PLANT_COLOR);
                        plant.material.emissive.set(CONFIG.SOLD_PLANT_COLOR);
                    } else if (cart.has(uniqueId)) {
                        plant.material.color.set(CONFIG.SELECTED_COLOR);
                        plant.material.emissive.set(CONFIG.SELECTED_COLOR);
                    }

                    detailGroup.add(plant);
                    detailGroup.plants.push(plant);
                    plantObjects[uniqueId] = plant;
                }
            }
            scene.add(detailGroup);
            updateCartUI();
        }

        function transitionToDetailView(instanceId) {
            currentView = 'detail';
            controls.enabled = false;

            const matrix = new THREE.Matrix4();
            instancedMesh.getMatrixAt(instanceId, matrix);
            const position = new THREE.Vector3().setFromMatrixPosition(matrix);
            const color = instanceData[instanceId].originalColor;

            createDetailView(instanceId, position, color);

            const tl = gsap.timeline();
            tl.to(instancedMesh.material, { opacity: 0, duration: 0.5 })
              .to(camera.position, { x: position.x, y: position.y, z: position.z + CONFIG.BLOCK_HEIGHT * 1.5, duration: 1, ease: 'power3.inOut' }, 0)
              .to(controls.target, { x: position.x, y: position.y, z: position.z, duration: 1, ease: 'power3.inOut', onComplete: () => backButton.classList.remove('opacity-0', 'pointer-events-none') }, 0);
            
            detailGroup.plants.forEach(plant => {
                gsap.to(plant.material, { opacity: 1, duration: 0.5, delay: 0.3 });
            });
        }

        function transitionToGridView() {
            currentView = 'transitioning'; 
            backButton.classList.add('opacity-0', 'pointer-events-none');
            selectionStatusEl.textContent = '';
            
            if (detailGroup) {
                gsap.to(detailGroup.children.map(c => c.material), {
                    opacity: 0, duration: 0.5,
                    onComplete: () => {
                        if (detailGroup) {
                            detailGroup.traverse(obj => { if (obj.isMesh) { obj.geometry.dispose(); if(obj.material && obj.material.dispose) obj.material.dispose(); }});
                            scene.remove(detailGroup);
                            detailGroup = null;
                            plantObjects = {};
                        }
                    }
                });
            }

            const tl = gsap.timeline({ onComplete: () => { controls.target.set(0, 0, 0); controls.enabled = true; controls.update(); currentView = 'grid'; }});
            tl.to(camera.position, { x: initialCameraPosition.x, y: initialCameraPosition.y, z: initialCameraPosition.z, duration: 1.2, ease: 'power3.inOut' }, 0)
              .to(controls.target, { x: 0, y: 0, z: 0, duration: 1.2, ease: 'power3.inOut' }, 0)
              .to(instancedMesh.material, { opacity: 1, duration: 0.5, delay: 0.2 }, 0);
        }

        // --- Animation Loop ---
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            raycaster.setFromCamera(mouse, camera);

            if (controls.enabled && currentView === 'grid') {
                const intersects = raycaster.intersectObject(instancedMesh);
                if (intersects.length > 0) {
                    const instanceId = intersects[0].instanceId;
                    const data = instanceData[instanceId];
                    if (hoveredInstanceId !== instanceId) {
                        updateContainerColor(hoveredInstanceId);
                        hoveredInstanceId = instanceId;
                        if (!data.isBlocked) {
                           instancedMesh.setColorAt(hoveredInstanceId, CONFIG.HIGHLIGHT_COLOR);
                           instancedMesh.instanceColor.needsUpdate = true;
                        }
                    }
                } else {
                    if (hoveredInstanceId !== null) {
                        updateContainerColor(hoveredInstanceId);
                        hoveredInstanceId = null;
                    }
                }
            } else if (currentView === 'detail' && detailGroup) {
                const plantIntersects = raycaster.intersectObjects(detailGroup.plants);
                const currentHoveredPlant = plantIntersects.length > 0 ? plantIntersects[0].object : null;

                if (hoveredPlant !== currentHoveredPlant) {
                    if (hoveredPlant && !cart.has(hoveredPlant.userData.uniqueId)) {
                        revertPlantColor(hoveredPlant);
                    }
                    hoveredPlant = currentHoveredPlant;
                    if (hoveredPlant && !cart.has(hoveredPlant.userData.uniqueId)) {
                        hoveredPlant.material.emissive.set(CONFIG.HIGHLIGHT_COLOR);
                    }
                }
                
                if(hoveredPlant) {
                    hoverPopupPlantEl.innerHTML = '<p class="font-bold text-white">' + (hoveredPlant.userData.isBlocked ? 'Sold' : hoveredPlant.userData.name) + '</p>';
                    hoverPopupPlantEl.style.display = 'block';
                } else {
                    hoverPopupPlantEl.style.display = 'none';
                }
            }
            
            renderer.render(scene, camera);
        }

        function playIntroAnimation() {
            controls.enabled = false;
            const tl = gsap.timeline({ onComplete: () => { controls.enabled = true; }});
            tl.to(camera.position, { x: 80, y: 60, z: 80, duration: 2.5, ease: 'power3.inOut', delay: 0.5 })
              .to(camera.position, { x: initialCameraPosition.x, y: initialCameraPosition.y, z: initialCameraPosition.z, duration: 2.5, ease: 'power3.inOut', delay: 0.5 });
        }
        
        animate();
        playIntroAnimation();
      `;
      document.body.appendChild(script);
    };

    setTimeout(loadScript, 100);

    return () => {
      const styles = document.querySelectorAll('style');
      styles.forEach(style => {
        if (style.textContent?.includes('.popup')) {
          style.remove();
        }
      });
      
      const scripts = document.querySelectorAll('script[type="module"], script[type="importmap"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('three') || script.textContent?.includes('CONFIG')) {
          script.remove();
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="bg-green-950 text-white min-h-screen"
      style={{
        fontFamily: 'Inter, sans-serif'
      }}
    />
  );
};

export const CartHeader = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleCartUpdate = (event: CustomEvent) => {
      setCartCount(event.detail.count);
    };

    window.addEventListener('farmCartUpdate', handleCartUpdate as EventListener);
    return () => window.removeEventListener('farmCartUpdate', handleCartUpdate as EventListener);
  }, []);

  return (
    <div className="flex items-center justify-between bg-card/50 rounded-lg p-4 mb-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">eRefresh Farm</h2>
        <p className="text-muted-foreground">Fresh Vertical Farming</p>
      </div>
      <div className="flex items-center gap-2">
        <ShoppingCart className="h-5 w-5 text-primary" />
        {cartCount > 0 && (
          <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-sm min-w-[1.5rem] h-6 flex items-center justify-center animate-scale-in">
            {cartCount}
          </span>
        )}
      </div>
    </div>
  );
};

export const CartItemCard = ({ item, onQuantityChange, onRemove }: {
  item: CartItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) => {
  const quantity = item.quantity || 1;

  return (
    <Card className="mb-4 hover-scale transition-all duration-300 hover:shadow-lg border-primary/20 hover:border-primary/40">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1628155930542-3c7efd202dc5?w=48&h=48&fit=crop&crop=center" 
              alt="Basil plant" 
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
            />
            <div>
              <h3 className="font-semibold text-foreground">{item.name}</h3>
              <p className="text-sm text-muted-foreground">Container {item.container}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-primary/30 rounded-lg bg-primary/5">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => quantity > 1 ? onQuantityChange(item.id, quantity - 1) : onRemove(item.id)}
                className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center text-primary">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onQuantityChange(item.id, quantity + 1)}
                className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-lg font-bold text-primary">₹15</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const CartSection = () => {
  const [cartState, setCartState] = useState<CartState>({ items: [], count: 0 });

  useEffect(() => {
    const handleCartUpdate = (event: CustomEvent) => {
      const { cart, count } = event.detail;
      setCartState(prevState => {
        const itemsWithQuantity = cart.map((item: CartItem) => {
          const existingItem = prevState.items.find(existing => existing.id === item.id);
          return {
            ...item,
            quantity: existingItem?.quantity || 1
          };
        });
        return { items: itemsWithQuantity, count };
      });
    };

    window.addEventListener('farmCartUpdate', handleCartUpdate as EventListener);
    return () => window.removeEventListener('farmCartUpdate', handleCartUpdate as EventListener);
  }, []);

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartState(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    }));
    
    window.dispatchEvent(new CustomEvent('quantityChanged', { 
      detail: { id, quantity } 
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCartState(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
      count: prev.count - 1
    }));
    
    window.dispatchEvent(new CustomEvent('removeFromCart', { 
      detail: { id } 
    }));
  };

  const handleClearCart = () => {
    setCartState({ items: [], count: 0 });
    window.dispatchEvent(new CustomEvent('clearFarmCart'));
  };

  const total = cartState.items.reduce((sum, item) => sum + (item.quantity || 1) * 15, 0);

  if (cartState.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <Card className="hover-scale transition-all duration-300 border-primary/20">
          <CardContent className="p-8 text-center animate-fade-in">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Your cart is empty</h3>
            <p className="text-muted-foreground">Click on a container in the farm above to start selecting plants!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Your Cart</h2>
          {cartState.items.map((item, index) => (
            <div key={item.id} style={{ animationDelay: (index * 100) + 'ms' }} className="animate-fade-in">
              <CartItemCard
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            </div>
          ))}
          <Button 
            variant="outline" 
            onClick={handleClearCart}
            className="w-full mt-4 border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
          >
            Clear Cart
          </Button>
        </div>
        
        <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <Card className="hover-scale transition-all duration-300 border-primary/20 hover:border-primary/40 hover:shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Order Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items ({cartState.count})</span>
                  <span className="text-primary font-medium">₹{total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-primary font-medium">Free</span>
                </div>
                <hr className="my-2 border-primary/20" />
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">₹{total}</span>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-card hover:text-foreground hover:border hover:border-primary transition-all duration-300">
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Farm = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="py-8 space-y-8">
        <CartHeader />
        <FarmInteractive />
        <CartSection />
      </div>
    </div>
  );
};

export default Farm;