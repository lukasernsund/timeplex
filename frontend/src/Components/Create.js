import React, { Component } from "react";
import "./Create.css";
import "../App.css";
import axios from "axios";
import BasicDatePicker from "./Date";
//import ComboBox from "./Search";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { Input } from "reactstrap";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { listItemIconClasses } from "@mui/material";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workTimeList: [],
      newEmployeeWorking: [],
      worktimeEmployee: [],
      employeeWorking: [],
      GetWorktimeEmployee:[],
      start_time_employees:[],
      end_time_employees:[],
      allWorktimes: [],
      objectList:[],
      activeItem: {
        employeeID: null,
        start_time: "",
        end_time: "",
        date_schedule:"",
    },

    };
  }

  componentDidMount() {
    this.refreshList();
  }

  saveItem = (item) => {
    
    this.state.activeItem.employeeID = item.id;
    axios
      .post(
        `http://localhost:8000/api/employeeworktime/`,
        this.state.activeItem
      )
      .then((res) => this.refreshList());
  };

  handleChange = (e, ID) => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
    console.log(this.state.activeItem)
    if (name==="start_time"){
      this.state.start_time_employees[ID]=value
    }
    else{
      this.state.end_time_employees[ID]=value
    
    }
  };

  
  

  handleDelete = (item) => {
    this.setState({
      employeeWorking: this.state.employeeWorking.filter(function (test) {
        return test !== item;
      }),
    });
  };

  AddEmployee = (item) => {

    if (this.state.employeeWorking.includes(item)) {
      return;
    }
    this.setState((prevState) => ({
      employeeWorking: [item, ...prevState.employeeWorking],
    }));  
  };

  refreshList = () => {
    axios
      .get("/api/employeeworktime/")
      .then((res) => this.setState({ allWorktimes: res.data }))
      .catch((err) => console.log(err));

    axios
      .get("/api/employee/")
      .then((res) => this.setState({ workTimeList: res.data }))
      .catch((err) => console.log(err));
  };


  test = () => {
    const newItems = this.state.workTimeList;
    return (
      <div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={newItems}
          disableClearable
          getOptionLabel={(newItems) =>
            newItems.first_name.toString() + " " + newItems.last_name.toString()
          }
          onChange={(event, value) => this.AddEmployee(value)}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Add employee" />
          )}
        />
      </div>
    );
  };

  excel = () => {
    axios
      .get('http://localhost:8000/test/')
      .then((res) => window.open(res.config.url))
  }

  setDate (value){
    if (value==null){
      return
    }
    this.filterWorktimeEmployee(value)
    
    const chosen_date=value.toISOString().split("T")[0]
    this.setState({activeItem: {date_schedule: chosen_date}})
    }

  filterWorktimeEmployee(value){

    const chosen_date=value.toISOString().split("T")[0]
    const allObjects = this.state.allWorktimes
    const allEmployees = this.state.workTimeList
    this.setState({employeeWorking: allObjects.filter(function(object){return object.date_schedule == chosen_date})})
    console.log(this.state.employeeWorking)
  }  
  
  renderItems = () => {
    const newItems = this.state.newEmployeeWorking;
    return newItems.map((item) => (
      <div className="listEmployeeWorking">
        
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-md-start align-items-center"
          >
        <span title={item.first_name} className="justify-content-start w-25">
          {item.first_name + " " + item.last_name}
        </span>
            <span className="mr-5"></span>
            <span className="mr-5"></span>

        <span title={item.employeeID}>
          {item.start_time}
          </span>
        <span>
              <Input
                type="time"
                id="employee-first_name"
                name="start_time"
                autoComplete="off"
                value={this.state.start_time_employees[item.id]}
                onChange={(e) => {
                  this.handleChange(e, item.id);
               }}
                placeholder="Enter first name"
              />
           </span>
            <span className="mr-3"></span>
            <span>
              <Input
                type="time"
                id="employee-first_name"
                name="end_time"
                autoComplete="off"
                value={this.state.end_time_employees[item.id]}
                onChange={(e) => {
                  this.handleChange(e, item.id);
               }}
                placeholder="Enter first name"
              />
            </span>
            <span className="mr-5"></span>
            <span className="mr-5"></span>

            <span>
              <button
                className="btn btn-warning mr-2"
                onClick={() => this.editItem(item)}
              >
                Request
              </button>
              <button
                className="btn btn-danger mr-2"
                onClick={() => this.handleDelete(item)}
              >
                Delete
              </button>

              <button
                className="btn btn-success mr-2"
                onClick={() => this.saveItem(item)}
              >
                Save
              </button>
            </span>
          </li>
         
        </div>
    ));
  };
  render() {
    if (this.state.activeItem.date_schedule==="") {
      var today = new Date()
      this.setState({activeItem:{date_schedule: today}}) 
      };
      
    return (
      <div>
        <div>
          <div className="DateMargin">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
              
                value={this.state.activeItem.date_schedule}
                onChange={(newValue) => {this.setDate(newValue)
                  }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="SearchMargin">{this.test()}</div>
        </div>
        <div className="WorkingList">{this.renderItems()}</div>
        <div className="GenerateButton">
        <button href="http://localhost:8000/test" className="BlueButton" onClick={() => this.excel()}>Generate</button>
           {/* <Link to="http://localhost:8000/test/">
            <button className="BlueButton" onClick={() => this.excel()}>Generate</button>
          </Link>  */}
        </div>
      </div>
    );
  }
}

export default Create;
