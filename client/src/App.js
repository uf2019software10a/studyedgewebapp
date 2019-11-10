import React, { useState } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import SessionList from "./components/SessionList/SessionList"
import Menu from "./components/Menu/Menu"


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
        console.log('class name filter: ', newClass);
      },
      [],
  );

  const examNumberUpdate = React.useCallback(
      (newExam) => {
        setExamFilter(newExam);
        console.log('exam num filter: ', newExam);
      },
      [],
  );

  //console.log(exams)
  //console.log(updatedSessions);
  return (
    <div>
      <Header/>
        <Menu
            title="Select Class"
            list={updatedSessions}
            element={'class'}
            filterUpdate={classNameUpdate}
        />
        <Menu
            title="Select Exam"
            list={updatedSessions}
            element={'exam_num'}
            filterUpdate={examNumberUpdate}
        />
        <SessionList
        sessions={updatedSessions}
        classFilter={classFilter}
        examFilter={examFilter}
        selectedSessionUpdate={selectedUpdate}
        />
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
