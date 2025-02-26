import { useState } from "react";

const NewGoal = (props) => {
  const [enteredinputtext,setenteredinputtext] = useState('');

  const addGoalhandler = (event) => {
    event.preventDefault();

    const newGoalbyevent = {
      id: Math.random().toString(),
      text: enteredinputtext,
    };

    props.addGoal(newGoalbyevent);
    setenteredinputtext('');
  };

  const enteredinputevent = (event) => {
    setenteredinputtext(event.target.value);
  }

  return (
    <form onSubmit={addGoalhandler}>
      <input type="text" value={enteredinputtext} onChange={enteredinputevent}/>
      <button>Add Goal</button>
    </form>
  );
};

export default NewGoal;
