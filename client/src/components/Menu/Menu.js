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

    if (list.size > 0) {
      listReduced = [
        ...new Map(list.map(item => [item[element], item])).values()
      ];
    }

    // sort in alphanumeric order for dropdown menu display
    if (element === "class") {
      listReduced.sort((a, b) => a.class.localeCompare(b.class));
    } else if (element === "exam_num") {
      listReduced.sort((a, b) =>
        a.exam_num.toString().localeCompare(b.exam_num.toString())
      );
    }

    //console.log('reduced: ', listReduced);
    return (
      <div className="dropdown">
        <div className="button" onClick={this.toggleMenu.bind(this)}>
          {this.state.header}
          <i className="arrow down" />
        </div>

        {this.state.displayMenu && (
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
        )}
      </div>
    );
  }
}

export default Menu;
