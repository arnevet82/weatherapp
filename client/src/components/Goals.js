import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import styled from "styled-components";
import TextField from '@mui/material/TextField';

const Goals = ({ goalsList, goals }) => {

  const [currentGoals, setCurrentGoals] = useState(goals);
  const [goalIndex, setGoalIndex] = useState(false);
  const [value, setValue] = React.useState(new Date('2021-11-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  
  const save = async (newGoals) => {

    let newGoalsList = { ...goalsList, goals: newGoals }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGoalsList)
    };

    const response = await fetch('update_data', requestOptions);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
  }



  const onClickFinishStage = async (goal, goalIndex, stage, stageIndex) => {
    let newStage = { ...stage, isActive: false, isFinished: true };
    let newStages = [...goal.stages].reverse();

    newStages[stageIndex] = newStage;
    let newGoal;
    if (stageIndex === 0) {
      newGoal = { ...goal, stages: newStages.reverse(), isComplete: true };
    } else {
      newStages[stageIndex - 1].isActive = true;
      newStages[stageIndex - 1].isFinished = false;
      newGoal = { ...goal, stages: newStages.reverse() };
    }

    let newGoals = [...goals];
    newGoals[goalIndex] = newGoal;
    setCurrentGoals(newGoals);
    await save(newGoals);
  };


  const getReverseStages = (stageArr) => {
    const newStageArr = [...stageArr];
    return newStageArr.reverse();
  };

  const handleChangeStage = async (e, goal, goalIndex, stage, stageIndex) => {
    const value = e.target.value;
    let newStage = { ...stage, stageName: value };
    let newStages = [...goal.stages].reverse();
    newStages[stageIndex] = newStage;
    let newGoal = { ...goal, stages: newStages.reverse() };
    let newGoals = [...goals];
    newGoals[goalIndex] = newGoal;
    setCurrentGoals(newGoals);
    await save(newGoals);
  }


  const handleChangeGoal = async (e, goal, goalIndex, type) => {
    const value = e.target.value;
    let newGoal;
    if(type === 'name') newGoal = { ...goal, goalName: value };
    if(type === 'description') newGoal = { ...goal, description: value };
    let newGoals = [...goals];
    newGoals[goalIndex] = newGoal;
    setCurrentGoals(newGoals);
    let newGoalsList = { ...goalsList, goals: newGoals }
    await save(newGoals);
  }


  const addGoal = async () => {
    let newGoals = [...goals];
    newGoals.push(
      { goalName: "", stages:
          [{ stageName: "", isActive: true, isFinished: false },
          { stageName: "", isActive: false, isFinished: false },
          { stageName: "", isActive: false, isFinished: false },
          { stageName: "", isActive: false, isFinished: false }]
      });
    setCurrentGoals(newGoals);
    await save(newGoals);
  };


  const handleDeleteGoal = async (index) => {
    let newGoals = [...goals];
    delete newGoals[index];
    newGoals = newGoals.filter((a) => a);
    setCurrentGoals(newGoals);
    await save(newGoals);
  };



  return (
    <Container>

       <div className='goal'>
          <span>Goal Name</span>
          <span>Goal Description</span>
          <span>Step 4</span>
          <span>Step 3</span>
          <span>Step 2</span>
          <span>Step 1</span>
       </div>

      {currentGoals && currentGoals.length && currentGoals.map((item, index) => {
        return (
          <div className='goal'>

            <TextField

              id={`goal-${index}`}
              value={item.goalName || ''}
              onChange={(e) => handleChangeGoal(e, item, index, 'name')}
              variant="outlined"
              className={item.isComplete ? 'goal-card-complete' : 'goal-card'}
              InputProps={{
                className: 'goal-input',
              }} />

              <TextField

                id={`description-${index}`}
                value={item.description || ''}
                onChange={(e) => handleChangeGoal(e, item, index, 'description')}
                variant="outlined"
                className={item.isComplete ? 'stage-card-complete' : 'description-card'}
                InputProps={{
                  className: 'simple-input',
                }} />


              
            {item.stages && item.stages.length && getReverseStages(item.stages).map((stageItem, idx) => {
              return (

                <>

                  <TextField id={`stage-${idx}`}
                    value={stageItem.stageName || ''}
                    variant="outlined"
                    onChange={(e) => handleChangeStage(e, item, index, stageItem, idx)}
                    className={item.isComplete ? 'stage-card-complete' : (stageItem.isActive ? 'stage-card-active' : (stageItem.isFinished ? 'stage-card-finished' : 'stage-card'))}
                    InputProps={{
                      className: 'stage-input',
                    }} />

                  {stageItem.isActive &&
                    <Button
                      className='done-btn'
                      onClick={() => onClickFinishStage(item, index, stageItem, idx)}>
                      {'<'}
                  </Button>}

                </>

              )
            })}
            {<Button className='delete-btn' onClick={() => handleDeleteGoal(index)}>DELETE</Button>}

          </div>

        )

      })}

      <Button className='add-btn' onClick={() => addGoal()} >Add New Goal</Button>

    </Container>
  );
}



const Container = styled.div`
  .goal{
    display: flex;
    margin-left: 50px;
    font-color: #0c3150;
  }

  span{
    width: 250px;
    font-size: 30px;
    color: #0c3150;
    margin-bottom: 20px;
    padding: 5px;
  }

  .save-btn{
    background-color: yellow;
    width: 60px !important;
    min-width: 60px;
    height: 60px;
    font-weight: bold;
    font-size: 18px;
    margin-top: 30px;
  }

  .done-btn{
    margin-left: -50px;
    margin-top: 27px;
    margin-right: 20px;
    background-color: white;
    width: 30px !important;
    min-width: 30px;
    height: 50px;
    font-weight: bold;
  }

  .add-btn{
    margin: a auto;
    margin-top: 35px;
    background-color: white;
    width: 200 !important;
    min-width: 200px;
    height: 60px;
    font-weight: bold;
    font-size: 18px;
  }

  .goal-card{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    width: 240px;
    height: 80px;
    margin: 10px;
    background-color: grey;
  }

  .description-card{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    width: 250px;
    height: 80px;
    margin: 10px;
    background-color: #e0e0e0;
    font-weight: normal;
  }

  .goal-card-complete{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    width: 240px;
    height: 80px;
    margin: 10px;
    background-color: #ffff8d;
  }

  .simple-input{
    font-size: 16px;
    color: #0c3150;
    font-weight: normal;
  }

  .goal-input{
    font-size: 1.5em;
    color: #0c3150;
    font-weight: bold;
  }


  .stage-card{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    width: 250px;
    height: 80px;
    margin: 10px;
    background-color: white;
  }

  .stage-card-active{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    width: 250px;
    height: 80px;
    margin: 10px;
    background-color: #bbdefb;
  }

  .stage-card-finished{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    width: 250px;
    height: 80px;
    margin: 10px;
    background-color: #ffff8d;
  }

  .stage-card-complete{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    width: 250px;
    height: 80px;
    margin: 10px;
    background-color: #ffff8d;
  }

  .stage-input{
    font-size: 16px;
    color: #0c3150;
  }

`;


export default Goals;