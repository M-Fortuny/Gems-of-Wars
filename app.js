document.addEventListener('DOMContentLoaded', async () => {
    const contenedor = document.getElementById('lista-tropas');
    contenedor.innerHTML = '<p>Intentando cargar tropas...</p>';

    try {
        const response = await fetch('data/troops.json');
        
        // Esto nos dirá si el archivo existe
        if (!response.ok) {
            contenedor.innerHTML = '<p style="color:red;">Error: No encuentro el archivo. Código: ' + response.status + '</p>';
            return;
        }

        const tropas = await response.json();
        
        // Si llegamos aquí, los datos se han cargado. Vamos a ver cuántos hay.
        contenedor.innerHTML = '<p>¡Datos cargados! Cantidad: ' + tropas.length + '</p>';
        
        tropas.forEach(tropa => {
            const div = document.createElement('div');
            div.className = 'tropa-card';
            div.innerHTML = `
                <img src="${tropa.imagen_url}" alt="${tropa.nombre}">
                <h3>${tropa.nombre}</h3>
            `;
            contenedor.appendChild(div);
        });

    } catch (error) {
        contenedor.innerHTML = '<p style="color:red;">Error grave: ' + error.message + '</p>';
    }
});
