import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import CONSTANTES from "../config/CONSTANTES";

export default class CreateMesas extends Component {
  state = {
    cod: "",
    nombrepagador: "",
    date: new Date(),
    descripcionpedido: "",
    editing: false,
    _id: "",
    flat: false,
    user: null
  };

  async componentDidMount() {
    if (this.props.match.params.id) this.getMesa(this.props.match.params.id);

    this.state.user =JSON.parse(localStorage.getItem('usuario'));
    this.state._id =localStorage.getItem('idUser');
    
  }

  getMesa = async id => {
    const url = `${CONSTANTES.URL_SERVICIOS}/api/mesa/${id}`;
    const res = await axios.get(url);

    this.setState({
      _id: res.data.mesa._id,
      cod: res.data.mesa.cod,
      nombrepagador: res.data.mesa.nombrepagador,
      descripcionpedido: res.data.mesa.descripcionpedido,

      usuario: res.data.mesa.usuario,
      editing: true
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    const url_1 = `${CONSTANTES.URL_SERVICIOS}/api/update-mesas/${this.state._id}`;
    
    const url_2 = `${CONSTANTES.URL_SERVICIOS}/api/crear`;

    const mesa = {
      cod: this.state.cod,
      nombrepagador: this.state.nombrepagador,
      descripcionpedido: this.state.descripcionpedido,

      date: this.state.date,
      usuario: this.state._id
    };
    let url = this.state.editing ? url_1 : url_2;
    url += '?token='+ localStorage.getItem('token');
    if (this.state.editing) {
      await axios.put(url, mesa);
    } else {
      await axios.post(url, mesa);
    }

    window.location.href = "/";
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangeDate = date => {
    this.setState({ date });
  };

  render() {
    const titleValue = !this.state.editing ? "Nueva Mesa" : "Mesa";
    const flat = localStorage.getItem("token") ? true : false;
    console.log(flat);
    return flat ? (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>{titleValue}</h4>

          <form onSubmit={this.onSubmit}>
            {/* mesa código */}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Código"
                onChange={this.onInputChange}
                name="cod"
                value={this.state.cod}
                required
              />
            </div>
            {/* mesa descripcion */}
            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                placeholder="Nombre del Pagador"
                name="nombrepagador"
                onChange={this.onInputChange}
                value={this.state.nombrepagador}
                required
              ></textarea>
            </div>
            {/* mesa descripcion */}
            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                placeholder="Descripción del pedido"
                name="descripcionpedido"
                onChange={this.onInputChange}
                value={this.state.descripcionpedido}
                required
              ></textarea>
            </div>
            {/* mesa Date */}
            <div className="form-group">
              <DatePicker
                className="form-control"
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
            <button className="btn btn-primary">
              Guardar <i className="material-icons"></i>
            </button>
          </form>
        </div>
      </div>
    ) : (
      <Link to={"/login"} className="btn btn-primary">
        <i className="material-icons"> </i>
        Login
      </Link>
    );
  }
}
