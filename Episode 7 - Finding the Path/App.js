import React from "react"
import ReactDOM from "react-dom/client"
import Header from "./src/components/Header";
import About from "./src/components/about";
import Contact from "./src/components/Contact";
import Body from "./src/components/Body";
import Footer from "./src/components/Footer";
import Error from "./src/components/Error";
import RestaurantMenu from "./src/components/RestaurantMenu"
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";

const AppLayout = () =>(
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
)

const appRouter = createBrowserRouter([
    //route configuration
    {
       path: "/",
       element: <AppLayout/>,
       errorElement: <Error/>,
       children:[
            {
                path: "/",
                element: <Body/>,
            },
            {
                path: "/about",
                element: <About/>,
            },
            {
                path: "/Contact",
                element: <Contact/>,
            },
            {
                path: "/Restaurant/:id",
                element: <RestaurantMenu/>,
            },
        ],
    },
    
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<RouterProvider router={appRouter}/>)

