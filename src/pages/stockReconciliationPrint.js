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
      dataHeader:[{
        kode_stock_recon_h:``,
        nomor_stock_recon:``,
        tanggal_stock_recon:``,
        tanggal_stock_recon_to_show:``,
        id_outlet:``,
        nama_outlet:``,
        create_user:``,
        create_date:``
    }],
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
    .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/getStockReconciliationReport`, dataToSend, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
    .then(async result => {
      await this.setState({
        ...this.state,
        dataHeader:result.data.dataStockReconH
      });
      let dataLenght = result.data.dataStockReconD.length
      let dataPerPage = 20
      let dataLoop = Math.ceil(parseInt(dataLenght)/parseInt(dataPerPage))
      for (let i1 = 0; i1 < dataLoop; i1++) {
          let prmLoop = i1 + 1
          let prmStart = i1 * 1 * dataPerPage
          let prmEnd = prmLoop < dataLoop ? prmLoop * dataPerPage : dataLenght
          let arrayChildData = []
          for (let i2 = prmStart; i2 < prmEnd; i2++) {
              arrayChildData.push(result.data.dataStockReconD[i2])
          }
          let beginData = this.state.dataRow
          beginData.push(arrayChildData)
          this.setState({
              ...this.state,
              dataRow: beginData
          });
      }
      console.log(this.state.dataHeader);
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
            {
                this.state.dataRow.length > 0?
                this.state.dataRow.length > 0 && this.state.dataRow.map((dummyDataRow1,index1) =>
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
                            <span style={{fontWeight:"bold",fontSize:"18pt"}}>Stock Reconciliation Report</span>
                        </Col>
                    </Row>
                    <Row style={{marginTop:"20pt",marginBottom:"20pt"}}>
                        <Col xs="6" sm="6" md="12">
                            <table>
                                <tr>
                                    <td>
                                        <div>
                                            <span>Stock Reconciliation number</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <span> : {this.state.dataHeader[0].nomor_stock_recon}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <span>Stock Reconciliation date</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <span> : {this.state.dataHeader[0].tanggal_stock_recon_to_show}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <span>Outlet</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <span> : {this.state.dataHeader[0].nama_outlet}</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </Col>
                    </Row>
                    <Row style={{marginTop:"20pt",marginBottom:"0pt",minHeight:"40vh"}}>
                        <Col>
                            <table width="100%">
                                <tr>
                                    <td width="5%" style={{border:"1pt solid #000000"}}>
                                        <div style={styles.dataContainer}>
                                            <span style={styles.dataHeaderText}>NO.</span>
                                        </div>
                                    </td>
                                    <td width="29%" style={{border:"1pt solid #000000"}}>
                                        <div style={styles.dataContainerLeft}>
                                        <span style={styles.dataHeaderText}>Nama barang</span>
                                        </div>
                                    </td>
                                    <td width="10%" style={{border:"1pt solid #000000"}}>
                                        <div style={styles.dataContainer}>
                                        <span style={styles.dataHeaderText}>OnHand Qty</span>
                                        </div>
                                    </td>
                                    <td width="12%" style={{border:"1pt solid #000000"}}>
                                        <div style={styles.dataContainer}>
                                        <span style={styles.dataHeaderText}>OnHand Cost</span>
                                        </div>
                                    </td>
                                    <td width="10%" style={{border:"1pt solid #000000"}}>
                                        <div style={styles.dataContainer}>
                                        <span style={styles.dataHeaderText}>Actual Qty</span>
                                        </div>
                                    </td>
                                    <td width="12%" style={{border:"1pt solid #000000"}}>
                                        <div style={styles.dataContainer}>
                                        <span style={styles.dataHeaderText}>Actual Cost</span>
                                        </div>
                                    </td>
                                    <td width="10%" style={{border:"1pt solid #000000"}}>
                                        <div style={styles.dataContainer}>
                                        <span style={styles.dataHeaderText}>Diff Qty</span>
                                        </div>
                                    </td>
                                    <td width="12%" style={{border:"1pt solid #000000"}}>
                                        <div style={styles.dataContainer}>
                                        <span style={styles.dataHeaderText}>Diff Cost</span>
                                        </div>
                                    </td>
                                </tr>
                                {this.state.dataRow[index1].length > 0 && this.state.dataRow[index1].map((dummyDataRow2,index2) =>
                                    <tr key={index2}>
                                        <td width="5%" style={{border:"1pt solid #000000"}}>
                                            <div style={styles.dataContainer}>
                                                <span style={styles.dataBodyText}>{index1*20+index2+1}</span>
                                            </div>
                                        </td>
                                        <td width="29%" style={{border:"1pt solid #000000"}}>
                                            <div style={styles.dataContainerLeft}>
                                                <span style={styles.dataBodyText}>{dummyDataRow2.nama_barang}</span>
                                            </div>
                                        </td>
                                        <td width="10%" style={{border:"1pt solid #000000"}}>
                                            <div style={styles.dataContainer}>
                                                <span style={styles.dataBodyText}>{`${dummyDataRow2.oh_hand_toshow} ${dummyDataRow2.unit_barang}.${dummyDataRow2.satuan_barang}`}</span>
                                            </div>
                                        </td>
                                        <td width="12%" style={{border:"1pt solid #000000"}}>
                                            <div style={styles.dataContainer}>
                                                <span style={styles.dataBodyText}>{`Rp ${this.formatNumber(dummyDataRow2.oh_hand_stock_cost)}`}</span>
                                            </div>
                                        </td>
                                        <td width="10%" style={{border:"1pt solid #000000"}}>
                                            <div style={styles.dataContainer}>
                                                <span style={styles.dataBodyText}>{`${dummyDataRow2.actual_stock_toshow} ${dummyDataRow2.unit_barang}.${dummyDataRow2.satuan_barang}`}</span>
                                            </div>
                                        </td>
                                        <td width="12%" style={{border:"1pt solid #000000"}}>
                                            <div style={styles.dataContainer}>
                                                <span style={styles.dataBodyText}>{`Rp ${this.formatNumber(dummyDataRow2.actual_stock_cost)}`}</span>
                                            </div>
                                        </td>
                                        <td width="10%" style={{border:"1pt solid #000000"}}>
                                            <div style={styles.dataContainer}>
                                                <span style={styles.dataBodyText}>{`${dummyDataRow2.diff_qty_toshow} ${dummyDataRow2.unit_barang}.${dummyDataRow2.satuan_barang}`}</span>
                                            </div>
                                        </td>
                                        <td width="12%" style={{border:"1pt solid #000000"}}>
                                            <div style={styles.dataContainer}>
                                                <span style={styles.dataBodyText}>{`Rp ${this.formatNumber(dummyDataRow2.diff_qty_cost)}`}</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </table>
                        </Col>
                    </Row>
                    <Row style={{marginTop:"8vh",visibility:this.state.reportBody===false?"hidden":index1+1 === parseInt(this.state.dataRow.length)?"visible":"hidden"}}>
                        <Col>
                            <Row>
                                <Col xs="6" sm="6" md="6">
                                <Row>
                                    <Col xs="6" sm="6" md="6" style={{display:"flex",justifyContent:"center",alignItems:"center",border:"1pt solid #000000"}}><span style={{fontSize:"12pt"}}>Dibuat,</span></Col>
                                    <Col xs="6" sm="6" md="6" style={{display:"flex",justifyContent:"center",alignItems:"center",border:"1pt solid #000000"}}><span style={{fontSize:"12pt"}}>Disetujui,</span></Col>
                                </Row>
                                <Row>
                                    <Col xs="6" sm="6" md="6" style={{minHeight:"150pt",border:"1pt solid #000000"}}></Col>
                                    <Col xs="6" sm="6" md="6" style={{minHeight:"150pt",border:"1pt solid #000000"}}></Col>
                                </Row>
                                <Row>
                                    <Col xs="6" sm="6" md="6" style={{display:"flex",justifyContent:"center",alignItems:"center",border:"1pt solid #000000"}}><span style={{fontSize:"12pt"}}>Admin</span></Col>
                                    <Col xs="6" sm="6" md="6" style={{display:"flex",justifyContent:"center",alignItems:"center",border:"1pt solid #000000"}}><span style={{fontSize:"12pt"}}>Head Central Kitchen</span></Col>
                                </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                ):
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
                            <span style={{fontWeight:"bold",fontSize:"18pt"}}>Stock Reconciliation Report</span>
                        </Col>
                    </Row>
                    <Row style={{marginTop:"20pt",marginBottom:"20pt"}}>
                        <Col xs="6" sm="6" md="12">
                            <table>
                                <tr>
                                    <td>
                                        <div>
                                            <span>Stock Reconciliation number</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <span> : {this.state.dataHeader[0].nomor_stock_recon}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <span>Stock Reconciliation date</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <span> : {this.state.dataHeader[0].tanggal_stock_recon_to_show}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <span>Outlet</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <span> : {this.state.dataHeader[0].nama_outlet}</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </Col>
                    </Row>
                    <Row style={{marginTop:"20pt",marginBottom:"0pt",minHeight:"40vh"}}>
                        <Col>
                        </Col>
                    </Row>
                    <Row style={{marginTop:"8vh",visibility:"visible"}}>
                        <Col>
                            <Row>
                                <Col xs="6" sm="6" md="6">
                                <Row>
                                    <Col xs="6" sm="6" md="6" style={{display:"flex",justifyContent:"center",alignItems:"center",border:"1pt solid #000000"}}><span style={{fontSize:"12pt"}}>Dibuat,</span></Col>
                                    <Col xs="6" sm="6" md="6" style={{display:"flex",justifyContent:"center",alignItems:"center",border:"1pt solid #000000"}}><span style={{fontSize:"12pt"}}>Disetujui,</span></Col>
                                </Row>
                                <Row>
                                    <Col xs="6" sm="6" md="6" style={{minHeight:"150pt",border:"1pt solid #000000"}}></Col>
                                    <Col xs="6" sm="6" md="6" style={{minHeight:"150pt",border:"1pt solid #000000"}}></Col>
                                </Row>
                                <Row>
                                    <Col xs="6" sm="6" md="6" style={{display:"flex",justifyContent:"center",alignItems:"center",border:"1pt solid #000000"}}><span style={{fontSize:"12pt"}}>Admin</span></Col>
                                    <Col xs="6" sm="6" md="6" style={{display:"flex",justifyContent:"center",alignItems:"center",border:"1pt solid #000000"}}><span style={{fontSize:"12pt"}}>Head Central Kitchen</span></Col>
                                </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            }
      </div>
    );
  }
}

const styles = {
    dataContainer:{
        display:"flex",
        display:"-webkit-flex",
        justifyContent:"center",
        alignItems:"center"
    },
    dataContainerLeft:{
        display:"flex",
        display:"-webkit-flex",
        justifyContent:"flex-start",
        alignItems:"center",
        paddingLeft:10
    },
    dataHeaderText:{
        fontWeight:"bold",
        fontSize:"10pt",
        textAlign:"center"
    },
    dataBodyText:{
        fontWeight:"bold",
        fontSize:"8pt",
        textAlign:"center"
    },
}

const mapStateToProps = (state) => {
  return {
    poid: state.reducer.poid,
  };
};

export default withRouter(connect(mapStateToProps)(prepareDeliveryOrderPrint));