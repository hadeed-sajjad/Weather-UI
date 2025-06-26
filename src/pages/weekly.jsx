import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Weekly() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [forecastData, setForecastData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=31.5497&longitude=74.3436&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto")
      .then((res) => res.json())
      .then((data) => {
        const dailyData = data.daily;
        const formatted = dailyData.time.map((date, idx) => ({
          date,
          max: dailyData.temperature_2m_max[idx],
          min: dailyData.temperature_2m_min[idx],
          code: dailyData.weathercode[idx],
        }));
        setForecastData(formatted);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center  text-white relative">
      <button 
        onClick={() => navigate("/today")}
       className="fixed top-4 left-4 right z-50 rounded-full flex bg-white/20 justify-between px-4">

      
        Back
      </button>

      <div className="w-full max-w-[428px] px-2 py-5 flex flex-col items-center text-center space-y-8">
        <div>
          <h2 className="text-2xl font-normal mb-1">Lahore</h2>
          <p className="text-sm">Max: 24° Min: 18°</p>
        </div>

        <div className="w-full relative">
          <h3 className="text-xl font-normal mb-3">7-Days Forecasts</h3>

          <button
            onClick={scrollLeft}
            className="absolute left-1 top-[100px] z-10 bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl"
          >
            ‹
          </button>

          <div
            ref={scrollRef}
            className="forecast-scroll flex gap-3 overflow-x-auto pb-2 px-6 snap-x scroll-smooth scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {isLoading
              ? Array.from({ length: 7 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="min-w-[82px] h-[172px] bg-white/10 rounded-full animate-pulse"
                  />
                ))
              : forecastData.map((item, idx) => (
                  <div
                    key={idx}
                    className="min-w-[82px] h-[172px] bg-[linear-gradient(180deg,_#ae8efc_0%,_#7649f9_100%)] rounded-full flex flex-col items-center justify-around text-white shadow-md snap-start"
                  >
                    <p className="mt-2 text-sm font-normal">{Math.round(item.max)}°C</p>
                    <img
                      src="src/assets/image.png"
                      alt="weather"
                      className="w-10 h-10"
                    />
                    <p className="mb-2 text-sm font-normal">{getDayName(item.date)}</p>
                  </div>
                ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-1 top-[100px] z-10 bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl"
          >
            ›
          </button>
        </div>

        <div className="w-[352px] h-[174px] rounded-2xl bg-gradient-to-br from-[#7649f9] to-[#ae8efc] text-white px-6 py-4 flex flex-col justify-between shadow-xl text-left">
          <div className="flex items-center gap-2 text-sm text-white/80 font-normal">
            <span>📡</span>
            <span>AIR QUALITY</span>
          </div>
          <div>
            <p className="text-2xl font-normal">3–Low Health Risk</p>
            <div className="w-full h-[2px] bg-white/30 mt-2" />
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <span className="text-white/90">See more</span>
            <span className="text-xl">›</span>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <div className="w-[161px] h-[150px] bg-gradient-to-br from-[#7649f9] to-[#ae8efc] rounded-xl text-white px-4 py-3 flex flex-col justify-between shadow-lg text-left">
            <div>
              <p className="text-sm opacity-80 mb-1">🌞 SUNRISE</p>
              <p className="text-2xl font-normal">5:28 AM</p>
              <p className="text-sm text-white/70">Sunset: 7.25PM</p>
            </div>
          </div>
          <div className="w-[161px] h-[150px] bg-gradient-to-br from-[#7649f9] to-[#ae8efc] rounded-xl text-white px-4 py-3 flex flex-col justify-between shadow-lg text-left">
            <div>
              <p className="text-sm opacity-80 mb-1">🌞 UV INDEX</p>
              <p className="text-2xl font-normal">4</p>
              <p className="text-sm text-white/70">Moderate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
