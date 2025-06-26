import { useNavigate } from "react-router";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center text-white">
      <div className="w-full max-w-[428px] px-4 flex flex-col items-center justify-center pb-2">

        <img
          src="src/assets/Weather _))10 18.svg"
          alt="Weather Icon"
          className="w-[220px] sm:w-[300px] md:w-[428px] h-auto mb-6"
        />

        <h1 className="w-full text-[36px] sm:text-[48px] md:text-[64px] leading-tight sm:leading-[60px] md:leading-[77px] font-bold text-center">
          Weather <span className="text-[#DDB130]">ForeCasts</span>
        </h1>

        <button
          onClick={() => navigate("/today")}
          className="mt-8 bg-[#DDB130] text-black px-6 py-3 rounded-full text-base sm:text-lg font-normal hover:scale-105 transition-transform w-full max-w-[304px] h-[60px] sm:h-[66px] md:h-[72px]"
        >
          Get Started
        </button>

      </div>
    </div>
  );
}
