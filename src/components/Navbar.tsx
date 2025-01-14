import { useNavigate, NavLink } from "react-router-dom";
import Hs from "./Herb";

type Props = {}

export default function Navbar({}: Props) {

  const navigate = useNavigate()

  return (
    <div className="bg-black/90 w-screen ~h-12/32 flex items-center justify-between p-4 absolute left-0 right-0 top-0">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="hover:bg-black/20 px-4 py-2 rounded-lg cursor-pointer"
      >
        <Hs className="~w-32/64 hover:scale-110 transition-all duration-300 ease-in-out" />
      </div>
      <div className="flex ~gap-4/8 font-bold ~px-4/6">
        <NavLink to="/">
          <p className="text-white ~text-xl/3xl hover:scale-110 transition-all duration-300 hover:text-amber-200">
            Home
          </p>
        </NavLink>
        <NavLink to="/about">
          <p className="text-white ~text-xl/3xl hover:scale-110 transition-all duration-300 hover:text-amber-200">
            About
          </p>
        </NavLink>
        <NavLink to="/services">
          <p className="text-white ~text-xl/3xl hover:scale-110 transition-all duration-300 hover:text-amber-200">
            Services
          </p>
        </NavLink>
      </div>
    </div>
  );
}