import { Button } from "@material-ui/core";
import Inputs from "../../shared/Components/FormElements/Input";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useForm } from "../../shared/hooks/form-hook";

import "../Components/PlaceList.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/Components/LoadingSpinner";
import ErrorModal from "../../shared/Components/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import Auth from "../../user/Pages/Auth";

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:4000/api/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    try {
      await sendRequest(
        `http://localhost:4000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + auth.token,
        }
      );
      history.push('/' + auth.userId + '/places');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <h2>Place Not Found</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Inputs
            id="title"
            inputfieldtype="input"
            type="text"
            label="Title"
            errorText="Please enter a valid title"
            onInput={inputHandler}
            value={loadedPlace.title}
            valid={true}
          />
          <Inputs
            id="description"
            inputfieldtype="textarea"
            label="Description"
            errorText="Please enter a valid Description"
            onInput={inputHandler}
            value={loadedPlace.description}
            valid={true}
          />
          <Button type="submit">Update Place</Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
