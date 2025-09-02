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

    // Create and inject the farm HTML content
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
          <div class="w-full max-w-4xl mx-auto h-[500px] rounded-xl overflow-hidden shadow-lg border border-green-800">
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
      script.innerHTML = \`
        import * as THREE from 'three';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
        import gsap from 'gsap';

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

        const cart = new Set();
        let plantObjects = {};
        let currentView = 'grid'; 
        let hoveredInstanceId = null;
        let hoveredPlant = null;
        let detailGroup = null;
        let clickedPlant = null;

        const canvasContainer = document.getElementById('canvas-container');
        const selectionStatusEl = document.getElementById('selection-status');
        const backButton = document.getElementById('back-button');
        const hoverPopupPlantEl = document.getElementById('hover-popup-plant');

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

        const totalInstances = CONFIG.NUM_COLS * CONFIG.NUM_ROWS;
        const geometry = new THREE.BoxGeometry(CONFIG.BLOCK_SIZE, CONFIG.BLOCK_HEIGHT, CONFIG.BLOCK_SIZE);
        const material = new THREE.MeshStandardMaterial({ roughness: 0.6, metalness: 0.2, transparent: true });
        const instancedMesh = new THREE.InstancedMesh(geometry, material, totalInstances);
        scene.add(instancedMesh);

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

        function animate() {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }
        animate();
      \`;
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
            <div key={item.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
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