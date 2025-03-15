import React, { useContext, useState } from "react";


import Card from "../../shared/Components/Card";
import Button from "../../shared/Components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Cards from "../../shared/Components/Cards";

const HomeItem = (props) => {
    const { isLoading, sendRequest, clearError, error } = useHttpClient();
  return (
    <React.Fragment>
      {/* <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={`http://localhost:4000/${props.image}`} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
        </Card>
      </li> */}
      <Cards />
    </React.Fragment>
  );
};

export default HomeItem;
