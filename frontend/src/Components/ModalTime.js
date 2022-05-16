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
            delatable: this.props.deletable,
            activeItem2: this.props.activeItem2,
        };
    }

    handleChange = (e) => {
        console.log("handle change")
        console.log(this.state.activeItem2)
        console.log(this.state.delatable)
        let { name, value } = e.target;


        const activeItem2 = { ...this.state.activeItem2, [name]: value };

        this.setState({ activeItem2 });
    };

    deleteItem = () => {
        this.state.activeItem2.end_time = ""
        this.state.activeItem2.start_time = ""
        this.state.activeItem2.description = ""
        const {onSave} = this.props;
        onSave(this.state.activeItem2)
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
                                    value={this.state.activeItem2.start_time}
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
                                    value={this.state.activeItem2.end_time}
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

                        {this.state.delatable === true  ? (
                        <Button onClick= {(event) => this.deleteItem()}>
                            Delete
                    </Button>
                        ) : null}
                    </ModalFooter>
                </div>
            </Modal>
        );
    }
}