document.addEventListener("DOMContentLoaded", () => {
  const resumen = document.getElementById("resumen");
  const ventas = obtenerVentas().filter((v) => v.fecha.startsWith(hoyISO()));

  let totalEfectivo = 0,
    totalYape = 0,
    totalTarjeta = 0;

  // Contar ventas por método de pago
  const conteoMetodos = { efectivo: 0, yape: 0, tarjeta: 0 };

  ventas.forEach((v) => {
    const monto = validarNumero(v.precio);
    const metodoNormalizado = normalizarMetodoPago(v.metodo);

    // Sumar totales por método
    if (metodoNormalizado === "efectivo") {
      totalEfectivo += monto;
      conteoMetodos.efectivo++;
    } else if (metodoNormalizado === "yape") {
      totalYape += monto;
      conteoMetodos.yape++;
    } else if (metodoNormalizado === "tarjeta") {
      totalTarjeta += monto;
      conteoMetodos.tarjeta++;
    }
  });

  const totalGeneral = totalEfectivo + totalYape + totalTarjeta;

  // Crear resumen visual mejorado
  resumen.innerHTML = `
    <h3 style="color: #be185d; margin-bottom: 1.5rem; text-align: center;">
      📊 Resumen del Día - ${new Date().toLocaleDateString("es-PE")}
    </h3>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
      <div style="background: linear-gradient(135deg, #fdf2f8, #fce7f3); padding: 1.5rem; border-radius: 15px; text-align: center; border: 2px solid #f9a8d4; box-shadow: 0 4px 15px rgba(190, 24, 93, 0.1);">
        <div style="font-size: 1.8rem; margin-bottom: 0.8rem;">💵</div>
        <p style="color: #be185d; font-weight: 600; margin-bottom: 0.5rem;">Efectivo</p>
        <p style="font-size: 1.3rem; font-weight: bold; color: #be185d;">S/. ${totalEfectivo.toFixed(2)}</p>
        <p style="font-size: 0.9rem; color: #be185d;">${conteoMetodos.efectivo} transacciones</p>
      </div>

      <div style="background: linear-gradient(135deg, #fdf2f8, #fce7f3); padding: 1.5rem; border-radius: 15px; text-align: center; border: 2px solid #c084fc; box-shadow: 0 4px 15px rgba(124, 58, 237, 0.1);">
        <div style="font-size: 1.8rem; margin-bottom: 0.8rem;">📱</div>
        <p style="color: #be185d; font-weight: 600; margin-bottom: 0.5rem;">Yape</p>
        <p style="font-size: 1.3rem; font-weight: bold; color: #be185d;">S/. ${totalYape.toFixed(2)}</p>
        <p style="font-size: 0.9rem; color: #be185d;">${conteoMetodos.yape} transacciones</p>
      </div>

      <div style="background: linear-gradient(135deg, #fdf2f8, #fce7f3); padding: 1.5rem; border-radius: 15px; text-align: center; border: 2px solid #fbbf24; box-shadow: 0 4px 15px rgba(251, 191, 36, 0.1);">
        <div style="font-size: 1.8rem; margin-bottom: 0.8rem;">💳</div>
        <p style="color: #be185d; font-weight: 600; margin-bottom: 0.5rem;">Tarjeta</p>
        <p style="font-size: 1.3rem; font-weight: bold; color: #be185d;">S/. ${totalTarjeta.toFixed(2)}</p>
        <p style="font-size: 0.9rem; color: #be185d;">${conteoMetodos.tarjeta} transacciones</p>
      </div>
    </div>

    <div style="background: linear-gradient(135deg, #fdf2f8, #fce7f3); padding: 2rem; border-radius: 20px; text-align: center; border: 3px solid #f9a8d4; box-shadow: 0 8px 25px rgba(190, 24, 93, 0.15);">
      <h4 style="color: #be185d; margin-bottom: 0.8rem; font-size: 1.3rem;">💰 Total General del Día</h4>
      <p style="font-size: 2.5rem; font-weight: bold; color: #be185d; margin-bottom: 0.8rem; text-shadow: 2px 2px 4px rgba(190, 24, 93, 0.1);">S/. ${totalGeneral.toFixed(2)}</p>
      <p style="color: #be185d; font-size: 1.1rem; font-weight: 500;">✨ Total de ${ventas.length} ventas realizadas</p>
    </div>
  `;

  // Actualizar lista de ventas con mejor formato
  const lista = document.getElementById("lista-ventas");
  lista.innerHTML = ""; // Limpiar lista

  if (ventas.length === 0) {
    const mensaje = document.createElement("li");
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
    mensaje.innerHTML = "🌸 No hay ventas registradas para hoy";
    lista.appendChild(mensaje);
  } else {
    // Ordenar ventas por fecha (más recientes primero)
    const ventasOrdenadas = ventas.sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha),
    );

    ventasOrdenadas.forEach((v, index) => {
      const li = document.createElement("li");
      const metodoNormalizado = normalizarMetodoPago(v.metodo);

      // Iconos y colores por método de pago con tema rosa pastel
      let icono = "💵";
      let colorMetodo = "#f9a8d4";
      let backgroundGradient = "linear-gradient(135deg, #fdf2f8, #fce7f3)";

      if (metodoNormalizado === "yape") {
        icono = "📱";
        colorMetodo = "#c084fc";
        backgroundGradient = "linear-gradient(135deg, #fdf2f8, #f3e8ff)";
      } else if (metodoNormalizado === "tarjeta") {
        icono = "💳";
        colorMetodo = "#fbbf24";
        backgroundGradient = "linear-gradient(135deg, #fdf2f8, #fef3c7)";
      }

      li.style.cssText = `
        background: ${backgroundGradient};
        border-radius: 15px;
        padding: 1.2rem;
        margin-bottom: 0.8rem;
        border: 2px solid ${colorMetodo};
        box-shadow: 0 4px 15px rgba(190, 24, 93, 0.08);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        transition: all 0.3s ease;
      `;

      const fecha = new Date(v.fecha);
      const horaFormateada = fecha.toLocaleTimeString("es-PE", {
        hour: "2-digit",
        minute: "2-digit",
      });

      li.innerHTML = `
        <div style="flex: 1; min-width: 200px;">
          <div style="display: flex; align-items: center; margin-bottom: 0.3rem;">
            <span style="margin-right: 0.5rem;">${icono}</span>
            <strong style="color: #be185d;">${v.producto}</strong>
            <span style="margin-left: 0.5rem; color: #9d174d; font-size: 0.9rem;">(${v.tamaño})</span>
          </div>
          <div style="font-size: 0.9rem; color: #6b7280;">
            ${horaFormateada} • ${metodoNormalizado.charAt(0).toUpperCase() + metodoNormalizado.slice(1)}
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.1rem; font-weight: bold; color: #be185d;">
            S/. ${validarNumero(v.precio).toFixed(2)}
          </div>
        </div>
      `;

      lista.appendChild(li);
    });
  }

  // Mejorar botón de cierre de caja
  const botonCerrar = document.getElementById("cerrar-caja");
  botonCerrar.onclick = () => {
    if (ventas.length === 0) {
      alert("No hay ventas para cerrar la caja.");
      return;
    }

    const confirmacion = confirm(
      `¿Estás seguro de cerrar la caja?\n\n` +
        `Resumen:\n` +
        `• Efectivo: S/. ${totalEfectivo.toFixed(2)}\n` +
        `• Yape: S/. ${totalYape.toFixed(2)}\n` +
        `• Tarjeta: S/. ${totalTarjeta.toFixed(2)}\n` +
        `• Total: S/. ${totalGeneral.toFixed(2)}\n\n` +
        `Esta acción eliminará todas las ventas del día.`,
    );

    if (confirmacion) {
      // Guardar resumen del día antes de limpiar (opcional)
      const resumenDia = {
        fecha: hoyISO(),
        totalEfectivo,
        totalYape,
        totalTarjeta,
        totalGeneral,
        cantidadVentas: ventas.length,
        timestamp: new Date().toISOString(),
      };

      // Guardar en historial (opcional para futuras consultas)
      const historial =
        JSON.parse(localStorage.getItem("historial_cierres")) || [];
      historial.push(resumenDia);
      localStorage.setItem("historial_cierres", JSON.stringify(historial));

      limpiarVentas();

      // Mostrar mensaje de confirmación
      alert(
        `¡Caja cerrada exitosamente!\n\nTotal del día: S/. ${totalGeneral.toFixed(2)}`,
      );

      location.reload();
    }
  };
});
