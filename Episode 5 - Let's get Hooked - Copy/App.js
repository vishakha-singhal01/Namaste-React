import React from "react"
import ReactDOM from "react-dom/client"
import Header from "./src/components/Header";
import About from "./src/components/about";
import Body from "./src/components/Body";
import Footer from "./src/components/Footer";

/* My Food App structure will look like this, 
            1) Header
                - Logo
                - Nav Items(right side)
                - Cart
            2) Body
                - Search bar
                - Restaurants List
                    - Restaurant card
                        - Image
                        - Name
                        - Rating
            3) Footer
                - Links
                - Copyrights
       
*/

const AppLayout = () =>(
    <>
    <Header/>
    <About/>
    <Body/>
    <Footer/>
    </>
)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<AppLayout/>)

