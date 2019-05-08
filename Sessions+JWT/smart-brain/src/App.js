import React, { Component } from "react";

import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Modal from "./components/Modal/Modal";
import Particles from "react-particles-js";
import Profile from "./components/Profile/Profile";
import Rank from "./components/Rank/Rank";
import Register from "./components/Register/Register";
import Signin from "./components/Signin/Signin";

import "./App.css";

// normal local host server
//export const URL = "http://localhost:3000";
// docker-compose server
export const URL = "http://192.168.99.100:3000";

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
    pet: "",
    age: ""
  },
  avatarUrl: null
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = data => {
    this.setState(
      {
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined,
          pet: data.pet,
          age: data.age
        }
      },
      () => {
        this.setImageUrl();
      }
    );
  };

  setImageUrl = () => {
    fetch(
      `http://rankly-bucket-123456789.s3.amazonaws.com/${this.state.user.id}`
    )
      .then(response => {
        if (response.ok) {
          this.setState({
            avatarUrl: `http://rankly-bucket-123456789.s3.amazonaws.com/${
              this.state.user.id
            }`
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // 'Authorization': 'Bearer' + token
  componentDidMount() {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch(URL + "/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data && data.id) {
            fetch(`${URL}/profile/${data.id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: token
              }
            })
              .then(res => res.json())
              .then(user => {
                if (user && user.email) {
                  this.loadUser(user);
                  this.onRouteChange("home");
                }
              });
          }
        })
        .catch(console.log);
    }
  }

  // Official solution
  // Does not check to make sure we have a valid response with at least 1 face.
  // So breaks on 0 faces.
  calculateFaceLocations = data => {
    if (data && data.outputs) {
      return data.outputs[0].data.regions.map(face => {
        const clarifaiFace = face.region_info.bounding_box;
        const image = document.getElementById("inputimage");
        const width = Number(image.width);
        const height = Number(image.height);
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - clarifaiFace.right_col * width,
          bottomRow: height - clarifaiFace.bottom_row * height
        };
      });
    }
    return;
  };

  displayFaceBoxes = boxes => {
    if (boxes) {
      this.setState({ boxes: boxes });
    }
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch(URL + "/imageurl", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch(URL + "/image", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: window.sessionStorage.getItem("token")
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        // New multiple faces (my solution)
        this.displayFaceBoxes(this.calculateFaceLocations(response));
      })
      .catch(err => console.log(err));
  };

  onSignOut = () => {
    window.sessionStorage.removeItem("token");
    return this.setState({ ...initialState, route: "signin" });
  };

  onRouteChange = route => {
    if (route === "signout") {
      return this.onSignOut();
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }));
  };

  render() {
    const {
      avatarUrl,
      boxes,
      imageUrl,
      isProfileOpen,
      isSignedIn,
      user,
      route
    } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          avatarUrl={avatarUrl}
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          toggleModal={this.toggleModal}
        />
        {isProfileOpen && (
          <Modal>
            <Profile
              avatarUrl={avatarUrl}
              user={user}
              setImageUrl={this.setImageUrl}
              loadUser={this.loadUser}
              isProfileOpen={isProfileOpen}
              toggleModal={this.toggleModal}
            />
          </Modal>
        )}
        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
