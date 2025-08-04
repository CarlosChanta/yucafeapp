document.addEventListener("DOMContentLoaded", () => {
  cargarProductosVenta();
});

function cargarProductosVenta() {
  const contenedor = document.getElementById("formulario");

  // Limpiar contenedor
  contenedor.innerHTML = "";

  // Crear título de sección
  const titulo = document.createElement("h2");
  titulo.textContent = "Selecciona un producto";
  titulo.style.textAlign = "center";
  titulo.style.marginBottom = "1.5rem";
  contenedor.appendChild(titulo);

  // Obtener carta dinámica
  const cartaActual = obtenerCarta();
  const categorias = obtenerCategorias();

  // Si no hay productos, mostrar mensaje
  if (cartaActual.length === 0) {
    const mensaje = document.createElement("div");
    mensaje.style.cssText = `
      text-align: center;
      color: #be185d;
      font-style: italic;
      padding: 2rem;
      background: linear-gradient(135deg, #fdf2f8, #fce7f3);
      border-radius: 15px;
      border: 2px dashed #f9a8d4;
      box-shadow: 0 4px 15px rgba(190, 24, 93, 0.05);
    `;
    mensaje.innerHTML =
      "🌸 No hay productos disponibles. Ve al panel de administración para agregar productos.";
    contenedor.appendChild(mensaje);
    return;
  }

  // Crear filtros de categoría
  const filtrosContainer = document.createElement("div");
  filtrosContainer.style.cssText = `
    background: linear-gradient(135deg, #fdf2f8, #fce7f3);
    border: 2px solid #f9a8d4;
    border-radius: 15px;
    padding: 1rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 15px rgba(190, 24, 93, 0.1);
  `;

  filtrosContainer.innerHTML = `
    <p style="text-align: center; margin-bottom: 1rem; color: #be185d; font-weight: 600;">🔍 Filtrar por categoría:</p>
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center;">
      <button onclick="filtrarVentasPorCategoria('todas')"
              class="filtro-btn" data-categoria="todas"
              style="background: linear-gradient(135deg, #f9a8d4, #be185d); color: white; border: none; padding: 0.5rem 1rem; border-radius: 20px; cursor: pointer; font-size: 0.9rem; font-weight: 600;">
        🌸 Todas
      </button>
      ${categorias
        .map((categoria) => {
          const productosCat = obtenerProductosPorCategoria(categoria);
          const iconoCat =
            productosCat.length > 0 ? productosCat[0].icono : "🌸";
          return `
          <button onclick="filtrarVentasPorCategoria('${categoria}')"
                  class="filtro-btn" data-categoria="${categoria}"
                  style="background: linear-gradient(135deg, #fce7f3, #f9a8d4); color: #be185d; border: 1px solid #f9a8d4; padding: 0.5rem 1rem; border-radius: 20px; cursor: pointer; font-size: 0.9rem; font-weight: 600;">
            ${iconoCat} ${categoria}
          </button>
        `;
        })
        .join("")}
    </div>
  `;
  contenedor.appendChild(filtrosContainer);

  // Mostrar productos por categoría
  categorias.forEach((categoria) => {
    const productosCategoria = obtenerProductosPorCategoria(categoria);

    if (productosCategoria.length === 0) return;

    // Crear título de categoría
    const tituloCategoria = document.createElement("div");
    tituloCategoria.className = "categoria-titulo";
    tituloCategoria.setAttribute("data-categoria", categoria);
    tituloCategoria.style.cssText = `
      background: linear-gradient(135deg, #fdf2f8, #fce7f3);
      border: 2px solid #f9a8d4;
      border-radius: 15px;
      padding: 1rem;
      margin: 2rem 0 1rem 0;
      text-align: center;
      box-shadow: 0 4px 15px rgba(190, 24, 93, 0.1);
    `;

    const iconoCategoria = productosCategoria[0].icono || "🌸";
    tituloCategoria.innerHTML = `
      <h3 style="color: #be185d; margin: 0; font-size: 1.3rem;">
        ${iconoCategoria} ${categoria}
      </h3>
      <p style="color: #be185d; margin: 0.5rem 0 0 0; font-size: 0.9rem;">
        ${productosCategoria.length} productos disponibles
      </p>
    `;
    contenedor.appendChild(tituloCategoria);

    // Crear grid de productos
    const gridProductos = document.createElement("div");
    gridProductos.className = "productos-grid";
    gridProductos.setAttribute("data-categoria", categoria);
    gridProductos.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    `;

    productosCategoria.forEach((producto) => {
      const div = document.createElement("div");
      div.className = "menu-item producto-venta";
      div.setAttribute("data-categoria", categoria);
      div.style.marginBottom = "1rem";

      const icono = producto.icono || iconoCategoria;
      const productoTitulo = document.createElement("h4");
      productoTitulo.innerHTML = `${icono} ${producto.nombre} <span style='color: #f9a8d4; font-size: 0.8rem; font-weight: normal;'>(${producto.categoria})</span>`;
      div.appendChild(productoTitulo);

      const opcionesContainer = document.createElement("div");
      opcionesContainer.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 0.5rem;
        margin-top: 1rem;
      `;

      producto.opciones.forEach((opcion) => {
        const btn = document.createElement("button");
        btn.textContent = `${opcion.tamaño} - S/. ${opcion.precio.toFixed(2)}`;
        btn.style.cssText = `
          width: 100%;
          min-height: 50px;
          padding: 0.8rem;
          font-size: 0.9rem;
          font-weight: 600;
          border-radius: 12px;
          transition: all 0.3s ease;
        `;
        btn.onclick = () => mostrarModalPago(producto, opcion);
        opcionesContainer.appendChild(btn);
      });

      div.appendChild(opcionesContainer);
      gridProductos.appendChild(div);
    });

    contenedor.appendChild(gridProductos);
  });

  // Añadir botón para recargar productos
  const botonRecargar = document.createElement("div");
  botonRecargar.style.cssText = `
    text-align: center;
    margin-top: 2rem;
    padding: 1rem;
  `;
  botonRecargar.innerHTML = `
    <button onclick="cargarProductosVenta()"
            style="background: linear-gradient(135deg, #fce7f3, #f9a8d4); color: #be185d; border: 2px solid #f9a8d4; padding: 0.8rem 1.5rem; border-radius: 20px; cursor: pointer; font-weight: 600;">
      🔄 Actualizar Lista de Productos
    </button>
  `;
  contenedor.appendChild(botonRecargar);
}

