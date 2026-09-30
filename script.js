// ==============================
// PRODUCTOS
// ==============================

let productos = JSON.parse(localStorage.getItem("productos")) || [
   
];


// ==============================
// VENTAS
// ==============================

let ventas = JSON.parse(localStorage.getItem("ventas")) || [];


// ==============================
// CARRITO
// ==============================

let carrito = [];
let ventaActual = null;

// ==============================
// LOGIN
// ==============================

function iniciarSesion() {

    let usuario = document.getElementById("usuario").value;
    let contrasena = document.getElementById("contrasena").value;

    if (usuario === "admin" && contrasena === "1234") {

        window.location.href = "principal.html";

    } else {

        document.getElementById("mensaje").textContent =
            "Usuario o contraseña incorrectos";

    }

}


// ==============================
// NAVEGACIÓN
// ==============================

function irNuevaVenta() {

    window.location.href = "nueva-venta.html";

}


function irInventario() {

    window.location.href = "inventario.html";

}


function irVentas() {

    window.location.href = "ventas.html";

}


function irReportes() {

    window.location.href = "reportes.html";

}


function volverMenu() {

    window.location.href = "principal.html";

}


// ==============================
// GUARDAR PRODUCTOS
// ==============================

function guardarProductos() {

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

}

// ==============================
// MOSTRAR PRODUCTOS EN NUEVA VENTA
// ==============================

function mostrarProductosVenta() {

    let listaProductos =
        document.getElementById("listaProductosVenta");

    if (!listaProductos) return;

    listaProductos.innerHTML = "";

    productos.forEach(function(producto, indice) {

        let elemento = document.createElement("div");

        elemento.classList.add("producto-linea");

        elemento.innerHTML = `
            <div class="producto-nombre">
                <strong>${producto.nombre}</strong>
            </div>

            <div class="producto-marca">
                ${producto.marca || "Sin marca"}
            </div>

            <div class="producto-precio">
                S/ ${producto.precio.toFixed(2)}
            </div>

            <div class="producto-stock">
                ${producto.stock}
            </div>

            <div class="producto-accion">
                <button onclick="agregarProducto(${indice})">
                    Agregar
                </button>
            </div>
        `;

        listaProductos.appendChild(elemento);
    });
}



// ==============================
// FILTRAR PRODUCTOS
// ==============================

function filtrarProductos() {

    let texto =
        document.getElementById("buscarProducto").value.toLowerCase();

    let marcaSeleccionada =
        document.getElementById("filtroMarca").value;

    let listaProductos =
        document.getElementById("listaProductosVenta");

    if (!listaProductos) return;

    listaProductos.innerHTML = "";

    productos.forEach(function(producto, indice) {

        let nombreProducto =
            producto.nombre.toLowerCase();

        let marcaProducto =
            (producto.marca || "Sin marca").toLowerCase();

        let coincideNombre =
            nombreProducto.includes(texto);

        let coincideMarca =
            marcaSeleccionada === "" ||
            marcaProducto === marcaSeleccionada.toLowerCase();

        if (coincideNombre && coincideMarca) {

            let elemento = document.createElement("div");

            elemento.classList.add("producto-linea");

            elemento.innerHTML = `
                <div class="producto-nombre">
                    <strong>${producto.nombre}</strong>
                </div>

                <div class="producto-marca">
                    ${producto.marca || "Sin marca"}
                </div>

                <div class="producto-precio">
                    S/ ${producto.precio.toFixed(2)}
                </div>

                <div class="producto-stock">
                    ${producto.stock}
                </div>

                <div class="producto-accion">
                    <button onclick="agregarProducto(${indice})">
                        Agregar
                    </button>
                </div>
            `;

            listaProductos.appendChild(elemento);
        }
    });

    if (listaProductos.innerHTML === "") {

        listaProductos.innerHTML =
            "<p>No se encontró ningún producto.</p>";
    }
}



// ==============================
// CARGAR MARCAS
// ==============================

