import React, { Component } from "react";
import "./Create.css";
import "../App.css";
import axios from "axios";
import BasicDatePicker from "./Date";
import Box from '@mui/material/Box';
//import ComboBox from "./Search";
import { Link } from "react-router-dom";
import ModalTime from "./ModalTime";
import ModalDelete from "./ModalDelete.js"   //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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
      modal: false,
      deletable: [],
      showDeleteModal: false,
      deleteItemModal: false,
      deleteModalText: ["employee","from the schedule"],
      tempSaveItem: {},
      workTimeList: [],
      allSchedules: [],
      worktimeEmployee: [],
      employeeWorking: [],
      GetWorktimeEmployee: [],
      start_time_employees: [],
      end_time_employees: [],
      startTimeRequest: [],
      endTimeRequest: [],
      descriptionRequest: [],
      allWorktimes: [],
      allRequest: [],
      activeSchedule: {
        date: "",
        name: "testing",
      },
      activeItem: {
        employeeID: 1,
        start_time: "",
        end_time: "",
        date_schedule: "",
      },
      activeItem2: {
        employeeID: null,
        start_time: "",
        end_time: "",
        description: "",
        date_schedule: "",
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

    axios
      .get("http://localhost:8000/api/employeerequest/")
      .then((res) => this.setState({ allRequest: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  toggleDelete = () => { //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
  };

  handleChange = (e, ID) => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
    if (name === "start_time") {
      this.state.start_time_employees[ID] = value;
    } else {
      this.state.end_time_employees[ID] = value;
    }
  };


  handleDelete = (item) => {
    if(this.state.deletable[item.id]){
      this.state.deletable[item.id]=false
    }

    this.state.startTimeRequest[item.id] = "";
    this.state.endTimeRequest[item.id] = "";
    this.state.descriptionRequest[item.id] = "";

    if(this.state.deleteItemModal) {
    this.setState({
      employeeWorking: this.state.employeeWorking.filter(function (test) {
        return test !== item;
      }),
    });
      this.state.deleteItemModal = false;
    }
  };

  popUpDelete = (item) => { //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
    this.state.tempSaveItem = item;
    console.log(this.state.tempSaveItem)
  };

  AddEmployee = (item) => {
    if (this.state.employeeWorking.includes(item)) {
      return;
    }

    this.state.start_time_employees[item.id] = "09:00";
    this.state.end_time_employees[item.id] = "17:00";
    this.setState((prevState) => ({
      employeeWorking: [item, ...prevState.employeeWorking],
    }));
  };

  excel = () => {
    if (this.state.activeItem.date_schedule === "") {
      var today = new Date();
      this.state.activeItem.date_schedule = today.toISOString().split("T")[0];
    }

    this.updateDatabase();
    const date = this.state.activeItem.date_schedule;
    this.state.activeSchedule.date = date;
    let existingSchedules = this.state.allSchedules.filter(function (
      individualSchedule
    ) {
      return date == individualSchedule.date;
    });

    axios
      .get(
        `http://localhost:8000/download/${this.state.activeItem.date_schedule}/`
      )
      .then((res) => window.open(res.config.url));

    if (existingSchedules.length) {
      axios
        .put(
          `http://localhost:8000/api/allschedules/${existingSchedules[0].id}`,
          existingSchedules[0]
        )
        .then((res) => this.refreshList());
    } else {
      axios
        .post(
          "http://localhost:8000/api/allschedules/",
          this.state.activeSchedule
        )
        .then((res) => this.refreshList());
    }
  };

  updateDatabase = () => {
    const todayEmployees = this.state.employeeWorking;
    const date = this.state.activeItem.date_schedule;
    const deletingDoubles = this.state.allWorktimes.filter(function (test) {
      return test.date_schedule == date;
    });
    const deletingDoubleRequests = this.state.allRequest.filter(function (
      test
    ) {
      return test.date_schedule == date;
    });

    for (let i = 0; i < deletingDoubles.length; i++) {
      axios
        .delete(
          `http://localhost:8000/api/employeeworktime/${deletingDoubles[i].id}/`
        )
        .then((res) => this.refreshList());
    }
    for (let i = 0; i < deletingDoubleRequests.length; i++) {
      axios
        .delete(
          `http://localhost:8000/api/employeerequest/${deletingDoubleRequests[i].id}/`
        )
        .then((res) => this.refreshList());
    }

    for (let i = 0; i < todayEmployees.length; i++) {

      const ID = todayEmployees[i].id;
      const startTime = this.state.start_time_employees[ID];
      const endTime = this.state.end_time_employees[ID];

      this.state.activeItem.start_time = startTime;
      this.state.activeItem.end_time = endTime;
      this.state.activeItem.employeeID = ID;

      axios
        .post(
          `http://localhost:8000/api/employeeworktime/`,
          this.state.activeItem
        )
        .then((res) => this.refreshList());

      if (this.state.startTimeRequest[ID] === undefined) {
        this.state.activeItem2.start_time = "";
        this.state.activeItem2.end_time = "";
        this.state.activeItem2.description = "";
        this.state.activeItem2.employeeID = ID;
        this.state.activeItem2.date_schedule = date;
        axios
          .post(
            `http://localhost:8000/api/employeerequest/`,
            this.state.activeItem2
          )
          .then((res) => this.refreshList());
      }

      else {

        const startTimeRequest = this.state.startTimeRequest[ID];
        const endTimeRequest = this.state.endTimeRequest[ID];
        const description = this.state.descriptionRequest[ID];


        this.state.activeItem2.start_time = startTimeRequest;
        this.state.activeItem2.end_time = endTimeRequest;
        this.state.activeItem2.description = description;
        this.state.activeItem2.employeeID = ID;
        this.state.activeItem2.date_schedule = date;

        axios
          .post(
            `http://localhost:8000/api/employeerequest/`,
            this.state.activeItem2
          )
          .then((res) => this.refreshList());
      }
    }
  };

  setDate(value) {
    if (value == null) {
      return;
    }
    const chosen_date = value.toISOString().split("T")[0];
    this.setState({ activeItem: { date_schedule: chosen_date } });

    try {
      const chosen_date = value.toISOString().split("T")[0]
      this.setState({activeItem: {date_schedule: chosen_date}})
    }
    catch(error){
    }
    }

  request = (id) => {

    this.state.activeItem2.employeeID = id;

    if (this.state.startTimeRequest[id] !== undefined) {
      this.state.deletable[id] = true;
      this.state.activeItem2.start_time = this.state.startTimeRequest[id];
      this.state.activeItem2.end_time = this.state.endTimeRequest[id];
      this.state.activeItem2.description = this.state.descriptionRequest[id];
    }

    else {
      this.state.activeItem2.start_time = "";
      this.state.activeItem2.end_time = "";
      this.state.activeItem2.description = "";
    }

    if (this.state.startTimeRequest[id] === "") {
      this.state.deletable[id] = false;
    }
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    console.log(item.start_time);
    if (item.start_time !== "" || item.start_time != undefined){
    this.state.deletable[item.employeeID]=true;
    }
    if (item.start_time == ""){
      this.state.deletable[item.employeeID]=false;
    }


    this.toggle();
    this.state.startTimeRequest[item.employeeID] = item.start_time;
    this.state.endTimeRequest[item.employeeID] = item.end_time;
    this.state.descriptionRequest[item.employeeID] = item.description;
  };

  handleSubmitDelete = (item) => { //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    this.toggleDelete();
    this.state.deleteItemModal = item;
    this.handleDelete(this.state.tempSaveItem)
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

          <span title={item.employeeID}>{item.start_time}</span>
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
            />
          </span>
          <span className="mr-5"></span>
          <span className="mr-5"></span>

          <span>
            {this.state.deletable[item.id] ? (
            <button
            className="btn btn-success mr-2"
            onClick={() => this.request(item.id)}
          >
            Request
          </button>
        ) :
        <button
        className="btn btn-warning mr-2"
        onClick={() => this.request(item.id)}
      >
        Request
      </button>}
            <button
                className="btn btn-danger mr-2"
                onClick={() => this.popUpDelete(item)}  //SHOULD ADD INPUT ITEM TO CALL HANDLE DELETE FROM THIS FUNC
            >
                Delete
              </button>
          </span>
        </li>
      </div>
    ));
  };

  render() {
    if (this.state.activeItem.date_schedule === "") {
      var today = new Date();

      this.setState({
        activeItem: { date_schedule: today.toISOString().split("T")[0] },
      });
    }

    return (
      <div>
        <div>
          <div className="DateMargin">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                autoComplete="off"
                ReadOnlyInput="true"
                minDate={new Date()}
                disableMaskedInput = "false"
                value={this.state.activeItem.date_schedule}
                onChange={(newValue) => {
                  this.setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} sx={{
                  svg: { color: '#3F72AF' },
                }}/>}

              />
            </LocalizationProvider>
            <Link to={"/Schedule/" + this.state.activeItem.date_schedule}>
              <button
                className="btn btn-primary justify-content-end generateButton"
                onClick={() => this.excel()}
              >
                Generate
              </button>
            </Link>
          </div>
          <div className="SearchMargin">{this.autoComplete()}</div>
        </div>
        <div className="WorkingList">{this.renderItems()}</div>
        <div className="GenerateButton"></div>
        {this.state.modal ? (
          <ModalTime
            activeItem2={this.state.activeItem2}
            deletable={this.state.deletable[this.state.activeItem2.employeeID]}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}

        {this.state.showDeleteModal ? (
            <ModalDelete
                toggle={this.toggleDelete}
                onSave = {this.handleSubmitDelete}
                tempSaveItem ={this.state.tempSaveItem}
                deleteModalText ={this.state.deleteModalText}
            />
        ) : null}
      </div>
    );
  }
}

export default Create;
