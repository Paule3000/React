import React from "react";
import PropTypes from 'prop-types'; // React.PropTypes has moved into a different package since React v15.5. Please use the prop-types library instead.
import API from "../API";
import LinkStore from "../stores/LinkStore";

let _getAppState = () => {
  return { links: LinkStore.getAll() };
};

class Main extends React.Component {
  // Class member syntax requires babel-preset-stage-0 for advanced features
  static propTypes = {
    limit: PropTypes.number
  }
  
  static defaultProps = {
    limit: 2
  }

  state = _getAppState();

  // With arrow function used for onChange No need for manual binding in constructor
  // constructor(props) {
  //   super(props);

  //   this.state = _getAppState();
  //   this.onChange = this.onChange.bind(this);
  // }

  componentDidMount() {
    API.fetchLinks();
    LinkStore.on("change", this.onChange);
  }

  componentWillMount() {
    LinkStore.removeListener("change", this.onChange);
  }

  // Convert onChange to a property and use arrow functions. No need for manual binding in constructor
  onChange = () => {
    console.log("4. In the View");
    this.setState(_getAppState());
  }

  render() {
    let content = this.state.links.slice(0, this.props.limit).map(link => {
      return  <li key={link._id}>
                <a href={link.url}>{link.title}</a>
              </li>
    });

    return (
      <div>
        <h3>Links</h3>
        <ul>
          {content}
        </ul>
      </div>
    );
  }
}

// Main.propTypes = {
//   limit: PropTypes.number
// }

// Main.defaultProps = {
//   limit: 2
// }

export default Main;
