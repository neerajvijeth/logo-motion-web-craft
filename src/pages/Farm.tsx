import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const Farm = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create iframe element
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '12px';

    // HTML content for the 3D farm
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Vertical Farm</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
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
        .form-input {
            background-color: #052e16;
            border: 1px solid #065f46;
            color: #ecfdf5;
        }
        .form-input:focus {
            outline: none;
            border-color: #34d399;
            box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.5);
        }
    </style>
</head>
<body class="bg-green-950 text-white">

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
                
                <!-- Confirmation Section (Moved Here) -->
                <div id="confirmation-section" class="hidden mb-4 pb-4 border-b border-green-700">
                     <h3 class="text-base font-bold text-white">Confirm Action</h3>
                     <p class="text-sm text-gray-300"><span class="font-semibold">Plant:</span> <span id="confirm-plant-name"></span></p>
                     <button id="confirm-action-button" type="button" class="mt-2 w-full text-white font-bold py-2 px-4 rounded transition-colors">
                        Confirm
                    </button>
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
        const confirmationSection = document.getElementById('confirmation-section');
        const confirmPlantNameEl = document.getElementById('confirm-plant-name');
        const confirmActionButton = document.getElementById('confirm-action-button');
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
        confirmActionButton.addEventListener('click', handlePlantAction);
        clearCartButton.addEventListener('click', clearCart);
        checkoutForm.addEventListener('submit', (e) => {
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
            
            hoverPopupPlantEl.style.left = `${event.clientX}px`;
            hoverPopupPlantEl.style.top = `${event.clientY}px`;
        }
        
        window.addEventListener('resize', () => {
            camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        });

        function onCanvasClick() {
            if (currentView === 'grid') {
                if (hoveredInstanceId !== null && !instanceData[hoveredInstanceId].isBlocked) {
                    selectionStatusEl.textContent = `Selected: Container ${hoveredInstanceId}`;
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

        // --- Cart and UI Logic ---
        function updateCartUI() {
            cartCountEl.textContent = cart.size;
            cartItemsList.innerHTML = '';
            if (cart.size === 0) {
                cartPlaceholder.classList.remove('hidden');
            } else {
                cartPlaceholder.classList.add('hidden');
                cart.forEach(uniqueId => {
                    const plant = plantObjects[uniqueId];
                    if (plant) {
                        const li = document.createElement('li');
                        li.textContent = `${plant.userData.name} (Container ${uniqueId.split('-')[0]})`;
                        li.className = 'text-green-200';
                        cartItemsList.appendChild(li);
                    }
                });
            }
        }

        function handlePlantAction() {
            const uniqueId = confirmActionButton.dataset.plantId;
            if (!uniqueId) return;
            if (cart.has(uniqueId)) {
                deselectPlant(uniqueId);
            } else {
                selectPlant(uniqueId);
            }
            confirmationSection.classList.add('hidden');
            clickedPlant = null;
        }

        function selectPlant(uniqueId) {
            cart.add(uniqueId);
            const [instanceIdStr] = uniqueId.split('-');
            const instanceId = parseInt(instanceIdStr, 10);
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
            const [instanceIdStr] = uniqueId.split('-');
            const instanceId = parseInt(instanceIdStr, 10);
            revertPlantColor(plantObjects[uniqueId]);

            let hasOtherSelection = false;
            for (const id of cart) {
                if (id.startsWith(\`\${instanceId}-\`)) {
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
                const [instanceIdStr] = uniqueId.split('-');
                const instanceId = parseInt(instanceIdStr, 10);
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
            confirmationSection.classList.add('hidden');
            clickedPlant = null;
        }

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
                    
                    const uniqueId = \`\${instanceId}-\${r}-\${p}\`;
                    const isBlocked = CONFIG.BLOCKED_PLANTS.includes(uniqueId);
                    plant.userData = { name: \`Basil - R\${r+1}, P\${p+1}\`, uniqueId, isBlocked };
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
            confirmationSection.classList.add('hidden');
            selectionStatusEl.textContent = '';
            
            if (clickedPlant && !cart.has(clickedPlant.userData.uniqueId)) {
                revertPlantColor(clickedPlant);
            }
            clickedPlant = null;

            if (detailGroup) {
                gsap.to(detailGroup.children.map(c => c.material), {
                    opacity: 0, duration: 0.5,
                    onComplete: () => {
                        if (detailGroup) {
                            detailGroup.traverse(obj => { if (obj.isMesh) { obj.geometry.dispose(); if(obj.material?.dispose) obj.material.dispose(); }});
                            scene.remove(detailGroup);
                            detailGroup = null;
                            plantObjects = {};
                        }
                    }
                });
            }

            const tl = gsap.timeline({ onComplete: () => { controls.target.set(0, 0, 0); controls.enabled = true; controls.update(); currentView = 'grid'; }});
            tl.to(camera.position, { ...initialCameraPosition, duration: 1.2, ease: 'power3.inOut' }, 0)
              .to(controls.target, { x: 0, y: 0, z: 0, duration: 1.2, ease: 'power3.inOut' }, 0)
              .to(instancedMesh.material, { opacity: 1, duration: 0.5, delay: 0.2 }, 0);
        }
        
        function showConfirmationUI(plant) {
            if (plant) {
                confirmationSection.classList.remove('hidden');
                const isSelected = cart.has(plant.userData.uniqueId);
                
                confirmPlantNameEl.textContent = plant.userData.name;
                confirmActionButton.dataset.plantId = plant.userData.uniqueId;
                confirmActionButton.textContent = isSelected ? "Confirm Deselection" : "Confirm Selection";
                confirmActionButton.className = \`mt-2 w-full text-white font-bold py-2 px-4 rounded transition-colors \${isSelected ? 'bg-rose-500 hover:bg-rose-400' : 'bg-green-500 hover:bg-green-400'}\`;
            }
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
                    if (hoveredPlant && hoveredPlant !== clickedPlant && !cart.has(hoveredPlant.userData.uniqueId)) {
                        revertPlantColor(hoveredPlant);
                    }
                    hoveredPlant = currentHoveredPlant;
                    if (hoveredPlant && hoveredPlant !== clickedPlant && !cart.has(hoveredPlant.userData.uniqueId)) {
                        hoveredPlant.material.emissive.set(CONFIG.HIGHLIGHT_COLOR);
                    }
                }
                
                if(hoveredPlant) {
                    hoverPopupPlantEl.innerHTML = \`<p class="font-bold text-white">\${hoveredPlant.userData.isBlocked ? 'Sold' : hoveredPlant.userData.name}</p>\`;
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
              .to(camera.position, { ...initialCameraPosition, duration: 2.5, ease: 'power3.inOut', delay: 0.5 });
        }
        
        animate();
        playIntroAnimation();

    </script>

</body>
</html>
    `;

    // Set iframe content
    iframe.onload = () => {
      iframe.contentDocument?.open();
      iframe.contentDocument?.write(htmlContent);
      iframe.contentDocument?.close();
    };

    // Append iframe to container
    containerRef.current.appendChild(iframe);

    // Cleanup
    return () => {
      if (containerRef.current?.contains(iframe)) {
        containerRef.current.removeChild(iframe);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Interactive <span className="text-primary">Vertical Farm</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of agriculture with our cutting-edge vertical farming technology. 
              Explore our interactive 3D farm and discover sustainable growing methods.
            </p>
          </div>

          {/* 3D Farm Container */}
          <div className="w-full max-w-6xl mx-auto">
            <div 
              ref={containerRef} 
              className="w-full h-[600px] rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-900 to-green-800"
            />
          </div>

          {/* Features Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-primary rounded" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Vertical Growing</h3>
              <p className="text-muted-foreground">
                Maximize space efficiency with our innovative vertical growing systems that produce more in less space.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-primary rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Smart Monitoring</h3>
              <p className="text-muted-foreground">
                AI-powered sensors monitor plant health, nutrition, and growth in real-time for optimal yields.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-primary rounded-lg" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Sustainable Future</h3>
              <p className="text-muted-foreground">
                Reduce water usage by 95% and eliminate pesticides while growing fresh produce year-round.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Farm;
