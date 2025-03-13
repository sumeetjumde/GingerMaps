import React, { useReducer,useEffect } from "react";
import "./Input.css";

const inputreducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: true,
      };
    case "TOUCH":
      return{
        ...state,
        isTouched:true,
      }  
    default:
      return state;
  }
};

const Inputs = (props) => {
  const [inputstate, dispatch] = useReducer(inputreducer, {
    value: props.value || '',
    isTouched:false,
    isValid: props.isValid || false,
  });

  const{id,onInput} = props ;
  const{value,isValid} = inputstate;

  useEffect(()=>{
    props.onInput(id,value,isValid)},[id,value,isValid,onInput]); 

  const changehandler = (event) => {
    dispatch({ type: "CHANGE", val: event.target.value });
  };

  const touchhandler = () => {
    dispatch({
      type:'TOUCH'
    })
  }
  const inputfield =
    props.inputfieldtype === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changehandler}
        value={inputstate.value}
        onBlur={touchhandler}
      />
    ) : (
      <textarea id={props.id} rows={props.rows || 3} onChange={changehandler} value={inputstate.value} onBlur={touchhandler}/>
    );

  return (
    <div className={`form-control ${!inputstate.isValid && inputstate.isTouched && 'form-control--invalid'}`}>
      <label htmlFor={props.id}>{props.label}</label>
      {inputfield}
      {!inputstate.isValid && inputstate.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Inputs;
