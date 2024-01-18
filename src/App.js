import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "0d7bb094d39b877b5cea3ab220cf8f47";

  const getWeather = async () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.cod === "404") {
        setWeatherData(null);
      } else {
        setWeatherData({
          city: `${data.name}, ${data.sys.country}`,
          temperature: data.main.temp,
          description: data.weather[0].description,
        });
      }
    } catch (error) {
      console.error("Erro ao obter dados do clima:", error);
      setWeatherData(null);
    }
  };

  return (
    <div className="App">
      <div className="weather-container">
        <h2>Consulta de Clima</h2>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Digite o nome da cidade"
        />
        <button onClick={getWeather} className="search-button">
          Buscar Clima
        </button>
        {weatherData && (
          <div className="weather-info">
            <h3>Clima em {weatherData.city}</h3>
            <p>Temperatura: {weatherData.temperature}°C</p>
            <p>Condição: {weatherData.description}</p>
          </div>
        )}
        {weatherData === null && <p>Cidade não encontrada.</p>}
      </div>
    </div>
  );
};

export default App;
