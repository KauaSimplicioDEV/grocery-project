"use client";

import Link from "next/link";
import { useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoMenuOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section>
      <nav className="center-nav mx-auto">
        <div
          className={`pt-10 flex ${isMenuOpen ? "hidden" : "justify-between"}`}
        >
          <div className="flex items-center w-2/3 gap-2">
            <IoMenuOutline
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl cursor-pointer"
            />
            <h3 className="font-medium text-sm">Make your grocery list</h3>
          </div>
          <div className="flex items-center gap-4 w-1/2 justify-end">
            <FaSearch />
            <FaUser />
          </div>
        </div>
      </nav>

      {/* Menu lateral com animação */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-[#E96301] transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-4 pt-10 px-6">
          <FaArrowLeft
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl cursor-pointer hover:text-[#491AA5] transition-colors"
          />
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-lg hover:text-[#491AA5] transition-colors py-2"
          >
            Profile
          </Link>
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-lg hover:text-[#491AA5] transition-colors py-2"
          >
            My Lists
          </Link>
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-lg hover:text-[#491AA5] transition-colors py-2"
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Menu;
