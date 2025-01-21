import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import RootLayout from './layout/RootLayout'
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import SignUp from "./components/SignUp";

export default function App() {

  const browserRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path='gallery' element={<Gallery/>}/>
        <Route path="contact" element={<Contact />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
    )
  );

  return <RouterProvider router={browserRouter} />
}


