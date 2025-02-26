import React, { useCallback, useContext, useReducer } from "react";

import Inputs from "../../shared/Components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import "./NewPlace.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/Components/ErrorModal";
import LoadingSpinner from "../../shared/Components/LoadingSpinner";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ImageUpload from "../../shared/Components/FormElements/ImageUpload";

const NewPlace = () => {
 const auth = useContext(AuthContext);
 const{isLoading,error,sendRequest,clearError} = useHttpClient();
 const [formState,inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      location: {
        value: '',
        isValid: false,
      },
      image:{
        value: '',
        isValid: false,
      },
    },
    false
  );

 const history = useHistory();

  const formSubmitHandler = async event => {
    event.preventDefault();
    console.log(formState.inputs);
    try{
      const formData = new FormData();
      formData.append('title',formState.inputs.title.value);
      formData.append('description',formState.inputs.description.value);
      formData.append('address',formState.inputs.address.value);
      formData.append('location',formState.inputs.location.value);
      formData.append('creatorId',auth.userId);
      formData.append('image',formState.inputs.image.value);

    await sendRequest('http://localhost:4000/api/places','POST',formData);
    history.push('/');
    }
    catch(err)
    {

    }

  };
  
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
    <form className="place-form" onSubmit={formSubmitHandler}>
      {isLoading && <LoadingSpinner asOverlay />}
      <Inputs
        id="title"
        inputfieldtype="input"
        label="Title"
        type="text"
        errorText="Please enter a valid title"
        onInput={inputHandler}
      />
      <Inputs
        id="description"
        label="Description"
        type="text"
        errorText="Please enter a valid description"
        onInput={inputHandler}
      />
      <Inputs
        id="address"
        label="Address"
        type="text"
        errorText="Please enter a valid description"
        onInput={inputHandler}
      />
      <Inputs
        id="location"
        label="Location"
        type="text"
        errorText="Please enter a valid Location"
        onInput={inputHandler}
      />
      <ImageUpload id = "image" onInput = {inputHandler} errorText = "Please Provide an image."/>
      <button type="submit">Add Place</button>
    </form>
    </React.Fragment>
  );
};

export default NewPlace;
