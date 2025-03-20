import React from 'react'
export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900 text-white py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3')] opacity-10 bg-cover bg-center"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className=" text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-200 to-yellow-400">
          Selamat Datang di Warta Jemaat
        </h2>
        
        <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          &quot;Beribadahlah kepada TUHAN dengan sukacita, datanglah ke hadapan-Nya dengan sorak-sorai!&quot;
          <span className="block mt-2 text-base text-yellow-200">
            Mazmur 100:2
          </span>
        </p>
          <a href="#jadwal">
        <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-medium px-6 py-3 rounded-lg shadow-lg hover:from-yellow-300 hover:to-yellow-400 transition duration-300">
            Lihat Jadwal Ibadah
        </div>
            </a>
      </div>
    </section>
  )
}
