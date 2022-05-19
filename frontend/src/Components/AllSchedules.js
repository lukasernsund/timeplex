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
import { Link } from 'react-router-dom';
import ModalDelete from "./ModalDelete";
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";

function byDate(a, b) {
    return new Date(a.date).valueOf() - new Date(b.date).valueOf();
}
class Schedule extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            SchedulesList: [],
            showDeleteModal: false,
            deleteItemModal: false,
            tempSaveItem: {},
            deleteModalText: ["schedule with date:",""],
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
    toggleDelete = () => { //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
        this.setState({ showDeleteModal: !this.state.showDeleteModal });
    };

    handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/allschedules/${item.id}/`)
      .then((res) => this.refreshList());
  };
    popUpDelete = (item) => { //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        this.setState({ showDeleteModal: !this.state.showDeleteModal });
        this.state.tempSaveItem = item;
        console.log(item)
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

    handleSubmitDelete = (item) => { //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        this.toggleDelete();
        this.state.deleteItemModal = item;
        this.handleDelete(this.state.tempSaveItem)
    }
    openPopup =()=>{
        this.setState({modal:true})
        console.log("inne i openpupup")
        console.log(this.state.activeItem)
        console.log(this.state.SchedulesList)
    }

    editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
     };

    refreshList =()=> {
        axios
      .get("/api/allschedules/")
      .then((res) => this.setState({SchedulesList:res.data}))
      .catch((err) => console.log(err))
  };

  excel = (item) => {
    axios
      .get(`http://localhost:8000/download/${item.date}/`)
      .then((res) => window.open(res.config.url))
  }

  renderItems = () => {
    const newItems = this.state.SchedulesList
        newItems.sort(byDate).reverse();


    return newItems.map((item) => (
    <div className="listSchedule">
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <Link //Om man vill ha hela lådan som klickbar wrappar man hela <li> med denna <link>, men då blir knapparna också länkade till detta..
        to={"/Schedule/"+item.date}
        key={item.id}
        className="text-muted"
      >
          <span
            //title={item.first_name}
          >
            {"Date: "+item.date}
          </span>
        </Link>

        <span>
          {/* <button // EDIT BUTTON
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button> */}
          <button // Download BUTTON
            href="http://localhost:8000/test"
            className="btn btn-primary mr-2"
            onClick={() => this.excel(item)}
          >
            Download
          </button>
          <button //DELETE BUTTON
            className="btn btn-danger"
            onClick={() => this.popUpDelete(item)}
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
          <Modal                                    //SKA DENNA MODAL BORT?
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
            {this.state.showDeleteModal ? (
                <ModalDelete
                    toggle={this.toggleDelete}
                    onSave = {this.handleSubmitDelete}
                    tempSaveItem = {this.state.tempSaveItem}
                    deleteModalText = {this.state.deleteModalText}
                />
            ) : null}
        {this.renderItems()}
        </div>
        )
    }
}

export default Schedule;