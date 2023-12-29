import { useEffect, useState } from "react";
import restaurantList from "./Config";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

// Filter the restaurant data according input type
function filterData(searchText, restaurants) {
  const resFilterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return resFilterData;
}

// Body Component for body section: It contain all restaurant cards
const Body = () => {
  // useState: To create a state variable, searchText, allRestaurants and filteredRestaurants is local state variable
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // use useEffect for one time call getRestaurants using empty dependency array
  useEffect(() => {
    getRestaurants();
  }, []);

  // async function getRestaurant to fetch Swiggy API data
  async function getRestaurants() {
    // handle the error using try... catch
    try {
      const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING");
      const json = await response.json();

      // initialize checkJsonData() function to check Swiggy Restaurant data
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {

          // initialize checkData for Swiggy Restaurant data
          let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      // call the checkJsonData() function which return Swiggy Restaurant data
      const resData = await checkJsonData(json);

      // update the state variable restaurants with Swiggy API data
      setAllRestaurants(resData);
      setFilteredRestaurants(resData);
    } catch (error) {
      console.log(error);
    }
  }

  // use searchData function and set condition if data is empty show error message
  const searchData = (searchText, restaurants) => {
    if (searchText !== "") {
      const filteredData = filterData(searchText, restaurants);
      setFilteredRestaurants(filteredData);
      setErrorMessage("");
      if (filteredData?.length === 0) {
        setErrorMessage("No matches restaurant found");
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurants(restaurants);
    }
  };

  // if allRestaurants is empty don't render restaurants cards
  if (!allRestaurants) return null;

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search a restaurant you want..."
          value={searchText}
          // update the state variable searchText when we typing in input box
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <button
          className="search-btn"
          onClick={() => {
            // user click on button searchData function is called
            searchData(searchText, allRestaurants);
          }}
        >
          Search
        </button>
      </div>
      {errorMessage && <div className="error-container">{errorMessage}</div>}

      {/* if restaurants data is not fetched then display Shimmer UI after the fetched data display restaurants cards */}
      {allRestaurants?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="restaurant-list">
          {/* We are mapping restaurants array and passing JSON array data to RestaurantCard component as props with unique key as restaurant.data.id */}
          {filteredRestaurants.map((restaurant) => {
            return (
              <Link
               to={"/restaurant/"+ restaurant?.info?.id}
               key={restaurant?.info?.id}
               >
              <RestaurantCard  {...restaurant?.info} />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Body;

// const Body = () => {
//   const [allRestaurants, setAllRestaurants] = useState(restaurantList)
//   const [filteredRestaurants, setfilteredRestaurants] = useState(restaurantList);
//   const [searchText, setSearchText] = useState("");

//   useEffect(()=>{
//     //API call (once after render)
//      getRestaurants();
//     },[])

//   // const apiUrl = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.4358011&lng=81.846311&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
//   const apiUrl = 'https://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING';
//   async function getRestaurants() {
  
//     const data = await fetch(apiUrl);
//     const json = await data.json();
//     setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
//     setfilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
   
// }


//     //optional chaining

//   //   setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
//   //   setfilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
//   // }
//   // console.log("render")

//   // conditional rendering

//   //early return => when not having restau , do not return anything
//   // if allRestaurants is empty don't render restaurants cards
//   if(!allRestaurants) return null;

//   // if(filteredRestaurants?.length === 0) 
//   // return <h1>No restaurant found for your search !!</h1>

//   return  (
//     <>
//       <div className="search-container">
//         <input
//           type="text"
//           className="search-input"
//           placeholder="search"
//           value={searchText}
//           onChange={(e) => {
//             setSearchText(e.target.value);
//           }}
//         />
//         <button
//           className="search-btn"
//           onClick={() => {
//             // Update the state = restaurants
//             const data = filterData(searchText, allRestaurants);
//             // Need to filter the data
//             setfilteredRestaurants(data);
//           }}
//         >
//           Search
//         </button>
//       </div>
      
//       {/* {allRestaurants?.length === 0? (<Shimmer/>):

//       (<div className="restaurant-list">
//         {filteredRestaurants.map((restaurant) => {
//           return <RestaurantCard key={restaurant?.data?.id} {...restaurant?.data} />;
//         )
//         })}
//       </div>
//          )}
//     </> */}
//     {allRestaurants?.length === 0 ? (
//       <Shimmer />
//     ) : (
//       <div className="restaurant-list">
//         {/* We are mapping restaurants array and passing JSON array data to RestaurantCard component as props with unique key as restaurant.data.id */}
//         {filteredRestaurants.map((restaurant) => {
//           return (
//             <RestaurantCard key={restaurant?.data?.id} {...restaurant?.data} />
//           );
//         })}
//       </div>
//     )}
//   </>
//   );
// };

// export default Body;
