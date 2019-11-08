import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import Navigations from "./componentes/Navigations";
import CreateMesas from "./componentes/CreateMesas";
import CreateUser from "./componentes/CreateUser";
import MesasList from "./componentes/MesasList";

class App extends Component {

  state= {

    flat : false
  }

  componentDidMount() {

    this.flat = localStorage.getItem("token") ? true : false;
  }
  render() {
    return (
      <BrowserRouter>
      <Navigations flat = {this.flat}/> 
        
        <div className="container p-4">
          {/* exact = la ruta debe cumplir tal cual el path */}
          <Route path="/" exact component={MesasList} />

          <Route path="/edit/:id" component={CreateMesas} />
          <Route path="/create" component={CreateMesas} />
          <Route path="/user" component={CreateUser} />
          <Route path="/login" component={CreateUser} />
          <Route path="/logout" component={CreateUser} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
