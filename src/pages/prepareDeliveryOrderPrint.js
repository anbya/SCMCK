import React, { Component } from "react";
import queryString from 'query-string';
import '../potraitPrint.css';
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
import dataProductDummy from './dummyProductData';
import jgLogo from '../assets/img/icon.png';

class prepareDeliveryOrderPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportBody:true,
      dataHeader:[],
      dataRow:[],
      totalPO:0
    };
  }
  componentDidMount = () =>{
    let url = this.props.location.search;
    let params = queryString.parse(url);
    console.log(params.ID);
    const dataToSend = {
        ID: params.ID
    };
    axios
    .post(`https://api.jaygeegroupapp.com/centralkitchen/getOrderReport`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(async result => {
      await this.setState({
        ...this.state,
        dataHeader:result.data.dataOrderH
      });
      let dataLenght = result.data.orderList.length
      let dataPerPage = 20
      let dataLoop = Math.ceil(parseInt(dataLenght)/parseInt(dataPerPage))
      for (let i1 = 0; i1 < dataLoop; i1++) {
          let prmLoop = i1 + 1
          let prmStart = i1 * 1 * dataPerPage
          let prmEnd = prmLoop < dataLoop ? prmLoop * dataPerPage : dataLenght
          let arrayChildData = []
          for (let i2 = prmStart; i2 < prmEnd; i2++) {
              arrayChildData.push(result.data.orderList[i2])
          }
          let beginData = this.state.dataRow
          beginData.push(arrayChildData)
          this.setState({
              ...this.state,
              dataRow: beginData
          });
      }
    })
    .catch(error => {
      console.log(error);
      console.log(this.props);
    });
  }
  formatNumber = (num) =>  {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  render() {
    return (
      <div>
            {this.state.dataRow.length > 0 && this.state.dataRow.map((dummyDataRow1,index1) =>
                <Container style={{pageBreakAfter:"always",visibility:this.state.reportBody===true?"visible":"hidden"}}>
                  <Row>
                      <Col xs="9" sm="9" md="9">
                      </Col>
                      <Col xs="3" sm="3" md="3" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <img className="portoimage" width="60%" src={jgLogo} alt="jgLogo" />
                      </Col>
                  </Row>
                  <Row style={{marginTop:"30pt",marginBottom:"20pt"}}>
                      <Col style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <span style={{fontWeight:"bold",fontSize:"18pt"}}>Order Detail</span>
                      </Col>
                  </Row>
                  <Row style={{marginTop:"20pt",marginBottom:"20pt"}}>
                      <Col xs="6" sm="6" md="12">
                        <Row>
                          <Col xs="4" sm="4" md="3">
                            <span style={{fontSize:"12pt"}}>Order number</span>
                          </Col>
                          <Col xs="8" sm="8" md="9">
                            <span style={{fontSize:"12pt"}}>: {this.state.dataHeader[0].nomor_order}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="4" sm="4" md="3">
                            <span style={{fontSize:"12pt"}}>Order date</span>
                          </Col>
                          <Col xs="8" sm="8" md="9">
                            <span style={{fontSize:"12pt"}}>: {this.state.dataHeader[0].tanggal_buat_to_show}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="4" sm="4" md="3">
                            <span style={{fontSize:"12pt"}}>To</span>
                          </Col>
                          <Col xs="8" sm="8" md="9">
                            <span style={{fontSize:"12pt"}}>: {this.state.dataHeader[0].nama_outlet}</span>
                          </Col>
                        </Row>
                      </Col>
                  </Row>
                  <Row style={{marginTop:"20pt",marginBottom:"20pt"}}>
                      <Col style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <span style={{fontWeight:"regular",fontSize:"18pt"}}>Order list</span>
                      </Col>
                  </Row>
                  <Row style={{marginTop:"20pt",marginBottom:"0pt",minHeight:"40vh"}}>
                    <Col>
                      <Row>
                          <Col>
                              <Row>
                                  <Col xs="1" sm="1" md="1" style={{display:"flex",display:"-webkit-flex",justifyContent:"flex-start",alignItems:"center",border:"1pt solid #000000"}}><span style={{fontWeight:"bold",fontSize:"12pt"}}>NO.</span></Col>
                                  <Col xs="7" sm="7" md="7" style={{display:"flex",display:"-webkit-flex",justifyContent:"center",alignItems:"center",border:"1pt solid #000000"}}><span style={{fontWeight:"bold",fontSize:"12pt"}}>Nama barang</span></Col>
                                  <Col xs="2" sm="2" md="2" style={{display:"flex",display:"-webkit-flex",justifyContent:"center",alignItems:"center",border:"1pt solid #000000"}}><span style={{fontWeight:"bold",fontSize:"12pt"}}>QTY</span></Col>
                                  <Col xs="2" sm="2" md="2" style={{display:"flex",display:"-webkit-flex",justifyContent:"center",alignItems:"center",border:"1pt solid #000000"}}><span style={{fontWeight:"bold",fontSize:"12pt"}}>Satuan</span></Col>
                              </Row>
                          {this.state.dataRow[index1].length > 0 && this.state.dataRow[index1].map((dummyDataRow2,index2) =>
                              <Row key={index2}>
                                  <Col xs="1" sm="1" md="1" className={index2+1==this.state.dataRow[index1].length?"lastRowData":"rowData"}><span style={{fontSize:"12pt"}}>{index1*20+index2+1}</span></Col>
                                  <Col xs="7" sm="7" md="7" className={index2+1==this.state.dataRow[index1].length?"lastRowDataleft":"rowDataleft"}><span style={{fontSize:"12pt"}}>{dummyDataRow2.nama_barang}</span></Col>
                                  <Col xs="2" sm="2" md="2" className={index2+1==this.state.dataRow[index1].length?"lastRowData":"rowData"}><span style={{fontSize:"12pt"}}>{dummyDataRow2.qty_req}</span></Col>
                                  <Col xs="2" sm="2" md="2" className={index2+1==this.state.dataRow[index1].length?"lastRowDataright":"rowDataright"}><span style={{fontSize:"12pt"}}>{dummyDataRow2.satuan_barang}</span></Col>
                              </Row>
                          )}
                          </Col>
                      </Row>
                    </Col>
                  </Row>
                  {/* <Row>
                      <Col style={{height:"10vh",display:"flex",display:"-webkit-flex",justifyContent:"center",alignItems:"center"}}><span style={{fontSize:"2vh"}}>page {index1+1}/{this.state.dataRow.length}</span></Col>
                  </Row> */}
                </Container>
            )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    poid: state.reducer.poid,
  };
};

export default withRouter(connect(mapStateToProps)(prepareDeliveryOrderPrint));