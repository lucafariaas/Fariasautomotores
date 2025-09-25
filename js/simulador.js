// Variables, constantes y arrays para el simulador
const vehiculos = [
    { id: 1, marca: "BMW", modelo: "218i", año: 2018, precio: 25000, disponible: true },
    { id: 2, marca: "Peugeot", modelo: "207 GT", año: 2011, precio: 15000, disponible: true },
    { id: 3, marca: "Ford", modelo: "Focus", año: 2011, precio: 14000, disponible: true },
    { id: 4, marca: "Citroën", modelo: "C4 Cactus", año: 2018, precio: 22000, disponible: false },
    { id: 5, marca: "Ford", modelo: "Ranger", año: 2022, precio: 35000, disponible: true },
    { id: 6, marca: "Audi", modelo: "A4", año: 2007, precio: 18000, disponible: true },
    { id: 7, marca: "BMW", modelo: "GS700", año: 2016, precio: 12000, disponible: true },
    { id: 8, marca: "Audi", modelo: "Q5", año: 2018, precio: 32000, disponible: true },
    { id: 9, marca: "Ford", modelo: "Ranger", año: 2021, precio: 33000, disponible: false },
    { id: 10, marca: "BMW", modelo: "330I Sport", año: 2019, precio: 38000, disponible: true },
    { id: 11, marca: "Audi", modelo: "Q5", año: 2020, precio: 35000, disponible: true },
    { id: 12, marca: "Toyota", modelo: "Hilux", año: 2018, precio: 30000, disponible: true }
];

const TASA_INTERES = 0.15; // Tasa de interés anual para financiamiento
const PLAZOS = [12, 24, 36, 48, 60]; // Meses de plazo disponibles

// Función 1: Explorar vehículos disponibles
function explorarVehiculos() {
    console.clear();
    console.log("=== VEHÍCULOS DISPONIBLES EN G.FARIAS AUTOMOTORES ===");
    console.log("");
    
    let disponibles = 0;
    
    for (let i = 0; i < vehiculos.length; i++) {
        if (vehiculos[i].disponible) {
            console.log(`ID: ${vehiculos[i].id} | ${vehiculos[i].marca} ${vehiculos[i].modelo} (${vehiculos[i].año})`);
            console.log(`   Precio: $${vehiculos[i].precio}`);
            console.log("   -----------------------------------------");
            disponibles++;
        }
    }
    
    console.log("");
    console.log(`Total de vehículos disponibles: ${disponibles}`);
    
    alert(`Se han encontrado ${disponibles} vehículos disponibles. Consulta la consola para ver los detalles.`);
}

// Función 2: Filtrar vehículos por marca y año
function filtrarVehiculos() {
    const marca = prompt("Ingrese la marca del vehículo (BMW, Ford, Audi, etc.) o deje vacío para todas:").trim();
    const añoMin = parseInt(prompt("Ingrese el año mínimo del vehículo (0 para ningún mínimo):")) || 0;
    const añoMax = parseInt(prompt("Ingrese el año máximo del vehículo (0 para ningún máximo):")) || 9999;
    
    console.clear();
    console.log("=== RESULTADOS DE BÚSQUEDA ===");
    console.log(`Marca: ${marca || "Todas"} | Año: ${añoMin}-${añoMax}`);
    console.log("");
    
    let resultados = 0;
    
    for (const vehiculo of vehiculos) {
        if (!vehiculo.disponible) continue;
        
        const cumpleMarca = !marca || vehiculo.marca.toLowerCase().includes(marca.toLowerCase());
        const cumpleAño = vehiculo.año >= añoMin && vehiculo.año <= añoMax;
        
        if (cumpleMarca && cumpleAño) {
            console.log(`ID: ${vehiculo.id} | ${vehiculo.marca} ${vehiculo.modelo} (${vehiculo.año}) - $${vehiculo.precio}`);
            resultados++;
        }
    }
    
    console.log("");
    console.log(`Vehículos encontrados: ${resultados}`);
    
    if (resultados === 0) {
        alert("No se encontraron vehículos con los criterios especificados.");
    } else {
        alert(`Se encontraron ${resultados} vehículos. Consulta la consola para ver los resultados.`);
    }
}

