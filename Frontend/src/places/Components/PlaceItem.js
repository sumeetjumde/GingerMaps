import React, { useContext, useState } from "react";

import "../Components/PlaceItem.css";
import Card from "../../shared/Components/Card";
import Modal from "../../shared/Components/Modal";
import { popper } from "@popperjs/core";
import Link from "react-router-dom";
import ErrorModal from "../../shared/Components/ErrorModal";
import LoadingSpinner from "../../shared/Components/LoadingSpinner";
import Button from "../../shared/Components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const PlaceItem = (props) => {
  const {isLoading,sendRequest,clearError,error} = useHttpClient();
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showDeleteModal,setShowDeleteModal]= useState(false);

  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };

  const showdeletionwarnininghandler = () => {
    setShowDeleteModal(true);
  }
  const canceldeletionwarnininghandler = () => {
    setShowDeleteModal(false);
  }

  const confirmDeletetionHandler = async () => {
    console.log("deleting");
    setShowDeleteModal(false);
    try{
      await sendRequest(`http://localhost:4000/api/places/${props.id}`,'DELETE');
      props.onDelete(props.id);
    }catch(err){}
    
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<button onClick={closeMapHandler}>Close</button>}
      >
        <div className="map-container">
          <iframe src={props.coordinates} width="100%" height="100%" />
        </div>
      </Modal>
      <Modal
        show={showDeleteModal}
        onCancel={canceldeletionwarnininghandler}
        header="Are you sure?"
        footerClass="place-items__modal-actions"
        footer={
          <React.Fragment>
            <button onClick={canceldeletionwarnininghandler}>Cancel</button>
            <button onClick={confirmDeletetionHandler}>Delete</button>
          </React.Fragment>
        }
      >
        <p>Are you sure you want to delete this,This can't be undone</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {/* {<isLoading && <LoadingSpinner asOverlay />} */}
          <div className="place-item__image">
            <img src={`http://localhost:4000/${props.image}`} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <button onClick={openMapHandler}>View On Map</button>
            {auth.userId === props.creatorId && (<Button to={`/places/${props.id}`}>Edit</Button>)}
            {auth.userId === props.creatorId && (<button onClick={showdeletionwarnininghandler}>Delete</button>)}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