function cargarMarcas() {

    let filtroMarca =
        document.getElementById("filtroMarca");

    if (!filtroMarca) return;


    filtroMarca.innerHTML =
        '<option value="">Todas las marcas</option>';


    let marcas = [];


    productos.forEach(function(producto) {

        let marca =
            producto.marca || "Sin marca";


        let marcaExiste =
            marcas.includes(marca);


        if (!marcaExiste) {

            marcas.push(marca);

        }

    });


    marcas.forEach(function(marca) {

        let opcion =
            document.createElement("option");


        opcion.value = marca;

        opcion.textContent = marca;


        filtroMarca.appendChild(opcion);

    });

}






// ==============================
// AGREGAR PRODUCTO AL CARRITO
// ==============================

function agregarProducto(indiceProducto) {

    let producto = productos[indiceProducto];

    if (producto.stock <= 0) {

        alert("Este producto no tiene stock disponible.");

        return;

    }

    let productoEncontrado =
        carrito.find(function(item) {

            return item.indiceProducto === indiceProducto;

        });


    if (productoEncontrado) {

        if (productoEncontrado.cantidad >= producto.stock) {

            alert(
                "No puedes agregar más unidades de las disponibles."
            );

            return;

        }

        productoEncontrado.cantidad++;

    } else {

        carrito.push({

            indiceProducto: indiceProducto,

            nombre: producto.nombre,

            precio: producto.precio,

            cantidad: 1

        });

    }

    mostrarCarrito();

}


// ==============================
// MOSTRAR CARRITO
// ==============================

function mostrarCarrito() {

    let listaCarrito =
        document.getElementById("listaCarrito");

    if (!listaCarrito) return;

    listaCarrito.innerHTML = "";

    let total = 0;


    if (carrito.length === 0) {

        listaCarrito.innerHTML =
            "<p>No hay productos agregados.</p>";

    } else {

        carrito.forEach(function(producto, indice) {

            let subtotal =
                producto.precio * producto.cantidad;

            total = total + subtotal;


            let elemento =
                document.createElement("div");

            elemento.classList.add("item-carrito");


            elemento.innerHTML = `

                <h3>
                    ${producto.nombre}
                </h3>

                <p>
                    Precio:
                    S/ ${producto.precio.toFixed(2)}
                </p>

                <div class="cantidad">

                    <button
                        onclick="disminuirCantidad(${indice})">
                        -
                    </button>

                    <span>
                        ${producto.cantidad}
                    </span>

                    <button
                        onclick="aumentarCantidad(${indice})">
                        +
                    </button>

                </div>

                <p>
                    Subtotal:
                    S/ ${subtotal.toFixed(2)}
                </p>

                <button
                    onclick="eliminarProducto(${indice})">
                    Eliminar
                </button>

                <hr>

            `;

            listaCarrito.appendChild(elemento);

        });

    }


    document.getElementById("total").textContent =
        "Total: S/ " + total.toFixed(2);

}


// ==============================
// AUMENTAR CANTIDAD
// ==============================

function aumentarCantidad(indice) {

    let productoCarrito = carrito[indice];

    let productoInventario =
        productos[productoCarrito.indiceProducto];


    if (
        productoCarrito.cantidad >=
        productoInventario.stock
    ) {

        alert(
            "No puedes agregar más unidades de las disponibles."
        );

        return;

    }


    productoCarrito.cantidad++;

    mostrarCarrito();

}


// ==============================
// DISMINUIR CANTIDAD
// ==============================

function disminuirCantidad(indice) {

    if (carrito[indice].cantidad > 1) {

        carrito[indice].cantidad--;

    }

    mostrarCarrito();

}


// ==============================
// ELIMINAR PRODUCTO DEL CARRITO
// ==============================

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    mostrarCarrito();

}


// ==============================
// REGISTRAR VENTA
// ==============================