// Función 3: Calcular financiamiento
function calcularFinanciamiento() {
    const idVehiculo = parseInt(prompt("Ingrese el ID del vehículo para calcular financiamiento:"));
    const vehiculo = vehiculos.find(v => v.id === idVehiculo && v.disponible);
    
    if (!vehiculo) {
        alert("ID de vehículo no válido o vehículo no disponible.");
        return;
    }
    
    const enganche = parseFloat(prompt(`Ingrese el enganche inicial (mínimo $${vehiculo.precio * 0.1}):`));
    
    if (isNaN(enganche) || enganche < vehiculo.precio * 0.1) {
        alert("Enganche insuficiente. Debe ser al menos el 10% del valor del vehículo.");
        return;
    }
    
    console.clear();
    console.log("=== OPCIONES DE FINANCIAMIENTO ===");
    console.log(`Vehículo: ${vehiculo.marca} ${vehiculo.modelo} (${vehiculo.año})`);
    console.log(`Precio: $${vehiculo.precio}`);
    console.log(`Enganche: $${enganche}`);
    console.log("");
    
    const montoFinanciar = vehiculo.precio - enganche;
    console.log(`Monto a financiar: $${montoFinanciar}`);
    console.log("");
    
    for (const plazo of PLAZOS) {
        const interesMensual = TASA_INTERES / 12;
        const pagoMensual = montoFinanciar * (interesMensual * Math.pow(1 + interesMensual, plazo)) / (Math.pow(1 + interesMensual, plazo) - 1);
        
        console.log(`Plazo: ${plazo} meses - Pago mensual: $${pagoMensual.toFixed(2)}`);
    }
    
    alert("Consulta la consola para ver las opciones de financiamiento disponibles.");
}

// Función 4: Solicitar test drive
function solicitarTestDrive() {
    const nombre = prompt("Por favor, ingrese su nombre:");
    if (!nombre) {
        alert("Debe ingresar un nombre válido.");
        return;
    }
    
    const telefono = prompt("Ingrese su número de teléfono:");
    const email = prompt("Ingrese su email:");
    
    console.clear();
    console.log("=== SOLICITUD DE TEST DRIVE ===");
    console.log(`Nombre: ${nombre}`);
    console.log(`Teléfono: ${telefono}`);
    console.log(`Email: ${email}`);
    console.log("");
    console.log("Vehículos disponibles para test drive:");
    
    for (let i = 0; i < Math.min(5, vehiculos.length); i++) {
        if (vehiculos[i].disponible) {
            console.log(`ID: ${vehiculos[i].id} - ${vehiculos[i].marca} ${vehiculos[i].modelo}`);
        }
    }
    
    const idTestDrive = parseInt(prompt("Ingrese el ID del vehículo para el test drive:"));
    const vehiculoSeleccionado = vehiculos.find(v => v.id === idTestDrive && v.disponible);
    
    if (!vehiculoSeleccionado) {
        alert("ID de vehículo no válido o vehículo no disponible para test drive.");
        return;
    }
    
    const confirmacion = confirm(`¿Confirmar test drive del ${vehiculoSeleccionado.marca} ${vehiculoSeleccionado.modelo}?`);
    
    if (confirmacion) {
        console.log("");
        console.log("=== SOLICITUD CONFIRMADA ===");
        console.log(`Vehículo: ${vehiculoSeleccionado.marca} ${vehiculoSeleccionado.modelo} (${vehiculoSeleccionado.año})`);
        console.log("Nos contactaremos con usted dentro de las próximas 24 horas.");
        
        alert("¡Solicitud confirmada! Nos contactaremos con usted para coordinar el test drive.");
    } else {
        alert("Solicitud cancelada.");
    }
}

// Mensaje inicial al cargar la página
console.log("Bienvenido al Simulador de G.Farias Automotores");
console.log("Utilice las funciones del simulador para explorar vehículos, calcular financiamiento y solicitar test drives.");

// Clase para gestionar el simulador de financiamiento
class SimuladorFinanciamiento {
    constructor() {
        this.vehiculos = [];
        this.simulaciones = [];
        this.inicializarDatos();
        this.inicializarEventos();
        this.cargarSimulacionesGuardadas();
        this.cargarSelectorVehiculos();
    }

