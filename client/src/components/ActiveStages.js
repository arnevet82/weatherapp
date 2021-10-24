import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import styled from "styled-components";
import TextField from '@mui/material/TextField';

const ActiveStages = ({goals}) => {

  const getReverseStages = (stageArr) => {
    const newStageArr = [...stageArr];
    return newStageArr.reverse();
  };

  
  return (
    <Container>


      {goals && goals.length && goals.map((item, index)=>{
        return (
          <div className='goal'>


          {item.stages && item.stages.length && getReverseStages(item.stages).map((stageItem, idx)=>{
            return (
              
                <>

                {stageItem.isActive && <TextField id={`stage-${idx}`} 
                  value={stageItem.stageName || ''} 
                  variant="outlined" 
                  className={'stage-card-active'}
                  InputProps={{
                    className: 'stage-input',
                  }} />}

              </>

                )
              })}
        
      </div>

        )

      })}


    </Container>
  );
}



const Container = styled.div`
  .goal{
    display: flex;
    margin-left: 0px;
  }
  .stage-card-active{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    width: 220px;
    height: 80px;
    margin: 20px auto;
    background-color: #bbdefb;
  }

  .stage-input{
    font-size: 1.5em;
    color: #0c3150;
  }

`;


export default ActiveStages;