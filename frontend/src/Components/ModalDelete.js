import React, { Component } from "react";
import './ModalDelete.css';
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
            //deleteItem: this.props.deleteItem,
            //itemProps: this.props.itemProps
        };
    }

    /*delete = () => {
        console.log("inne i deleteKnapp")
        this.state.deleteItem = true;
    }*/

    render() {
        const {toggle, onSave} = this.props;

        return (

            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Are you sure you want to delete this employee?</ModalHeader>
                <div className="inputEmployee">

                    <ModalFooter>
                            <Button
                                color="danger"
                                onClick={() => onSave(true)}
                            >
                                YES
                            </Button>
                        <Button
                            color="success"
                            onClick={() => toggle()}
                        >
                            NO
                        </Button>
                    </ModalFooter>
                </div>
            </Modal>
        );
    }
}