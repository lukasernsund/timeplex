import React from 'react';
import Modal from "./Modal";
import axios from 'axios';
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";


class Create extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            employeeList: [],
            modal: false,
            activeItem:{
                first_name: "",
                last_name:"",
                greeter: false,
                pins:false,
                eco: false,
                customer_service:false,
                pins_responsible: false,
                backoffice:false,
                operative_responsible:false,
                frontline:false,
                smaland_1:false,
                smaland_2:false,
                count_kk:false,

            }
        }

    }
    toggle = () => {
    this.setState({ modal: !this.state.modal });

  };
    handleSubmit = (item) => {
    this.toggle();
    console.log("item id" + item.first_name)
    if (item.id) {
      axios
        .put(`/api/employee/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }

    axios
      .post("http://localhost:8000/api/employee/", item) //tidigare stod det endast /api/employee/
      .then((res) => this.refreshList());
  };

     refreshList =()=> {
        this.setState({modal:true})
        axios
      .get("/api/employee/")
      .then((res) => this.setState({employeeList:res.data}))
      .catch((err) => console.log(err))

  };

    // generateList (item){
    // for (let i = 0; i < item.length; i++ ){
    //     this.employeeList=item[i].first_name
    //     console.log("inne i generate list" + this.employeeList)
    // }
    // }

    renderItems = () => {
    const newItems = this.state.employeeList
    return newItems.map((item) => (
      <li
          key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          
          title={item.first_name}

        >
          {console.log("test för att se vad detta är" + item.first_name)}
          {item.first_name +" "+ item.last_name}
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
    ));
  };

    render() {
        return(
        <div>

            <button onClick={this.refreshList} >Add employee</button>
            {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
        {this.renderItems()}
        </div>
        )
    }
}

export default Create;
