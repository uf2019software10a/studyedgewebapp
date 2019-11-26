// import React, { useState } from 'react';
// import { Route, Switch, Redirect  } from 'react-router-dom';
// import Home from "./views/Home/Home"
// import NotFound from "./views/NotFound"
// import Admin from "./views/Admin/Admin"
// import index from "./views/index/index"
// import Header from "./components/Header/Header"
// import SessionList from "./components/SessionList/SessionList"
// import Menu from "./components/Menu/Menu"
// import Confirmation from "./components/Popup/Confirmation"
// import ReservationError from "./components/Popup/ReservationError";
// import ReservationConfirmed from "./components/Popup/ReservationConfirmed";
//
//
// const index_load = ({exams}) => {
//   const [updatedSessions, setUpdatedSessions] = useState(exams);
//   const [classFilter, setClassFilter] = useState('');
//   const [examFilter, setExamFilter] = useState('');
//   const [selectedSession, setSelectedSession] = useState('');
//   const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
//   const [showReservationErrorPopup, setShowReservationErrorPopup] = useState(false);
//   const [showReservationConfirmedPopup, setShowReservationConfirmedPopup] = useState(false);
//
//   const selectedUpdate = React.useCallback(
//     (newSession) => {
//       setSelectedSession(newSession);
//       openConfirmationPopup();
//       //console.log('updated selected session ID: ', newSession);
//     },
//     [],
//   );
//
//   const classNameUpdate = React.useCallback(
//       (newClass) => {
//         setClassFilter(newClass);
//         //console.log('class name filter: ', newClass);
//       },
//       [],
//   );
//
//   const examNumberUpdate = React.useCallback(
//       (newExam) => {
//         setExamFilter(newExam);
//         //console.log('exam num filter: ', newExam);
//       },
//       [],
//   );
//
//   const openConfirmationPopup = React.useCallback(
//       () => {
//           setShowConfirmationPopup(true);
//       },
//       [],
//   );
//
//   const closeConfirmationPopup = React.useCallback(
//       () => {
//           setShowConfirmationPopup(false);
//       },
//       [],
//   );
//
//   const openReservationErrorPopup = React.useCallback(
//       () => {
//           setShowReservationErrorPopup(true);
//       },
//       [],
//   );
//
//   const closeReservationErrorPopup = React.useCallback(
//       () => {
//           setShowReservationErrorPopup(false);
//       },
//       [],
//   );
//
//   const openReservationConfirmedPopup = React.useCallback(
//       () => {
//           setShowReservationConfirmedPopup(true);
//       },
//       [],
//   );
//
//     const closeReservationConfirmedPopup = React.useCallback(
//         () => {
//             setShowReservationConfirmedPopup(false);
//         },
//         [],
//     );
//
//   //console.log(exams)
//   //console.log(updatedSessions);
//   return (
//     <div className="app">
//     <Switch>
//       <Route exact path="/Home"/>
//       <Route exact path="/">
//         <Redirect to="/Home" />
//       </Route>
//       <Route path="/Admin" component={Admin}>
//         <Redirect to="/Admin/login"/>
//         <Route component={Admin}/>
//       </Route>
//       <Route component={NotFound}/>
//     </Switch>
//     <Header/>
//       {showConfirmationPopup ?
//           <Confirmation
//               text='Confirm Reservation'
//               closePopup={closeConfirmationPopup}
//               session={updatedSessions.entries.find((session) => session._id === selectedSession)}
//           />
//           : null
//       }
//       {showReservationErrorPopup ?
//           <ReservationError
//               text='Exam Slot Error'
//               closePopup={closeReservationErrorPopup}
//           />
//           : null
//       }
//       {showReservationConfirmedPopup ?
//           <ReservationConfirmed
//               text='Exam Slot Confirmed!'
//               closePopup={closeReservationConfirmedPopup}
//               session={updatedSessions.entries.find((session) => session._id === selectedSession)}
//           />
//           : null
//       }
//       <div className="instructions">
//           Select class or exam number:
//       </div>
//       <div className="search">
//           <Menu
//               title="Class..."
//               list={updatedSessions}
//               element={'class'}
//               filterUpdate={classNameUpdate}
//           />
//           <Menu
//               title="Exam..."
//               list={updatedSessions}
//               element={'exam_num'}
//               filterUpdate={examNumberUpdate}
//           />
//       </div>
//       <div className="sessions">
//           <SessionList
//           sessions={updatedSessions}
//           classFilter={classFilter}
//           examFilter={examFilter}
//           selectedSessionUpdate={selectedUpdate}
//           />
//       </div>
//     </div>
//   );
// };
//
// export default index_load;
