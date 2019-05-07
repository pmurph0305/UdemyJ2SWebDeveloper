import React from "react";

import { URL } from "../../App";

import "./Profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      age: this.props.user.age,
      pet: this.props.user.pet,
      iconUrl: this.props.user.url
    };
  }

  onFormChange = event => {
    switch (event.target.name) {
      case "user-name":
        this.setState({ name: event.target.value });
        break;
      case "user-age":
        this.setState({ age: event.target.value });
        break;
      case "user-pet":
        this.setState({ pet: event.target.value });
        break;
      case "user-icon":
      this.setState({ iconUrl: event.target.value });
      break;
      default:
        return;
    }
  };

  onProfileImageUpload = (url) => {
    // make sure the image ends with appropriate image format...
    if (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.gif')) {
      // trigger lamda function that uploads image to S3 bucket.
      // this.props.user.id & this.state.iconUrl
      fetch(` https://a7vsyjj388.execute-api.us-east-1.amazonaws.com/prod/profileIcon?userId=${this.props.user.id}&imageUrl=${this.state.iconUrl}`, {
        method: "POST"
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log('err', err))
    }
  }


  onProfileUpdate = data => {
    fetch(`${URL}/profile/${this.props.user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token")
      },
      body: JSON.stringify({ formInput: data })
    })
      .then(response => {
        if (response.status === 200 || response.status === 304) {
          this.props.toggleModal();
          this.props.loadUser({
            ...this.props.user,
            ...data
          });
        }
      })
      .catch(console.log);
  };

  render() {
    const { user } = this.props;
    const { name, age, pet, iconUrl } = this.state;
    return (
      <div className="profile-modal">
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
          <main className="pa4 black-80 w-80">
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="h3 w3 dib"
              alt="avatar"
            />
            <h1>{this.state.name}</h1>
            <h4>{`Images submitted: ${user.entries}`}</h4>
            <p>{`Member since: ${new Date(
              user.joined
            ).toLocaleDateString()}`}</p>
            <hr />
            <label className="mt2 fw6 w-100" htmlFor="user-name">
              Icon:
            </label>
            <input
              className="pa2 ba w-70"
              placeholder={user.iconUrl}
              type="text"
              name="user-icon"
              id="icon"
              onChange={this.onFormChange}
            />
            <button
                className="b pa2 grow pointer hover-white w-30 bg-light-green b--black-20"
                onClick={() => this.onProfileImageUpload(iconUrl)}
              >
                Upload
              </button>
            <label className="mt2 fw6" htmlFor="user-name">
              Name:
            </label>
            <input
              className="pa2 ba w-100"
              placeholder={user.name}
              type="text"
              name="user-name"
              id="name"
              onChange={this.onFormChange}
            />
            <label className="mt2 fw6" htmlFor="user-age">
              Age:
            </label>
            <input
              className="pa2 ba w-100"
              placeholder={user.age}
              type="text"
              name="user-age"
              id="age"
              onChange={this.onFormChange}
            />
            <label className="mt2 fw6" htmlFor="user-pet">
              Pet:
            </label>
            <input
              className="pa2 ba w-100"
              placeholder={user.pet}
              type="text"
              name="user-pet"
              id="pet"
              onChange={this.onFormChange}
            />
            <div
              className="mt4"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                onClick={() => this.onProfileUpdate({ name, age, pet })}
              >
                Save
              </button>
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                onClick={this.props.toggleModal}
              >
                Cancel
              </button>
            </div>
          </main>
          <div className="modal-close" onClick={this.props.toggleModal}>
            &times;
          </div>
        </article>
      </div>
    );
  }
}

export default Profile;
