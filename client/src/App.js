import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import SessionList from "./components/SessionList/SessionList"
import Menu from "./components/Menu/Menu"
import Confirmation from "./components/Popup/Confirmation"
import ReservationError from "./components/Popup/ReservationError";
import ReservationConfirmed from "./components/Popup/ReservationConfirmed";
import "./index.css"
import AddSlot from "./components/Popup/AddSlot";
import EditOrDelete from "./components/Popup/EditOrDelete";
import ViewSlot from "./components/Popup/ViewSlot";

const App = () => {
  const [classFilter, setClassFilter] = useState('');
  const [examFilter, setExamFilter] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [showReservationErrorPopup, setShowReservationErrorPopup] = useState(false);
  const [showReservationConfirmedPopup, setShowReservationConfirmedPopup] = useState(false);
  const [confirmationEmailAddress, setConfirmationEmailAddress] = useState('');
  const [examsList, setExamsList] = useState([]);

  const [showAdmin, setShowAdmin] = useState(true);

  const closeAdmin = React.useCallback(
      () => {
          setShowAdmin(false);
      }
  );

    useEffect(() => {
        fetch('http://localhost:3000/api/exams/')
            .then(res => res.json())
            .then((data) => {
                setExamsList(data);
            })
            .catch(console.log)
    }, []);

  const emailUpdate = React.useCallback(
      (email) => {
          setConfirmationEmailAddress(email);
      },
      [],
  );

  const selectedUpdate = React.useCallback(
    (newSession) => {
      setSelectedSession(newSession);
      openConfirmationPopup();
      //console.log('updated selected session ID: ', newSession);
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

  const openConfirmationPopup = React.useCallback(
      () => {
          setShowConfirmationPopup(true);
      },
      [],
  );

  const closeConfirmationPopup = React.useCallback(
      () => {
          setShowConfirmationPopup(false);
      },
      [],
  );

  const openReservationErrorPopup = React.useCallback(
      () => {
          setShowReservationErrorPopup(true);
      },
      [],
  );

  const closeReservationErrorPopup = React.useCallback(
      () => {
          setShowReservationErrorPopup(false);
      },
      [],
  );

  const openReservationConfirmedPopup = React.useCallback(
      () => {
          setShowReservationConfirmedPopup(true);
      },
      [],
  );

    const closeReservationConfirmedPopup = React.useCallback(
        () => {
            setShowReservationConfirmedPopup(false);
        },
        [],
    );

  console.log(examsList);
  return (
    <div className="app">
      <Header/>
        {false ?
        <ViewSlot
            session={examsList[0]}
            closePopup={() => {}}
        />
        : null }
        {false ?
        <EditOrDelete
            session={examsList[0]}
            closePopup={() => {}}
        />
        : null }
        {showAdmin ?
            <AddSlot
                closePopup={closeAdmin}
            />
            : null }
      {showConfirmationPopup ?
          <Confirmation
              text='Confirm Reservation'
              closePopup={closeConfirmationPopup}
              session={examsList.find((session) => session._id === selectedSession)}
              emailUpdate={emailUpdate}
              openReservationConfirmedPopup={openReservationConfirmedPopup}
              openReservationErrorPopup={openReservationErrorPopup}
          />
          : null
      }
      {showReservationErrorPopup ?
          <ReservationError
              text='Exam Slot Error'
              closePopup={closeReservationErrorPopup}
          />
          : null
      }
      {showReservationConfirmedPopup ?
          <ReservationConfirmed
              text='Exam Slot Confirmed!'
              closePopup={closeReservationConfirmedPopup}
              session={examsList.find((session) => session._id === selectedSession)}
              email={confirmationEmailAddress}
          />
          : null
      }
      <div className="instructions">
          Select Class and/or Exam Number:
      </div>

        <div className="search">
            <Menu
                title="Class..."
                list={examsList}
                element={'class'}
                filterUpdate={classNameUpdate}
            />
            <Menu
                title="Exam..."
                list={examsList}
                element={'exam_num'}
                filterUpdate={examNumberUpdate}
            />
        </div>
        <div className="sessions">
            <SessionList
            sessions={examsList}
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
