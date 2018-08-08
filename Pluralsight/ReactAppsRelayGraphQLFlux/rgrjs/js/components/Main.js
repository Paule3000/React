import React from "react";
import Relay from "react-relay";

import Link from "./Link";


class Main extends React.Component {
  // Class member syntax requires babel-preset-stage-0 for advanced features
  setLimit = (e) => {
    let newLimit = Number(e.target.value);
    this.props.relay.setVariables({limit: newLimit});
  }

  render() {
    let content = this.props.store.links.map(link => {
      return  <Link key={link._id} link={link} />
    });

    return (
      <div>
        <h3>Links</h3>
        <select onChange={this.setLimit}>
          <option value="1">1</option>
          <option value="2">1</option>
        </select>
        <ul>
          {content}
        </ul>
      </div>
    );
  }
}

// Declare the data requirements for this component
Main = Relay.createContainer(Main, {
  initialVariables: {
    limit:2
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        linkConnection(first: $limit) {
          edges {
            node {
              id,
              ${link.getFragment('link')}
            }
          }
        }
      }`
  }
})

export default Main;
