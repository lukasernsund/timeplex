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
            tempSaveItem : this.props.tempSaveItem,
            deleteModalText : this.props.deleteModalText,
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
                {this.state.tempSaveItem.first_name !==undefined ? (
                <ModalHeader toggle={toggle}>Are you sure you want to delete {this.state.deleteModalText[0]} "{this.state.tempSaveItem.first_name} {this.state.tempSaveItem.last_name}" {this.state.deleteModalText[1]}?</ModalHeader>
                    ) :
                    <ModalHeader toggle={toggle}> Are you sure you want to delete  {this.state.deleteModalText[0]} "{this.state.tempSaveItem.date}" {this.state.deleteModalText[1]}?</ModalHeader> }
                <div className="inputEmployee">

                    <ModalFooter>
                            <Button
                                color="danger"
                                onClick={() => onSave(true)}
                            >
                                DELETE
                            </Button>
                        <Button
                            color="success"
                            onClick={() => toggle()}
                        >
                            CANCEL
                        </Button>
                    </ModalFooter>
                </div>
            </Modal>
        );
    }
}