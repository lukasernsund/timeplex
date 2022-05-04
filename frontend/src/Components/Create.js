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
import {ExcelExport} from "@progress/kendo-react-excel-export";
import products from "./products.json";
import {Grid, GridToolbar} from "@progress/kendo-react-grid";

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
                activeItem:{
                    id:0,
                    start_time:"",
                    end_time:""
                }
            }
            }
        export = () => {
            {
                this._export.save();
            }
        };

        componentDidMount() {
            this.refreshList();
        };

        saveItem = (item) => {
            console.log(item)
            axios
                .post(`http://localhost:8000/api/employeeworktime/`, item)
                .then((res) => this.refreshList());
        }
        handleChange = (e) => {
            this.setState({ activeItem:e.target.value});
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
            }

        refreshList = () => {
            axios
                .get("/api/employeeworktime/")
                .then((res) => this.setState({worktimeEmployee: res.data}))
                .catch((err) => console.log(err))
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
            console.log(newItems);
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
                <div>
                    <div>
                        <LocalizationProvider className='CreateLayout' dateAdapter={AdapterDateFns}>

                            <DatePicker
                                className='DateMargin'
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
                        <ExcelExport data={this.state.employeeWorking} ref={exporter => this._export = exporter}>
                        <Link to="/AllSchedules/"><button className="BlueButton" onClick={this.export} >Generate</button></Link>
                        </ExcelExport>
                    </div>
                </div>
            )


        }
    }

export default Create;