    // Método para inicializar datos
    inicializarDatos() {
        this.vehiculos = [
            { id: 1, marca: "BMW", modelo: "218i", año: 2018, precio: 25000, disponible: true, imagen: "../assets/218i.jpg" },
            { id: 2, marca: "Peugeot", modelo: "207 GT", año: 2011, precio: 15000, disponible: true, imagen: "../assets/207gt.jpg" },
            { id: 3, marca: "Ford", modelo: "Focus", año: 2011, precio: 14000, disponible: true, imagen: "../assets/focus negro.jpg" },
            { id: 4, marca: "Citroën", modelo: "C4 Cactus", año: 2018, precio: 22000, disponible: false, imagen: "../assets/c4 cactus.jpg" },
            { id: 5, marca: "Ford", modelo: "Ranger", año: 2022, precio: 35000, disponible: true, imagen: "../assets/rager.jpg" },
            { id: 6, marca: "Audi", modelo: "A4", año: 2007, precio: 18000, disponible: true, imagen: "../assets/audi a5.jpg" },
            { id: 7, marca: "BMW", modelo: "GS700", año: 2016, precio: 12000, disponible: true, imagen: "../assets/Gs700 bmw.jpg" },
            { id: 8, marca: "Audi", modelo: "Q5", año: 2018, precio: 32000, disponible: true, imagen: "../assets/Audi .jpg" },
            { id: 9, marca: "Ford", modelo: "Ranger", año: 2021, precio: 33000, disponible: false, imagen: "../assets/Ranger Azul.jpg" },
            { id: 10, marca: "BMW", modelo: "330I Sport", año: 2019, precio: 38000, disponible: true, imagen: "../assets/Bmw 330.jpg" },
            { id: 11, marca: "Audi", modelo: "Q5", año: 2020, precio: 35000, disponible: true, imagen: "../assets/Audi Q5 3.0T .jpg" },
            { id: 12, marca: "Toyota", modelo: "Hilux", año: 2018, precio: 30000, disponible: true, imagen: "../assets/Toyota Hiulux Pick Up 2.5.jpg" }
        ];
    }

