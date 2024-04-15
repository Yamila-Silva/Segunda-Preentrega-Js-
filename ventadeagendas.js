document.addEventListener("DOMContentLoaded", function() {
    // Solicitar nombre al usuario
    const nombreUsuario = prompt("Por favor, ingrese su nombre:");

    // Arreglo de agendas disponibles con su stock
    const agendas = [
        { id: 1, nombre: "Agenda 2024", precio: 15, stock: 10 },
        { id: 2, nombre: "Agenda Ejecutiva", precio: 20, stock: 5 },
        { id: 3, nombre: "Agenda de Lujo", precio: 30, stock: 3 }
    ];

    // Arreglo que representa el carrito de compras
    let carrito = [];

    // Elementos del DOM
    const agendasContainer = document.getElementById("agendas");
    const carritoLista = document.getElementById("carrito-lista");
    const totalElement = document.getElementById("total");
    const aceptarCompraBtn = document.getElementById("aceptar-compra");

    // Función para mostrar las agendas disponibles en el DOM
    function mostrarAgendas() {
        agendasContainer.innerHTML = "";
        agendas.forEach(agenda => {
            const agendaDiv = document.createElement("div");
            agendaDiv.innerHTML = `
                <p>${agenda.nombre} - $${agenda.precio} - Stock: ${agenda.stock}</p>
                <button class="agregar-carrito" data-id="${agenda.id}">Agregar al Carrito</button>
            `;
            agendasContainer.appendChild(agendaDiv);
        });
    }

    // Función para agregar una agenda al carrito
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

    // Función para eliminar un elemento del carrito
    function eliminarDelCarrito(id) {
        const agenda = carrito.find(agenda => agenda.id === id);
        agenda.stock++;
        carrito = carrito.filter(agenda => agenda.id !== id);
        actualizarCarrito();
        mostrarAgendas();
    }

    // Función para actualizar el carrito en el DOM y en localStorage
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
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // Manejador de eventos para agregar al carrito
    agendasContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("agregar-carrito")) {
            const id = parseInt(event.target.getAttribute("data-id"));
            agregarAlCarrito(id);
        }
    });

    // Manejador de eventos para aceptar la compra
    aceptarCompraBtn.addEventListener("click", function() {
        const totalPagar = totalElement.textContent;
        if (totalPagar === "0") {
            alert(`${nombreUsuario}, no has realizado ninguna compra.`);
        } else {
            alert(`El total a pagar es: $${totalPagar}`);
            alert(`Gracias, por tu compra ${nombreUsuario}. ¡Vuelve pronto!`);
            carrito = [];
            actualizarCarrito();
        }
    });

    // Mostrar las agendas disponibles al cargar la página
    mostrarAgendas();
});