function registrarVenta() {

    if (carrito.length === 0) {

        document.getElementById("mensajeVenta").textContent =
            "No hay productos en el carrito.";

        return;
    }


    let metodoSeleccionado =
        document.querySelector(
            'input[name="metodoPago"]:checked'
        );


    if (!metodoSeleccionado) {

        document.getElementById("mensajeVenta").textContent =
            "Selecciona un método de pago.";

        return;
    }


    let metodoPago =
        metodoSeleccionado.value;


    let total = 0;


    carrito.forEach(function(producto) {

        total +=
            producto.precio * producto.cantidad;

    });


    /* DESCONTAR STOCK */

    carrito.forEach(function(productoCarrito) {

        let productoInventario =
            productos.find(function(producto) {

                return producto.nombre ===
                    productoCarrito.nombre;

            });


        if (productoInventario) {

            productoInventario.stock -=
                productoCarrito.cantidad;

        }

    });


    /* CREAR VENTA */

    let nuevaVenta = {

        fecha: new Date().toLocaleString(),

        productos: [...carrito],

        total: total,

        metodoPago: metodoPago

    };


    ventas.push(nuevaVenta);


    /* GUARDAR DATOS */

    localStorage.setItem(
        "ventas",
        JSON.stringify(ventas)
    );

    guardarProductos();


    /* MOSTRAR MENSAJE */

    document.getElementById("mensajeVenta").textContent =
        "Venta registrada correctamente.";


    /* MOSTRAR COMPROBANTE */

    mostrarComprobante(nuevaVenta);


    /* VACIAR CARRITO */

    carrito = [];


    /* ACTUALIZAR PANTALLA */

    mostrarCarrito();

    mostrarProductosVenta();

}
function mostrarComprobante(venta) {

    ventaActual = venta;

    let comprobante =
        document.getElementById("comprobanteVenta");

    let detalle =
        document.getElementById("detalleComprobante");

    if (!comprobante || !detalle) {
        return;
    }

    let productosHTML = "";

    venta.productos.forEach(function(producto) {

        let subtotal =
            producto.precio * producto.cantidad;

        productosHTML += `
            <div class="producto-comprobante">

                <div class="nombre-producto">
                    ${producto.nombre}
                </div>

                <div class="cantidad-producto">
                    x${producto.cantidad}
                </div>

                <div class="precio-producto">
                    S/ ${subtotal.toFixed(2)}
                </div>

            </div>
        `;
    });

    let numeroVenta =
    ventas.indexOf(venta) + 1;
    detalle.innerHTML = `

        <div class="datos-ticket">

            <p>
                <strong>Venta N°:</strong>
                ${String(numeroVenta).padStart(6, "0")}
            </p>

            <p>
                <strong>Fecha:</strong>
                ${venta.fecha}
            </p>

            <p>
                <strong>Pago:</strong>
                ${venta.metodoPago}
            </p>

        </div>

        <div class="separador"></div>

        <h3>DETALLE DE LA VENTA</h3>

        <div class="cabecera-productos-ticket">

            <span>Producto</span>
            <span>Cant.</span>
            <span>Total</span>

        </div>

        ${productosHTML}

        <div class="separador"></div>

        <div class="total-ticket">

            <span>TOTAL</span>

            <strong>
                S/ ${venta.total.toFixed(2)}
            </strong>

        </div>
    `;

    comprobante.style.display = "block";
}


// ==============================
// IMPRIMIR VENTA
// ==============================

function imprimirComprobante() {

    window.print();

}


// ==============================
// CERRAR COMPROBANTE
// ==============================

function cerrarComprobante() {

    let comprobante =
        document.getElementById("comprobanteVenta");


    if (comprobante) {

        comprobante.style.display = "none";

    }

}


// ==============================
// INVENTARIO
// ==============================
function mostrarInventario() {

    let listaInventario =
        document.getElementById("listaInventario");

    if (!listaInventario) return;

    listaInventario.innerHTML = "";

    productos.forEach(function(producto, indice) {

        let elemento = document.createElement("div");

        elemento.classList.add("producto-inventario-linea");

        elemento.innerHTML = `
            <div class="inventario-nombre">
                <strong>${producto.nombre}</strong>
            </div>

            <div class="inventario-marca">
                ${producto.marca || "Sin marca"}
            </div>

            <div class="inventario-precio">
                S/ ${producto.precio.toFixed(2)}
            </div>

            <div class="inventario-stock">
                ${producto.stock}
            </div>

            <div class="inventario-acciones">

                <button onclick="aumentarStock(${indice})">
                    + Stock
                </button>

                <button onclick="disminuirStock(${indice})">
                    - Stock
                </button>

                <button onclick="editarProducto(${indice})">
                    Editar
                </button>

                <button onclick="eliminarProductoInventario(${indice})">
                    Eliminar
                </button>

            </div>
        `;

        listaInventario.appendChild(elemento);
    });
}




