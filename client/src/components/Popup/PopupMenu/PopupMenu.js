import React from 'react';
import './PopupMenu.css'

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
                            <li onClick={() =>
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