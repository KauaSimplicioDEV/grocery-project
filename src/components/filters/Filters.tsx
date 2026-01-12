"use client";

import Image from "next/image";
import VeggiesImage from "../../../public/image-veggies.svg";
import FruitsImage from "../../../public/image-fruits.svg";
import MeatImage from "../../../public/image-meat.svg";
import FishImage from "../../../public/image-fish.svg";
import { useState } from "react";

const filterFoods = [
  {
    image: VeggiesImage,
    title: "Veggies",
  },
  {
    image: FruitsImage,
    title: "Fruits",
  },
  {
    image: MeatImage,
    title: "Meat",
  },
  {
    image: FishImage,
    title: "Fish",
  },
];

const Filters = () => {
  const [selectedFilter, setSelectedFilter] = useState(0);
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 pl-4 -ml-4">
      <div className="flex flex-row items-center gap-2">
        {filterFoods.map((item, index) => (
          <div
            key={item.title}
            className="relative flex-row items-center cursor-pointer"
            onClick={() => setSelectedFilter(index)}
          >
            <div
              className={`absolute ${
                selectedFilter === index
                  ? "bg-[#E96301]"
                  : "bg-[#E8E3CE" || selectedFilter === 0
                  ? "bg-[#E8E3CE]"
                  : "bg-[#E96301]"
              } rounded-full p-2 w-10 h-10 flex-row items-center justify-center`}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={100}
                height={100}
              />
            </div>
            <div className="bg-[#E8E3CE] shadow-black/30 shadow-sm rounded-l-full rounded-r-full px-5 py-2 text-white">
              <h3 className="ml-6 text-black">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
