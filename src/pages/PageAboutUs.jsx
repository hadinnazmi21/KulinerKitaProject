import { FaStackExchange } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { MdOutlineFastfood } from "react-icons/md";
import { GrSecure } from "react-icons/gr";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardAboutUs from "../components/CardAboutUs"; 

export default function PageAboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
   
          <h2 className="text-3xl sm:text-4xl font-bold text-[#35a828] mb-4 text-center md:text-left">
            Tentang <span className="text-[#1A223E]">Kuliner Kita</span>
          </h2>
       
          <p className="text-gray-700 mb-10 leading-relaxed text-center md:text-left max-w-3xl mx-auto md:mx-0">
            Platform terpercaya untuk jual beli makanan viral dan langka dari
            Instagram &amp; TikTok, dengan proses mudah, aman, dan transparan.
            <br />
            Temukan kuliner kekinian favoritmu tanpa ribet!
          </p>


          <div className="md:flex md:items-center md:gap-8 mb-12">
 
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#1A223E] mb-5 text-center md:text-left">
                Siapa Kami?
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed text-center md:text-left">
                Kuliner Kita hadir sebagai solusi untuk menemukan dan membeli
                makanan viral serta langka yang sedang tren di media sosial.
                Kami mengutamakan kemudahan, kecepatan, dan keamanan dalam
                setiap transaksi, agar kamu bisa menikmati kuliner favorit tanpa
                ribet.
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-3 text-left mx-auto max-w-md md:max-w-none">
                <li>
                  Ribuan pilihan makanan viral dan langka dari berbagai kota
                </li>
                <li>
                  Kurasi dan pengecekan kualitas makanan secara menyeluruh
                </li>
                <li>
                  Partner UMKM, home-cook, dan penjual individu terpercaya
                </li>
              </ul>
            </div>
    
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/img/AboutUs.png"
                alt="Ilustrasi war kuliner kekinian"
              
                className="rounded-lg shadow-md w-full max-w-[350px] h-[310px] object-cover"
              />
            </div>
          </div>

      
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#1A223E] mb-6 text-center">
            Kenapa Pilih <span className="text-[#35a828]">Kuliner Kita?</span>
          </h3>
   
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
            <CardAboutUs
              icon={<GrSecure className="text-4xl text-green-700 mb-2" />}
              title="Transaksi Aman"
              description="Setiap penjual dan produk kami verifikasi demi keamanan dan kenyamananmu."
            />
            <CardAboutUs
              icon={<MdOutlineFastfood className="text-4xl text-green-700 mb-2" />}
              title="Kualitas Terjamin"
              description="Makanan melalui proses kurasi dan pengecekan kualitas oleh tim profesional."
            />
            <CardAboutUs
              icon={<IoIosPricetags className="text-4xl text-green-700 mb-2" />}
              title="Harga Kompetitif"
              description="Harga terbaik langsung dari penjual asli tanpa perantara."
            />
            <CardAboutUs
              icon={<FaStackExchange className="text-4xl text-green-700 mb-2" />}
              title="Proses Mudah"
              description="Semua proses pemesanan dan pembayaran praktis lewat satu platform."
            />
          </div>
        </div>
      </section>

      <div className="flex-grow" />
      <Footer />
    </div>
  );
}