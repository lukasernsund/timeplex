import React, { Component } from "react";
import './ModalTime.css';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notEmpty:false,
            activeItem2: this.props.activeItem2,
            showInfo:false
        };
    }

    handleChange = (e) => {
        let { name, value } = e.target;


        const activeItem2 = { ...this.state.activeItem2, [name]: value };

        this.setState({ activeItem2 });
    };

    renderItems = () => {         //Detta behöver ändras, fusk-lösning
        this.state.showInfo = true;
        console.log(this.state.activeItem2)
    }
render() {
        const { toggle, onSave } = this.props;


        return (

            <Modal isOpen={true} toggle={toggle}>
                <div className="inputEmployee">
                    <ModalHeader toggle={toggle}>Request employee worktime</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>

                                <div className= "gridContainer">
                                    <label htmlFor="timeEnd">Start time</label>
                                    <label htmlFor="timeStart">End time</label>
                                <div className="startTimeContainer">
                                <Input
                                    type="time"
                                    id="timeStart"
                                    name="start_time"
                                    autoComplete="off"
                                    //value={this.state.activeItem2.reqStartTime}
                                    onChange={this.handleChange}
                                    placeholder="Enter first name"
                                />

                                </div>

                                <div className="endTimeContainer">
                                <Input
                                    type="time"
                                    id="timeEnd"
                                    autoComplete="off"
                                    name="end_time"
                                    //value={this.state.activeItem2.reqEndTime}
                                    onChange={this.handleChange}
                                    placeholder="Enter last name"
                                />
                                    </div>
                                </div>
                            </FormGroup>

                            <FormGroup>
                                <Label for="requestDiscription"> Request description </Label>
                                    <Input
                                        type="text"
                                        id="requestDiscription"
                                        autoComplete="off"
                                        name="description"
                                        value={this.state.activeItem2.description}
                                        onChange={this.handleChange}
                                        placeholder="Enter description"
                                    />
                            </FormGroup>
                        </Form>



                    </ModalBody>
                    <ModalFooter>
                        {this.state.activeItem2.start_time !=="" && this.state.activeItem2.end_time !==""  ? (
                            <Button
                                color="success"
                                onClick={() => onSave(this.state.activeItem2)}
                            >
                                Save
                            </Button>
                        ) : null}
                        <Button onClick= {() =>this.renderItems()}>
                            Add
                    </Button>
                    </ModalFooter>
                    <div>
                        {this.state.showInfo ? (    //ÄNDRA DETTA
                            <p> {this.state.activeItem2.description} {this.state.activeItem2.start_time} - {this.state.activeItem2.end_time}</p>
                            ) : ""}
                    </div>
                </div>
            </Modal>
        );
    }
}