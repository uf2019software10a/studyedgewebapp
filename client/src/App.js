import React, { useState } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import './index.css'
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import SessionList from "./components/SessionList"


const App = ({exams}) => {
  const [updatedSessions, setUpdatedSessions] = useState(exams);
  const [classFilter, setClassFilter] = useState('');
  const [examFilter, setExamFilter] = useState('');
  const [selectedSession, setSelectedSession] = useState('');

  const selectedUpdate = React.useCallback(
    (newSession) => {
      setSelectedSession(newSession);
      console.log('updated selected session ID: ', newSession);
    },
    [],
  );

  //console.log(exams)
  //console.log(updatedSessions);
  return (
    <div>
      <header>Study Edge Review Sessions</header>
      <SessionList
        sessions={updatedSessions}
        classFilter={classFilter}
        examFilter={examFilter}
        selectedSessionUpdate={selectedUpdate}
      />
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
