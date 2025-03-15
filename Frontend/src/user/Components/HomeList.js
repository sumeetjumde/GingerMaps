import React from "react";

import "../Components/HomeList.css";
import Card from "../../shared/Components/Card";
import HomeItem from "./HomeItem";
import Button from "../../shared/Components/FormElements/Button";
import Cards from "../../shared/Components/Cards";

const HomeList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Places Found</h2>
        </Card>
      </div>
    );
  }

  // return (
  //   <ul className="container">
  //     {props.items.map((place) => (
  //       <Cards
  //         key={place.id}
  //         id={place.id}
  //         title={place.title}
  //         image={place.image}
  //         description={place.description}
  //         address={place.address}
  //         creatorId={place.creatorId}
  //       />
  //     ))}
  //   </ul>
  // );

  return (
    <ul className="container">
      {props.items.map((place) => {
        const matchedItem = props.items2.find(user => user.id === place.creatorId);
          const matchedUser = matchedItem ? matchedItem.name : 'Unknown User';
          const matchedUserImage = matchedItem ? matchedItem.image : null;
        return (
        <Cards
          key={place.id}
          id={place.id}
          title={place.title}
          image={place.image}
          description={place.description}
          address={place.address}
          creatorId={matchedUser}
          userImage={matchedUserImage}
        />
      )})}
    </ul>
  );
};

export default HomeList;