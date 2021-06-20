import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../App.css";
import {
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
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import Select from 'react-select';
import { HashLoader , ScaleLoader } from 'react-spinners';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class returnToVendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        buttonProcessPrm:false,
        filterKey:"",
        dataBarang:[],
        loading:false
    };
    this.baseState = {
        buttonProcessPrm:false,
        filterKey:"",
        dataBarang:[],
        loading:false
    };
  }
  componentDidMount = () =>  {
    this.setState({
      ...this.state,
      loading:true
    });
    axios
    .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/getStockReconciliationData`)
    .then(result => {
      this.setState({
        ...this.state,
        dataBarang: result.data.dataStockReconciliation,
        loading:false
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  handleChange = event =>  {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }
  handleChangeunitStockRecon = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.dataBarang
    let unitSend = event.target.value==""?0:parseInt(event.target.value)
    let satuanSend = daftarBarang[IdData].qtySatuanStockAfterRecon==""?0:parseInt(daftarBarang[IdData].qtySatuanStockAfterRecon)
    daftarBarang[IdData].qtyUnitStockAfterRecon=event.target.value
    daftarBarang[IdData].qtyStockAfterRecon=parseInt(satuanSend)+(parseInt(unitSend)*parseInt(daftarBarang[IdData].conversi_satuan))
    this.setState({
        ...this.state,
        dataBarang: daftarBarang
    });
  }
  handleChangesatuanStockRecon = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.dataBarang
    let maxSatuan = parseInt(daftarBarang[IdData].conversi_satuan)-1
    if(event.target.value>maxSatuan){
      alert("angka yang anda input melebihi batas satuan")
    } else{
      let unitSend = daftarBarang[IdData].qtyUnitStockAfterRecon==""?0:parseInt(daftarBarang[IdData].qtyUnitStockAfterRecon)
      let satuanSend = event.target.value==""?0:parseInt(event.target.value)
      daftarBarang[IdData].qtySatuanStockAfterRecon=event.target.value
      daftarBarang[IdData].qtyStockAfterRecon=parseInt(satuanSend)+(parseInt(unitSend)*parseInt(daftarBarang[IdData].conversi_satuan))
      this.setState({
        ...this.state,
        dataBarang: daftarBarang
      });
    }
  }
  submitData = async () => {
    let PRMOUTLET = localStorage.getItem("outletID")
    let finalDataStock = await this.processFinalStockRecon(this.state.dataBarang)
    const dateToForm = moment().format("YYYY-MM-DD HH:mm:ss")
    const dataToSend = {
        PRMOUTLET: PRMOUTLET,
        DATASTOCK: finalDataStock,
        DETAILSTOCKRECON: this.state.dataBarang,
        USER:this.props.userinfo.id_user,
        TANGGALSR: dateToForm
    };
    this.setState({
      ...this.state,
      buttonAddPrm:true,
      buttonAddText:"",
      loading:true
    });
    // console.log(dataToSend);
    axios
    .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/processStockReconciliation`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(async result => {
      await this.setState({
        ...this.state,
        buttonAddPrm:false,
        buttonAddText:"Save",
        loading:false
      });
      alert("Stock reconciliation berhasil diproses")
      window.open(`${process.env.REACT_APP_PRINT}/stockReconciliationPrint?ID=${result.data.kodeSR}`, "_blank")
      this.props.history.push({pathname: "/stokrecon"})
    })
    .catch(error => {
      console.log(error);
      console.log(this.props);
    });
  }
  processFinalStockRecon = (data) =>  {
      let dataToProcess = data
      let dataFinal = []
      let dataFinalPlus = []
      let dataFinalMin = []
      for(let i=0;i<dataToProcess.length;i++){
        parseInt(dataToProcess[i].qty_in_inventory)>parseInt(dataToProcess[i].qtyStockAfterRecon) && dataFinalMin.push(dataToProcess[i])
        parseInt(dataToProcess[i].qty_in_inventory)<parseInt(dataToProcess[i].qtyStockAfterRecon) && dataFinalPlus.push(dataToProcess[i])
      }
      dataFinal.push({dataFinalPlus:dataFinalPlus,dataFinalMin:dataFinalMin})
      return dataFinal
  }
  render() {
    return (
      <div>
        <div style={{visibility:this.state.loading==true?"visible":"hidden"}}>
            <div className="overlayMask">
            <ScaleLoader
                height={90}
                width={20}
                radius={10}
                margin={10}
                color={'#ffffff'}
                loading={this.state.loading == true?true:false}
            />
            </div>
        </div>
        <Container fluid={true} style={{paddingBottom:30}}>
          <Row>
            <Col xs="12" sm="12" md="12">
              <div className="card" style={{marginTop:15}}>
                <div className="card-header">
                  <Row>
                    <Col xs="12" sm="12" md="8" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                      <span style={{fontWeight:"bold"}}>Stock Reconciliation Form</span>
                    </Col>
                    <Col xs="12" sm="12" md="4" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                        <InputGroup>
                            <Input type="text" name="filterKey" id="filterKey" value={this.state.filterKey} onChange={this.handleChange} />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>
                                    <i className="fa fa-filter" aria-hidden="true"></i>Filter
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                    <Row>
                        <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                            <span style={{fontWeight:"bold"}}>{`Kode Barang`}</span>
                        </Col>
                        <Col xs="4" sm="4" md="4" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                            <span style={{fontWeight:"bold"}}>{`Nama Barang`}</span>
                        </Col>
                        <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <span style={{fontWeight:"bold"}}>{`On Stock`}</span>
                        </Col>
                        <Col xs="2" sm="2" md="4" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <span style={{fontWeight:"bold"}}>{`Actual Stock`}</span>
                        </Col>
                    </Row>
                    <Row className="bodyDataStockRecon">
                        <Col>
                            {this.state.dataBarang.length > 0 && this.state.dataBarang.map((dataBarang,index) =>
                            this.state.filterKey!=""?dataBarang.nama_barang.includes(this.state.filterKey) == true &&
                            <Row style={{paddingTop:5,paddingBottom:5}} key={index}>
                                <Col>
                                    <div className="card">
                                        <div className="card-body">
                                            <Row>
                                                <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                                                    <span style={{fontWeight:"bold"}}>{`${dataBarang.kode_barang}`}</span>
                                                </Col>
                                                <Col xs="4" sm="4" md="4" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                                                    <span style={{fontWeight:"bold"}}>{`${dataBarang.nama_barang}`}</span>
                                                </Col>
                                                <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                                    <span style={{fontWeight:"bold"}}>{`${dataBarang.qtyInvToShow} ${dataBarang.unit_barang}.${dataBarang.satuan_barang}`}</span>
                                                </Col>
                                                <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                                    <InputGroup>
                                                        <Input type="number" name={`${index}`} id={`${index}`} value={dataBarang.qtyUnitStockAfterRecon} onChange={this.handleChangeunitStockRecon} min="0" />
                                                        <InputGroupAddon addonType="append">
                                                            <InputGroupText><span style={{fontWeight:"bold"}}>{dataBarang.unit_barang}</span></InputGroupText>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </Col>
                                                <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                                    <InputGroup>
                                                        <Input type="number" name={`${index}`} id={`${index}`} value={dataBarang.qtySatuanStockAfterRecon} onChange={this.handleChangesatuanStockRecon} min="0" max={dataBarang.conversi_satuan-1} />
                                                        <InputGroupAddon addonType="append">
                                                            <InputGroupText><span style={{fontWeight:"bold"}}>{dataBarang.satuan_barang}</span></InputGroupText>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            :
                            <Row style={{paddingTop:5,paddingBottom:5}} key={index}>
                                <Col>
                                    <div className="card">
                                        <div className="card-body">
                                            <Row>
                                                <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                                                    <span style={{fontWeight:"bold"}}>{`${dataBarang.kode_barang}`}</span>
                                                </Col>
                                                <Col xs="4" sm="4" md="4" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                                                    <span style={{fontWeight:"bold"}}>{`${dataBarang.nama_barang}`}</span>
                                                </Col>
                                                <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                                    <span style={{fontWeight:"bold"}}>{`${dataBarang.qtyInvToShow} ${dataBarang.unit_barang}.${dataBarang.satuan_barang}`}</span>
                                                </Col>
                                                <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                                    <InputGroup>
                                                        <Input type="number" name={`${index}`} id={`${index}`} value={dataBarang.qtyUnitStockAfterRecon} onChange={this.handleChangeunitStockRecon} min="0" />
                                                        <InputGroupAddon addonType="append">
                                                            <InputGroupText><span style={{fontWeight:"bold"}}>{dataBarang.unit_barang}</span></InputGroupText>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </Col>
                                                <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                                    <InputGroup>
                                                        <Input type="number" name={`${index}`} id={`${index}`} value={dataBarang.qtySatuanStockAfterRecon} onChange={this.handleChangesatuanStockRecon} min="0" max={dataBarang.conversi_satuan-1} />
                                                        <InputGroupAddon addonType="append">
                                                            <InputGroupText><span style={{fontWeight:"bold"}}>{dataBarang.satuan_barang}</span></InputGroupText>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            )}
                        </Col>
                    </Row>
                </div>
                <div className="card-footer">
                    <Row>
                        <Col>
                            <Button
                                color="danger"
                                onClick={() =>  {this.props.history.push({pathname: "/stokrecon"})}}
                                block
                            >
                                Cancel
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                color="success"
                                onClick={() => { if (window.confirm('Apakah anda yakin akan menyelesaikan proses ini ?')) this.submitData() }}
                                block
                            >
                            <ScaleLoader
                                height={18}
                                width={4}
                                radius={2}
                                margin={2}
                                color={'#FFFFFF'}
                                loading={this.state.buttonProcessPrm}
                            />
                            PROCESS
                            </Button>
                        </Col>
                    </Row>
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
    userinfo: state.reducer.userinfo
  };
};

export default withRouter(connect(mapStateToProps)(returnToVendor));