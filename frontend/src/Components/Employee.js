
import React from 'react';
import Modal from "./Modal";
import './Employee.css';
import '../App.css'

import axios from 'axios';
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";


class Employee extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            employeeList: [],
            modal: false,
            activeItem:{
                first_name: "",
                last_name:"",
                greeter: false,
                pins:false,
                eco: false,
                customer_service:false,
                pins_responsible: false,
                backoffice:false,
                operative_responsible:false,
                frontline:false,
                smaland_1:false,
                smaland_2:false,
                count_kk:false,

            }
        }

    }
    componentDidMount() {
    this.refreshList();
  }
    toggle = () => {
    this.setState({ modal: !this.state.modal });

  };

    handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/employee/${item.id}/`)
      .then((res) => this.refreshList());
  };

    handleSubmit = (item) => {
        this.toggle();
        if (item.id) {
      axios
        .put(`http://localhost:8000/api/employee/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    
    axios 
      .post("http://localhost:8000/api/employee/", item) //tidigare stod det endast /api/employee/
      .then((res) => this.refreshList());
  };

    openPopup =()=>{
        this.setState({modal:true})
    }

    editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
     };

    refreshList =()=> {

      
        axios
      .get("/api/employee/")
      .then((res) => this.setState({employeeList:res.data}))
      .catch((err) => console.log(err))
  };



    renderItems = () => {
    const newItems = this.state.employeeList
   
  
    
    return newItems.map((item) => (
    <div className="listEmployee">
      <li
          key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"

      >
        <span
          title={item.first_name}
        >
          {item.first_name +" "+ item.last_name}
        </span>

        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    </div>
    ));
  };

    render() {
        return(
        <div>
            <button onClick={this.openPopup} className="ButtonEmployee btn btn-primary">Add employee</button>
            {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
        {this.renderItems()}
        </div>
        )
    }
}

export default Employee;
