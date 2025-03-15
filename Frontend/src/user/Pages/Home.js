import React,{useEffect, useState} from "react";
import ErrorModal from "../../shared/Components/ErrorModal";
import LoadingSpinner from "../../shared/Components/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import HomeList from "../Components/HomeList";

const Home = () => {
  const {isLoading,error,sendRequest,clearError} = useHttpClient();
  const [loadedPlaces,setLoadedPlaces] = useState();
  /* My Code */
  const [loadedUsers,setLoadedUsers] = useState();
  /* My Code */

  useEffect(()=>{
    const fetchUsers = async () =>{
        try{
          const responseData = await sendRequest('http://localhost:4000/api/home');

          setLoadedPlaces(responseData.places);   

          /* My Code */
          const responseDataforusers = await sendRequest('http://localhost:4000/api/users');
          setLoadedUsers(responseDataforusers.users);
          /* My Code */
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
      {console.log(loadedPlaces)}
      {console.log(loadedUsers)}
      {!isLoading && loadedPlaces && <HomeList items={loadedPlaces} items2 = {loadedUsers} />}
    </React.Fragment>
  );
};

export default Home;
