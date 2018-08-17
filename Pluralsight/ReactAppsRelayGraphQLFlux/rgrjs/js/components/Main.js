import React from "react";
import Relay from "react-relay";

import Link from "./Link";
import CreateLinkMutation from "../mutations/CreateLinkMutation";


class Main extends React.Component {
  // Class member syntax requires babel-preset-stage-0 for advanced features
  setLimit = (e) => {
    let newLimit = Number(e.target.value);
    this.props.relay.setVariables({limit: newLimit});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Relay.Store.Update(
      new CreateLinkMutation({
        title: this.refs.newTitle.value,
        url: this.refs.newUrl.value,
        store: this.props.store
      })
    );
    this.refs.newTitle.value = "";
    this.refs.newUrl.value = "";
  }

  render() {
    let content = this.props.store.links.map(link => {
      return  <Link key={link._id} link={link} />
    });

    return (
      <div>
        <h3>Links</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Title" ref="newTitle" />
          <input type="text" placeholder="Url" ref="newUrl" />
          <button type="submit">Add</button>
          Showing: &nbsp;
        </form>
        <select onChange={this.setLimit} defaulValue={this.props.relay.variables.limit} >
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
        id,
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
