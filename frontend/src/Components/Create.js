import React, { Component } from 'react';
import './Create.css'
import axios from 'axios';
import BasicDatePicker from "./Date";
import ComboBox from "./Search";
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    class Create extends React.Component {
        constructor(props) {
            super(props);
        }
        componentDidMount() {
            this.refreshList();
        };

        refreshList = () => {
            axios
                .get("/api/employee/")
                .then((res) => this.setState({employeeList: res.data}))
                .catch((err) => console.log(err))
        };

        render() {
            return (
                <div className='CreateLayout'>
                    <div className='DateMargin'>
                        <BasicDatePicker />
                    </div>
                    <div className='SearchMargin'>
                        <ComboBox />
                    </div>
                </div>
            )


        }
    }

export default Create;