function filtrarVentasPorCategoria(categoria) {
  const productos = document.querySelectorAll(".producto-venta");
  const titulos = document.querySelectorAll(".categoria-titulo");
  const grids = document.querySelectorAll(".productos-grid");

  // Actualizar botones de filtro
  const botonesFiltro = document.querySelectorAll(".filtro-btn");
  botonesFiltro.forEach((btn) => {
    if (btn.getAttribute("data-categoria") === categoria) {
      btn.style.background = "linear-gradient(135deg, #f9a8d4, #be185d)";
      btn.style.color = "white";
    } else {
      btn.style.background = "linear-gradient(135deg, #fce7f3, #f9a8d4)";
      btn.style.color = "#be185d";
    }
  });

  if (categoria === "todas") {
    productos.forEach((p) => (p.style.display = "block"));
    titulos.forEach((t) => (t.style.display = "block"));
    grids.forEach((g) => (g.style.display = "grid"));
  } else {
    productos.forEach((p) => {
      if (p.getAttribute("data-categoria") === categoria) {
        p.style.display = "block";
      } else {
        p.style.display = "none";
      }
    });

    titulos.forEach((t) => {
      if (t.getAttribute("data-categoria") === categoria) {
        t.style.display = "block";
      } else {
        t.style.display = "none";
      }
    });

    grids.forEach((g) => {
      if (g.getAttribute("data-categoria") === categoria) {
        g.style.display = "grid";
      } else {
        g.style.display = "none";
      }
    });
  }
}

