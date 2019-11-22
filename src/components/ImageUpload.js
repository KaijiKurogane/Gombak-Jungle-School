import React, { Component } from 'react';
import {myFirebase} from '../firebase/firebase';
import FileUploader from "react-firebase-file-uploader";

export default class ImageUpload extends Component {
  state = {
    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    myFirebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };
  
  render() {
    return (
      <div className='container'>
        <div>
          <form>
            {/* <label>Username:</label>
              <input
                type="text"
                value={this.state.username}
                name="username"
                onChange={this.handleChangeUsername}
              />
              <label>Avatar:</label> */}
            <div>
              {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
            </div>
            <br/>
            <div>
              {this.state.avatarURL && <img src={this.state.avatarURL} alt="Uploaded Images" />}
            </div>
            <br/>
            <FileUploader
              accept="image/*"
              name="avatar"
              Filename="filename"
              storageRef={myFirebase.storage().ref("images")}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
          </form>
        </div>
      </div>
    );
  }
}
