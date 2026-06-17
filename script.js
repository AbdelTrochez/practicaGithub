
        // --- BASE DE DATOS DE PRODUCTOS ---
        const products = [
            {
                id: 1,
                name: "Laptop Tecno-Book Gamer Pro i7",
                category: "computadoras",
                price: 1299.00,
                image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=400",
                description: "Procesador Intel i7 13va Gen, tarjeta RTX 4060 8GB VRAM, 16GB DDR5 RAM, 1TB SSD M.2 NVMe. Rendimiento perfecto para desarrollo y gaming extremo."
            },
            {
                id: 2,
                name: "Teclado Mecánico RGB Sur-Keys (Blue)",
                category: "teclados",
                price: 79.99,
                image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=400",
                description: "Teclado formato TKL de 87 teclas, interruptores mecánicos azules clicky con retroiluminación RGB de 18 efectos y cable trenzado USB-C removible."
            },
            {
                id: 3,
                name: "Mouse Ergonómico Tecno-Glider Pro",
                category: "mouse",
                price: 49.99,
                image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=400",
                description: "Sensor óptico de precisión de 16,000 DPI con switches ópticos de alta durabilidad, diseño ergonómico para largas horas de uso y software de macros."
            },
            {
                id: 4,
                name: "PC Escritorio Tecno-Racer AMD Ryzen 5",
                category: "computadoras",
                price: 899.00,
                image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=400",
                description: "Gabinete con flujo de aire optimizado, procesador AMD Ryzen 5, 16GB RAM Dual Channel, tarjeta integrada de excelente rendimiento, 512GB SSD NVMe."
            },
            {
                id: 5,
                name: "Monitor Curvo Gamer 27\" QHD 165Hz",
                category: "accesorios",
                price: 249.99,
                image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400",
                description: "Pantalla curvature 1500R, resolución QHD (2560x1440), tiempo de respuesta 1ms y compatibilidad con FreeSync para una visualización ultrarrápida."
            },
            {
                id: 6,
                name: "Auriculares Gamer Surround Sound 7.1",
                category: "accesorios",
                price: 69.99,
                image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=400",
                description: "Audio envolvente de gran realismo espacial, micrófono con supresión de ruido ajustable y almohadillas viscoelásticas confortables de tela respirable."
            },
            {
                id: 7,
                name: "Mousepad XL Tecno-Pad Antideslizante",
                category: "accesorios",
                price: 24.99,
                image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=400",
                description: "Tamaño extendido de 900x400x4mm, bordes finamente cosidos contra el desgaste, superficie de tela Speed para un deslizamiento fluido y base de goma estable."
            },
            {
                id: 8,
                name: "Teclado Slim Inalámbrico Tecno-Office",
                category: "teclados",
                price: 39.99,
                image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=400",
                description: "Perfil ultradelgado y elegante, switches silenciosos óptimos para oficina, batería de larga duración y conectividad dual Bluetooth + 2.4Ghz USB."
            }
        ];

        let cart = [];
        let currentCategory = "todos";

        // --- SISTEMA DEL CARRITO DE COMPRAS ---
        function toggleCart() {
            const sidebar = document.getElementById('cartSidebar');
            const overlay = document.getElementById('cartOverlay');
            
            sidebar.classList.toggle('translate-x-full');
            overlay.classList.toggle('hidden');
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            const existingIndex = cart.findIndex(item => item.id === productId);
            if (existingIndex > -1) {
                cart[existingIndex].quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            renderCart();
            updateCartCounter();
            showToast(`¡"${product.name}" añadido al carrito!`);
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            renderCart();
            updateCartCounter();
            showToast("Producto eliminado del carrito");
        }

        function changeQuantity(productId, delta) {
            const item = cart.find(item => item.id === productId);
            if (!item) return;

            item.quantity += delta;
            if (item.quantity <= 0) {
                removeFromCart(productId);
            } else {
                renderCart();
                updateCartCounter();
            }
        }

        function updateCartCounter() {
            const badge = document.getElementById('cartCountBadge');
            const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

            if (totalItems > 0) {
                badge.innerText = totalItems;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }

        function renderCart() {
            const container = document.getElementById('cartItemsContainer');
            const emptyState = document.getElementById('cartEmptyState');
            const subtotalText = document.getElementById('cartSubtotal');
            const totalText = document.getElementById('cartTotal');

            if (cart.length === 0) {
                container.innerHTML = "";
                emptyState.classList.remove('hidden');
                subtotalText.innerText = "$0.00";
                totalText.innerText = "$0.00";
                return;
            }

            emptyState.classList.add('hidden');
            let subtotal = 0;

            container.innerHTML = cart.map(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                return `
                    <div class="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/50 animate-fade-in">
                        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-contain rounded-lg bg-white border border-slate-100">
                        <div class="flex-1">
                            <h4 class="font-bold text-slate-800 text-xs line-clamp-2">${item.name}</h4>
                            <p class="text-brand-600 font-extrabold text-sm mt-1">$${item.price.toFixed(2)}</p>
                            
                            <!-- Botones de Cantidad -->
                            <div class="flex items-center gap-2 mt-2">
                                <button onclick="changeQuantity(${item.id}, -1)" class="w-6 h-6 rounded bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 text-xs transition-colors"><i class="fa-solid fa-minus"></i></button>
                                <span class="text-xs font-bold text-slate-700 w-6 text-center">${item.quantity}</span>
                                <button onclick="changeQuantity(${item.id}, 1)" class="w-6 h-6 rounded bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 text-xs transition-colors"><i class="fa-solid fa-plus"></i></button>
                            </div>
                        </div>
                        <button onclick="removeFromCart(${item.id})" class="text-slate-400 hover:text-red-500 text-sm p-1 transition-colors">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                `;
            }).join('');

            subtotalText.innerText = `$${subtotal.toFixed(2)}`;
            totalText.innerText = `$${subtotal.toFixed(2)}`;
        }

        // --- FILTRADO Y BÚSQUEDA DE PRODUCTOS ---
        function filterCategory(category) {
            currentCategory = category;
            
            // Actualizar botones en UI
            const btns = document.querySelectorAll('.category-btn');
            btns.forEach(btn => {
                if (btn.innerText.toLowerCase().includes(category) || (category === 'todos' && btn.innerText.includes('Todos'))) {
                    btn.className = "category-btn active px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm bg-brand-600 text-white";
                } else {
                    btn.className = "category-btn px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm bg-slate-100 text-slate-600 hover:bg-slate-200";
                }
            });

            renderProducts();
        }

        function getFilteredAndSortedProducts() {
            const query = document.getElementById('desktopSearch').value.toLowerCase() || document.getElementById('mobileSearch').value.toLowerCase();
            let result = products;

            // Filtro por categoría
            if (currentCategory !== "todos") {
                result = result.filter(p => p.category === currentCategory);
            }

            // Filtro por búsqueda
            if (query.trim() !== "") {
                result = result.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
            }

            // Ordenamiento
            const sortBy = document.getElementById('sortSelect').value;
            if (sortBy === "price-asc") {
                result.sort((a, b) => a.price - b.price);
            } else if (sortBy === "price-desc") {
                result.sort((a, b) => b.price - a.price);
            }

            return result;
        }

        function renderProducts() {
            const grid = document.getElementById('productsGrid');
            const notFound = document.getElementById('noProductsFound');
            const items = getFilteredAndSortedProducts();

            if (items.length === 0) {
                grid.innerHTML = "";
                notFound.classList.remove('hidden');
                return;
            }

            notFound.classList.add('hidden');
            grid.innerHTML = items.map(product => `
                <div class="group bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-500 transition-all duration-300 flex flex-col justify-between">
                    <!-- Contenido Clickable del Producto -->
                    <div onclick="openProductModal(${product.id})" class="cursor-pointer">
                        <!-- Contenedor Imagen -->
                        <div class="relative bg-slate-50 p-6 h-56 flex items-center justify-center overflow-hidden">
                            <img src="${product.image}" alt="${product.name}" class="max-h-full object-contain group-hover:scale-105 transition-transform duration-300" onerror="this.src='https://placehold.co/400x300/f1f5f9/475569?text=${encodeURIComponent(product.name)}'">
                            <span class="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-700 px-2.5 py-1 rounded-full border border-slate-100">${product.category}</span>
                        </div>
                        
                        <!-- Datos Textuales -->
                        <div class="p-6 space-y-2">
                            <h3 class="font-extrabold text-slate-800 text-sm leading-snug line-clamp-2 hover:text-brand-600 transition-colors">${product.name}</h3>
                            <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">${product.description}</p>
                            
                            <div class="flex items-center gap-1.5 pt-1">
                                <div class="flex text-amber-400 text-[10px]">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </div>
                                <span class="text-slate-400 text-[10px] font-bold">(5.0)</span>
                            </div>
                        </div>
                    </div>

                    <!-- Acción Adición -->
                    <div class="p-6 pt-0 flex items-center justify-between border-t border-slate-50 mt-auto">
                        <span class="text-xl font-black text-slate-900">$${product.price.toFixed(2)}</span>
                        <button onclick="addToCart(${product.id})" class="w-10 h-10 bg-brand-50 text-brand-600 hover:bg-brand-600 hover:text-white rounded-xl flex items-center justify-center transition-all shadow-sm" aria-label="Añadir">
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // --- BUSCADOR REAL-TIME EVENT LISTENERS ---
        document.getElementById('desktopSearch').addEventListener('input', renderProducts);
        document.getElementById('mobileSearch').addEventListener('input', renderProducts);

        function sortProducts() {
            renderProducts();
        }

        // --- MODAL DETALLE PRODUCTO ---
        function openProductModal(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            document.getElementById('modalProductName').innerText = product.name;
            document.getElementById('modalProductCategory').innerText = product.category;
            document.getElementById('modalProductDescription').innerText = product.description;
            document.getElementById('modalProductPrice').innerText = `$${product.price.toFixed(2)}`;
            document.getElementById('modalProductImage').src = product.image;

            const addBtn = document.getElementById('modalAddToCartBtn');
            addBtn.onclick = function() {
                addToCart(product.id);
                closeProductModal();
            };

            document.getElementById('productDetailModal').classList.remove('hidden');
        }

        function closeProductModal() {
            document.getElementById('productDetailModal').classList.add('hidden');
        }

        // --- CONFIGURADOR "ARMA TU PC" ---
        const componentPrices = {
            "intel-i5": { name: "Intel Core i5-13400", price: 210.00 },
            "ryzen-7": { name: "AMD Ryzen 7 7700X", price: 340.00 },
            "intel-i9": { name: "Intel Core i9-14900K", price: 580.00 },
            "rtx-3050": { name: "NVIDIA RTX 3050 8GB", price: 280.00 },
            "rtx-4060": { name: "NVIDIA RTX 4060 Ti 16GB", price: 450.00 },
            "rtx-4080": { name: "NVIDIA RTX 4080 Super", price: 999.00 },
            "ram-16": { name: "16GB DDR5 Dual Channel", price: 85.00 },
            "ram-32": { name: "32GB DDR5 RGB Pro", price: 155.00 },
            "ram-64": { name: "64GB DDR5 Xtreme Elite", price: 290.00 },
            "ssd-512": { name: "512GB NVMe PCIe 4.0", price: 55.00 },
            "ssd-1tb": { name: "1TB NVMe Alto Rend.", price: 95.00 },
            "ssd-2tb": { name: "2TB NVMe ULTRA-Fast", price: 180.00 }
        };

        function updatePCBuilder() {
            const cpuVal = document.querySelector('input[name="cpu"]:checked').value;
            const gpuVal = document.querySelector('input[name="gpu"]:checked').value;
            const ramVal = document.querySelector('input[name="ram"]:checked').value;
            const storageVal = document.querySelector('input[name="storage"]:checked').value;

            const cpuObj = componentPrices[cpuVal];
            const gpuObj = componentPrices[gpuVal];
            const ramObj = componentPrices[ramVal];
            const storageObj = componentPrices[storageVal];

            // Actualizar textos de resumen
            document.getElementById('summaryCpuName').innerText = cpuObj.name;
            document.getElementById('summaryCpuPrice').innerText = `$${cpuObj.price.toFixed(2)}`;

            document.getElementById('summaryGpuName').innerText = gpuObj.name;
            document.getElementById('summaryGpuPrice').innerText = `$${gpuObj.price.toFixed(2)}`;

            document.getElementById('summaryRamName').innerText = ramObj.name;
            document.getElementById('summaryRamPrice').innerText = `$${ramObj.price.toFixed(2)}`;

            document.getElementById('summaryStorageName').innerText = storageObj.name;
            document.getElementById('summaryStoragePrice').innerText = `$${storageObj.price.toFixed(2)}`;

            const total = cpuObj.price + gpuObj.price + ramObj.price + storageObj.price;
            document.getElementById('builderTotal').innerText = `$${total.toFixed(2)}`;
        }

        function addCustomPCToCart() {
            const cpuVal = document.querySelector('input[name="cpu"]:checked').value;
            const gpuVal = document.querySelector('input[name="gpu"]:checked').value;
            const ramVal = document.querySelector('input[name="ram"]:checked').value;
            const storageVal = document.querySelector('input[name="storage"]:checked').value;

            const cpuObj = componentPrices[cpuVal];
            const gpuObj = componentPrices[gpuVal];
            const ramObj = componentPrices[ramVal];
            const storageObj = componentPrices[storageVal];

            const total = cpuObj.price + gpuObj.price + ramObj.price + storageObj.price;

            // Creamos un producto personalizado temporal
            const customProduct = {
                id: Date.now(), // ID Único temporal
                name: `PC Personalizada (CPU: ${cpuObj.name} | GPU: ${gpuObj.name})`,
                price: total,
                image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=400",
                description: `Configuración a medida: CPU ${cpuObj.name}, Tarjeta de Video ${gpuObj.name}, Memoria ${ramObj.name}, SSD ${storageObj.name}. Gabinete y Fuente incluidos.`
            };

            cart.push({ ...customProduct, quantity: 1 });
            renderCart();
            updateCartCounter();
            toggleCart(); // Abre el carrito directamente
            showToast("¡PC Personalizada añadida exitosamente!");
        }

        // --- FORMULARIO DE CONTACTO ---
        function handleContactSubmit(event) {
            event.preventDefault();
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            
            showToast(`¡Mensaje enviado con éxito, ${name}! Nos contactaremos a ${email} en menos de 24 hrs.`, 'success');
            document.getElementById('contactForm').reset();
        }

        // --- TOAST NOTIFICATION SYSTEM ---
        function showToast(message, type = 'success') {
            const container = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            toast.className = `flex items-center gap-3 bg-white border-l-4 ${type === 'success' ? 'border-brand-500' : 'border-red-500'} shadow-lg rounded-xl p-4 min-w-[300px] max-w-sm animate-fade-in transition-all duration-300`;
            
            toast.innerHTML = `
                <div class="w-7 h-7 ${type === 'success' ? 'bg-brand-50 text-brand-600' : 'bg-red-50 text-red-600'} rounded-lg flex items-center justify-center text-sm shrink-0">
                    <i class="fa-solid ${type === 'success' ? 'fa-check' : 'fa-triangle-exclamation'}"></i>
                </div>
                <div class="flex-1">
                    <p class="text-xs text-slate-400 font-semibold uppercase">Notificación</p>
                    <p class="text-sm font-bold text-slate-800 mt-0.5 leading-snug">${message}</p>
                </div>
                <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-slate-600">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            `;

            container.appendChild(toast);

            // Remoción automática tras 5 segundos
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.classList.add('opacity-0', 'translate-y-2');
                    setTimeout(() => toast.remove(), 300);
                }
            }, 5000);
        }

        // --- CHECKOUT SIMULADO ---
        function triggerCheckout() {
            if (cart.length === 0) {
                showToast("Debes añadir productos al carrito para comprar.", "error");
                return;
            }

            showToast("¡Compra virtual realizada de forma exitosa! Nos comunicaremos para agendar el despacho físico de los componentes.", "success");
            cart = [];
            renderCart();
            updateCartCounter();
            toggleCart();
        }

        // --- MENÚ MÓVIL ---
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            const icon = document.getElementById('menuIcon');
            
            if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
                icon.className = "fa-solid fa-xmark text-xl";
            } else {
                menu.classList.add('hidden');
                icon.className = "fa-solid fa-bars text-xl";
            }
        }

        // --- CARGA INICIAL ---
        window.onload = function() {
            renderProducts();
            updatePCBuilder();
        };
  