export default function DownloadSection() {
  return (
    <section className="relative overflow-hidden bg-[#FCFAEE] py-28 px-6 w-full flex items-center justify-center min-h-[400px]">
      {/* Background blurred glows */}
      <div className="absolute top-[-20%] left-[5%] w-[400px] h-[400px] bg-yellow-300/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[5%] w-[400px] h-[400px] bg-yellow-300/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        
        {/* Headline */}
        <h2 className="text-[28px] sm:text-3xl md:text-4xl font-bold text-[#18181B] tracking-tight mb-4">
          Download <span className="text-[#EAB308]">Key</span>wee Meet your architect.
        </h2>

        {/* Subheadline */}
        <p className="text-[#52525B] text-base sm:text-lg mb-8 font-medium">
          Free to download. AI-matched in minutes. Available on iOS and Android.
        </p>

        {/* Store Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          
          {/* App Store Button */}
          <button
            type="button"
            className="flex items-center gap-3 bg-[#111111] hover:bg-black transition-colors rounded-xl px-5 py-3 text-white w-[210px] justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
          >
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" aria-hidden>
              <path d="M17.05 13.9c-.03-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.8-2.1-1.6-.2-3.2.9-4 1-1-.1-2.4-1-3.6-1-1.6 0-3.1.9-4 2.4-1.7 3-1.4 7.6.3 10 1 1.4 2.1 3 3.6 2.9 1.5-.1 2-1 3.8-1s2.2 1 3.8 1c1.6.1 2.5-1.4 3.4-2.8.6-.8 1.1-1.7 1.4-2.6-.7-.2-1.8-1-1.9-2.8zM14.6 7.4c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.7.8-3.5 1.8-.7.8-1.4 2.2-1.2 3.6 1.4.1 2.7-.6 3.5-1.6z" />
            </svg>
            <div className="text-left flex flex-col justify-center">
              <span className="text-[10px] leading-tight text-gray-300">
                Download on the
              </span>
              <span className="text-xl font-semibold leading-tight mt-0.5">
                App Store
              </span>
            </div>
          </button>

          {/* Google Play Button */}
          <button
            type="button"
            className="flex items-center gap-3 bg-[#111111] hover:bg-black transition-colors rounded-xl px-5 py-3 text-white w-[210px] justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M3.1 3.4C3.1 3.6 3 3.9 3 4.3V19.7C3 20 3.1 20.3 3.1 20.6L12.3 11.5L3.1 3.4Z" fill="#2196F3"/>
              <path d="M16.5 15.6L12.3 11.5L3.1 20.6C3.5 20.9 4 21 4.7 20.6L16.5 15.6Z" fill="#F44336"/>
              <path d="M16.5 8.4L4.7 3.4C4 3 3.5 3.1 3.1 3.4L12.3 11.5L16.5 8.4Z" fill="#4CAF50"/>
              <path d="M21.1 12.8L16.5 15.6L12.3 11.5L16.5 8.4L21.1 11.2C21.8 11.6 21.8 12.4 21.1 12.8Z" fill="#FFEB3B"/>
            </svg>
            <div className="text-left flex flex-col justify-center">
              <span className="text-[10px] leading-tight text-gray-300">
                GET IT ON
              </span>
              <span className="text-xl font-semibold leading-tight mt-0.5">
                Google Play
              </span>
            </div>
          </button>
          
        </div>
      </div>
    </section>
  );
}