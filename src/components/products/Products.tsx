"use client";

import Image from "next/image";
import { useState } from "react";
import ListProducts from "../listProducts/listProducts";

interface ProductCard {
  image: string;
  title: string;
}

const products: ProductCard[] = [
  {
    image: "/veggies-images/image 11.svg",
    title: "Asparagus",
  },
  {
    image: "/veggies-images/image 12.svg",
    title: "Broccoli",
  },
  {
    image: "/veggies-images/image 13.svg",
    title: "Brussels Sprouts",
  },
  {
    image: "/veggies-images/image 14.svg",
    title: "Cabbage",
  },
  {
    image: "/veggies-images/image 15.svg",
    title: "Carrot",
  },
  {
    image: "/veggies-images/image 16.svg",
    title: "Cauliflower",
  },
  {
    image: "/veggies-images/image 17.svg",
    title: "Celery",
  },
  {
    image: "/veggies-images/image 18.svg",
    title: "Corn",
  },
  {
    image: "/veggies-images/image 19.svg",
    title: "Eggplant",
  },
];

const Products = () => {
  const STEP = 100;
  const MAX_WEIGHT = 10000;

  const [weights, setWeights] = useState<Record<number, number>>({});
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const increment = (index: number) => {
    setWeights((prev) => ({
      ...prev,
      [index]: Math.min(MAX_WEIGHT, (prev[index] || 0) + STEP),
    }));
  };

  const decrement = (index: number) => {
    setWeights((prev) => ({
      ...prev,
      [index]: Math.max(0, (prev[index] || 0) - STEP),
    }));
  };

  return (
    <section>
      <div className="grid grid-cols-3 gap-4 mt-5 center-nav mx-auto">
        {products.map((item, index) => {
          const weight = weights[index] || 0;
          const isKg = weight >= 1000;
          const displayWeight = isKg ? (weight / 1000).toFixed(1) : weight;
          const weightUnit = isKg ? "kg" : "g";

          const isSelected = selectedIndex === index;

          return (
            <div key={index} className="flex flex-col">
              <div
                className={
                  !isSelected
                    ? "bg-[#E8E3CE] rounded-xl flex items-center justify-center p-5 cursor-pointer aspect-square border-none"
                    : "bg-[#E8E3CE] rounded-xl flex items-center justify-center p-5 cursor-pointer aspect-square border-2 border-[#491AA5]"
                }
                onClick={() =>
                  setSelectedIndex((prev) => (prev === index ? null : index))
                }
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="object-contain max-w-full max-h-full"
                />
              </div>
              <p className="text-black mt-2 text-sm text-center">
                {item.title}
              </p>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => decrement(index)}
                  className={`${!isSelected ? "cursor-not-allowed text-gray-500" : "cursor-pointer"}`}
                  disabled={!isSelected}
                >
                  -
                </button>

                <span className="flex">
                  {displayWeight} {weightUnit}
                </span>
                <button
                  onClick={() => increment(index)}
                  className={`${!isSelected ? "cursor-not-allowed text-gray-500" : "cursor-pointer"}`}
                  disabled={!isSelected}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <ListProducts
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded((prev) => !prev)}
      />
    </section>
  );
};

export default Products;
