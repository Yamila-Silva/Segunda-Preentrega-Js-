// Agendas disponibles
const agendas = [
    { id: 1, nombre: "Agenda 2024", precio: 15000, stock: 10, imagen: "./imagenes/agenda.png" },
    { id: 2, nombre: "Agenda Ejecutiva", precio: 20000, stock: 5, imagen: "./imagenes/agendaejecutiva.png" },
    { id: 3, nombre: "Agenda de Lujo", precio: 30000, stock: 3, imagen: "./imagenes/agendadelujo.png" }
];

// carro de compras
let carrito = [];

// Elementos del DOM
const agendasContainer = document.getElementById("agendas");
const carritoLista = document.getElementById("carrito-lista");
const totalElement = document.getElementById("total");
const aceptarCompraBtn = document.getElementById("aceptar-compra");
const mensajeFinal = document.getElementById("mensaje-final");

// Nombre de usuario
let nombreUsuario = "";
const nombreInput = document.getElementById("nombre");
const btnIngresar = document.getElementById("btn-ingresar");

btnIngresar.addEventListener("click", function() {
    nombreUsuario = nombreInput.value.trim();
    if (nombreUsuario !== "") {
        mostrarAgendas();
        mensajeFinal.innerHTML = `Bienvenido, <span id="nombre-usuario">${nombreUsuario}</span>!`;
        nombreInput.disabled = true;
        btnIngresar.disabled = true;
    } else {
        alert("Por favor, ingresa tu nombre.");
    }
});

// Mostrar agendas disponibles en el DOM
function mostrarAgendas() {
    agendasContainer.innerHTML = "";
    agendas.forEach(agenda => {
        const agendaDiv = document.createElement("div");
        agendaDiv.classList.add("agenda");
        agendaDiv.innerHTML = `
            <img src="${agenda.imagen}" alt="${agenda.nombre}">
            <p>${agenda.nombre} - $${agenda.precio} - Stock: ${agenda.stock}</p>
            <button class="agregar-carrito" data-id="${agenda.id}">Agregar al Carrito</button>
        `;
        agendasContainer.appendChild(agendaDiv);
    });
}

// Agregar una agenda al carro de compras
function agregarAlCarrito(id) {
    const agenda = agendas.find(agenda => agenda.id === id);
    if (agenda.stock > 0) {
        carrito.push(agenda);
        agenda.stock--;
        actualizarCarrito();
        mostrarAgendas();
    } else {
        alert("Lo sentimos, la agenda seleccionada está fuera de stock.");
    }
}

// Eliminar un elemento del carro
function eliminarDelCarrito(id) {
    const index = carrito.findIndex(agenda => agenda.id === id);
    if (index !== -1) {
        const agenda = carrito[index];
        agenda.stock++;
        carrito.splice(index, 1); // Eliminar solo la agenda específica
        actualizarCarrito();
        mostrarAgendas();
    }
}


// Actualizar el carro en el DOM y en localStorage
function actualizarCarrito() {
    carritoLista.innerHTML = "";
    let total = 0;
    carrito.forEach(agenda => {
        const li = document.createElement("li");
        li.textContent = agenda.nombre;
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.addEventListener("click", () => {
            eliminarDelCarrito(agenda.id);
        });
        li.appendChild(eliminarBtn);
        carritoLista.appendChild(li);
        total += agenda.precio;
    });
    totalElement.textContent = total;
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar en localStorage
}

// Agregar al carrito
agendasContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("agregar-carrito")) {
        const id = parseInt(event.target.getAttribute("data-id"));
        agregarAlCarrito(id);
    }
});

// Aceptar la compra
aceptarCompraBtn.addEventListener("click", function() {
    const totalPagar = totalElement.textContent;
    if (totalPagar === "0") {
        alert(`No has realizado ninguna compra.`);
    } else {
        alert(`El total a pagar es: $${totalPagar}`);
        // Limpiar carrito y actualizar
        carrito = [];
        actualizarCarrito();
    }
});

// Cargar carrito desde localStorage al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
});

// Mostrar las agendas disponibles al cargar la página
mostrarAgendas();

