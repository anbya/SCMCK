import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import queryString from 'query-string';
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

class InvBreakdownRPT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterKey:"",
            dataInventoryStokBreakdown:[],
            loading:false
        };
        this.baseState = {
            filterKey:"",
            dataInventoryStokBreakdown:[],
            loading:false
        };
    }
    componentDidMount = () =>{
        this.setState({
            ...this.state,
            loading:true
        });
        let url = this.props.location.search;
        let params = queryString.parse(url);
        const dataToSend = {
            YEAR: params.YEAR,
            MONTH: params.MONTH
        };
        axios
        .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/stokBreakdown`, dataToSend, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(result => {
            let qtyPO = 0
            let costPO = 0
            for(let i=0;i<result.data.resultPO.length;i++){
                qtyPO = qtyPO+parseFloat(result.data.resultPO[i].qty_receive)
                if(result.data.resultPO[i].taxParameter == "YES"){
                    let hargaSatuan = parseFloat((result.data.resultPO[i].harga*1.1)/result.data.resultPO[i].konversiItem)
                    console.log(hargaSatuan);
                    costPO = costPO+parseFloat(hargaSatuan*result.data.resultPO[i].qty_receive)
                } else {
                    let hargaSatuan = parseFloat(result.data.resultPO[i].harga/result.data.resultPO[i].konversiItem)
                    console.log(hargaSatuan);
                    costPO = costPO+parseFloat(hargaSatuan*result.data.resultPO[i].qty_receive)
                }
            }
            console.log(qtyPO,"qtyPO");
            console.log(costPO,"costPO");
            this.setState({
                ...this.state,
                loading:false,
                dataInventoryStokBreakdown:result.data.masterBarangList
            });
        })
        .catch(error => {
            console.log(error);
            console.log(this.props);
        });
    }
    // handleChange = event =>  {
    //     this.setState({
    //     ...this.state,
    //     [event.target.name]: event.target.value
    //     });
    // }
    // handleChangeunitStockRecon = event =>  {
    //     let IdData = event.target.id
    //     let daftarBarang = this.state.dataInventoryStokBreakdown
    //     let unitSend = event.target.value==""?0:parseInt(event.target.value)
    //     let satuanSend = daftarBarang[IdData].qtySatuanStockAfterRecon==""?0:parseInt(daftarBarang[IdData].qtySatuanStockAfterRecon)
    //     daftarBarang[IdData].qtyUnitStockAfterRecon=event.target.value
    //     daftarBarang[IdData].qtyStockAfterRecon=parseInt(satuanSend)+(parseInt(unitSend)*parseInt(daftarBarang[IdData].conversi_satuan))
    //     this.setState({
    //         ...this.state,
    //         dataInventoryStokBreakdown: daftarBarang
    //     });
    // }
    // handleChangesatuanStockRecon = event =>  {
    //     let IdData = event.target.id
    //     let daftarBarang = this.state.dataInventoryStokBreakdown
    //     let maxSatuan = parseInt(daftarBarang[IdData].conversi_satuan)-1
    //     if(event.target.value>maxSatuan){
    //     alert("angka yang anda input melebihi batas satuan")
    //     } else{
    //     let unitSend = daftarBarang[IdData].qtyUnitStockAfterRecon==""?0:parseInt(daftarBarang[IdData].qtyUnitStockAfterRecon)
    //     let satuanSend = event.target.value==""?0:parseInt(event.target.value)
    //     daftarBarang[IdData].qtySatuanStockAfterRecon=event.target.value
    //     daftarBarang[IdData].qtyStockAfterRecon=parseInt(satuanSend)+(parseInt(unitSend)*parseInt(daftarBarang[IdData].conversi_satuan))
    //     this.setState({
    //         ...this.state,
    //         dataInventoryStokBreakdown: daftarBarang
    //     });
    //     }
    // }
    // submitData = async () => {
    //     let PRMOUTLET = localStorage.getItem("outletID")
    //     let finalDataStock = await this.processFinalStockRecon(this.state.dataInventoryStokBreakdown)
    //     const dateToForm = moment().format("YYYY-MM-DD HH:mm:ss")
    //     const dataToSend = {
    //         PRMOUTLET: PRMOUTLET,
    //         DATASTOCK: finalDataStock,
    //         DETAILSTOCKRECON: this.state.dataInventoryStokBreakdown,
    //         USER:this.props.userinfo.id_user,
    //         TANGGALSR: dateToForm
    //     };
    //     this.setState({
    //     ...this.state,
    //     buttonAddPrm:true,
    //     buttonAddText:"",
    //     loading:true
    //     });
    //     // console.log(dataToSend);
    //     axios
    //     .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/processStockReconciliation`, dataToSend, {
    //     headers: {
    //         "Access-Control-Allow-Origin": "*"
    //     }
    //     })
    //     .then(async result => {
    //     await this.setState({
    //         ...this.state,
    //         buttonAddPrm:false,
    //         buttonAddText:"Save",
    //         loading:false
    //     });
    //     alert("Stock reconciliation berhasil diproses")
    //     window.open(`${process.env.REACT_APP_PRINT}/#/stockReconciliationPrint?ID=${result.data.kodeSR}`, "_blank")
    //     this.props.history.push({pathname: "/stokrecon"})
    //     })
    //     .catch(error => {
    //     console.log(error);
    //     console.log(this.props);
    //     });
    // }
    // processFinalStockRecon = (data) =>  {
    //     let dataToProcess = data
    //     let dataFinal = []
    //     let dataFinalPlus = []
    //     let dataFinalMin = []
    //     for(let i=0;i<dataToProcess.length;i++){
    //         parseInt(dataToProcess[i].qty_in_inventory)>parseInt(dataToProcess[i].qtyStockAfterRecon) && dataFinalMin.push(dataToProcess[i])
    //         parseInt(dataToProcess[i].qty_in_inventory)<parseInt(dataToProcess[i].qtyStockAfterRecon) && dataFinalPlus.push(dataToProcess[i])
    //     }
    //     dataFinal.push({dataFinalPlus:dataFinalPlus,dataFinalMin:dataFinalMin})
    //     return dataFinal
    // }
    formatNumber = (num) =>  {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    prosesToShow = (qty,konversi) =>{
        let qtyInv =parseFloat(qty == null ? 0 : qty)
        let convertionQtyInv =parseFloat(konversi)
        let qtyInvProcessA = Math.floor(qtyInv/convertionQtyInv)
        let qtyInvProcessB = qtyInv%convertionQtyInv
        let qtyInvToShow = qtyInvProcessA+"."+qtyInvProcessB
        return qtyInvToShow
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
                        <span style={{fontWeight:"bold"}}>Inventory Stock Breakdown</span>
                        </Col>
                        <Col xs="12" sm="12" md="4" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                            {/* <InputGroup>
                                <Input type="text" name="filterKey" id="filterKey" value={this.state.filterKey} onChange={this.handleChange} />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                        <i className="fa fa-filter" aria-hidden="true"></i>Filter
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup> */}
                        </Col>
                    </Row>
                    </div>
                    <div className="card-body" style={{padding:0}}>
                    </div>
                    <div className="card-body masterBodyData" style={{padding:0}}>
                        <div style={{display:"inline-flex"}}>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`Kode Item`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`Nama Item`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`Unit Item`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`Konversi Item`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`Satuan Item`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`BOM QTY`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`BOM COST`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`PURCHASE IN QTY`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`PURCHASE IN COST`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`PEMBELIAN IN QTY`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`PEMBELIAN IN COST`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`RAW PROSES IN QTY`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`RAW PROSES IN COST`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`RAW PROSES OUT QTY`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`RAW PROSES OUT COST`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`PRODUKSI IN QTY`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`PRODUKSI IN COST`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`PRODUKSI OUT QTY`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`PRODUKSI OUT COST`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`TRANSFER IN QTY`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`TRANSFER IN COST`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`TRANSFER OUT QTY`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`TRANSFER OUT COST`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`DELIVERY ORDER OUT QTY`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`DELIVERY ORDER OUT COST`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`RETURN OUT QTY`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`RETURN OUT COST`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`WASTE OUT QTY`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`WASTE OUT COST`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`ADJUST IN QTY`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`ADJUST IN COST`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`ADJUST OUT QTY`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`ADJUST OUT COST`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`EOM QTY`}</span>
                            </div>
                            <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                <span style={{fontWeight:"bold"}}>{`EOM COST`}</span>
                            </div>
                        </div>
                        {this.state.dataInventoryStokBreakdown.length > 0 && this.state.dataInventoryStokBreakdown.map((masterBarangList,index) =>
                            <div style={{display:"inline-flex"}} key={index}>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{masterBarangList.kode_barang}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"flex-start",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{masterBarangList.nama_barang}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{masterBarangList.unit_barang}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{masterBarangList.conversi_satuan}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{masterBarangList.satuan_barang}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`${this.prosesToShow(masterBarangList.BOM_QTY,masterBarangList.conversi_satuan)} / ${masterBarangList.unit_barang}.${masterBarangList.satuan_barang}`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"flex-end",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Rp. ${this.formatNumber(parseInt(masterBarangList.BOM_COST*masterBarangList.BOM_QTY))}`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                                <div style={{width:"200px",minHeight:"44pt",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#ffffff",border:"1px solid #c9c9c9",padding:10}}>
                                    <span style={{fontWeight:"bold"}}>{`Kode`}</span>
                                </div>
                            </div>
                        )}
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

export default withRouter(connect(mapStateToProps)(InvBreakdownRPT));