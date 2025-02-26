import React from "react";
import UserItems from "./UserItems";
import './UserList.css';

const UserList = props => {
  if (props.items.length === 0) {
    return <div>No Users Found</div>;
  }

  return (
    <ul className="users-list">
      {props.items.map((user) => {
        return (
          <UserItems
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            places={user.places.length}
          />
        );
      })}
    </ul>
  );
};

export default UserList;
