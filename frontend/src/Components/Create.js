import React, { Component } from "react";
import "./Create.css";
import "../App.css";
import axios from "axios";

import BasicDatePicker from "./Date";
//import ComboBox from "./Search";
import { Link } from "react-router-dom";
import ModalTime from "./ModalTime";
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
      modal: false,         //newly added
      workTimeList: [],
      date: "",
      worktimeEmployee: [],
      employeeWorking: [],
      allWorktimes: [],
      objectList:[],
      activeItem: {
        employeeID: null,
        start_time: "empty",
        end_time: "empty",
      },
        activeItem2:{          //newly added
          employeeID: null,
          start_time: "reg",
          end_time: "erfref",
          description : "other"
        },

    };
  }

  componentDidMount() {
    this.refreshList();
  }

  saveItem = (item) => {
    console.log("inne i save" + this.state.activeItem);
    this.state.activeItem.employeeID = item.id;
    axios
      .post(
        `http://localhost:8000/api/employeeworktime/`,
        this.state.activeItem
      )
      .then((res) => this.refreshList());
  };

  handleChange = (e) => {
    let { name, value } = e.target;
    //name = start_time & end_time, value = vald tid
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
    console.log("objects" + name + value )
    
    
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

  testa = (itemID) =>{
    
  }

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


  editItem = (item) => {
    this.setState({ activeItem2: item, modal: !this.state.modal });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

      console.log("inne i save" + this.state.activeItem2.employeeID);
      this.state.activeItem2.employeeID = item.id;
      axios
          .post(
              `http://localhost:8000/api/employeerequest/`,
              this.state.activeItem2
          )
          .then((res) => this.refreshList());
    }



  renderItems = () => {
    const newItems = this.state.employeeWorking;
    return newItems.map((item) => (
      <div>
        <div className="listEmployee">
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
        <span title={item.first_name}>
          {item.first_name + " " + item.last_name}
        </span>
        <span title={item.employeeID}>
          {item.start_time}
          </span>
        <span>
              <Input
                type="time"
                id="employee-first_name"
                name="start_time"
                autoComplete="off"
                
                onChange={this.handleChange & this.testa(item.id)}
                placeholder="Enter first name"
              />
            </span>
            <span>
              <Input
                type="time"
                id="employee-first_name"
                name="end_time"
                autoComplete="off"
                
                onChange={this.handleChange}
                placeholder="Enter first name"
              />
            </span>
            <span>

              <button
                className="btn btn-warning mr-2"
                onClick={() => this.editItem(this.state.activeItem)}
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
      </div>
    ));
  };
  render() {
    return (
      <div>
        <div>
          <div className="DateMargin">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={this.state.date}
                onChange={(newValue) => {
                  this.setState({ date: newValue.toISOString().split("T")[0] });
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
        {this.state.modal ? (
            <ModalTime
                activeItem2={this.state.activeItem2}
                toggle={this.toggle}
                onSave={this.handleSubmit}
            />
        ) : null}
      </div>
    );
  }
}

export default Create;
