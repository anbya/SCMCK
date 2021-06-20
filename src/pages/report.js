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
  Col,
  Input,
  FormGroup,
  Label
} from "reactstrap";
import Navbarpage from "./navbar";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';


class reportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        prmModalInventoryBreakdown:false,
        // rpt1
        yearPRMrpt1:'',
        monthPRMrpt1:'',
        // rpt1
    };
  }
  handleChange = event =>  {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }
  // inventory breakdown function
  modalInvBreakdownOpen = () =>  {
    this.setState({
        ...this.state,
        prmModalInventoryBreakdown: true
    });
  }
  modalInvBreakdownClose = () =>  {
    this.setState({
        ...this.state,
        prmModalInventoryBreakdown: false,
        yearPRMrpt1:'',
        monthPRMrpt1:''
    });
  }
    invBreakdownRPT=()=>{
        if(this.state.yearPRMrpt1 != '' && this.state.monthPRMrpt1 != ''){
            window.open(`${process.env.REACT_APP_PRINT}/InvBreakdownRPT?YEAR=${this.state.yearPRMrpt1}&MONTH=${this.state.monthPRMrpt1}`, "_blank")
            this.modalInvBreakdownClose()
        } else {
            alert("Tahun atau bulan tidak boleh kosong")
        }
    }
  // inventory breakdown function
  render() {
    return (
      <div>
        <Modal isOpen={this.state.prmModalInventoryBreakdown} backdrop={"static"} size="xl">
            <ModalHeader toggle={() => this.modalInvBreakdownClose()}>Inventory stock breakdown</ModalHeader>
            <ModalBody>
                <FormGroup>
                  <Label for="yearPRMrpt1">Tahun</Label>
                  <Input type="select" name="yearPRMrpt1" id="yearPRMrpt1" value={this.state.yearPRMrpt1}  onChange={this.handleChange}>
                    <option value="">Pilih tahun</option>
                    <option value="2021">2021</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="monthPRMrpt1">Bulan</Label>
                  <Input type="select" name="monthPRMrpt1" id="monthPRMrpt1" value={this.state.monthPRMrpt1}  onChange={this.handleChange}>
                    <option value="">Pilih bulan</option>
                    <option value="01">Januari</option>
                    <option value="02">Februari</option>
                    <option value="03">Maret</option>
                    <option value="04">April</option>
                    <option value="05">Mei</option>
                    <option value="06">Juni</option>
                    <option value="07">Juli</option>
                    <option value="08">Agustus</option>
                    <option value="09">September</option>
                    <option value="10">Oktober</option>
                    <option value="11">November</option>
                    <option value="12">Desember</option>
                  </Input>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
            <Button color="success" onClick={() => this.invBreakdownRPT()}>Open Report</Button>
            <Button color="danger" onClick={() => this.modalInvBreakdownClose()}>Cancel</Button>
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
                    <Button color="secondary" block={true} onClick={() => this.modalInvBreakdownOpen()}>Inventory stock breakdown</Button>
                    {/* <Button color="secondary" block={true} onClick={() => window.open("http://localhost:3000/purchaseOrderPrint", "_blank")}>Report 2</Button> */}
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