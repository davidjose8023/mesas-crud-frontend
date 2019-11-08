import React, { Component } from "react";
import axios from "axios";

import CONSTANTES from "../config/CONSTANTES";

export default class CreateUser extends Component {
  state = {
    nombre: "",
    email: "",
    password: "",
    users: [],
    user: null,
    total: 0,
    flat: false,
    token: "",
    _id: ""
  };

  async componentDidMount() {
    this.getUsers();
    
  }

  loginUser = async (e) => {
    e.preventDefault();
    let url = `${CONSTANTES.URL_SERVICIOS}/api/login`;
    //url += '?token='+ this.token;

    const resp = await axios.post(url,{
      email: this.state.email,
      password: this.state.password
    });

    this.setState({ user: resp.data.usuario, token: resp.data.token, _id: resp.data.id });
    localStorage.setItem("token",this.state.token );
    localStorage.setItem("usuario",JSON.stringify(this.state.user) );
    localStorage.setItem("idUser",this.state._id );

    window.location.href = "/";
    

    //console.log(resp);
    //console.log(this.state);
  };

  getUsers = async () => {
    let url = `${CONSTANTES.URL_SERVICIOS}/api/users`;
    //url += '?token='+ this.token;

    const resp = await axios.get(url);

    this.setState({ users: resp.data.usuarios, total: resp.data.total });

    //console.log(resp);
    //console.log(this.state);
  };

  onChangeUsername = e => {
    this.setState({
      nombre: e.target.value
    });
  };
  onChangeUseremail = e => {
    this.setState({
      email: e.target.value
    });
  };
  onChangeUserpassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    let url = `${CONSTANTES.URL_SERVICIOS}/api/register`;
    await axios.post(url, {
      nombre: this.state.nombre,
      email: this.state.email,
      password: this.state.password
    });
    this.setState({ nombre: "", email: "", password: "" });
    this.getUsers();
  };

  deleteUser = async userId => {
    let url = `${CONSTANTES.URL_SERVICIOS}/api/delete-user/${userId}`;
    url += '?token='+ localStorage.getItem('token');
    const response = window.confirm("ESta seguro de borrar el usuario?");
    if (response) {
      await axios.delete(url);
      this.getUsers();
    }
  };

  logoutUser = () =>{

    
    this.setState({ token: "", user: {}, _id: "" });
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('_id');
    window.location.href = "/login";
  
  }
  render() {

    const flat = localStorage.getItem("token") ? true : false;
    return (
      <div className="row">
        { flat && (
          <div className="col-md-4">
            <div className="card card-body">
              <h3>Usuario Nuevo</h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    className="form-control"
                    value={this.state.nombre}
                    type="text"
                    onChange={this.onChangeUsername}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    className="form-control"
                    value={this.state.email}
                    type="email"
                    onChange={this.onChangeUseremail}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    className="form-control"
                    value={this.state.password}
                    type="password"
                    onChange={this.onChangeUserpassword}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            </div>
          </div>
        )}

        {!flat && (
          <div className="col-md-4">
            <div className="card card-body">
              <h3>Login</h3>
              <form onSubmit={this.loginUser}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    className="form-control"
                    value={this.state.email}
                    type="email"
                    onChange={this.onChangeUseremail}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    className="form-control"
                    value={this.state.password}
                    type="password"
                    onChange={this.onChangeUserpassword}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            </div>
          </div>
        )}

        {flat && (
          <div className="col-md-8">
            <div className="card">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Email</th>
                    <th scope="col">Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map(user => (
                    <tr key={user._id}>
                      <td>{user.nombre}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          key={user._id}
                          onClick={() => this.deleteUser(user._id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
}
