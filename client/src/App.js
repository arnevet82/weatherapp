import React, { Component, useState, useEffect } from 'react';
import Goals from './components/Goals';
import ActiveStages from './components/ActiveStages';
import Button from '@mui/material/Button';
import './App.css';
import Typography from '@mui/material/Typography';

const App = () => {

  const [data, setData] = useState({});
  const [goals, setGoals] = useState(data && data.goals && data.goals.length ? data.goals : []);
  const [page, setPage] = useState(0);

  const callBackendAPI = async () => {
    const response = await fetch('/get_data');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };


  useEffect(() => {
    callBackendAPI().then(res => setData(res.express)).then(setGoals(data.goals));

  }, [data])



  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h2" component="div" gutterBottom>
          MY GOALS {page === 0 && `- CURRENT STEPS`}
        </Typography>

      </header>
      {
        page === 0 ?
          <ActiveStages goals={goals} /> :
          <Goals goalsList={data} goals={goals}/>
      }

      <Button className={page === 0 ?'next-btn':'back-btn'} onClick={() => setPage(page === 0 ? 1 : 0)}>{page === 0 ? 'View and edit goals' : 'Back to current steps'}</Button>
    </div>
  );
}



export default App;