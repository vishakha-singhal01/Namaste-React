import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "./Config";
import Shimmer from "./Shimmer";

const RestaurantMenu = ()=>{
    const params = useParams()
    const {id} = params

    const [restaurant, setRestaurant] = useState(null)
    
    useEffect(()=>{
        getRestaurantInfo()
    },[]);

    async function getRestaurantInfo(){
        const data = await fetch(
            "https://www.swiggy.com/dapi/menu/v4/full?lat=12.9351929&lng=77.62448869999999&menuId="+id
        )
        const json = await data.json()
        console.log(json.data)
        setRestaurant(json.data)
    }

    return (!restaurant)? <Shimmer/> :(
        <div className="menu">
            <div>
                <h1>Restaurant id : {id}</h1>
                <h2>{restaurant.name}</h2>
                <img src={IMG_CDN_URL + restaurant.cloudinaryImageId}/>
            </div>
            <div>
                <h1>Menu</h1>
                <ul>{
                      Object.values(restaurant?.menu?.items).map((item)=>(
                        <li key={item.id}>{item.name}</li>
                      ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default RestaurantMenu;