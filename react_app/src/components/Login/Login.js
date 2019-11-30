import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { Form, Container } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import "./Login.css";
import { sign_in } from "../../redux/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import FeedingCKkids from "../../img/FeedingCK-kids.png";

const hash = require("object-hash");

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
      error: "",
      partnerType: ""
    };
  }

  render() {
    const loginApiCall = data => {
      if (this.state.isLoggedIn) {
        this.setState({
          error: "You are already logged in!"
        });
      } else {

        fetch("http://localhost:9000/api/auth/login", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(data)
        }).then(response => {
          if (response.status !== 200) {
            this.setState({ error: "Invalid Username or Password" });
          }
          response.json().then(resJSON => {
            if (resJSON.email) {
              let state = {
                isLoggedIn: true,
                email: resJSON.email,
                partnerType: resJSON.partnerType
              };
              this.setState(state);
              if (resJSON.partnerType === "program") {
                this.props.history.push("/programuserpage");
                window.location.reload();
              } else if (resJSON.partnerType === "restaurant") {
                this.props.history.push("/restaurantuserpage", state);
                window.location.reload();
              } else if (resJSON.partnerType === "courier") {
                this.props.history.push("/courieruserpage", state);
                window.location.reload();
              } else {
                this.props.history.push("/admin");
                window.location.reload();
              }
            } else {
              this.setState({
                error: "Unknown Error"
              });
            }
          });
        });
      }
    };

    const handleLogin = e => {
      e.preventDefault();
      loginApiCall({
        contactEmail: this.state.email,
        passwordHash: hash(this.state.password)
      });
    };

    const handleProgram = e => {
      e.preventDefault();
      this.props.history.push("/programRegistration");
    };

    const handleRestaurant = e => {
      e.preventDefault();
      this.props.history.push("/restaurantRegistration");
    };

    const handleCourier = e => {
      e.preventDefault();
      this.props.history.push("/courierRegistration");
    };

    return (
      <Container>
        <div className="page">
          <div className="card">
            <div className="loginForm">
              <h5>
                Interested in joining us as a Feeding Canadian Kids partner?
                That’s great! Whether you’re a program in need of meals, a
                restaurant able to donate meals or a courier hoping to connect the
                two. You’re at the right place!
              </h5>
              <br></br>
              <em>
                If you already have a Feeding Canadian Kids profile, please log in
                with your credentials.
              </em>
              <br></br>
              <p className="error">{this.state.error}</p>

              {/*previous implementation*/}
              {/* <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    autoFocus
                    type="text"
                    placeholder="Enter your email"
                    value={this.state.email}
                    onChange={e => {
                      this.setState({
                        email: e.target.value.toString()
                      });
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={e => {
                      this.setState({
                        password: e.target.value.toString()
                      });
                    }}
                  />
                </Form.Group>  */}

              <div>
                <TextField
                  name="email"
                  label="Email"
                  margin="normal"
                  className="textfield"
                  value={this.state.email}
                  onChange={e => {
                    this.setState({
                      email: e.target.value.toString()
                    });
                  }}
                />

                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  margin="normal"
                  className="textfield"
                  value={this.state.password}
                  onChange={e => {
                    this.setState({
                      password: e.target.value.toString()
                    });
                  }}
                />
              </div>
              <Button
                variant="contained"
                type="submit"
                className="loginButton"
                style={{
                  marginTop: "10px",
                  marginBottom: "10px"
                }}
                onClick={handleLogin}
              >
                Login
                </Button>
              <br></br>
              <div className="buttonGroup">
                <Button
                  variant="outlined"
                  size="small"
                  type="submit"
                  className="registerButton"
                  onClick={handleProgram}
                >
                  Register as a Program
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  type="submit"
                  className="registerButton"
                  onClick={handleRestaurant}
                >
                  Register as a Restaurant
                </Button>
                <Button
                  variant="outlined"
                  type="submit"
                  size="small"
                  className="registerButton"
                  onClick={handleCourier}>
                  Register as a Courier
                </Button>
              </div>
              {/* </Form> */}
            </div>
          </div>
          <div className="FCKimg">
            <img src={FeedingCKkids} />
          </div>
        </div>
      </Container>
    );
  }
}

/* BELOW IS THE ORIGINAL IMPLEMENTATION USING REDUX */

// const mapStateToProps = state => {
//   return {
//     isLoggedIn: state.isLoggedIn
//   };
// };

// const hash = require("object-hash");

// function Login_(props) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const loginApiCall = data => {
//     fetch("http://localhost:9000/api/auth/login", {
//       method: "post",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//       },
//       credentials: "include",
//       body: JSON.stringify(data)
//     }).then(res => {
//       if (res.status === 200) {
//         props.dispatch(sign_in());
//         props.history.push("/");
//       } else {
//         setError("Error");
//       }
//     });
//   };

//   function handleLogin(e) {
//     e.preventDefault();
//     loginApiCall({ contactEmail: email, passwordHash: hash(password) });
//   }

//   function handleProgram(e) {
//     e.preventDefault();
//     props.history.push("/programRegistration");
//   }

//   function handleRestaurant(e) {
//     e.preventDefault();
//     props.history.push("/restaurantRegistration");
//   }

//   return (
//     <div className="page">
//       <div className="loginForm">
//         <h5>
//           Interested in joining us as a Feeding Canadian Kids partner? That’s
//           great! Whether you’re a program in need of meals, a restaurant able to
//           donate meals or a courier hoping to connect the two. You’re at the
//           right place!
//         </h5>
//         <br></br>
//         <em>
//           If you already have a Feeding Candian Kids profile, please log in with
//           your credentials.
//         </em>
//         <br></br>
//         <p className="error">{error}</p>
//         <Form>
//           <Form.Group controlId="formBasicEmail">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               autoFocus
//               type="text"
//               placeholder="Enter your email"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//             />
//           </Form.Group>

//           <Button
//             style={{ marginBottom: "20px" }}
//             variant="primary"
//             type="submit"
//             onClick={handleLogin}
//           >
//             Login
//           </Button>
//           <br></br>
//           <Button
//             style={{ marginRight: "20px" }}
//             variant="primary"
//             type="submit"
//             onClick={handleProgram}
//           >
//             Register as a Program
//           </Button>
//           <Button variant="primary" type="submit" onClick={handleRestaurant}>
//             Register as a Restaurant
//           </Button>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default withRouter(connect(mapStateToProps)(Login_));
export default withRouter(Login);
