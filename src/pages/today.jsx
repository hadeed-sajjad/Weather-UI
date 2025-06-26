import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";


import weatherIcon from '../assets/Weather _))10 18.svg';
import houseIcon from '../assets/House.svg';
import hourlyIcon from '../assets/image.png';

export default function weekly() {
  const navigate = useNavigate();

  const [currentTemp, setCurrentTemp] = useState('--°C');
  const [maxTemp, setMaxTemp] = useState('--');
  const [minTemp, setMinTemp] = useState('--');
  const [hourlyTemps, setHourlyTemps] = useState(["--°C", "--°C", "--°C", "--°C"]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=31.5497&longitude=74.3436&hourly=temperature_2m&timezone=Asia/Karachi&forecast_days=1'
        );
        const data = await res.json();

        const temps = data.hourly.temperature_2m;
        const now = new Date();
        const currentHour = now.getHours();

        setCurrentTemp(Math.round(temps[currentHour]) + '°C');
        setMaxTemp(Math.round(Math.max(...temps.slice(0, 24))));
        setMinTemp(Math.round(Math.min(...temps.slice(0, 24))));

        const newHourlyTemps = [15, 16, 17, 18].map((h) => Math.round(temps[h]) + '°C');
        setHourlyTemps(newHourlyTemps);
      } catch (err) {
        console.error("Failed to fetch weather data", err);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center text-white">
     <div className="fixed top-4 left-4 right-4 z-50 flex justify-between px-4 pointer-events-none">
  <button
    onClick={() => navigate("/")}
    className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium pointer-events-auto"
  >
    Back
  </button>
  <button
    onClick={() => navigate("/weekly")}
    className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium pointer-events-auto"
  >
    Weekly
  </button>
</div>

      <div className="w-full max-w-[428px] px-4 text-center">
        <img src={weatherIcon} alt="Weather Icon" className="w-[244px] h-[244px] ml-12" />
        <h2 className="text-5xl font-normal mt-2">{currentTemp}</h2>
        <p className="text-lg">Precipitations</p>
        <p className="text-sm">Max: {maxTemp}° Min: {minTemp}°</p>

        <div className="my-1">
          <img src={houseIcon} alt="Rain Animation" className="w-[336px] h-[198px]" />
        </div>

        <div className="w-[px] h-[200px] bg-white/10 rounded-xl mx-auto p-4 flex flex-col justify-between shadow-lg text-white">
          <div className="flex justify-between px-2 text-sm font-medium text-white/90">
            <span>Today</span>
            <span>{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
          </div>

          <div className="flex justify-around mt-2 gap-2">
            {['15:00', '16:00', '17:00', '18:00'].map((label, i) => (
              <div className="flex flex-col items-center" key={label}>
                <span className="text-sm">{hourlyTemps[i]}</span>
                <img src={hourlyIcon} alt={`${label} icon`} className="w-10 h-10 my-1" />
                <span className="text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <button>
          
        </button>
      </div>
    </div>
  );
}
