import React, { Component } from 'react';

import axios from 'axios';
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    class Create extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
               employeeList:[],
                activeItem:{
                    name: "",
                    end_time:"",
                    start_time:"",
                }
            }
        }
        componentDidMount() {
            this.refreshList();
        };

        refreshList = () => {
            axios
                .get("/api/employee/")
                .then((res) => console.log("funkar detta"))
                .catch((err) => console.log(err))
        };
        renderItems = () => {
        const newItems = this.state.employeeList
            console.log("renderItems")
        return newItems.map((item) => (
    <div className="listEmployee">
      <li
          key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>
           <input
               type="time"
               placeholder="enter time"
               name="pins" 
               
               onChange={this.handleChange}
           />

        </span>
      </li>
    </div>
    ));
  };

        render() {
            return (
                <div>


                {this.renderItems()}
                </div>
            )


        }
    }

export default Create;