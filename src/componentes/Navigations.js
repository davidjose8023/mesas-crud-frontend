import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navigations extends Component {

  logoutUser = () =>{

    
     
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('idUser');
    window.location.href = "/login";
  
  }
  render() {
    const flat = localStorage.getItem("token") ? true : false;

    return flat ? (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to={ !this.props.flat ? "/login" : "/"}>
            CRUD MESAS
            
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
          
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Mesas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">
                  Add Mesas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user">
                  Add User
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link"  onClick={() => this.logoutUser()}>
                  Logout
                </a>
              </li>
            
            </ul>
          </div>
        </div>
      </nav>
    ):(

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to={ !this.props.flat ? "/login" : "/"}>
            CRUD MESAS
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
          
          
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/registrar">
                  Registrar
                </Link>
              </li>
            
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
