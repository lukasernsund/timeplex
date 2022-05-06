import '../App.css';
import './Settings.css'
import axios from 'axios';
import React,{Component} from 'react';
import Form from 'react-bootstrap/Form'

class Settings extends Component {

    state = {

        // Initially, no file is selected
        selectedFileBEHOV: null,
        selectedFileTYPDAG: null
    };

    // On file select (from the pop up)
    onFileChangeBEHOV = event => {
        // Update the state
        this.setState({ selectedFileBEHOV: event.target.files[0] });
    };
    onFileChangeTYPDAG = event => {
        // Update the state
        this.setState({ selectedFileTYPDAG: event.target.files[0] });
    };

    // On file upload (click the upload button)
    onFileUploadBEHOV = () => {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFileBEHOV,
            this.state.selectedFileBEHOV.name
        );

        // Details of the uploaded file
        console.log(this.state.selectedFileBEHOV);

        // Request made to the backend api
        // Send formData object
        axios.post("api/uploadfileBEHOV", formData); //PATH TO DATABASE
    };
    onFileUploadTYPDAG = () => {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFileTYPDAG,
            this.state.selectedFileTYPDAG.name
        );

        // Details of the uploaded file
        console.log(this.state.selectedFileTYPDAG);

        // Request made to the backend api
        // Send formData object
        axios.post("api/uploadfileTYPDAG", formData); //PATH TO DATABASE
    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {
            return (
                <div>
                </div>
            );
        };

    render() {
        return (
            <div>
                <div>
                    <input type="file" onChange={this.onFileChangeBEHOV} />
                    <button className="btn btn-primary mt-5 mb-5 mr-5 ml-5 w-25" onClick={this.onFileUploadBEHOV}>
                        Upload Behovsschema .xls
                    </button>
                </div>
                <div>
                    <input type="file" onChange={this.onFileChangeTYPDAG} />
                    <button className="btn btn-primary mt-5 mb-5 mr-5 ml-5 w-25" onClick={this.onFileUploadTYPDAG}>
                        Upload Typdagar .xls
                    </button>
                </div>
                {this.fileData()}
            </div>
        );
    }
}
export default Settings;