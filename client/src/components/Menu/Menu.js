import React from "react";
import "./Menu.css";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
      header: this.props.title
    };
  }

  toggleMenu = () => {
    this.setState(prevState => ({
      displayMenu: !prevState.displayMenu
    }));
  };

  // update the header when an actual value has been selected
  elementSelected = newHeader => {
    if (this.props.element === "exam_num") {
      newHeader = "Exam " + newHeader;
    }
    this.setState(() => ({
      header: newHeader,
      displayMenu: false
    }));
  };

  render() {
    const { list, element, filterUpdate } = this.props;

    // remove duplicate class names and exam numbers to be displayed to dropdown menu
    let listReduced = [];

    // reduce the list by removing any duplicate values EITHER
    // by exam number or class name
    // based on what we've passed into this component
    if (this.props && this.props.list && this.props.list.length > 0) {
      // got code from this website:
      // https://dev.to/marinamosti/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep
      listReduced = [
        ...new Map(this.props.list.map(item => [item[element], item])).values()
      ];

    // sort in alphanumeric order for dropdown menu display
    if (element === "class") {
      listReduced.sort((a, b) => a.class.localeCompare(b.class));
    } else if (element === "exam_num") {
      listReduced.sort((a, b) =>
        a.exam_num.toString().localeCompare(b.exam_num.toString())
      );
    }
  }

    //console.log('reduced: ', listReduced);
    //console.log(this.props);
    return (
      <div className="dropdown">

        <div className="button" onClick={this.toggleMenu.bind(this)}>
          {this.state.header}
          <i className="arrow down" />
        </div>

        {listReduced && listReduced.length > 0 && this.state.displayMenu ? (
          <ul>
            {listReduced.map(item => (
              <li
                key={item._id}
                onClick={() =>
                  filterUpdate(
                    item[element],
                    this.elementSelected(item[element])
                  )
                }
              >
                {element === "exam_num" ? "Exam " : null}
                {item[element]}
              </li>
            ))}
          </ul>
        ) : null}

      </div>
    );

  }

}

export default Menu;
