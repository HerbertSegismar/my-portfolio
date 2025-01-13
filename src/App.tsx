import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";

function App() {

  const browserRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
      </Route>
    )
  );

  return (
    <div className="~top-20/48 relative flex flex-col items-center">
      <RouterProvider router={browserRouter} />
    </div>
  )
}
export default App
