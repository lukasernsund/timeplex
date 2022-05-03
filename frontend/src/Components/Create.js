import React, { Component } from 'react';
import './Create.css'
import '../App.css'
import axios from 'axios';
import BasicDatePicker from "./Date";
//import ComboBox from "./Search";
import {Link} from "react-router-dom";
import Modal from "./Modal";
import {Input} from "reactstrap";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";


    class Create extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                workTimeList: [],
                date:"",
                worktimeEmployee:[],
                employeeWorking:[],
                test123: [],
                activeItem:{
                    employeeID: 10,
                    start_time:"",
                    end_time:""
                },
                saveItem:{
                    employeeID: 10,
                    start_time:"test2",
                    end_time:"test2"
                }
            }
            }


        componentDidMount() {
           this.refreshList()
                
            
        };

        saveItem = (item) => {
            console.log("inne i save" + this.state.activeItem)
            this.state.activeItem.employeeID=item.id
            axios
                .post(`http://localhost:8000/api/employeeworktime/`,this.state.activeItem )
                .then((res) => this.refreshList());
        }

        handleChange = (e) => {
            let { name, value } = e.target;
            const activeItem = { ...this.state.activeItem, [name]: value };
            
            this.setState({ activeItem }); 
            console.log(this.state.activeItem)
        };

        handleDelete = (item) => {
            this.setState({
                employeeWorking: this.state.employeeWorking.filter(function(test) {
                    return test !== item
                })
                  })
        };

        AddEmployee = (item) => {
            const test = this.state.worktimeEmployee
            console.log(test)

            if(this.state.employeeWorking.includes(item)){
                    return
            }
            this.setState(prevState => ({
            employeeWorking: [item, ...prevState.employeeWorking]}))
            
            console.log (this.state.employeeWorking)
            for (const employee in this.state.employeeWorking){
                console.log("inne i forlop?" + employee)
        
                this.state.activeItem.employeeID=employee.id
                console.log(this.state.activeItem.employeeID)
                axios
                .post(`http://localhost:8000/api/employeeworktime/`,this.state.activeItem )
                .then((res) => this.refreshList());
        }


        }

        refreshList = () => {
            
            axios
                .get("/api/employee/")
                .then((res) => this.setState({workTimeList: res.data}))
                .catch((err) => console.log(err))
        };

        test = () => {
            const newItems = this.state.workTimeList

            return (<div>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={newItems}
                    disableClearable
                    getOptionLabel={(newItems)=>newItems.first_name.toString() +" "+ newItems.last_name.toString()}
                    onChange={(event, value) => this.AddEmployee(value)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Add employee"/>}
                />
                </div>

            )


        }


        renderItems = () => {
            const newItems = this.state.employeeWorking
               
            return newItems.map((item) => (
                <div>
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
            <Input
                type="time"
                id="employee-first_name"
                name="start_time"
                autoComplete="off"
                value={this.state.activeItem.start_time}
                onChange={this.handleChange}
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

                             <button
                                 className="btn btn-danger"
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
                <div className='CreateLayout'>
                    <div className='DateMargin'>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>

                            <DatePicker
                                label="Date"
                                value={this.state.date}
                                onChange={(newValue) => {
                                    this.setState({date:newValue.toISOString().split('T')[0]})
                                }
                                }
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                    </div>
                    <div className='SearchMargin'>
                        {this.test()}
                    </div>
                </div>
                    <div className='WorkingList'>
                        {this.renderItems()}
                </div>
                    <div className='GenerateButton'>
                        <Link to="/AllSchedules/"><button className="BlueButton">Generate</button></Link>

                    </div>
                </div>
            )


        }
    }

export default Create;