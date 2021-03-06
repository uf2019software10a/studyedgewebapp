import React from "react";
import "./Popup.css";
import { militaryToStandard, isOnline, getMonthName } from "../DateTimeUtil";
import axios from "axios";

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  // this just updates a session by incrementing the number of enrolled students
    // this should be called after a user sucessfully signs up for a study session
  updateEnrolled = async (session) => {
    await axios
        .put(`/api/exams/id=${session._id}`, {
          class: session.class,
          exam_num: session.exam_num,
          description: session.description,
          start: session.start,
          end: session.end,
          location: session.location,
          capacity: session.capacity,
          tutor: session.tutor,
          enrolled: session.enrolled + 1
        })
        .then(res => {
          console.log("RESPONSE DATA: ", res.data);
        })
        .catch(error => {
          console.log(error);
        });
  };

  // this gets a user object from their email
  getUser = async email => {
    console.log(email);
    let res = await axios.get(`/api/users/userEmail=${email}`);
    const data = res.data;
    return data[0]; // because emails are unique, we can just return the first value we get
  };

  getReservations = async ID => {
    let res = await axios.get(`/api/reservations/user=${ID}`);
    let data = res.data;
    console.log(data);
  };

  infoSubmitted = (month, day, start, end) => {
    const userEmailAddr = this.email.value;
    let specificTopicsPara = this.comments.value;
    const userName = this.name.value;
    const tutor = this.props.session.tutor;
    const className = this.props.session.class;
    const num = this.props.session.exam_num;
    const location = this.props.session.location;

    this.props.emailUpdate(userEmailAddr); // update the selected email
    this.props.closePopup(); // close the confirmation popup

    axios
      .post(
        "/send",
        {
          name: userName,
          email: userEmailAddr,
          className: className,
          examNum: num,
          tutor: tutor,
          location: location,
          month: month,
          day: day,
          start: start,
          end: end
        },
        { headers: { Accept: "application/json" } }
      )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

      this.updateEnrolled(this.props.session).then(r => console.log(r));

    /*
        // get the user from the database based on their email
        axios.get(`/api/users/userEmail=${userEmailAddr}`)
            .then(res => {
                const data = res.data;
                this.user = data[0];
                console.log(this.user);
            })*/

     this.getUser(userEmailAddr).then((data) => {
         console.log(data);
         if(specificTopicsPara.length < 1) {
             specificTopicsPara = "N/A";
         }
         const reservation = {
             user_id: data._id,
             exam_id: this.props.session._id,
             topics: specificTopicsPara
         };
         console.log(reservation);

         // create the reservation
         axios.post('/api/reservations/', reservation)
             .then((res) => {
                 console.log(res);
             })
     });

      this.props.openReservationConfirmedPopup();

    /*
        // get list of exams associated with this user
        axios.get(`/api/reservations/user=${this.user._id}`)
            .then(res => {
                const data = res.data;
                this.reservations = data;
                console.log(data);
            }).catch((error) => {
                console.log(error);
        })
         */
  };

  render() {
    const { closePopup, text, session } = this.props;
    //console.log(session);
    const locType = isOnline(session.location) ? "Online" : "In-Person";
    const startDate = new Date(session.start);
    const endDate = new Date(session.end);
    const month = getMonthName(startDate.getMonth() + 1);
    const day = startDate.getDate();
    const startTime = militaryToStandard(
      startDate.getHours(),
      startDate.getMinutes()
    );
    const endTime = militaryToStandard(
      endDate.getHours(),
      endDate.getMinutes()
    );

    return (
      <div className="popup">
        <div className="close" onClick={() => closePopup()}>
          X
        </div>
        <div className="popup_inner" style={{ margin: "60px auto 0" }}>
          <div className="sessionInfo">
            <p>
              {session.class} Exam {session.exam_num}
            </p>
            <p>{session.description}</p>
            <p>Study Expert: {session.tutor}</p>
            <p>
              {month} {day}, {startTime} - {endTime}
            </p>
            <p>{locType}</p>
            <p>
              {session.capacity - session.enrolled} of {session.capacity} slots left!
            </p>
          </div>
          <div className="text">
            <div className="text_box_label">
              <form>
                Name:
                <input
                  style={{ height: 20 }}
                  type="text"
                  ref={name => (this.name = name)}
                />
              </form>
            </div>
            <div className="text_box_label">
              <form>
                Preferred email:
                <input
                  style={{ height: 20 }}
                  type="text"
                  ref={email => (this.email = email)}
                />
              </form>
            </div>
            <div className="text_box_label">
              <form>
                Topics to Cover:
                <input
                  style={{ height: 80 }}
                  type="text"
                  ref={comments => (this.comments = comments)}
                />
              </form>
            </div>
          </div>
        </div>
        <div
          className="confirm"
          onClick={() => this.infoSubmitted(month, day, startTime, endTime)}
        >
          Book Now
        </div>
      </div>
    );
  }
}

export default Confirmation;
