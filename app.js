document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('lista-tropas');
    contenedor.innerHTML = '<p>Buscando el archivo en: data/troops.json ...</p>';

    async function cargarTropas() {
        try {
            // Probamos primero sin el ./
            const response = await fetch('data/troops.json');
            
            if (!response.ok) {
                throw new Error('Estado del servidor: ' + response.status);
            }
            
            const tropas = await response.json();
            contenedor.innerHTML = '';

            tropas.forEach(tropa => {
                const div = document.createElement('div');
                div.className = 'tropa-card';
                div.innerHTML = `
                    <img src="${tropa.imagen_url}" alt="${tropa.nombre}">
                    <h3>${tropa.nombre}</h3>
                    <p>${tropa.rareza}</p>
                `;
                contenedor.appendChild(div);
            });
        } catch (error) {
            contenedor.innerHTML = `
                <div style="color: red; border: 1px solid red; padding: 10px;">
                    <h3>¡Ops! Error encontrado:</h3>
                    <p>${error.message}</p>
                    <p>Revisa que la carpeta se llame "data" (minúsculas) y que el archivo esté dentro.</p>
                </div>
            `;
        }
    }

    cargarTropas();
});
