import React, { Component } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import CONSTANTES from "../config/CONSTANTES";

export default class MesasList extends Component {
  state = {
    mesas: [],
    flat: false
  };

  async componentDidMount() {
    this.getMesas();
    
  }

  getMesas = async () => {
    const url = `${CONSTANTES.URL_SERVICIOS}/api/mesas`;
    const res = await axios.get(url);

    this.setState({
      mesas: res.data.mesas
    });
  };

  deleteMesa = async mesaId => {
    let url = `${CONSTANTES.URL_SERVICIOS}/api/delete-mesa/${mesaId}`;
    url += '?token='+ localStorage.getItem('token');
    await axios.delete(url);
    this.getMesas();
  };

  render() {

   const flat = localStorage.getItem("token") ? true : false;
    return (
      <div className="row">
        { flat ? (
            
          this.state.mesas.map(mesa => (
            <div className="col-md-4 p-2" key={mesa._id}>
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <h5>Mesa {mesa.cod}</h5>
                  <Link to={"/edit/" + mesa._id} className="btn btn-primary">
                    <i className="material-icons"> </i>
                    Editar
                  </Link>
                </div>
                <div className="card-body">
                  <p>Pagador: {mesa.nombrepagador}</p>
                  <p>Pedido: {mesa.descripcionpedido}</p>
                  <p>{format(mesa.date)}</p>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-danger"
                    type="button"
                    key={mesa._id}
                    onClick={() => this.deleteMesa(mesa._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Link to={"/user"} className="btn btn-primary">
            <i className="material-icons"> </i>
            Login
          </Link>
        )}
      </div>
      
    );

    
  }
}