// ==============================
// AUMENTAR STOCK
// ==============================

function aumentarStock(indice) {

    productos[indice].stock++;

    guardarProductos();

    mostrarInventario();

}


// ==============================
// DISMINUIR STOCK
// ==============================

function disminuirStock(indice) {

    if (productos[indice].stock > 0) {

        productos[indice].stock--;

    }

    guardarProductos();

    mostrarInventario();

}

// ==============================
// EDITAR PRODUCTO
// ==============================

function editarProducto(indice) {

    let producto = productos[indice];

    let opcion = prompt(
        "¿Qué deseas editar?\n\n" +
        "1. Nombre\n" +
        "2. Marca\n" +
        "3. Precio\n" +
        "4. Stock\n" +
        "5. Todo\n\n" +
        "Escribe el número de la opción:"
    );

    if (opcion === null) {
        return;
    }

    if (opcion === "1") {

        let nuevoNombre = prompt(
            "Nuevo nombre del producto:",
            producto.nombre
        );

        if (nuevoNombre === null) {
            return;
        }

        nuevoNombre = nuevoNombre.trim();

        if (nuevoNombre === "") {
            alert("El nombre no puede estar vacío.");
            return;
        }

        producto.nombre = nuevoNombre;
    }

    else if (opcion === "2") {

        let nuevaMarca = prompt(
            "Nueva marca del producto:",
            producto.marca || ""
        );

        if (nuevaMarca === null) {
            return;
        }

        nuevaMarca = nuevaMarca.trim();

        if (nuevaMarca === "") {
            alert("La marca no puede estar vacía.");
            return;
        }

        producto.marca = nuevaMarca;
    }

    else if (opcion === "3") {

        let nuevoPrecio = prompt(
            "Nuevo precio del producto:",
            producto.precio
        );

        if (nuevoPrecio === null) {
            return;
        }

        nuevoPrecio = parseFloat(nuevoPrecio);

        if (isNaN(nuevoPrecio) || nuevoPrecio <= 0) {
            alert("Ingresa un precio válido.");
            return;
        }

        producto.precio = nuevoPrecio;
    }

    else if (opcion === "4") {

        let nuevoStock = prompt(
            "Nuevo stock del producto:",
            producto.stock
        );

        if (nuevoStock === null) {
            return;
        }

        nuevoStock = parseInt(nuevoStock);

        if (isNaN(nuevoStock) || nuevoStock < 0) {
            alert("Ingresa un stock válido.");
            return;
        }

        producto.stock = nuevoStock;
    }

    else if (opcion === "5") {

        let nuevoNombre = prompt(
            "Nuevo nombre del producto:",
            producto.nombre
        );

        if (nuevoNombre === null) {
            return;
        }

        nuevoNombre = nuevoNombre.trim();

        if (nuevoNombre === "") {
            alert("El nombre no puede estar vacío.");
            return;
        }

        let nuevaMarca = prompt(
            "Nueva marca del producto:",
            producto.marca || ""
        );

        if (nuevaMarca === null) {
            return;
        }

        nuevaMarca = nuevaMarca.trim();

        if (nuevaMarca === "") {
            alert("La marca no puede estar vacía.");
            return;
        }

        let nuevoPrecio = prompt(
            "Nuevo precio del producto:",
            producto.precio
        );

        if (nuevoPrecio === null) {
            return;
        }

        nuevoPrecio = parseFloat(nuevoPrecio);

        if (isNaN(nuevoPrecio) || nuevoPrecio <= 0) {
            alert("Ingresa un precio válido.");
            return;
        }

        let nuevoStock = prompt(
            "Nuevo stock del producto:",
            producto.stock
        );

        if (nuevoStock === null) {
            return;
        }

        nuevoStock = parseInt(nuevoStock);

        if (isNaN(nuevoStock) || nuevoStock < 0) {
            alert("Ingresa un stock válido.");
            return;
        }

        producto.nombre = nuevoNombre;
        producto.marca = nuevaMarca;
        producto.precio = nuevoPrecio;
        producto.stock = nuevoStock;
    }

    else {

        alert("Opción no válida.");
        return;
    }

    guardarProductos();
    mostrarInventario();

    alert("Producto actualizado correctamente.");
}


