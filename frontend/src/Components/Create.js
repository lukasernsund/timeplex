import React, { Component } from 'react';
import './Create.css'
import '../App.css'
import axios from 'axios';
import BasicDatePicker from "./Date";
//import ComboBox from "./Search";
import {Link} from "react-router-dom";
import Modal from "./Modal";
import {Input} from "reactstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";


    class Create extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                workTimeList: [],
            }
        }

        componentDidMount() {
            this.refreshList();
        };

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
                    getOptionLabel={(newItems)=>newItems.first_name.toString() +" "+ newItems.last_name.toString()}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Add empleyee"/>}
                />
                </div>

            )


        }


        renderItems = () => {
            const newItems = this.state.workTimeList
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
                name="first_name"
                autoComplete="off"
                onChange={this.handleChange}
                placeholder="Enter first name"
                            />
        </span>
                        <span>
            <Input
                type="time"
                id="employee-first_name"
                name="first_name"
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
        </span>
                    </li>
                </div>
                </div>
            ));
        };
        render() {
            return (
                <div>
                    {this.test()}
                <div className='CreateLayout'>
                    <div className='DateMargin'>
                        <BasicDatePicker />
                    </div>
                    <div className='SearchMargin'>

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