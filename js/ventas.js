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
    background: rgba(190, 24, 93, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
  `;

  // Crear modal
  const modal = document.createElement("div");
  modal.style.cssText = `
    background: white;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(190, 24, 93, 0.3);
    max-width: 400px;
    width: 90%;
    text-align: center;
    animation: fadeInUp 0.3s ease-out;
  `;

  modal.innerHTML = `
    <h3 style="color: #be185d; margin-bottom: 1rem;">Confirmar Venta</h3>
    <div style="background: #fdf2f8; padding: 1rem; border-radius: 10px; margin-bottom: 1.5rem;">
      <p><strong>${producto.nombre}</strong></p>
      <p>Tamaño: ${opcion.tamaño}</p>
      <p style="font-size: 1.2rem; color: #be185d;"><strong>Total: S/. ${opcion.precio.toFixed(2)}</strong></p>
    </div>
    <p style="margin-bottom: 1rem; color: #9d174d;">¿Método de pago?</p>
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; margin-bottom: 1.5rem;">
      <button onclick="procesarVenta('${producto.nombre}', '${opcion.tamaño}', ${opcion.precio}, 'efectivo')"
              style="background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 0.8rem; border-radius: 10px; font-size: 0.9rem; cursor: pointer;">
        💵 Efectivo
      </button>
      <button onclick="procesarVenta('${producto.nombre}', '${opcion.tamaño}', ${opcion.precio}, 'yape')"
              style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; border: none; padding: 0.8rem; border-radius: 10px; font-size: 0.9rem; cursor: pointer;">
        📱 Yape
      </button>
      <button onclick="procesarVenta('${producto.nombre}', '${opcion.tamaño}', ${opcion.precio}, 'tarjeta')"
              style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; border: none; padding: 0.8rem; border-radius: 10px; font-size: 0.9rem; cursor: pointer;">
        💳 Tarjeta
      </button>
    </div>
    <button onclick="cerrarModal()"
            style="background: #6b7280; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 10px; cursor: pointer;">
      Cancelar
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
        <div style="font-size: 4rem; color: #10b981; margin-bottom: 1rem;">✅</div>
        <h3 style="color: #be185d; margin-bottom: 1rem;">¡Venta Registrada!</h3>
        <div style="background: #ecfdf5; padding: 1rem; border-radius: 10px; margin-bottom: 1.5rem; border-left: 4px solid #10b981;">
          <p><strong>${nombreProducto}</strong> - ${tamaño}</p>
          <p>Método: ${metodoNormalizado.charAt(0).toUpperCase() + metodoNormalizado.slice(1)}</p>
          <p style="font-size: 1.1rem; color: #059669;"><strong>S/. ${precio.toFixed(2)}</strong></p>
        </div>
        <button onclick="cerrarModal()"
                style="background: linear-gradient(135deg, #f9a8d4, #be185d); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 25px; cursor: pointer; font-weight: 600;">
          Continuar
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
