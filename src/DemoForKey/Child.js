import { Component } from "react";

class Child extends Component {
  componentWillUnmount() {
    console.log("unmount: ", this.props.text);
  }
  render() {
    return (
      <div>
        {this.props.text}
        <input />
      </div>
    );
  }
}

export default Child;
