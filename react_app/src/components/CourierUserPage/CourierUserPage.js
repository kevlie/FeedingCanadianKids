import React from "react";
import { Row, Col, Nav, Tab, Tabs } from "react-bootstrap";

import { withRouter } from "react-router-dom";
import WelcomeMessage from "./WelcomeMessage.js";
// import ProgramsPartners from "./ProgramsPartners.js";
import RestaurantPartners from "./RestaurantPartners.js";

class CourierUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "default"
    };
  }

  componentDidMount = () => {
    document.body.classList.add("hunnid");
    document.documentElement.classList.add("hunnid");

    fetch("http://localhost:9000/api/courieruserpage/name", {
      method: "get",

      credentials: "include"
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ name: json[0].name });
      });
  };

  componentWillUnmount() {
    document.body.classList.remove("hunnid");
    document.documentElement.classList.remove("hunnid");
  }

  render() {
    // console.log(this.state.approval_status);
    return (
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          <WelcomeMessage name={this.state.name} />
        </Tab>

        <Tab eventKey="restaurants" title="Your Restaurants">
          <RestaurantPartners />
        </Tab>
      </Tabs>

      // <div className="trial">
      //   <Tab.Container
      //     id="left-tabs-example"
      //     defaultActiveKey="first"
      //     className="no-scroll m-height"
      //   >
      //     <Row className="no-scroll m-height">
      //       <Col sm={2} className="pill-tabs-color m-height">
      //         <Nav variant="pills" className="flex-column pill-tabs">
      //           <Nav.Item>
      //             <Nav.Link eventKey="first">{this.state.email}</Nav.Link>
      //           </Nav.Item>
      //           <Nav.Item>
      //             <Nav.Link eventKey="second">Your Deliveries</Nav.Link>
      //           </Nav.Item>
      //           <Nav.Item>
      //             <Nav.Link eventKey="third">Your Partners</Nav.Link>
      //           </Nav.Item>
      //         </Nav>
      //       </Col>
      //       <Col sm={10} className="m-height">
      //         <Tab.Content className="m-height">
      //           <Tab.Pane eventKey="first" className="m-height">
      //             <WelcomeMessage email={this.state.email} />
      //           </Tab.Pane>

      //           <Tab.Pane eventKey="second" className="m-height">
      //             <div className="order-div">
      //               {/* <Orders email={this.state.email} /> */}
      //             </div>
      //           </Tab.Pane>
      //           <Tab.Pane eventKey="third" className="m-height">
      //             {/* <ProgramsPartners /> */}
      //           </Tab.Pane>
      //         </Tab.Content>
      //       </Col>
      //     </Row>
      //   </Tab.Container>
      // </div>
    );
  }
}

export default withRouter(CourierUserPage);
