import { useNavigate, Link, useLocation, NavLink } from "react-router-dom";
import Hs from "./Herb";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

type Props = {};

export default function Navbar({}: Props) {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation()

   const handleMenu = () => {
     setOpenMenu(!openMenu);
   };


  const divVariants = {
    initial: {
      opacity: 0,
      y: -100,
    },
    final: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: -100,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const pages = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
    { name: "SignUp", href: "/sign-up" },
  ];

  return (
    <div className="fixed bg-black/90 w-screen ~h-12/20 flex items-center justify-between p-4 left-0 right-0 top-0 z-50">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="hover:bg-black/20 px-4 py-2 rounded-lg cursor-pointer"
      >
        <Hs className="~w-36/64 hover:scale-110 transition-all duration-300 ease-in-out" />
      </div>
      <div className="hidden md:flex font-bold px-1">
        {pages.map((page) => (
          <NavLink
            to={page.href}
            key={page.name}
            className="text-lg font-bold hover:text-[#FF9D23] transition-all duration-300 ease-in-out px-2 py-1 text-yellow-100"
          >
            <p>{page.name}</p>
          </NavLink>
        ))}
      </div>
      <div>
        <div>
          <div className="flex md:hidden items-center justify-center h-[50px] w-[50px] right-8 group cursor-pointer transition-all duration-300 ease-in-out">
            <img
              src="/menu.svg"
              alt="menu"
              className={`w-4 h-4 ${
                openMenu
                  ? "hidden"
                  : "group-hover:scale-110 transition-all duration-300 ease-in-out"
              }`}
            />
            <img
              src="/x.svg"
              alt="x"
              className={`w-4 h-4 ${
                openMenu
                  ? "group-hover:scale-110 transition-all duration-300 ease-in-out"
                  : "hidden"
              }`}
            />
            <button
              onClick={() => {
                handleMenu();
              }}
              className="absolute hidden w-6 h-6 rounded-md bg-[#FF9D23] group-hover:block mix-blend-darken transition-all duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {openMenu && (
          <motion.div
            variants={divVariants}
            initial="initial"
            animate="final"
            exit="exit"
            className="absolute top-16 bg-black/50 border border-solid-2px border-black/20 rounded-xl w-28/44 h-80/96 mt-2/10 right-6 text-yellow-100 flex flex-col"
          >
            <div className="flex flex-col items-center justify-center w-full h-full my-8 md:hidden">
              <div className="bg-[#FF9D23] w-[12px] h-[12px] rounded-full absolute top-0 left-4 my-4" />
              {pages.map((page) => (
                <Link
                  to={page.href}
                  key={page.name}
                  className={`text-lg font-semibold hover:text-[#FF9D23] transition-all duration-300 ease-in-out px-6 py-1 ${
                    location.pathname === page.href
                      ? "text-[#FF9D23]"
                      : "text-yellow-100"
                  }`}
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