function mostrarModalPago(producto, opcion) {
  // Crear modal overlay
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(253, 242, 248, 0.9), rgba(251, 207, 232, 0.9));
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 1rem;
  `;

  // Crear modal
  const modal = document.createElement("div");
  modal.style.cssText = `
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(253, 242, 248, 0.9));
    border: 2px solid rgba(248, 187, 217, 0.3);
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(190, 24, 93, 0.2);
    max-width: 400px;
    width: 100%;
    text-align: center;
    animation: fadeInUp 0.3s ease-out;
    backdrop-filter: blur(10px);
    max-height: 90vh;
    overflow-y: auto;
  `;

  const icono = producto.icono || "🌸";
  modal.innerHTML = `
    <h3 style="color: #be185d; margin-bottom: 1rem;">Confirmar Venta</h3>
    <div style="background: linear-gradient(135deg, #fdf2f8, #fce7f3); border: 1px solid #f9a8d4; padding: 1rem; border-radius: 15px; margin-bottom: 1.5rem; box-shadow: 0 4px 15px rgba(190, 24, 93, 0.1);">
      <p style="margin-bottom: 0.5rem;"><strong>${icono} ${producto.nombre}</strong></p>
      <p style="margin-bottom: 0.5rem; color: #9d174d;">Categoría: ${producto.categoria}</p>
      <p style="margin-bottom: 0.5rem;">Tamaño: ${opcion.tamaño}</p>
      <p style="font-size: 1.2rem; color: #be185d; margin: 0;"><strong>Total: S/. ${opcion.precio.toFixed(2)}</strong></p>
    </div>
    <p style="margin-bottom: 1rem; color: #9d174d; font-weight: 600;">¿Método de pago?</p>
    <div class="payment-grid" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.8rem; margin-bottom: 1.5rem;">
      <button onclick="procesarVenta('${producto.nombre.replace(/'/g, "\\'")}', '${opcion.tamaño.replace(/'/g, "\\'")}', ${opcion.precio}, 'efectivo')"
              class="btn-pago"
              style="background: linear-gradient(135deg, #fce7f3, #f9a8d4); color: #be185d; border: 2px solid #f9a8d4; padding: 1rem; border-radius: 15px; font-size: 0.9rem; cursor: pointer; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(190, 24, 93, 0.1);"
              onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(190, 24, 93, 0.2)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(190, 24, 93, 0.1)'">
        💵 Efectivo
      </button>
      <button onclick="procesarVenta('${producto.nombre.replace(/'/g, "\\'")}', '${opcion.tamaño.replace(/'/g, "\\'")}', ${opcion.precio}, 'yape')"
              class="btn-pago"
              style="background: linear-gradient(135deg, #f3e8ff, #e9d5ff); color: #be185d; border: 2px solid #c084fc; padding: 1rem; border-radius: 15px; font-size: 0.9rem; cursor: pointer; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(190, 24, 93, 0.1);"
              onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(190, 24, 93, 0.2)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(190, 24, 93, 0.1)'">
        📱 Yape
      </button>
      <button onclick="procesarVenta('${producto.nombre.replace(/'/g, "\\'")}', '${opcion.tamaño.replace(/'/g, "\\'")}', ${opcion.precio}, 'tarjeta')"
              class="btn-pago"
              style="background: linear-gradient(135deg, #fef3c7, #fde68a); color: #be185d; border: 2px solid #fbbf24; padding: 1rem; border-radius: 15px; font-size: 0.9rem; cursor: pointer; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(190, 24, 93, 0.1);"
              onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(190, 24, 93, 0.2)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(190, 24, 93, 0.1)'">
        💳 Tarjeta
      </button>
    </div>
    <button onclick="cerrarModal()"
            style="background: linear-gradient(135deg, #f8bbd9, #f9a8d4); color: #be185d; border: 2px solid #f9a8d4; padding: 0.8rem 1.5rem; border-radius: 20px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;"
            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 15px rgba(190, 24, 93, 0.2)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
      ✕ Cancelar
    </button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Función global para cerrar modal
  window.cerrarModal = () => {
    document.body.removeChild(overlay);
    delete window.cerrarModal;
    delete window.procesarVenta;
  };

  // Función global para procesar venta
  window.procesarVenta = (nombreProducto, tamaño, precio, metodo) => {
    try {
      const metodoNormalizado = normalizarMetodoPago(metodo);
      const precioValidado = validarNumero(precio);

      if (precioValidado <= 0) {
        alert("Error: Precio inválido");
        return;
      }

      const venta = {
        producto: nombreProducto,
        tamaño: tamaño,
        precio: precioValidado,
        metodo: metodoNormalizado,
        fecha: new Date().toISOString(),
      };

      guardarVenta(venta);

      // Mostrar confirmación con animación
      modal.innerHTML = `
        <div style="text-align: center;">
          <div style="font-size: 4rem; margin-bottom: 1rem;">🌸</div>
          <h3 style="color: #be185d; margin-bottom: 1rem;">¡Venta Registrada!</h3>
          <div style="background: linear-gradient(135deg, #fdf2f8, #fce7f3); border: 2px solid #f9a8d4; padding: 1.5rem; border-radius: 15px; margin-bottom: 1.5rem; box-shadow: 0 4px 15px rgba(190, 24, 93, 0.1);">
            <p style="color: #be185d; font-weight: 600; margin-bottom: 0.5rem;"><strong>${icono} ${nombreProducto}</strong></p>
            <p style="color: #be185d; margin-bottom: 0.5rem;">Tamaño: ${tamaño}</p>
            <p style="color: #be185d; margin-bottom: 0.5rem;">Método: ${metodoNormalizado.charAt(0).toUpperCase() + metodoNormalizado.slice(1)}</p>
            <p style="font-size: 1.3rem; color: #be185d; font-weight: bold; margin: 0;"><strong>S/. ${precioValidado.toFixed(2)}</strong></p>
          </div>
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <button onclick="cerrarModal()"
                    style="background: linear-gradient(135deg, #f9a8d4, #be185d); color: white; border: none; padding: 1rem 1.5rem; border-radius: 25px; cursor: pointer; font-weight: 600; box-shadow: 0 4px 15px rgba(190, 24, 93, 0.3); transition: all 0.3s ease;"
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(190, 24, 93, 0.4)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(190, 24, 93, 0.3)'">
              ✨ Continuar
            </button>
            <button onclick="window.location.href='cierre.html'"
                    style="background: linear-gradient(135deg, #fce7f3, #f9a8d4); color: #be185d; border: 2px solid #f9a8d4; padding: 1rem 1.5rem; border-radius: 25px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;"
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 15px rgba(190, 24, 93, 0.2)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
              📊 Ver Cierre
            </button>
          </div>
        </div>
      `;

      // Auto cerrar después de 3 segundos
      setTimeout(() => {
        if (document.body.contains(overlay)) {
          cerrarModal();
        }
      }, 3000);
    } catch (error) {
      console.error("Error al procesar venta:", error);
      alert("Error al procesar la venta: " + error.message);
    }
  };

  // Cerrar modal al hacer clic fuera
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      cerrarModal();
    }
  });

  // Cerrar modal con tecla Escape
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      cerrarModal();
      document.removeEventListener("keydown", handleEscape);
    }
  };
  document.addEventListener("keydown", handleEscape);
}
