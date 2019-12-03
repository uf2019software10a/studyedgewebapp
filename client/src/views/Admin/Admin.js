import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../../views/Home/Home";
import NotFound from "../../views/NotFound";
import Admin from "../../views/Admin/Admin";
import Header from "../../components/Header/Header";
import SessionList from "../../components/SessionList/SessionList";
import Menu from "../../components/Menu/Menu";
import Confirmation from "../../components/Popup/Confirmation";
import ReservationError from "../../components/Popup/ReservationError";
import ReservationConfirmed from "../../components/Popup/ReservationConfirmed";
import AdminInformation from "../../components/Popup/AdminInformation";
import "../../index.css";

const AdminHome = ({ loggedin, exams }) => {
  const [updatedSessions, setUpdatedSessions] = useState(exams);
  const [classFilter, setClassFilter] = useState("");
  const [examFilter, setExamFilter] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [showReservationErrorPopup, setShowReservationErrorPopup] = useState(
    false
  );
  const [
    showReservationConfirmedPopup,
    setShowReservationConfirmedPopup
  ] = useState(false);
  const [showAdminInformationPopup, setShowAdminInformtaionPopup] = useState(
    false
  );

  const selectedUpdate = React.useCallback(newSession => {
    setSelectedSession(newSession);
    openAdminInformtaionPopup();
    //console.log('updated selected session ID: ', newSession);
  }, []);

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
  const closeAdminInformationPopup = React.useCallback(() => {
    setShowAdminInformtaionPopup(false);
  }, []);
  const openAdminInformtaionPopup = React.useCallback(() => {
    setShowAdminInformtaionPopup(true);
  }, []);

  //console.log(exams)
  //console.log(updatedSessions);
  return (
    <div className="AdminHome">
      <Header />
      At the Admin Dashboard page
      {showAdminInformationPopup ? (
        <AdminInformation
          text="Confirm Reservation"
          closePopup={closeAdminInformationPopup}
          session={updatedSessions.entries.find(
            session => session._id === selectedSession
          )}
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
          session={updatedSessions.entries.find(
            session => session._id === selectedSession
          )}
        />
      ) : null}
      <div className="instructions">Select class or exam number:</div>
      <div className="search">
        <Menu
          title="Class..."
          list={updatedSessions}
          element={"class"}
          filterUpdate={classNameUpdate}
        />
        <Menu
          title="Exam..."
          list={updatedSessions}
          element={"exam_num"}
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
    </div>
  );
};

export default AdminHome;
