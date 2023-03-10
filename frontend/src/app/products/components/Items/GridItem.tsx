'use client'
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Link from "next/link";
// import { useFavorite } from "@/stores/store";
import {  useFavoriteStore } from "@/stores/useFavorite";
import { closeToggle } from "@/stores/jotai";
const GridItem = ({ data }) => {

  // const favoriteItems = useFavItems();
  // const { addFav, deleteFav } = useFavActions();
  // const addFav = useFavoriteStore((state) => state.actions.addFav);
  // const deleteFav = useFavoriteStore((state) => state.actions.deleteFav)

  const favoriteItems = useFavoriteStore((state) => state.favItems);
  const addFav = useFavoriteStore((state) => state.addFav);
  const deleteFav = useFavoriteStore((state) => state.deleteFav)

  const { id, price, imgs } = data;
  const img = imgs[0];
  const isFavItem = favoriteItems.findIndex((e) => e.id === id);

  const handleAddFave = () => {
    console.log("add");
    if (isFavItem !== -1) {
      console.log("delete")
      deleteFav({ id })
    } else {
      addFav({ id, price, img });
    }
  };
  const [isShown, setIsShown] = useState(false);
  return (
    <div
      className=" screen960Lhover:outline-solid screen960:hover:outline screen960:hover:outline-1 screen960:hover:outline-black "
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div className="relative bg-white">
        {/* Product card container */}
        <div className="w-full p-[2px] sm:p-1">
          <div className="relative w-full cursor-pointer bg-white text-sm font-normal text-black">
            {/* Assets ( images) */}
            <div className="relative pb-[100%]">
              <Link href={`/products/${data.id}`} className="absolute inset-0">
                <img
                  data-auto-id="image"
                  title="Adilette Comfort Slides"
                  // src="https://assets.adidas.com/images/w_600,f_auto,q_auto/dee464faf8db400e9980ae92003f95dc_9366/4CMTE_Track_Top_Black_HM6235_21_model.jpg"
                  src={isShown ? data.imgs[1] : data.imgs[0]}
                  //                   srcSet="https://assets.adidas.com/images/w_178,h_178,f_auto,q_auto,fl_lossy,c_fill,g_auto/30378ca9761a43c78c37ad6e00cba5e6_9366/adilette-comfort-slides.jpg 178w,
                  // https://assets.adidas.com/images/w_186,h_186,f_auto,q_auto,fl_lossy,c_fill,g_auto/30378ca9761a43c78c37ad6e00cba5e6_9366/adilette-comfort-slides.jpg 186w,
                  // https://assets.adidas.com/images/w_205,h_205,f_auto,q_auto,fl_lossy,c_fill,g_auto/30378ca9761a43c78c37ad6e00cba5e6_9366/adilette-comfort-slides.jpg 205w,
                  // https://assets.adidas.com/images/w_303,h_303,f_auto,q_auto,fl_lossy,c_fill,g_auto/30378ca9761a43c78c37ad6e00cba5e6_9366/adilette-comfort-slides.jpg 303w,
                  // https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/30378ca9761a43c78c37ad6e00cba5e6_9366/adilette-comfort-slides.jpg 383w,
                  // https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/30378ca9761a43c78c37ad6e00cba5e6_9366/adilette-comfort-slides.jpg 766w"
                  // sizes="(min-width: 960px) 25vw, (min-width: 600px) 33vw, 49vw"
                  alt="Yoga Black Adilette Comfort Slides"
                />
              </Link>
              <div className="absolute right-5 top-5">
                <button onClick={handleAddFave}>
                  {isFavItem !== -1 ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
              <Link
                href={data.id}
                className={` absolute ${isShown ? "bottom-2" : "bottom-0"
                  } left-1  transition-all`}
              >
                <div className="ml-1 font-semibold">
                  {/* <span>-40%</span> */}
                  <span>{data.saleoffPercent?.price}</span>
                </div>
                <div className="mt-[5px] flex bg-white py-[2px] px-[5px]">
                  <div className="mr-[4px] leading-4 text-gray-400 line-through">
                    {/* $35 */}
                    {data.deduction?.price}
                  </div>
                  <div
                    className={`leading-4   ${data.deduction?.price ? "text-red-600" : "text-black"
                      }`}
                  >
                    {data.price}
                  </div>
                </div>
              </Link>
            </div>
            <Link href={data.id}>
              {/* Product-card _ details  Adjust min high later */}
              <div className="min-h-[75px] p-[10px] ">
                <p>Adilette Comfort Slides</p>
                <p className="text-slate-700">Yoga</p>
                {data.colors.length <= 0 ? (
                  ""
                ) : (
                  <p className="text-slate-700">
                    <span>{data.colors.length} colors</span>
                  </p>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridItem;
// note <span>{data.saleoffPercent?.price}</span>;
