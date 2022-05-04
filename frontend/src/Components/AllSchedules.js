// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import VirtualizedList from "./ListAllSchedule";
// import './AllSchedules.css'


// function AllSchedules() {

//     return (
//         <div>
//             <div className='List'>
//             <VirtualizedList />
//             </div>
//             <ul style={{    listStyleType: "none"}}>
//                 <Link to="/Schedule/1"><li> A scehdule</li></Link>
//                 <Link to="/Schedule/2"><li> A scehdule</li></Link>
//                 <Link to="/Schedule/3"><li> A scehdule</li></Link>
//                 <Link to="/Schedule/4"><li> A scehdule</li></Link>
//                 <Link to="/Schedule/5"><li> A scehdule</li></Link>
//             </ul>
//         </div>
//     );
// }

// export default AllSchedules;


import React from 'react';
import Modal from "./Modal";
import './AllSchedules.css';
import '../App.css'

import axios from 'axios';
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";


class Schedule extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            employeeList: [],
            modal: false,
            activeItem:{
                date: "2022,11,10",
                name: "hej",
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
      .delete(`http://localhost:8000/api/allschedules/${item.id}/`)
      .then((res) => this.refreshList());
  };

    handleSubmit = (item) => {
        this.toggle();
        if (item.id) {
      axios
        .put(`http://localhost:8000/api/allschedules/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    
    axios 
      .post("http://localhost:8000/api/allschedules/", item) //tidigare stod det endast /api/employee/
      .then((res) => this.refreshList());
  };

    openPopup =()=>{
        this.setState({modal:true})
        console.log("inne i openpupup")
        console.log(this.state.activeItem)
        console.log(this.state.employeeList)
    }

    editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
     };

    refreshList =()=> {

      
        axios
      .get("/api/allschedules/")
      .then((res) => this.setState({employeeList:res.data}))
      .catch((err) => console.log(err))
  };



    renderItems = () => {
    const newItems = this.state.employeeList
   
  
    
    return newItems.map((item) => (
    <div className="listSchedule"> 
      <li
          key={item.id}

        className="list-group-item d-flex justify-content-between align-items-center"

      >
        <span
          title={item.first_name}
        >
          {"Date: "+item.date +" "+"Name: "+ item.name}
        </span>

        <span>
          <button // EDIT BUTTON
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button //DELETE BUTTON
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
            {/* <button onClick={this.openPopup} className="ButtonEmployee">Add schedule</button> */}
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

export default Schedule;
