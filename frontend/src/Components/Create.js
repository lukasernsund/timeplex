import React from 'react';
import Axios from 'axios';

class Create extends React.Component{
    ListEmployee (){
        console.log("är vi inne?")
        axios
        .get("/api/employee/")
        .then((res) => this.setState({ todoList: res.data }))
        .catch((err) => console.log(err));
  };


    render() {
        return(
        <div>
            <button onClick={this.ListEmployee}>Test</button>
        </div>
        )
    }
}