import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../../views/Home/Home";
import NotFound from "../../views/NotFound";
import Admin from "../../views/Admin/Admin";
import Header from "../../components/Header/Header";
import SessionList from "../../components/SessionList/SessionList";
import Menu from "../../components/Menu/Menu";
//import AdminInformation from "../../components/Popup/AdminInformation";
import AddSlot from "../../components/Popup/AddSlot";
import EditOrDelete from "../../components/Popup/EditOrDelete";
import ViewSlot from "../../components/Popup/ViewSlot";
import "../../index.css";
import axios from "axios";

const AdminHome = ({ exams }) => {
  //const [updatedSessions, setUpdatedSessions] = useState(exams);
  const [examsList, setExamsList] = useState([]);
  const [classFilter, setClassFilter] = useState("");
  const [examFilter, setExamFilter] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [showAdminInformationPopup, setShowAdminInformtaionPopup] = useState(
    false
  );
  const [showAdminEditPopup, setShowAdminEditPopup] = useState(false);
  const [showAdminAddPopup, setShowAdminAddPopup] = useState(false);

  useEffect(() => {
    axios.get("/api/exams/").then(res => {
      const data = res.data;
      setExamsList(data);
    });
  });

  const selectedUpdate = React.useCallback(newSession => {
    setSelectedSession(newSession);
    openAdminInformationPopup();
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
  const closeAdminInformationPopup = React.useCallback(() => {
    setShowAdminInformtaionPopup(false);
  }, []);

  const openAdminInformationPopup = React.useCallback(() => {
    setShowAdminInformtaionPopup(true);
  }, []);
  const switchAdminPopupToEdit = React.useCallback(() => {
    setShowAdminInformtaionPopup(false);
    setShowAdminEditPopup(true);
  });

  const closeAdminEditPopup = React.useCallback(() => {
    setShowAdminEditPopup(false);
  }, []);
  const openAdminEditPopup = React.useCallback(() => {
    setShowAdminEditPopup(true);
  }, []);
  const closeAdminAddPopup = React.useCallback(() => {
    setShowAdminAddPopup(false);
  }, []);
  const openAdminAddPopup = React.useCallback(() => {
    setShowAdminAddPopup(true);
  }, []);

  //console.log(exams)
  //console.log(updatedSessions);
  return (
    <div className="AdminHome">
      <Header />
      <div className="instructions">
        <strong>Welcome Administrator</strong>
      </div>
      <br></br>
      <br></br>
      <div className="add" onClick={() => openAdminAddPopup()}>
        Add
      </div>
      {showAdminInformationPopup ? (
        <ViewSlot
          session={examsList.find(session => session._id === selectedSession)}
          closePopup={closeAdminInformationPopup}
          editPopup={switchAdminPopupToEdit}
        />
      ) : null}
      {showAdminEditPopup ? (
        <EditOrDelete
          session={examsList.find(session => session._id === selectedSession)}
          closePopup={closeAdminEditPopup}
        />
      ) : null}
      {showAdminAddPopup ? <AddSlot closePopup={closeAdminAddPopup} /> : null}
      <div className="instructions">Select class or exam number:</div>
      {typeof (examsList) !== 'undefined' ? (
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
      ) : null}
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

export default AdminHome;