    // Método para inicializar eventos
    inicializarEventos() {
        // Configurar el slider de tasa de interés
        const tasaInteresSlider = document.getElementById('tasa-interes');
        const tasaInteresValue = document.getElementById('tasa-interes-value');
        
        tasaInteresSlider.addEventListener('input', () => {
            tasaInteresValue.textContent = tasaInteresSlider.value + '%';
        });
        
        // Configurar el botón de calcular
        document.getElementById('calcular-cuotas').addEventListener('click', () => {
            this.calcularFinanciamiento();
        });
        
        // Configurar validación de enganche
        const precioInput = document.getElementById('precio-vehiculo');
        const engancheInput = document.getElementById('enganche');
        
        precioInput.addEventListener('input', () => this.validarEnganche());
        engancheInput.addEventListener('input', () => this.validarEnganche());
        
        // Selector de vehículo
        document.getElementById('selector-vehiculo').addEventListener('change', (e) => {
            this.seleccionarVehiculo(e.target.value);
        });
        
        // Botón guardar simulación
        document.getElementById('guardar-simulacion').addEventListener('click', () => {
            this.guardarSimulacion();
        });
        
        // Botones de funcionalidades
        document.getElementById('explorar-vehiculos').addEventListener('click', () => {
            this.mostrarVehiculos();
        });
        
        document.getElementById('solicitar-test-drive').addEventListener('click', () => {
            this.mostrarModalTestDrive();
        });
        
        document.getElementById('contactar-asesor').addEventListener('click', () => {
            this.mostrarModalAsesor();
        });
        
        document.getElementById('limpiar-historial').addEventListener('click', () => {
            this.limpiarHistorial();
        });
        
        // Cerrar lista de vehículos
        document.getElementById('cerrar-lista-vehiculos').addEventListener('click', () => {
            this.ocultarVehiculos();
        });
        
        // Formularios modales
        document.getElementById('form-test-drive').addEventListener('submit', (e) => {
            e.preventDefault();
            this.enviarSolicitudTestDrive();
        });
        
        document.getElementById('form-asesor').addEventListener('submit', (e) => {
            e.preventDefault();
            this.enviarConsultaAsesor();
        });
        
        // Cerrar modales
        document.querySelectorAll('.cerrar-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });
        
        // Cerrar modal al hacer clic fuera
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }

    // Método para cargar selector de vehículos
    cargarSelectorVehiculos() {
        const selector = document.getElementById('selector-vehiculo');
        const selectorTest = document.getElementById('vehiculo-test');
        
        this.vehiculos.forEach(vehiculo => {
            if (vehiculo.disponible) {
                const option = document.createElement('option');
                option.value = vehiculo.id;
                option.textContent = `${vehiculo.marca} ${vehiculo.modelo} (${vehiculo.año}) - $${vehiculo.precio}`;
                selector.appendChild(option);
                
                const optionTest = option.cloneNode(true);
                selectorTest.appendChild(optionTest);
            }
        });
    }

    // Método para seleccionar vehículo
    seleccionarVehiculo(id) {
        const vehiculo = this.vehiculos.find(v => v.id == id);
        const infoContainer = document.getElementById('info-vehiculo');
        const precioInput = document.getElementById('precio-vehiculo');
        
        if (vehiculo) {
            precioInput.value = vehiculo.precio;
            infoContainer.innerHTML = `
                <div class="vehiculo-seleccionado">
                    <h4>${vehiculo.marca} ${vehiculo.modelo} (${vehiculo.año})</h4>
                    <p>Precio: $${vehiculo.precio}</p>
                </div>
            `;
        } else {
            infoContainer.innerHTML = '';
        }
        this.validarEnganche();
    }

    // Método para validar enganche
    validarEnganche() {
        const precio = parseFloat(document.getElementById('precio-vehiculo').value);
        const enganche = parseFloat(document.getElementById('enganche').value);
        const minEnganche = precio * 0.1;
        const helpText = document.querySelector('.help-text');
        
        if (enganche < minEnganche) {
            helpText.style.color = '#e74c3c';
            helpText.textContent = `Mínimo: $${minEnganche.toFixed(2)} (10%)`;
        } else {
            helpText.style.color = '#7f8c8d';
            helpText.textContent = `Mínimo: $${minEnganche.toFixed(2)} (10%)`;
        }
    }

    // Método para calcular financiamiento
    calcularFinanciamiento() {
        const precio = parseFloat(document.getElementById('precio-vehiculo').value);
        const enganche = parseFloat(document.getElementById('enganche').value);
        const plazo = parseInt(document.getElementById('plazo').value);
        const tasaInteresAnual = parseFloat(document.getElementById('tasa-interes').value);
        
        // Validaciones
        if (isNaN(precio) || isNaN(enganche) || precio <= 0) {
            this.mostrarMensajeError("Por favor, ingrese valores válidos para el precio y enganche.");
            return;
        }
        
        const minEnganche = precio * 0.1;
        if (enganche < minEnganche) {
            this.mostrarMensajeError(`El enganche mínimo es de $${minEnganche.toFixed(2)} (10% del precio del vehículo).`);
            return;
        }
        
        if (enganche >= precio) {
            this.mostrarMensajeError("El enganche no puede ser mayor o igual al precio del vehículo.");
            return;
        }
        
        // Cálculos financieros
        const montoFinanciar = precio - enganche;
        const tasaInteresMensual = (tasaInteresAnual / 100) / 12;
        const cuotaMensual = montoFinanciar * (tasaInteresMensual * Math.pow(1 + tasaInteresMensual, plazo)) / (Math.pow(1 + tasaInteresMensual, plazo) - 1);
        const totalAPagar = cuotaMensual * plazo;
        const totalIntereses = totalAPagar - montoFinanciar;
        
        // Mostrar resultados
        this.mostrarResultados({
            montoFinanciar,
            cuotaMensual,
            totalIntereses,
            totalAPagar,
            precio,
            enganche,
            plazo,
            tasaInteresAnual
        });
    }

    // Método para mostrar resultados
    mostrarResultados(datos) {
        const resultadosContainer = document.getElementById('resultados-container');
        resultadosContainer.innerHTML = `
            <div class="resultado-item">
                <span class="resultado-label">Monto a financiar:</span>
                <span class="resultado-valor">$${datos.montoFinanciar.toFixed(2)}</span>
            </div>
            <div class="resultado-item">
                <span class="resultado-label">Cuota mensual:</span>
                <span class="resultado-valor">$${datos.cuotaMensual.toFixed(2)}</span>
            </div>
            <div class="resultado-item">
                <span class="resultado-label">Total de intereses:</span>
                <span class="resultado-valor">$${datos.totalIntereses.toFixed(2)}</span>
            </div>
            <div class="resultado-item">
                <span class="resultado-label">Total a pagar:</span>
                <span class="resultado-valor">$${datos.totalAPagar.toFixed(2)}</span>
            </div>
            <div class="resultado-item destacado">
                <span class="resultado-label">Costo total del vehículo:</span>
                <span class="resultado-valor">$${(datos.totalAPagar + datos.enganche).toFixed(2)}</span>
            </div>
        `;
        
        // Guardar datos para posible guardado
        this.simulacionActual = datos;
    }

    // Método para guardar simulación
    guardarSimulacion() {
        if (!this.simulacionActual) {
            this.mostrarMensajeError("Primero debe calcular una simulación para guardarla.");
            return;
        }
        
        const simulacion = {
            id: Date.now(),
            fecha: new Date().toLocaleString(),
            ...this.simulacionActual
        };
        
        this.simulaciones.push(simulacion);
        this.guardarEnLocalStorage();
        this.mostrarSimulacionesGuardadas();
        this.mostrarMensajeExito("Simulación guardada correctamente.");
    }

    // Método para guardar en localStorage
    guardarEnLocalStorage() {
        localStorage.setItem('simulacionesFariasAutomotores', JSON.stringify(this.simulaciones));
    }

    // Método para cargar simulaciones guardadas
    cargarSimulacionesGuardadas() {
        const simulacionesGuardadas = localStorage.getItem('simulacionesFariasAutomotores');
        if (simulacionesGuardadas) {
            this.simulaciones = JSON.parse(simulacionesGuardadas);
            this.mostrarSimulacionesGuardadas();
        }
    }

    // Método para mostrar simulaciones guardadas
    mostrarSimulacionesGuardadas() {
        const listaContainer = document.getElementById('lista-simulaciones');
        
        if (this.simulaciones.length === 0) {
            listaContainer.innerHTML = '<p class="sin-simulaciones">No hay simulaciones guardadas</p>';
            return;
        }
        
        listaContainer.innerHTML = this.simulaciones.map(simulacion => `
            <div class="simulacion-item">
                <div class="simulacion-header">
                    <span class="simulacion-fecha">${simulacion.fecha}</span>
                    <button class="btn-eliminar" data-id="${simulacion.id}">×</button>
                </div>
                <div class="simulacion-detalle">
                    <p>Vehículo: $${simulacion.precio} | Enganche: $${simulacion.enganche}</p>
                    <p>Plazo: ${simulacion.plazo} meses | Tasa: ${simulacion.tasaInteresAnual}%</p>
                    <p>Cuota: $${simulacion.cuotaMensual.toFixed(2)} | Total: $${simulacion.totalAPagar.toFixed(2)}</p>
                </div>
            </div>
        `).join('');
        
        // Agregar eventos a botones de eliminar
        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.eliminarSimulacion(id);
            });
        });
    }

    // Método para eliminar simulación
    eliminarSimulacion(id) {
        this.simulaciones = this.simulaciones.filter(s => s.id !== id);
        this.guardarEnLocalStorage();
        this.mostrarSimulacionesGuardadas();
    }

    // Método para limpiar historial
    limpiarHistorial() {
        if (this.simulaciones.length === 0) {
            this.mostrarMensajeError("No hay simulaciones para eliminar.");
            return;
        }
        
        if (confirm("¿Está seguro de que desea eliminar todo el historial de simulaciones?")) {
            this.simulaciones = [];
            localStorage.removeItem('simulacionesFariasAutomotores');
            this.mostrarSimulacionesGuardadas();
            this.mostrarMensajeExito("Historial de simulaciones eliminado correctamente.");
        }
    }

    // Método para mostrar vehículos
    mostrarVehiculos() {
        const gridContainer = document.getElementById('grid-vehiculos');
        const listaContainer = document.getElementById('lista-vehiculos');
        
        gridContainer.innerHTML = this.vehiculos.filter(v => v.disponible).map(vehiculo => `
            <div class="vehiculo-card">
                <div class="vehiculo-imagen">
                    <img src="${vehiculo.imagen}" alt="${vehiculo.marca} ${vehiculo.modelo}" onerror="this.src='../assets/LOGO.png'">
                </div>
                <div class="vehiculo-info">
                    <h4>${vehiculo.marca} ${vehiculo.modelo}</h4>
                    <p>Año: ${vehiculo.año}</p>
                    <p class="vehiculo-precio">$${vehiculo.precio}</p>
                    <button class="btn-seleccionar-vehiculo" data-id="${vehiculo.id}">Seleccionar</button>
                </div>
            </div>
        `).join('');
        
        listaContainer.style.display = 'block';
        
        // Agregar eventos a botones de selección
        document.querySelectorAll('.btn-seleccionar-vehiculo').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                document.getElementById('selector-vehiculo').value = id;
                this.seleccionarVehiculo(id);
                this.ocultarVehiculos();
            });
        });
    }

    // Método para ocultar vehículos
    ocultarVehiculos() {
        document.getElementById('lista-vehiculos').style.display = 'none';
    }

    // Método para mostrar modal test drive
    mostrarModalTestDrive() {
        document.getElementById('modal-test-drive').style.display = 'block';
    }

    // Método para mostrar modal asesor
    mostrarModalAsesor() {
        document.getElementById('modal-asesor').style.display = 'block';
    }

    // Método para enviar solicitud test drive
    enviarSolicitudTestDrive() {
        const nombre = document.getElementById('nombre-test').value;
        const telefono = document.getElementById('telefono-test').value;
        const email = document.getElementById('email-test').value;
        const vehiculoId = document.getElementById('vehiculo-test').value;
        
        const vehiculo = this.vehiculos.find(v => v.id == vehiculoId);
        
        // Guardar solicitud en localStorage
        const solicitudes = JSON.parse(localStorage.getItem('solicitudesTestDrive') || '[]');
        solicitudes.push({
            id: Date.now(),
            fecha: new Date().toLocaleString(),
            nombre,
            telefono,
            email,
            vehiculo: vehiculo ? `${vehiculo.marca} ${vehiculo.modelo}` : 'No especificado'
        });
        
        localStorage.setItem('solicitudesTestDrive', JSON.stringify(solicitudes));
        
        // Limpiar formulario y cerrar modal
        document.getElementById('form-test-drive').reset();
        document.getElementById('modal-test-drive').style.display = 'none';
        
        this.mostrarMensajeExito("¡Solicitud enviada correctamente! Nos contactaremos con usted para coordinar el test drive.");
    }

    // Método para enviar consulta asesor
    enviarConsultaAsesor() {
        const nombre = document.getElementById('nombre-asesor').value;
        const telefono = document.getElementById('telefono-asesor').value;
        const consulta = document.getElementById('consulta-asesor').value;
        
        // Guardar consulta en localStorage
        const consultas = JSON.parse(localStorage.getItem('consultasAsesor') || '[]');
        consultas.push({
            id: Date.now(),
            fecha: new Date().toLocaleString(),
            nombre,
            telefono,
            consulta
        });
        
        localStorage.setItem('consultasAsesor', JSON.stringify(consultas));
        
        // Limpiar formulario y cerrar modal
        document.getElementById('form-asesor').reset();
        document.getElementById('modal-asesor').style.display = 'none';
        
        this.mostrarMensajeExito("¡Consulta enviada correctamente! Un asesor se contactará con usted a la brevedad.");
    }

    // Método para mostrar mensaje de error
    mostrarMensajeError(mensaje) {
        this.mostrarMensaje(mensaje, 'error');
    }

    // Método para mostrar mensaje de éxito
    mostrarMensajeExito(mensaje) {
        this.mostrarMensaje(mensaje, 'exito');
    }

    // Método para mostrar mensaje
    mostrarMensaje(mensaje, tipo) {
        // Crear elemento de mensaje
        const mensajeElement = document.createElement('div');
        mensajeElement.className = `mensaje mensaje-${tipo}`;
        mensajeElement.textContent = mensaje;
        
        // Agregar al DOM
        document.body.appendChild(mensajeElement);
        
        // Mostrar con animación
        setTimeout(() => {
            mensajeElement.classList.add('mostrar');
        }, 100);
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            mensajeElement.classList.remove('mostrar');
            setTimeout(() => {
                if (mensajeElement.parentNode) {
                    mensajeElement.parentNode.removeChild(mensajeElement);
                }
            }, 300);
        }, 3000);
    }
}

// Inicializar el simulador cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new SimuladorFinanciamiento();
});