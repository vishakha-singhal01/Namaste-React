import { IMG_CDN_URL } from "./Config";

// const RestaurantCard = () =>(
//     <>
//      <div className="card">
//        <img src= {DomiPizza.image}  alt="card"/>
//        <h2>{DomiPizza.name}</h2>
//        <h3>{DomiPizza.cuisins.join(", ")}</h3>
//        <h4>{DomiPizza.rating}</h4>
//      </div>
//     </>
// )

// Restaurant card component: Image, name, cuisine

const RestaurantCard = ({
    cloudinaryImageId,
    name,
    cuisines,
    lastMileTravelString,
    avgRating,
  }) => {
    return (
      <div className="card">
        <img
          src={
            IMG_CDN_URL +
            cloudinaryImageId
          }
        />
        <h2>{name}</h2>
        <br/>
        <span>
        <h4><i className ="fa-solid fa-star"></i>{avgRating}</h4>
          <h4>{lastMileTravelString}</h4>
        </span>
        <br/>
        <h4>{cuisines.join(", ")}</h4>
      </div>
    );
  };

export default RestaurantCard;

