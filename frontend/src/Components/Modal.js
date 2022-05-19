import React, { Component } from "react";
import './Modal.css';
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
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem }); 
  };

  render() {
    const { toggle, onSave } = this.props;


    return (

      <Modal isOpen={true} toggle={toggle}>
      <div className="inputEmployee">
        <ModalHeader toggle={toggle}>Add employee</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="employee-first_name">First Name</Label>
              <Input
                type="text"
                id="employee-first_name"
                name="first_name"
                autoComplete="off"
                value={this.state.activeItem.first_name}
                onChange={this.handleChange}
                placeholder="Enter first name"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="employee-last_name">Last Name</Label>
              <Input
                type="text"
                id="employee-last_name"
                autoComplete="off"
                name="last_name"
                value={this.state.activeItem.last_name}
                onChange={this.handleChange}
                placeholder="Enter last name"
                required
              />
            </FormGroup>

             <FormGroup>
              <Label for="employee-">Competencies</Label>
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="backoffice"
                  checked={this.state.activeItem.backoffice}
                  onChange={this.handleChange}
                />
                Backoffice
              </Label>
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="greeter"
                  checked={this.state.activeItem.greeter}
                  onChange={this.handleChange}
                />
                Greeter
              </Label>
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="pins"
                  checked={this.state.activeItem.pins}
                  onChange={this.handleChange}
                />
                Pins
              </Label>
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="eco"
                  checked={this.state.activeItem.eco}
                  onChange={this.handleChange}
                />
                Eco
              </Label>
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="customer_service"
                  checked={this.state.activeItem.customer_service}
                  onChange={this.handleChange}
                />
                Customer Service
              </Label>
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="pins_responsible"
                  checked={this.state.activeItem.pins_responsible}
                  onChange={this.handleChange}
                />
                Pins responsible
              </Label>
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="operative_responsible"
                  checked={this.state.activeItem.operative_responsible}
                  onChange={this.handleChange}
                />
                Operative responsible
              </Label>
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="smalland_1"
                  checked={this.state.activeItem.smalland_1}
                  onChange={this.handleChange}
                />
                Småland 1
              </Label>
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="smalland_2"
                  checked={this.state.activeItem.smalland_2}
                  onChange={this.handleChange}
                />
                Småland 2
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="count_kk"
                  checked={this.state.activeItem.count_kk}
                  onChange={this.handleChange}
                />
                Kassakontor
              </Label>
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="frontline"
                  checked={this.state.activeItem.frontline}
                  onChange={this.handleChange}
                />
                Frontline
              </Label>
            </FormGroup>
          </Form>



        </ModalBody>
        <ModalFooter>
          {this.state.activeItem.first_name !=="" && this.state.activeItem.last_name !==""  ? (
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}

          >
            Save
          </Button>
              ) : null}
        </ModalFooter>
        </div>
      </Modal>
    );
  }
}