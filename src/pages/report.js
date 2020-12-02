import React, { Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import scrollToComponent from 'react-scroll-to-component';
import "../App.css";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from "reactstrap";
import Navbarpage from "./navbar";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';


class reportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        prmModalInventoryBreakdown:false,
    };
  }
  // inventory breakdown function
  modalCurrentStockOpen = () =>  {
    this.setState({
        ...this.state,
        prmModalInventoryBreakdown: true
    });
  }
  modalCurrentStockClose = () =>  {
    this.setState({
        ...this.state,
        prmModalInventoryBreakdown: false
    });
  }
  // inventory breakdown function
  render() {
    return (
      <div>
        <Modal isOpen={this.state.prmModalInventoryBreakdown} backdrop={"static"} size="xl">
            <ModalHeader toggle={() => this.modalCurrentStockClose()}>Current stock</ModalHeader>
            <ModalBody>
            </ModalBody>
            <ModalFooter>
            <Button color="success" onClick={() => window.open("http://localhost:3000/testreport", "_blank")}>Open Report</Button>
            <Button color="danger" onClick={() => this.modalCurrentStockClose()}>Cancel</Button>
            </ModalFooter>
        </Modal>
        <Container fluid={true} style={{paddingBottom:30}}>
            <Row>
              <Col xs="12" sm="12" md="12">
                <div className="card" style={{marginTop:15}}>
                  <div className="card-header">
                    <Row>
                      <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                        <span style={{fontWeight:"bold"}}>Report list</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="card-body" style={{minHeight:"55vh"}}>
                    <Button color="secondary" block={true} onClick={() => this.modalCurrentStockOpen()}>Current stock</Button>
                    <Button color="secondary" block={true} onClick={() => window.open("http://localhost:3000/purchaseOrderPrint", "_blank")}>Report 2</Button>
                    <Button color="secondary" block={true}>Report 3</Button>
                    <Button color="secondary" block={true}>Report 4</Button>
                    <Button color="secondary" block={true}>Report 5</Button>
                    <Button color="secondary" block={true}>Report 6</Button>
                  </div>
                </div>
              </Col>
            </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    aksespage: state.reducer.aksespage,
    userinfo: state.reducer.userinfo
  };
};

export default withRouter(connect(mapStateToProps)(reportPage));