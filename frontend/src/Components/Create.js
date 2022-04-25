import React, { Component } from 'react';

import axios from 'axios';
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
                <div>

                </div>
            )


        }
    }

export default Create;