// ==============================
// ELIMINAR PRODUCTO DEL INVENTARIO
// ==============================

function eliminarProductoInventario(indice) {

    let producto = productos[indice];


    let confirmar =
        confirm(
            "¿Estás seguro de eliminar " +
            producto.nombre +
            "?"
        );


    if (!confirmar) {

        return;

    }


    productos.splice(indice, 1);


    guardarProductos();


    mostrarInventario();


    alert("Producto eliminado correctamente.");

}

// ==============================
// AGREGAR NUEVO PRODUCTO
// ==============================

function agregarNuevoProducto() {

    let nombre =
        document.getElementById("nombreProducto").value.trim();


    let marca =
        document.getElementById("marcaProducto").value.trim();


    let precio =
        parseFloat(
            document.getElementById("precioProducto").value
        );


    let stock =
        parseInt(
            document.getElementById("stockProducto").value
        );


    let mensaje =
        document.getElementById("mensajeProducto");


    // Comprobar nombre

    if (nombre === "") {

        mensaje.textContent =
            "Escribe el nombre del producto.";

        return;

    }


    // Comprobar marca

    if (marca === "") {

        mensaje.textContent =
            "Escribe la marca del producto.";

        return;

    }


    // Comprobar precio

    if (isNaN(precio) || precio <= 0) {

        mensaje.textContent =
            "Ingresa un precio válido.";

        return;

    }


    // Comprobar stock

    if (isNaN(stock) || stock < 0) {

        mensaje.textContent =
            "Ingresa un stock válido.";

        return;

    }


    // Comprobar producto repetido

    let productoExistente =
        productos.find(function(producto) {

            return producto.nombre.toLowerCase() ===
                nombre.toLowerCase();

        });


    if (productoExistente) {

        mensaje.textContent =
            "Ese producto ya existe.";

        return;

    }


    // Crear producto

    let nuevoProducto = {

        nombre: nombre,

        marca: marca,

        precio: precio,

        stock: stock

    };


    // Agregar producto

    productos.push(nuevoProducto);


    // Guardar

    guardarProductos();


    // Actualizar inventario

    mostrarInventario();


    // Limpiar campos

    document.getElementById("nombreProducto").value = "";

    document.getElementById("marcaProducto").value = "";

    document.getElementById("precioProducto").value = "";

    document.getElementById("stockProducto").value = "";


    mensaje.textContent =
        "Producto agregado correctamente.";

}
// ==============================
// HISTORIAL DE VENTAS
// ==============================

function mostrarVentas(lista = ventas) {

    let listaVentas =
        document.getElementById("listaVentas");

    if (!listaVentas) return;

    listaVentas.innerHTML = "";

    if (lista.length === 0) {

        listaVentas.innerHTML =
            "<p>No hay ventas registradas.</p>";

        return;
    }

    // Mostrar la venta más reciente primero
    for (let i = lista.length - 1; i >= 0; i--) {

        let venta = lista[i];

        // Buscar el índice original de la venta
        let indiceOriginal =
            ventas.indexOf(venta);

        let elemento =
            document.createElement("div");

        elemento.classList.add("venta-linea");

        elemento.innerHTML = `

            <div class="venta-fecha">
                ${venta.fecha}
            </div>

            <div class="venta-total">
                S/ ${venta.total.toFixed(2)}
            </div>

            <div class="venta-metodo">
                ${venta.metodoPago}
            </div>

            <div class="venta-accion">

                <button
                    onclick="verDetalleVenta(${indiceOriginal})">
                    Ver detalle
                </button>

                <button
                    onclick="imprimirVentaHistorial(${indiceOriginal})">
                    🖨️ Imprimir
                </button>

            </div>

        `;

        listaVentas.appendChild(elemento);
    }
}
// ==============================
// FILTRAR VENTAS POR FECHA
// ==============================

