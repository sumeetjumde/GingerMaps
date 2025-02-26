import React,{useEffect, useState} from "react";
import UserList from "../Components/UserList";
import ErrorModal from "../../shared/Components/ErrorModal";
import LoadingSpinner from "../../shared/Components/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const {isLoading,error,sendRequest,clearError} = useHttpClient();
  const [loadedUsers,setLoadedUsers] = useState();

  useEffect(()=>{
    const fetchUsers = async () =>{
        try{
          const responseData = await sendRequest('http://localhost:4000/api/users');

          setLoadedUsers(responseData.users);   
        }
        catch(err){                  
        }
    };
    fetchUsers();
  },[sendRequest]);


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear = {clearError} />
      {isLoading && (
        <div>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
