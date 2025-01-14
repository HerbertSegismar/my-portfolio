import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import RootLayout from './layout/RootLayout'

export default function App() {

  const browserRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
      </Route>
    )
  );

  return <RouterProvider router={browserRouter} />
}


