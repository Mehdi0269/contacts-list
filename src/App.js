import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import AddContact from "./Components/Contact-Form/add-contact";
import ContactsList from "./Components/Contact-list/Contacts-List";
import EditContact from "./Components/Contact-Form/edit-contact";

class App extends React.Component {
  state = {
    contacts: []
  };

  componentDidMount() {
    this.getContacts();
  }

  getContacts = () => {
    axios.get("/show_contacts").then(res => {
      this.setState({ contacts: res.data });
    });
  };

  addContacts = obj => {
    axios.post("/new_contact", obj).then(this.getContacts);
  };

  deleteContact = id => {
    axios.delete(`/delete_contact/${id}`).then(res => this.getContacts());
  };

  render() {
    return (
      <Router>
        <div>
          <div className="nav">
            <div className="btn from-top">
              <Link to="/addContact">Add Contact</Link>
            </div>
            <div className="btn from-top">
              <Link to="/ConatctList">Contacts List</Link>
            </div>
          </div>

          <hr />
          <Switch>
            <Route exact path="/">
              <h1>welcom</h1>
            </Route>
            <Route
              exact
              path="/addContact"
              render={() => (
                <AddContact
                  getContacts={this.state.contacts}
                  addContacts={this.addContacts}
                />
              )}
            />
            <Route
              exact
              path="/editcontact/:id"
              component={EditContact}
            />
            <Route
              exact
              path="/ConatctList"
              render={() => (
                <ContactsList
                  getContacts={this.state.contacts}
                  deleteContact={this.deleteContact}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
