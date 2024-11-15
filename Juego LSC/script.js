const tablero = document.getElementById("tablero");
const tarjetas = Array.from(document.querySelectorAll(".tarjeta"));
let tarjetaVolteada = null;
let bloqueo = false;

// Definimos los pares de imágenes y nombres, usando rutas de imágenes
const pares = [
    { contenido: "imagenes/mama.jpg", pareja: "Mamá" },
    { contenido: "imagenes/papa.jpg", pareja: "Papá" },
    { contenido: "imagenes/hermano.jpg", pareja: "Hermano" },
    { contenido: "imagenes/abuelo.jpg", pareja: "Abuelo" },
    { contenido: "imagenes/tio.jpg", pareja: "Tío" },
    { contenido: "imagenes/primo.jpg", pareja: "Primo" }
];

// Creamos el contenido de las tarjetas duplicando el array de pares
const contenidoTarjetas = [];
pares.forEach((par, index) => {
    contenidoTarjetas.push({ contenido: `<img src="${par.contenido}" alt="${par.pareja}">`, pareja: index });
    contenidoTarjetas.push({ contenido: par.pareja, pareja: index });
});

// Desordenamos las tarjetas
contenidoTarjetas.sort(() => 0.5 - Math.random());

// Asignamos el contenido y la pareja a cada tarjeta
tarjetas.forEach((tarjeta, index) => {
    tarjeta.dataset.contenido = contenidoTarjetas[index].contenido;
    tarjeta.dataset.pareja = contenidoTarjetas[index].pareja;
});

// Manejo de clics
tarjetas.forEach(tarjeta => {
    tarjeta.addEventListener("click", () => {
        if (bloqueo || tarjeta.classList.contains("acertada") || tarjeta === tarjetaVolteada) return;

        // Mostramos el contenido de la tarjeta (imagen o nombre)
        tarjeta.innerHTML = tarjeta.dataset.contenido;
        tarjeta.classList.add("volteada");

        // Verificamos si es la primera o la segunda tarjeta seleccionada
        if (!tarjetaVolteada) {
            tarjetaVolteada = tarjeta;
        } else {
            // Comparamos las parejas de las dos tarjetas seleccionadas
            if (tarjeta.dataset.pareja === tarjetaVolteada.dataset.pareja) {
                tarjeta.classList.add("acertada");
                tarjetaVolteada.classList.add("acertada");
                tarjetaVolteada = null;
            } else {
                bloqueo = true;
                setTimeout(() => {
                    tarjeta.classList.remove("volteada");
                    tarjetaVolteada.classList.remove("volteada");
                    tarjeta.innerHTML = "";
                    tarjetaVolteada.innerHTML = "";
                    tarjetaVolteada = null;
                    bloqueo = false;
                }, 1000);
            }
        }
    });
});
