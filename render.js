// render.js - Muestra un catálogo único (productos.js) y envía mensaje simple por WhatsApp.

// Tu número de WhatsApp configurado.
const whatsappNumber = "+56923682789"; 

function generarCardHTML(producto) {
    
    // 1. CODIFICA EL MENSAJE DE WHATSAPP (Mensaje simple, sin link de imagen)
    const mensajeProducto = encodeURIComponent(`Hola, estoy interesado/a en comprar el siguiente producto:
    
- Producto: "${producto.nombre}"
- Precio: ${producto.precio}

Por favor, ¿podrías proporcionarme más detalles? ¡Gracias!`);
    
    // 2. CREA EL ENLACE FINAL CON EL MENSAJE
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${mensajeProducto}`;

    // Genera la lista de detalles <ul>
    const detallesHTML = producto.detalles.map(detalle => `<li>${detalle}</li>`).join('');

    // Genera la estructura completa de la tarjeta 3D
    return `
        <article class="card-container">
            <div class="card-inner">
                <div class="card-front">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="product-info">
                        <h3>${producto.nombre}</h3>
                        <p class="price">${producto.precio}</p>
                        <span class="hint">Pasa el mouse para ver detalles ➔</span>
                    </div>
                </div>

                <div class="card-back">
                    <div class="back-content">
                        <h4>${producto.titulo_reverso}</h4>
                        <p class="description">${producto.descripcion}</p>
                        <ul>
                            ${detallesHTML}
                        </ul>
                        <a href="${whatsappLink}" target="_blank" class="btn-buy"><i class="fas fa-shopping-cart"></i> Comprar</a>
                    </div>
                </div>
            </div>
        </article>
    `;
}

// LÓGICA PRINCIPAL DE CARGA Y RENDERIZADO (Versión simple)
const grid = document.querySelector('.product-grid');

// Verifica que el contenedor exista y que la variable 'catalogo' esté definida (cargada desde productos.js)
if (grid && typeof catalogo !== 'undefined') {
    const tarjetasHTML = catalogo.map(generarCardHTML).join('');
    grid.innerHTML = tarjetasHTML;
} else if (grid) {
    // Mensaje de error si la lista 'catalogo' no se encuentra
    grid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; padding: 50px; color: red;">
                        ERROR: No se encontró la lista de productos. 
                        Asegúrate de que el archivo **productos.js** se cargue correctamente en tu HTML.</p>`;
}