function filtrarVentas() {

    let fechaDesde =
        document.getElementById("fechaDesde").value;

    let fechaHasta =
        document.getElementById("fechaHasta").value;

    if (!fechaDesde && !fechaHasta) {

        mostrarVentas();

        return;
    }

    let ventasFiltradas = [];

    ventas.forEach(function(venta) {

        // La fecha está guardada como:
        // 27/9/2026, 14:30:00

        let parteFecha =
            venta.fecha.split(",")[0];

        let partes =
            parteFecha.split("/");

        if (partes.length !== 3) {
            return;
        }

        let dia =
            partes[0].padStart(2, "0");

        let mes =
            partes[1].padStart(2, "0");

        let año =
            partes[2];

        let fechaVenta =
            año + "-" + mes + "-" + dia;


        // Comparar con fecha desde

        if (fechaDesde &&
            fechaVenta < fechaDesde) {

            return;
        }


        // Comparar con fecha hasta

        if (fechaHasta &&
            fechaVenta > fechaHasta) {

            return;
        }


        ventasFiltradas.push(venta);

    });


    mostrarVentas(ventasFiltradas);
}
// ==============================
// Detalles de venta
// ==============================
function verDetalleVenta(indice) {

    let venta = ventas[indice];

    if (!venta) {
        return;
    }

    let detalle = "DETALLE DE LA VENTA\n\n";

    detalle += "Fecha: " + venta.fecha + "\n";
    detalle += "Método de pago: " + venta.metodoPago + "\n\n";

    detalle += "PRODUCTOS:\n\n";


    venta.productos.forEach(function(producto) {

        let subtotal =
            producto.precio * producto.cantidad;

        detalle +=
            producto.nombre +
            " x " +
            producto.cantidad +
            " = S/ " +
            subtotal.toFixed(2) +
            "\n";

    });


    detalle +=
        "\nTOTAL: S/ " +
        venta.total.toFixed(2);


    alert(detalle);
}



// ==============================
// REPORTES
// ==============================

function mostrarReportes(lista = null) {

    let resumen =
        document.getElementById("resumenReportes");

    if (!resumen) return;


    // Si no se envía una lista,
    // mostrar solamente las ventas de hoy

    if (lista === null) {

        let fechaActual =
            new Date();

        let diaActual =
            String(fechaActual.getDate()).padStart(2, "0");

        let mesActual =
            String(fechaActual.getMonth() + 1).padStart(2, "0");

        let añoActual =
            fechaActual.getFullYear();


        let fechaHoy =
            diaActual + "/" +
            mesActual + "/" +
            añoActual;


        lista =
            ventas.filter(function(venta) {

                let parteFecha =
                    venta.fecha.split(",")[0];

                let partes =
                    parteFecha.split("/");

                if (partes.length !== 3) {
                    return false;
                }

                let dia =
                    partes[0].padStart(2, "0");

                let mes =
                    partes[1].padStart(2, "0");

                let año =
                    partes[2];

                let fechaVenta =
                    dia + "/" + mes + "/" + año;

                return fechaVenta === fechaHoy;

            });

    }


    let cantidadVentas =
        lista.length;


    let totalVentas = 0;

    let efectivo = 0;
    let yape = 0;
    let tarjeta = 0;


    lista.forEach(function(venta) {

        totalVentas += venta.total;


        if (venta.metodoPago === "Efectivo") {

            efectivo += venta.total;

        }

        else if (venta.metodoPago === "Yape") {

            yape += venta.total;

        }

        else if (venta.metodoPago === "Tarjeta") {

            tarjeta += venta.total;

        }

    });


    resumen.innerHTML = `

        <div class="reporte-linea">

            <div>
                Ventas realizadas
            </div>

            <div>
                ${cantidadVentas}
            </div>

        </div>


        <div class="reporte-linea">

            <div>
                Total vendido
            </div>

            <div>
                S/ ${totalVentas.toFixed(2)}
            </div>

        </div>


        <div class="reporte-linea">

            <div>
                Efectivo
            </div>

            <div>
                S/ ${efectivo.toFixed(2)}
            </div>

        </div>


        <div class="reporte-linea">

            <div>
                Yape
            </div>

            <div>
                S/ ${yape.toFixed(2)}
            </div>

        </div>


        <div class="reporte-linea">

            <div>
                Tarjeta
            </div>

            <div>
                S/ ${tarjeta.toFixed(2)}
            </div>

        </div>

    `;
    mostrarProductosMasVendidos(lista);
    mostrarProductosPocoStock();
}
// ==============================
// FILTRAR REPORTES POR FECHA
// ==============================

