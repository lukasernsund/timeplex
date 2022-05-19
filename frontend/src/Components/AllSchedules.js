import React from 'react';
import Modal from "./Modal";
import './AllSchedules.css';
import '../App.css'

import axios from 'axios';
import { Link } from 'react-router-dom';
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
          >
            {"Date: "+item.date}
          </span>
        </Link>

        <span>
          <button
            href="http://localhost:8000/test"
            className="btn btn-primary mr-2"
            onClick={() => this.excel(item)}
          >
            Download
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