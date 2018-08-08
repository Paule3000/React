import React from "react";
import Relay from "react-relay";

import Link from "./Link";


class Main extends React.Component {
  // Class member syntax requires babel-preset-stage-0 for advanced features
  render() {
    let content = this.props.store.links.map(link => {
      return  <Link key={link._id} link={link} />
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

// Declare the data requirements for this component
Main = Relay.createContainer(Main, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        links {
          _id,
          ${link.getFragment('link')}
        }
      }`
  }
})

export default Main;
