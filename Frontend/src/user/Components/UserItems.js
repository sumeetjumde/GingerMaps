import React from "react";
import './UserItems.css';
import Avatar from "../../shared/Components/Avatar";
import {Link} from 'react-router-dom';
import Card from "../../shared/Components/Card";

const UserItems = props => {
    return(
        <li className="user-item">            
            <Card className="user-item__content">
                <Link to={`/${props.id}/places`}>                    
                <div className="user-item__image">
                    <Avatar image={`http://localhost:4000/${props.image}`} alt={props.name}/>
                </div>
                <div className="user-items__info">
                    <h2>{props.name}</h2>
                    <h3>{props.places}  {props.places === 1 ? 'Place':'Places'}</h3>   
                </div>
                </Link>
            </Card>            
        </li>
    )
}

export default UserItems;