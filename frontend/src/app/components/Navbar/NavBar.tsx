'use client'
import Link from 'next/link';
import { navLinks, topInfo } from '@/constants/uiData';
import { HiHeart, HiBars4, HiXMark, HiOutlineBriefcase } from "react-icons/hi2";
import { TiHeartOutline } from "react-icons/ti";
import { useState, useEffect, useRef } from "react";
import { debounce } from '@/utils/debounce';
import { useFavAmountItems, useFavoriteStore } from '@/stores/useFavorite';
import { useCartItems, useCartStore } from '@/stores/useCart';
import { FaRegUser } from "react-icons/fa";
import Image from 'next/image';
import {v4 as uuidv4} from 'uuid'
import SignIn from '../SignIn/SignInSignUp';
import { useSession } from 'next-auth/react';
import { useQuery ,gql} from '@apollo/client';
import { useAtom } from 'jotai';
import { toggle_sidePanel } from '@/stores/jotai';
let firstRender = true;


const  NavBar =  () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useAtom(toggle_sidePanel)
  const { data: session, status } = useSession();
  const amountFav = useFavoriteStore((state) => state.amountItems);
  const storedItems = useCartStore((state) => state.items);
  
  const amountItems = storedItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );
  // console.log(amountItems);
  // console.log(storedItems)
  const [tab, setTab] = useState(0);

  const [transform, setTransform] = useState("full");
  const [active, setActive] = useState("men");
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const [isFocusedNavLink, setIsFocusedNavLink] = useState(false);
  const [isFocusedBigNav, setIsFocusedBigNav] = useState(false);
  let isOpenDropdown = false;
  if (isFocusedBigNav || ( isFocusedNavLink))
    isOpenDropdown = true;
  if (!setIsFocusedBigNav && !setIsFocusedNavLink)
    isOpenDropdown = false;
  const handleScroll = debounce(() => {
    // find current scroll position
    const currentScrollPos = window.scrollY;

    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 0) ||
      currentScrollPos < 120
    );
    setPrevScrollPos(currentScrollPos);
  }, 10);
  // new useEffect:
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);
  useEffect(() => {
    firstRender = false
  }, [])
  const handleMouseEnter = (index : number) => {
    setTimeout(() => {
      setTab(index);
      
    }, 300);
  };
  // if(loading) return <p>Loading... query</p>
  // if(error) return <p>Error :</p>
  // console.log(data);
  return (
    <nav>
      <div
        className={`fixed  transition-all duration-500  ease-in-out top-0 left-0  z-20 w-full justify-items-center   ${!visible ? "-translate-y-full" : ""
          } `}
      >
        <div className="grid h-[35px] w-full  place-items-center bg-[#18181b] md:h-[30px]">
          <button className="mx-auto h-full text-[9px] font-bold uppercase leading-5 tracking-widest text-white screen960:text-[10px]">
            <div>FREE STANDARD SHIPPING & RETURNS</div>
          </button>
        </div>
        <nav className="mx-0 flex h-[60px] w-full  flex-col items-center justify-between  border bg-white px-[10px] md:h-[70px] md:px-[30px] ">
          <div className="hidden w-full md:block">
            <ul className=" flex list-none items-center justify-end pl-12 text-[14px]">
              {topInfo.map((nav, index) => (
                <li
                  // key={uuidv4()}
                  key={nav.id}
                  className={` cursor-pointer text-[14px] font-normal   ${index === topInfo.length - 1 ? "mr-0" : "mr-4"
                    } `}
                >
                  <Link href="/products">{nav.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          {/* desktop */}
          <div className="flex h-full w-full items-center justify-between text-[1rem] md:items-end lg:items-center">
            <div className="flex flex-1 md:hidden   ">
              <button
                className="flex h-10 w-10  items-center justify-center "
                onClick={() => {
                  console.log("click ")
                  setTransform("0");
                }}
              >{ }
                <HiBars4 className="h-7 w-7"></HiBars4>
              </button>
              {/* <div className="  h-12 w-12 ">
                <Link
                  href="#"
                  className="relative grid  h-full  w-full place-items-center justify-center text-center"
                >
                  <TiHeartOutline className="inline h-6 w-6"></TiHeartOutline>
                  {amountFav > 0 && (
                    <span className="absolute top-[2px] right-[2px] block h-6 w-6 rounded-full bg-[#0071ae] text-[12px] font-bold text-white opacity-90">
                      {amountFav}
                    </span>
                  )}
                </Link>
              </div> */}
            </div>
            <Link href="/" className="">
              <Image
                src="/logoAdidas.svg"
                alt="Adidas Logo"
                className=" object-contain px-0 "
                width={50}
                height={50}
                priority
              ></Image>
            </Link>
            <div className="hidden flex-1 list-none items-center justify-start  pl-12  md:flex  lg:justify-center lg:pb-0">
              {navLinks.map((nav, index) => (
                <>
                  <div
                    // key={uuidv4()}
                    key={nav.id}

                    className={`w-[5rem] cursor-pointer font-poppins text-[13px] font-normal ${active === nav.title ? "text-black-100" : "text-neutral-600 "
                      }   ${index === 0 || index === 1 || index == 2
                        ? "font-bold text-black"
                        : ""
                      } pb-3 px-1 pt-2  w-full h-full flex items-center justify-center ${(isFocusedNavLink && tab === index   ) ? "border-b-4 border-black" : "border-b-2 border-transparent"}  `}
                    onMouseEnter={() => {
                      handleMouseEnter(index)
                      
                      setIsFocusedNavLink(true);
                    }}
                    onMouseLeave={() => {
                      setIsFocusedNavLink(false);
                    }}
                  
                    onClick={() => setActive(nav.title)}
                  >
                    <Link className='' href="/products">{nav.title}</Link>
                  </div>
                  
                      {tab === index && (
                        <div 
                          onMouseEnter={() => { setIsFocusedBigNav(true) }}
                          onMouseLeave={() => { setIsFocusedBigNav(false) }}
                          className={`${isOpenDropdown ? "fixed visible opacity-100" : " hidden opacity-0 invisible"}   top-[100px] max-h-[50rem] left-0 right-0 transition-all delay-700  w-full bg-white  p-[2.5rem] pt-5  text-black`}>
                          
                            <div className='max-w-[80rem] mx-auto  flex justify-center items-start ' >
                              {
                                nav.metaCatogry && nav.metaCatogry.map((item,index) =>(
                                  <div key={index} className='flex flex-col flex-1 opacity-100 align-top text-left pt-4'>
                                    {item.categories?.map((item,index) =>(
    
                                      <Link key={index} href={item.href} className={`  font-medium leading-6 ${index === 0 ? "text-[1.5rem] mb-3" :"text-gray-500 mb-2 hover:underline"}`}>{item.category}</Link>
                                    ))}
                                    
                                  </div>
                                ))
                              }
                            </div>
                        </div>
                      )}
                  
                </>
                
              ))}
            </div>
            <div className="flex flex-1 items-center  justify-end">
              

                <div className="  relative ">
                  <button
                    className=" grid h-full w-full place-items-center "
                  >
                    <SignIn/>
                    
                    {/* <span className="text-xxl  absolute top-0 right-0 h-5 w-5 rounded-full bg-yellow-400 text-center">
                      1
                    </span> */}
                  </button>
                </div>
              
              <div className="  relative h-12  w-12 ">
                <button
                  className=" grid h-full w-full place-items-center "
                  onClick={() => { setIsSidePanelOpen(!isSidePanelOpen)}}
                >
                  <FaRegUser className="inline h-6 w-6 "></FaRegUser>
                  {/* <span className="text-xxl  absolute top-0 right-0 h-5 w-5 rounded-full bg-yellow-400 text-center">
                    1
                  </span> */}
                </button>
              </div>
              <div className=" h-12  w-12">
                <Link
                  href="/wishlists"
                  className="relative grid  h-full w-full place-items-center "
                >
                  <TiHeartOutline className="h-6 w-6"></TiHeartOutline>
                  {amountFav > 0 && (
                    <span className="absolute top-[2px] right-[2px] block h-5 w-5 rounded-full bg-[#0071ae] text-center text-[12px] font-bold text-white opacity-90">
                      {amountFav}
                    </span>
                  )}
                </Link>
              </div>
              <div className="  h-12 w-12  ">
                <Link
                  href="/cart"
                  className="justify-cente relative flex h-full w-full  cursor-pointer  items-center justify-center  text-center "
                >
                  <HiOutlineBriefcase className="h-6 w-6 "></HiOutlineBriefcase>
                  {amountItems > 0 && (
                    <span className="absolute top-[2px] right-[2px] block h-5 w-5 rounded-full bg-[#0071ae] text-[12px] font-bold text-white opacity-90">
                      {amountItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

        </nav>
      </div>

      <div
        className={` fixed inset-0 h-full w-full overflow-hidden bg-white -translate-x-${transform} ${firstRender ? "-translate-x-full" :""}  z-[20] transition-all duration-500  ease-in-out`}
      >
        <div
          className={` fixed inset-0 z-[20] h-full w-full overflow-hidden    bg-white   opacity-100`}
        >
          {/* header */}
          <div className=" flex min-h-[60px] w-full items-center  justify-center  border-b-2 border-solid border-slate-400 bg-white">
            <Image src="/logoAdidas.svg" alt="adidas logo" width={50} height={50} priority />
            <button
              className=" absolute right-0 top-1  z-[20]  h-[50px] w-[50px] text-[40px] "
              onClick={() => {
                console.log("hello");
                setTransform("full");
              }}
            >
              <HiXMark className="h-full w-full" />
            </button>
          </div>
          {/* mobile */}
          <ul className="flex  flex-1 list-none flex-col   items-center justify-start p-10">
            {navLinks.map((nav, index) => (
              <li
                // key={uuidv4()}
                key={nav.id}
                className={`cursor-pointer py-5 font-poppins text-[16px]  font-semibold`}
                onClick={() => {
                  setActive(nav.title);
                  setTransform("full");
                }}
              >
                <Link href="/products">{nav.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar












  // const getProducts = gql`
// query Products {
//   products{
//     id
//     name
//     price
//     description
//     imgs
//   }
// }`;
// const getgetBooks =gql`
// query getBooks {
//   books {
//     title
//   }
// }
//   `
  // const { loading, error, data } = useQuery(getProducts)
  // console.log(results);

  // const { items: storedItems } = useCartItems();
  // const { amountItems: amountFav } = useFavAmountItems();
  // let amountItems = 0;
  // if (storedItems){
  //   amountItems = storedItems.reduce(
  //     (accumulator, currentValue) => accumulator + currentValue.amount,
  //     0
  //   );
  // }