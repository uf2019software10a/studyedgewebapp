import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./views/NotFound";
import Header from "./components/Header/Header";
import SessionList from "./components/SessionList/SessionList";
import Menu from "./components/Menu/Menu";
import Confirmation from "./components/Popup/Confirmation";
import ReservationError from "./components/Popup/ReservationError";
import ReservationConfirmed from "./components/Popup/ReservationConfirmed";
import "./index.css";
import axios from "axios";
import AddSlot from "./components/Popup/AddSlot";
import EditOrDelete from "./components/Popup/EditOrDelete";
import ViewSlot from "./components/Popup/ViewSlot";

const App = () => {
  const [classFilter, setClassFilter] = useState("");
  const [examFilter, setExamFilter] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [showReservationErrorPopup, setShowReservationErrorPopup] = useState(false);
  const [showReservationConfirmedPopup, setShowReservationConfirmedPopup] = useState(false);
  const [confirmationEmailAddress, setConfirmationEmailAddress] = useState("");
  const [examsList, setExamsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // get the study session data from the DB
  useEffect(() => {
    axios.get("/api/exams/").then(res => {
      const data = res.data;
      setExamsList(data);
      setIsLoading(false);
    });
  });

  const emailUpdate = React.useCallback(email => {
    setConfirmationEmailAddress(email);
  }, []);

  const selectedUpdate = (newSession) => {
    setSelectedSession(newSession);
    openConfirmationPopup();
  };

  const classNameUpdate = React.useCallback(newClass => {
    setClassFilter(newClass);
    //console.log('class name filter: ', newClass);
  }, []);

  const examNumberUpdate = React.useCallback(newExam => {
    setExamFilter(newExam);
    //console.log('exam num filter: ', newExam);
  }, []);

  const openConfirmationPopup = React.useCallback(() => {
    setShowConfirmationPopup(true);
  }, []);

  const closeConfirmationPopup = React.useCallback(() => {
    setShowConfirmationPopup(false);
  }, []);

  const openReservationErrorPopup = React.useCallback(() => {
    setShowReservationErrorPopup(true);
  }, []);

  const closeReservationErrorPopup = React.useCallback(() => {
    setShowReservationErrorPopup(false);
  }, []);

  const openReservationConfirmedPopup = React.useCallback(() => {
    setShowReservationConfirmedPopup(true);
  }, []);

  const closeReservationConfirmedPopup = React.useCallback(() => {
    setShowReservationConfirmedPopup(false);
  }, []);

  //console.log(examsList);
  return (
    <div className="app">
      <Header />
      {showConfirmationPopup ? (
        <Confirmation
          text="Confirm Reservation"
          closePopup={closeConfirmationPopup}
          session={examsList.find(session => session._id === selectedSession)}
          emailUpdate={emailUpdate}
          openReservationConfirmedPopup={openReservationConfirmedPopup}
          openReservationErrorPopup={openReservationErrorPopup}
          allSessions={examsList}
        />
      ) : null}
      {showReservationErrorPopup ? (
        <ReservationError
          text="Exam Slot Error"
          closePopup={closeReservationErrorPopup}
        />
      ) : null}
      {showReservationConfirmedPopup ? (
        <ReservationConfirmed
          text="Exam Slot Confirmed!"
          closePopup={closeReservationConfirmedPopup}
          session={examsList.find(session => session._id === selectedSession)}
          email={confirmationEmailAddress}
        />
      ) : null}
      <div className="instructions">Select Class and/or Exam Number:</div>
      <div className="search">
          <div className="search">
            <Menu
              title="Class..."
              list={examsList}
              element={"class"}
              filterUpdate={classNameUpdate}
            />
            <Menu
              title="Exam..."
              list={examsList}
              element={"exam_num"}
              filterUpdate={examNumberUpdate}
            />
          </div>
      </div>
      <div className="sessions">
        <SessionList
          sessions={examsList}
          classFilter={classFilter}
          examFilter={examFilter}
          selectedSessionUpdate={selectedUpdate}
        />
      </div>
    </div>
  );
};

export default App;
