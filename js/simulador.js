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