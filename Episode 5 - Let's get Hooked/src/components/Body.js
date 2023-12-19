import { useEffect, useState } from "react";
import restaurantList from "./Config";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

function filterData(searchText, restaurants) {
  return restaurants.filter(
    (restaurant) => restaurant?.data.name?.toLowerCase()?.includes(searchText.toLowerCase())
  );
}

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState(restaurantList)
  const [filteredRestaurants, setfilteredRestaurants] = useState(restaurantList);
  const [searchText, setSearchText] = useState("");

  useEffect(()=>{
     getRestaurants();
  },[])

  async function getRestaurants() {
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.4358011&lng=81.846311&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    setfilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
  }
  //   //optional chaining
  //   setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards)
  //   setfilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards)
  // }

  // console.log("render")

  // conditional rendering

  //early return => when not having restau , do not return anything
  if(!allRestaurants) return null;

  if(filteredRestaurants?.length === 0) return
  <h1>No restaurant found for your search !!</h1>

  return allRestaurants?.length === 0? <Shimmer/>: (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            // Update the state = restaurants
            const data = filterData(searchText, allRestaurants);
            // Need to filter the data
            setfilteredRestaurants(data);
          }}
        >
          Search
        </button>
      </div>


      <div className="restaurant-list">
        {filteredRestaurants.map((restaurant) => {
          return <RestaurantCard key={restaurant.data.id} {...restaurant.data} />;
        })}
      </div>
    </>
  );
};

export default Body;
