import React from "react";
import ReactDOM from "react-dom/client";

const About = () => (
    <>
    <div className="about">
       <div className="aboutContent">
          <h1>Welcome to</h1>
          <h1>The Taste of India</h1>
          <h3>"People who love to eat are always the best people."</h3>
       </div>
       <div className="aboutImg">
          <img src="https://png.pngtree.com/png-clipart/20230502/original/pngtree-hot-cheesy-burger-isolated-on-transparent-background-png-image_9133351.png"/>
       </div>
    </div>
    </>
)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<About/>)