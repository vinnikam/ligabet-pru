import React, { Component } from 'react';
import logo from './logo.svg';
import Saludo from './Saludo';
import './App.css';
import firebase from './Firebase';
import "bootstrap/dist/css/bootstrap.min.css";

// import 'bootstrap/dist/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
 

class App extends Component { 
  state = {
  data: [],
  modalInsertar: false,
  modalEditar: false,
  form:{
    nombre: '',
    empresa: '',
    pais: '',
    liga: ''
  },
  id: 0
};

peticionGet = () => {
  firebase.child("equipos").on("value", (equipo) => {
    if (equipo.val() !== null) {
      this.setState({ ...this.state.data, data: equipo.val() });
    } else {
      this.setState({ data: [] });
    }
  });
};

peticionPost=()=>{
  firebase.child("equipos").push(this.state.form,
    error=>{
      if(error)console.log(error)
    });
    this.setState({modalInsertar: false});
}

peticionPut=()=>{
  firebase.child(`equipos/${this.state.id}`).set(
    this.state.form,
    error=>{
      if(error)console.log(error)
    });
    this.setState({modalEditar: false});
}

peticionDelete=()=>{
  if(window.confirm(`Estás seguro que deseas eliminar el equipo ${this.state.form && this.state.form.equipo}?`))
  {
  firebase.child(`equipos/${this.state.id}`).remove(
    error=>{
      if(error)console.log(error)
    });
  }
}

handleChange=e=>{
  this.setState({form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }})
  console.log(this.state.form);
}

seleccionarEquipo=async(equipo, id, caso)=>{

  await this.setState({form: equipo, id: id});

  (caso==="Editar")?this.setState({modalEditar: true}):
  this.peticionDelete()

}

componentDidMount() {
  this.peticionGet();
}

render() {
  return (
    <div className="App">
      <br />
      <button className="btn btn-success" onClick={()=>this.setState({modalInsertar: true})}>Insertar</button>
      <br />
      <br />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Empresa </th>
            <th>País</th>
            <th>Liga</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(this.state.data).map(i=>{
           // console.log(i);
            return <tr key={i}>
              <td>{this.state.data[i].nombre}</td>
              <td>{this.state.data[i].empresa}</td>
              <td>{this.state.data[i].pais}</td>
              <td>{this.state.data[i].liga}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>this.seleccionarEquipo(this.state.data[i], i, 'Editar')}>Editar</button> {"   "}
                <button className="btn btn-danger" onClick={()=>this.seleccionarEquipo(this.state.data[i], i, 'Eliminar')}>Eliminar</button>
              </td>

            </tr>
          })}
        </tbody>
      </table>


      <Modal isOpen={this.state.modalInsertar}>
    <ModalHeader>Insertar Registro</ModalHeader>
    <ModalBody>
      <div className="form-group">
        <label>Nombre Equipo: </label>
        <br />
        <input type="text" className="form-control" name="nombre" onChange={this.handleChange}/>
        <br />
        <label>Empresa: </label>
        <br />
        <input type="text" className="form-control" name="empresa" onChange={this.handleChange}/>
        <br />
        <label>Pais: </label>
        <br />
        <input type="text" className="form-control" name="pais" onChange={this.handleChange}/>
        <br />
        <label>Liga: </label>
        <br />
        <input type="text" className="form-control" name="liga" onChange={this.handleChange}/>
      </div>
    </ModalBody>
    <ModalFooter>
      <button className="btn btn-primary" onClick={()=>this.peticionPost()}>Insertar</button>{"   "}
      <button className="btn btn-danger" onClick={()=>this.setState({modalInsertar: false})}>Cancelar</button>
    </ModalFooter>
  </Modal>



  <Modal isOpen={this.state.modalEditar}>
    <ModalHeader>Editar Registro</ModalHeader>
    <ModalBody>
      <div className="form-group">
        <label>Nombre Equipo: </label>
        <br />
        <input type="text" className="form-control" name="nombre" onChange={this.handleChange} value={this.state.form && this.state.form.nombre}/>
        <br />
        <label>Empresa: </label>
        <br />
        <input type="text" className="form-control" name="empresa" onChange={this.handleChange} value={this.state.form && this.state.form.empresa}/>
        <br />
        <label>Pais: </label>
        <br />
        <input type="text" className="form-control" name="pais" onChange={this.handleChange} value={this.state.form && this.state.form.pais}/>
        <br />
        <label>Liga: </label>
        <br />
        <input type="text" className="form-control" name="liga" onChange={this.handleChange} value={this.state.form && this.state.form.liga}/>
      </div>
    </ModalBody>
    <ModalFooter>
      <button className="btn btn-primary" onClick={()=>this.peticionPut()}>Editar</button>{"   "}
      <button className="btn btn-danger" onClick={()=>this.setState({modalEditar: false})}>Cancelar</button>
    </ModalFooter>
  </Modal>
    </div>
  );
}
} 
export default App;