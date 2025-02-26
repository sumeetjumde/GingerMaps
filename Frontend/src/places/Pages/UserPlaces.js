import React, { useEffect, useState } from "react";
import PlaceList from "../Components/PlaceList";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/Components/ErrorModal";
import LoadingSpinner from "../../shared/Components/LoadingSpinner";

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:4000/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);


const placeDeleteHandler = deletedPlaceId => {
  setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
};

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (<LoadingSpinner />)}  
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler}/>}
    </React.Fragment>
  );
};

export default UserPlaces;
