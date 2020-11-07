
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Chat from './components/chat/Chat';
import Sidebar from './components/sidebar/Sidebar';
import Login from './components/login/Login';
import {useStateValue} from './components/stateprovider/StateProvider';
function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ?
        (<Login />) :
        (<div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/groups/:grpid">
                <Chat />
              </Route>
              <Route path="/" >
                <h1> Hellooo </h1>
              </Route>

            </Switch>

          </Router>

        </div>

        )
      }
    </div>);
}
export default App;