function filtrarReporte() {

    let fechaDesde =
        document.getElementById("fechaReporteDesde").value;

    let fechaHasta =
        document.getElementById("fechaReporteHasta").value;


    if (!fechaDesde && !fechaHasta) {

        mostrarReportes();

        return;
    }


    let ventasFiltradas = [];


    ventas.forEach(function(venta) {

        let parteFecha =
            venta.fecha.split(",")[0];

        let partes =
            parteFecha.split("/");

        if (partes.length !== 3) {
            return;
        }


        let dia =
            partes[0].padStart(2, "0");

        let mes =
            partes[1].padStart(2, "0");

        let año =
            partes[2];


        let fechaVenta =
            año + "-" +
            mes + "-" +
            dia;


        if (fechaDesde &&
            fechaVenta < fechaDesde) {

            return;
        }


        if (fechaHasta &&
            fechaVenta > fechaHasta) {

            return;
        }


        ventasFiltradas.push(venta);

    });


    mostrarReportes(ventasFiltradas);
}
// ==============================
// PRODUCTOS MÁS VENDIDOS
// ==============================

function mostrarProductosMasVendidos(listaVentas) {

    let contenedor =
        document.getElementById("productosMasVendidos");

    if (!contenedor) return;

    let productosVendidos = [];


    listaVentas.forEach(function(venta) {

        venta.productos.forEach(function(producto) {

            let productoExistente =
                productosVendidos.find(function(item) {

                    return item.nombre === producto.nombre;

                });


            if (productoExistente) {

                productoExistente.cantidad +=
                    producto.cantidad;

            } else {

                productosVendidos.push({

                    nombre: producto.nombre,

                    cantidad: producto.cantidad

                });

            }

        });

    });


    // Ordenar del más vendido al menos vendido

    productosVendidos.sort(function(a, b) {

        return b.cantidad - a.cantidad;

    });


    if (productosVendidos.length === 0) {

        contenedor.innerHTML =
            "<p>No hay productos vendidos en este período.</p>";

        return;

    }


    let html = "";


    productosVendidos.forEach(function(producto, indice) {

        html += `

            <div class="producto-reporte">

                <div>
                    ${indice + 1}. ${producto.nombre}
                </div>

                <div>
                    ${producto.cantidad} unidades
                </div>

            </div>

        `;

    });


    contenedor.innerHTML = html;

}
// ==============================
// IMPRIMIR VENTA DESDE HISTORIAL
// ==============================

function imprimirVentaHistorial(indice) {

    let venta = ventas[indice];

    if (!venta) {
        alert("No se encontró la venta.");
        return;
    }

    // Mostrar el mismo comprobante usado en Nueva venta
    mostrarComprobante(venta);

    // Esperar un momento y abrir impresión
    setTimeout(function() {
        window.print();
    }, 500);
}
// Cerrar comprobante después de imprimir
window.onafterprint = function() {
    cerrarComprobante();
};
// ==============================
// PRODUCTOS CON POCO STOCK
// ==============================

function mostrarProductosPocoStock() {

    let contenedor =
        document.getElementById("productosPocoStock");

    if (!contenedor) return;

    let productosBajoStock =
        productos.filter(function(producto) {

            return producto.stock <= 5;

        });


    if (productosBajoStock.length === 0) {

        contenedor.innerHTML =
            "<p>No hay productos con poco stock.</p>";

        return;

    }


    let html = "";


    productosBajoStock.forEach(function(producto) {

        html += `

            <div class="producto-reporte">

                <div>
                    ${producto.nombre}
                </div>

                <div>
                    ${producto.stock} unidades
                </div>

            </div>

        `;

    });


    contenedor.innerHTML = html;

}


// ==============================
// EJECUTAR FUNCIONES
// ==============================

mostrarInventario();

mostrarVentas();

cargarMarcas();

mostrarProductosVenta();

mostrarReportes();