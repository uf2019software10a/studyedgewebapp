import React from 'react';
import './PopupMenu.css'

// this is like the other Menu component I created for the index page, but a little different for editing a session
class PopupMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMenu: false,
            header: this.props.title
        };
    };

    toggleMenu = () => {
        this.setState(prevState => ({
                displayMenu: !(prevState.displayMenu)
        }))
    };

    // update the menu header when a new element in the list is selected
    elementSelected = (newHeader) => {
        this.setState(() => ({
            header: newHeader,
            displayMenu: false
        }))
    };

    render() {
        const { list, filterUpdate } = this.props;

        return (
            <div className="dropdown">
                <div className="button" onClick={this.toggleMenu.bind(this)}>
                    {this.state.header}
                    <i className="arrow down"/>
                </div>

                {this.state.displayMenu && <ul>
                    {list
                        .map((item) => (
                            <li key={item} onClick={() =>
                                filterUpdate(item, this.elementSelected(item))}>
                                {item}
                            </li>
                        ))}
                </ul>}
            </div>
        );
    }
}

export default PopupMenu;