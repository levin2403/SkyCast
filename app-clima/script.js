let apiKey = ""; 
let defaultCities = ["Mexico", "Buenos Aires", "Corea"]; 

document.addEventListener("DOMContentLoaded", () => {
    loadWeatherForCities(defaultCities);
    
    document.getElementById("city-form").addEventListener("submit", function (event) {
        event.preventDefault();
        let city = document.getElementById("input-ciudad").value.trim();
        if (city) {
            fetchWeather(city); 
            document.getElementById("input-ciudad").value = "";
        }
        else {
            alert("Por favor, ingresa una ciudad");
        }
    });
});

async function fetchWeather(city) { 
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

   try {
        let response = await fetch(url);
        if (!response.ok) throw new Error("Ciudad no encontrada");
        let data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    let contenedorTarjetas = document.getElementById("contenedor-tarjetas");

    let nuevaCarta = document.createElement("div");
    nuevaCarta.classList.add("weather-card");
    nuevaCarta.innerHTML = `
        <div class="weather-actions">
            <button class="btnEditar"><img src="iconos/edit.png" alt="Editar"></button>
            <button class="btnEliminar"><img src="iconos/delete.png" alt="Eliminar"></button>
        </div>
        <div class="info1">
            <p class="weather-icon">☀️</p>
            <p class="weather-temp">${data.main.temp}°C</p>
            <p class="city-name">${data.name}</p>
        </div>    
        <div class="weather-info">
            <div class="info-clima">
                <img src="iconos/cloud2.png" class="icono-clima" alt="Icono clima">
                <div>
                    <p><b>${data.weather[0].description}</b><br>Clima</br></p>
                </div>    
            </div>
            <div class="info-humedad">
                <img src="iconos/humidity.png" class="icono-humedad" alt="Icono humedad">
                <div>
                    <p><b>${data.main.humidity}% </b><br>humedad</br></p>
                </div>    
            </div>
        </div>
    `;

    contenedorTarjetas.prepend(nuevaCarta); 

    nuevaCarta.querySelector(".btnEliminar").addEventListener("click", () => {
        nuevaCarta.remove();
    });

    nuevaCarta.querySelector(".btnEditar").addEventListener("click", function() {
        
        let carta = this.closest(".weather-card");

        let nombreCiudad = carta.querySelector(".city-name").textContent;

        console.log(nombreCiudad);

        let cityInput = document.getElementById('input-ciudad');

        cityInput.value = nombreCiudad;

        carta.remove();
    });
}

function loadWeatherForCities(cities) {
    cities.forEach(city => fetchWeather(city)); 
}
