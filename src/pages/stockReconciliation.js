import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../App.css";
import {
  InputGroup,
  InputGroupAddon,
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label
} from "reactstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import dataDummy from './dummyData'
import { HashLoader , ScaleLoader } from 'react-spinners';
import Select from 'react-select';

class stockReconciliation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // overlay state
      prmoverlay:false,
      // page state
      pagination:true,
      highlight:true,
      striped:false,
      loading:false,
      noHeader:true,
      fixedHeader:false,
      dataStockReconHeader:[],
      // edit state
      prmModaledit:false,
      detailDataSR:[],
      dataSRD:[]
    };
  }
  // page master function
  componentDidMount = () =>  {
    this.setState({
      ...this.state,
      loading:true,
    });
    axios
    .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/getStockReconHeader`)
    .then(result => {
      this.setState({
        ...this.state,
        dataStockReconHeader: result.data.dataStockReconH,
        loading:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  refreshPageData = () =>  {
    this.setState({
      ...this.state,
      loading:true,
    });
    let APIroute = localStorage.getItem("APIROUTE")
        axios
        .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/getUser`)
    .then(result => {
      this.setState({
        ...this.state,
        dataStockReconHeader: result.data.result,
        loading:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  // edit data function
  modalEditOpen = async (data) =>  {
    const dataToSend = {
      KODESR: data.kode_stock_recon_h
    };
    axios
    .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/getStockReconDetail`, dataToSend, {
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
    })
    .then( result => {
      this.setState({
        ...this.state,
        dataSRD:result.data.dataStockReconD,
        detailDataSR:data,
        prmModaledit: true
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  modalEditClose = () =>  {
    this.setState({
      ...this.state,
      prmModaledit: false,
      buttonEditPrm:false,
      buttonEditText:"Save",
      editkodeuser:"",
      editnikuser:"",
      editnamauser:"",
      editaksesuser:"",
      editpassuser:"",
      PRMeditPassoutlet:true,
    });
  }
  formatNumber = (num) =>  {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  render() {
    const DataButton = (data) => (
      <div>
        <button className="myBtn" onClick={()=> this.modalEditOpen(data)}><i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>
      </div>
    );
    const columns = [
      {
        name: 'Nomor Stock Recon',
        selector: 'nomor_stock_recon',
        sortable: true,
      },
      {
        name: 'Tanggal Stock Recon',
        selector: 'tanggal_stock_recon_to_show',
        sortable: true,
      },
      {
        name: 'Lokasi',
        selector: 'nama_outlet',
        sortable: true,
      },
      {
        name: 'Tool',
        button: true,
        cell: row => DataButton(row),
      },
    ];
    return (
      <div>
        <Modal isOpen={this.state.prmModaledit} backdrop={"static"} size="xl">
            <ModalHeader toggle={() => this.modalEditClose()}>Detail Stock Recon</ModalHeader>
            <ModalBody>
            <Row>
                <Col xs="12" sm="12" md="3">
                <span style={{fontWeight:"bold"}}>Stock Reconciliation number</span>
                </Col>
                <Col xs="12" sm="12" md="5">
                <span style={{fontWeight:"bold"}}>: {this.state.detailDataSR.nomor_stock_recon}</span>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="12" md="3">
                <span style={{fontWeight:"bold"}}>Stock Reconciliation date</span>
                </Col>
                <Col xs="12" sm="12" md="5">
                <span style={{fontWeight:"bold"}}>:  {this.state.detailDataSR.tanggal_stock_recon_to_show}</span>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="12" md="3">
                <span style={{fontWeight:"bold"}}>Outlet</span>
                </Col>
                <Col xs="12" sm="12" md="5">
                <span style={{fontWeight:"bold"}}>:  {this.state.detailDataSR.nama_outlet}</span>
                </Col>
            </Row>
            <Row className="bodyData">
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
                        {this.state.dataSRD.length > 0 && this.state.dataSRD.map((dataSRD,index) =>
                            <tr key={index}>
                                <td width="5%" style={{border:"1pt solid #000000"}}>
                                    <div style={styles.dataContainer}>
                                        <span style={styles.dataBodyText}>{index+1}</span>
                                    </div>
                                </td>
                                <td width="29%" style={{border:"1pt solid #000000"}}>
                                    <div style={styles.dataContainerLeft}>
                                        <span style={styles.dataBodyText}>{dataSRD.nama_barang}</span>
                                    </div>
                                </td>
                                <td width="10%" style={{border:"1pt solid #000000"}}>
                                    <div style={styles.dataContainer}>
                                        <span style={styles.dataBodyText}>{`${dataSRD.oh_hand_toshow} ${dataSRD.unit_barang}.${dataSRD.satuan_barang}`}</span>
                                    </div>
                                </td>
                                <td width="12%" style={{border:"1pt solid #000000"}}>
                                    <div style={styles.dataContainer}>
                                        <span style={styles.dataBodyText}>{`Rp ${this.formatNumber(dataSRD.oh_hand_stock_cost)}`}</span>
                                    </div>
                                </td>
                                <td width="10%" style={{border:"1pt solid #000000"}}>
                                    <div style={styles.dataContainer}>
                                        <span style={styles.dataBodyText}>{`${dataSRD.actual_stock_toshow} ${dataSRD.unit_barang}.${dataSRD.satuan_barang}`}</span>
                                    </div>
                                </td>
                                <td width="12%" style={{border:"1pt solid #000000"}}>
                                    <div style={styles.dataContainer}>
                                        <span style={styles.dataBodyText}>{`Rp ${this.formatNumber(dataSRD.actual_stock_cost)}`}</span>
                                    </div>
                                </td>
                                <td width="10%" style={{border:"1pt solid #000000"}}>
                                    <div style={styles.dataContainer}>
                                        <span style={styles.dataBodyText}>{`${dataSRD.diff_qty_toshow} ${dataSRD.unit_barang}.${dataSRD.satuan_barang}`}</span>
                                    </div>
                                </td>
                                <td width="12%" style={{border:"1pt solid #000000"}}>
                                    <div style={styles.dataContainer}>
                                        <span style={styles.dataBodyText}>{`Rp ${this.formatNumber(dataSRD.diff_qty_cost)}`}</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </table>
                </Col>
            </Row>
            </ModalBody>
        </Modal>
        <Container fluid={true} style={{paddingBottom:30}}>
          <Row>
            <Col xs="12" sm="12" md="12">
              <div className="card" style={{marginTop:15}}>
                <div className="card-header">
                  <Row>
                    <Col xs="10" sm="10" md="10" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                      <span style={{fontWeight:"bold"}}>Stock Reconciliation</span>
                    </Col>
                    <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                      <button className="myBtn" onClick={() =>  {this.props.history.push({pathname: "/formAddStockReconciliation"})}}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <DataTableExtensions
                      columns={columns}
                      data={this.state.dataStockReconHeader}
                      print={false}
                      exportHeaders={false}
                      export={false}
                  >
                    <DataTable
                      defaultSortField="title"
                      pagination={this.state.pagination}
                      highlightOnHover={this.state.highlight}
                      striped={this.state.striped}
                      progressPending={this.state.loading}
                      noHeader={this.state.noHeader}
                      fixedHeader={this.state.fixedHeader}
                      fixedHeaderScrollHeight="300px"
                    />
                  </DataTableExtensions>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
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
    anbyaBoilerplate: state.reducer.anbyaBoilerplate
  };
};

export default withRouter(connect(mapStateToProps)(stockReconciliation));