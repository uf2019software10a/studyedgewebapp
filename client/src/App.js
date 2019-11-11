import React, { useState } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import SessionList from "./components/SessionList/SessionList"
import Menu from "./components/Menu/Menu"
import "./index.css"


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

  const classNameUpdate = React.useCallback(
      (newClass) => {
        setClassFilter(newClass);
        //console.log('class name filter: ', newClass);
      },
      [],
  );

  const examNumberUpdate = React.useCallback(
      (newExam) => {
        setExamFilter(newExam);
        //console.log('exam num filter: ', newExam);
      },
      [],
  );

  //console.log(exams)
  //console.log(updatedSessions);
  return (
    <div>
      <Header/>
        <div className="instructions">
            Select class and exam number:
        </div>
        <div className="search">
            <Menu
                title="Class..."
                list={updatedSessions}
                element={'class'}
                filterUpdate={classNameUpdate}
            />
            <Menu
                title="Exam..."
                list={updatedSessions}
                element={'exam_num'}
                filterUpdate={examNumberUpdate}
            />
        </div>
        <div className="sessions">
            <SessionList
            sessions={updatedSessions}
            classFilter={classFilter}
            examFilter={examFilter}
            selectedSessionUpdate={selectedUpdate}
            />
        </div>
      <Switch>
        <Route exact path="/Home"/>
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
};

export default App;
