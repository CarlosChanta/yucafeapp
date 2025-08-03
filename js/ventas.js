document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("formulario");

  // Crear título de sección
  const titulo = document.createElement("h2");
  titulo.textContent = "Selecciona un producto";
  titulo.style.textAlign = "center";
  titulo.style.marginBottom = "1.5rem";
  contenedor.appendChild(titulo);

  carta.forEach((producto) => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.style.marginBottom = "1.5rem";

    const productoTitulo = document.createElement("h3");
    productoTitulo.innerHTML = `☕ ${producto.nombre} <span style='color: #f9a8d4; font-size: 0.9rem; font-weight: normal;'>(${producto.categoria})</span>`;
    div.appendChild(productoTitulo);

    const opcionesContainer = document.createElement("div");
    opcionesContainer.style.display = "grid";
    opcionesContainer.style.gridTemplateColumns =
      "repeat(auto-fit, minmax(200px, 1fr))";
    opcionesContainer.style.gap = "0.5rem";
    opcionesContainer.style.marginTop = "1rem";

    producto.opciones.forEach((opcion) => {
      const btn = document.createElement("button");
      btn.textContent = `${opcion.tamaño} - S/. ${opcion.precio.toFixed(2)}`;
      btn.style.width = "100%";
      btn.style.minHeight = "50px";
      btn.onclick = () => mostrarModalPago(producto, opcion);
      opcionesContainer.appendChild(btn);
    });

    div.appendChild(opcionesContainer);
    contenedor.appendChild(div);
  });
});

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
    width: 90%;
    text-align: center;
    animation: fadeInUp 0.3s ease-out;
    backdrop-filter: blur(10px);
  `;

  modal.innerHTML = `
    <h3 style="color: #be185d; margin-bottom: 1rem;">Confirmar Venta</h3>
    <div style="background: linear-gradient(135deg, #fdf2f8, #fce7f3); border: 1px solid #f9a8d4; padding: 1rem; border-radius: 15px; margin-bottom: 1.5rem; box-shadow: 0 4px 15px rgba(190, 24, 93, 0.1);">
      <p><strong>${producto.nombre}</strong></p>
      <p>Tamaño: ${opcion.tamaño}</p>
      <p style="font-size: 1.2rem; color: #be185d;"><strong>Total: S/. ${opcion.precio.toFixed(2)}</strong></p>
    </div>
    <p style="margin-bottom: 1rem; color: #9d174d;">¿Método de pago?</p>
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.8rem; margin-bottom: 1.5rem;">
      <button onclick="procesarVenta('${producto.nombre}', '${opcion.tamaño}', ${opcion.precio}, 'efectivo')"
              style="background: linear-gradient(135deg, #fce7f3, #f9a8d4); color: #be185d; border: 2px solid #f9a8d4; padding: 1rem; border-radius: 15px; font-size: 0.9rem; cursor: pointer; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(190, 24, 93, 0.1);"
              onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(190, 24, 93, 0.2)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(190, 24, 93, 0.1)'">
        💵 Efectivo
      </button>
      <button onclick="procesarVenta('${producto.nombre}', '${opcion.tamaño}', ${opcion.precio}, 'yape')"
              style="background: linear-gradient(135deg, #f3e8ff, #e9d5ff); color: #7c3aed; border: 2px solid #c084fc; padding: 1rem; border-radius: 15px; font-size: 0.9rem; cursor: pointer; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(124, 58, 237, 0.1);"
              onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(124, 58, 237, 0.2)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(124, 58, 237, 0.1)'">
        📱 Yape
      </button>
      <button onclick="procesarVenta('${producto.nombre}', '${opcion.tamaño}', ${opcion.precio}, 'tarjeta')"
              style="background: linear-gradient(135deg, #fef3c7, #fde68a); color: #d97706; border: 2px solid #fbbf24; padding: 1rem; border-radius: 15px; font-size: 0.9rem; cursor: pointer; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(217, 119, 6, 0.1);"
              onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(217, 119, 6, 0.2)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(217, 119, 6, 0.1)'">
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
    const metodoNormalizado = normalizarMetodoPago(metodo);

    guardarVenta({
      producto: nombreProducto,
      tamaño: tamaño,
      precio: precio,
      metodo: metodoNormalizado,
      fecha: new Date().toISOString(),
    });

    // Mostrar confirmación con animación
    modal.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">🌸</div>
        <h3 style="color: #be185d; margin-bottom: 1rem;">¡Venta Registrada!</h3>
        <div style="background: linear-gradient(135deg, #fdf2f8, #fce7f3); border: 2px solid #f9a8d4; padding: 1.5rem; border-radius: 15px; margin-bottom: 1.5rem; box-shadow: 0 4px 15px rgba(190, 24, 93, 0.1);">
          <p style="color: #be185d; font-weight: 600; margin-bottom: 0.5rem;"><strong>${nombreProducto}</strong> - ${tamaño}</p>
          <p style="color: #9d174d; margin-bottom: 0.5rem;">Método: ${metodoNormalizado.charAt(0).toUpperCase() + metodoNormalizado.slice(1)}</p>
          <p style="font-size: 1.3rem; color: #be185d; font-weight: bold;"><strong>S/. ${precio.toFixed(2)}</strong></p>
        </div>
        <button onclick="cerrarModal()"
                style="background: linear-gradient(135deg, #f9a8d4, #be185d); color: white; border: none; padding: 1rem 2rem; border-radius: 25px; cursor: pointer; font-weight: 600; box-shadow: 0 4px 15px rgba(190, 24, 93, 0.3); transition: all 0.3s ease;"
                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(190, 24, 93, 0.4)'"
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(190, 24, 93, 0.3)'">
          ✨ Continuar
        </button>
      </div>
    `;

    // Auto cerrar después de 2 segundos
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        cerrarModal();
      }
    }, 2000);
  };

  // Cerrar modal al hacer clic fuera
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      cerrarModal();
    }
  });
}
