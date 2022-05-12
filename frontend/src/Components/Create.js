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
      allSchedules: [],
      worktimeEmployee: [],
      employeeWorking: [],
      GetWorktimeEmployee:[],
      start_time_employees:[],
      end_time_employees:[],
      allWorktimes: [],
      objectList:[],
      activeSchedule:{
        date:"",
        name:"sdf"
      },
      activeItem: {
        employeeID: 1,
        start_time: "",
        end_time: "",
        date_schedule:"",
    },

    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/employeeworktime/")
      .then((res) => this.setState({ allWorktimes: res.data }))
      .catch((err) => console.log(err));

      axios
      .get("http://localhost:8000/api/allschedules/")
      .then((res) => this.setState({ allSchedules: res.data }))
      .catch((err) => console.log(err));
    
    axios
      .get("http://localhost:8000/api/employee/")
      .then((res) => this.setState({ workTimeList: res.data }))
      .catch((err) => console.log(err));
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
    })

  };

  AddEmployee = (item) => {

    if (this.state.employeeWorking.includes(item)) {
      return;
    }

    this.state.start_time_employees[item.id]="12:00"
    this.state.end_time_employees[item.id]="12:00"
    console.log(this.state.start_time_employees[item.id]+"värdet på tid?" + item.id)
    this.setState((prevState) => ({
      employeeWorking: [item, ...prevState.employeeWorking],
    }));  
  };

  excel = () => {
    if (this.state.activeItem.date_schedule==="") {
      var today = new Date()
  
    this.state.activeItem.date_schedule = today
    }
    console.log(this.state.activeItem.date_schedule);
    this.updateDatabase()
    const date = this.state.activeItem.date_schedule
    this.state.activeSchedule.date=date
    let existingSchedules = this.state.allSchedules.filter(function(individualSchedule){ return date==individualSchedule.date })
    
    axios
      .get(`http://localhost:8000/download/${this.state.activeItem.date_schedule}/`)
      .then((res) => window.open(res.config.url))
  

    if(existingSchedules.length){
      console.log(existingSchedules[0])
      axios
      .put(`http://localhost:8000/api/allschedules/${existingSchedules[0].id}`,existingSchedules[0])
      .then((res) =>this.refreshList())
    }
    else{
      axios
      .post('http://localhost:8000/api/allschedules/',this.state.activeSchedule)
      .then((res) =>this.refreshList())
    }
  
    
}

  updateDatabase = () => {
    const todayEmployees = this.state.employeeWorking
    const date = this.state.activeItem.date_schedule
    const deletingDoubles= this.state.allWorktimes.filter(function (test) {
      return test.date_schedule == date;
    })
    for (let i = 0; i < deletingDoubles.length; i++){
    axios
      .delete(`http://localhost:8000/api/employeeworktime/${deletingDoubles[i].id}/`)
      .then((res) => this.refreshList());
    }

    for (let i = 0; i < todayEmployees.length; i++){

      const ID = todayEmployees[i].id
      const startTime = this.state.start_time_employees[ID]
      const endTime = this.state.end_time_employees[ID]

      this.state.activeItem.start_time = startTime;
      this.state.activeItem.end_time = endTime;
      this.state.activeItem.employeeID = ID;

      axios
        .post(`http://localhost:8000/api/employeeworktime/`,
        this.state.activeItem
      )
      .then((res) => this.refreshList());

    }
  }

  setDate (value){
    if (value==null){
      return
    }
    const chosen_date=value.toISOString().split("T")[0]
    this.setState({activeItem: {date_schedule: chosen_date}})
    }


  autoComplete = () => {
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

  
  renderItems = () => {
    const newItems = this.state.employeeWorking;
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
                id="employee-start-time"

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
                id="employee-end-time"
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


            </span>
          </li>
         
        </div>
    ));
  };

  render() {
    // if (this.state.activeItem.date_schedule==="") {
    //   var today = new Date()

    //   this.setState({activeItem:{date_schedule: today.toISOString().split("T")[0]}})
    //   };

    return (
      <div>
        <div>
          <div className="DateMargin">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                onChangeRaw={(e) => console.log("vad händer")}
                value={this.state.activeItem.date_schedule}
                onChange={(newValue) => {this.setDate(newValue)
                  }}
                renderInput={(params) => <TextField {...params} />}
              
              />
            </LocalizationProvider>
            <Link to={"/Schedule/"+this.state.activeItem.date_schedule}>
            <button href="http://localhost:8000/download" className="btn btn-primary justify-content-end generateButton" onClick={() => this.excel()}>Generate</button>
          </Link>

          </div>
          <div className="SearchMargin">{this.autoComplete()}</div>
        </div>
        <div className="WorkingList">{this.renderItems()}</div>
        <div className="GenerateButton">
        </div>
      </div>
    );
  }
}

export default Create;
