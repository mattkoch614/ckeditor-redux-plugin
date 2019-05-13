import React from "react";
import { connect } from "react-redux";

export class CustomButtonComponent extends React.Component {

render() {
    return (
        <button
        className="flex items-center content-center bg-gray-100 cursor-pointer rounded py-1"
        onClick={this.handleClick}
        >
        <span className="flex-1 uppercase text-blue-600 text-xs px-2 font-sans">
            Insert
        </span>
        <span className="uppercase text-gray-800 text-sm px-2 font-sans">
            {this.props.name}
        </span>
        </button>
    );
  }

  handleClick = () => {
    console.log("this is:", this.props.name);
  };
}

export default connect(
  null,
  null
)(CustomButtonComponent);
