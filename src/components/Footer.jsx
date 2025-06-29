import {
  AiFillPhone,
  AiOutlineMail,
  AiOutlineDownload,
  AiFillLinkedin,
  AiOutlineInstagram,
} from "react-icons/ai";
import { CgFacebook } from "react-icons/cg";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-500 px-6 pt-10">
      {/* Garis Atas */}
      <div className="border-t border-gray-300 mb-10"></div>

      {/* Konten Footer */}
      {/* The grid-cols-1 for mobile, sm:grid-cols-2 for small screens, and md:grid-cols-4 for medium screens and up ensures responsiveness */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {/* Brand Info */}
        <div>
          <h4 className="text-xl font-bold text-green-700 mb-2">
            Kuliner<span className="text-black">Kita</span>
          </h4>
          <p className="text-gray-600 mb-3">
            KulinerKita merupakan aplikasi marketplace jual beli makanan yang
            tersedia di seluruh Indonesia.
          </p>
        </div>

        {/* Informasi */}
        <div>
          <h5 className="font-semibold mb-2">Information</h5>
          <ul className="space-y-1 text-gray-600">
            <li>
              <Link to="/privacy-policy" className="hover:text-green-700">
                Kebijakan Privasi
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-green-700">
                Syarat & Ketentuan
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-green-700">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-semibold mb-2">Quick Links</h5>
          <ul className="space-y-1 text-gray-600">
            <li>
              <Link to="/download" className="hover:text-green-700 flex items-center gap-2">
                <AiOutlineDownload /> Download
              </Link>
            </li>
            <li>
              <a href="mailto:support@kulinerku.com" className="hover:text-green-700 flex items-center gap-2">
                <AiOutlineMail /> support@kulinerku.com
              </a>
            </li>
            <li>
              <a href="tel:082123123321" className="hover:text-green-700 flex items-center gap-2">
                <AiFillPhone /> 0821-2312-3321
              </a>
            </li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <h5 className="font-semibold mb-2">Follow Kami</h5>
          <ul className="space-y-1 text-gray-600">
            <li>
              <a href="#" className="hover:text-green-700 flex items-center gap-2">
                <AiOutlineInstagram /> Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-700 flex items-center gap-2">
                <CgFacebook /> Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-700 flex items-center gap-2">
                <AiFillLinkedin /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Garis Bawah dan Copyright */}
      <div className="mt-10 border-t border-gray-300">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500 py-4">
          © {new Date().getFullYear()} KulinerKita | All Rights Reserved
        </div>
      </div>
    </footer>
  );
}