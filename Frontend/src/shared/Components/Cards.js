import React from 'react';
import './Cards.css';


const Cards = props => {
    return (
        <div className="cards">
            <div className="cards__img">
                <img src={`http://localhost:4000/${props.image}`} alt={props.title} />
            </div>
            <div className="cards__details">
                <div className="description">
                    <h4>{props.title}</h4>
                </div>
                <div className="profile">
                    <img src={`http://localhost:4000/${props.userImage}`} alt="Avatar" />      
                    <p>{props.creatorId}</p>
                </div>   
            </div> 
        </div>
    );
};

export default Cards;