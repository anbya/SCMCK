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

class itemWaste extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingParam:"none",
      pagination:true,
      highlight:true,
      striped:false,
      loading:false,
      noHeader:true,
      fixedHeader:false,
      prmModaladd:false,
      buttonAddPrm:false,
      buttonAddText:"Add",
      buttonEditPrm:false,
      buttonEditText:"CANCEL",
      tambahkodebarang:"",
      tambahnamabarang:"",
      tambahunitbarang:"",
      tambahsatuanbarang:"",
      tambahkonversibarang:"",
      tambahqtybarang:"",
      tambahqtyUnit:"",
      tambahqtySatuan:"",
      tambahStokBarang:"",
      tambahStokBarangToShow:"",
      prmModaledit:false,
      prmmasterBarangList:[],
      prmBarang:"",
      masterBarangList:[],
      prmVendor:"",
      masterVendorList:[],
      tambahkodevendor:"",
      listReturnBarang:[],
      detailponumber:"",
      detailbuatpo:"",
      dateForm:"",
      totalPembelian:0,
      dataWST:[],
      dataWSTD:[],
      detaildataWST:"",
      tanggalKirim: new Date(),
      prmOutlet:"",
      masterOutletList:[],
      tambahkodeoutlet:"",
      tambahParameterPajak:""
    };
    this.baseState = {
        loadingParam:"none",
        pagination:true,
        highlight:true,
        striped:false,
        loading:false,
        noHeader:true,
        fixedHeader:false,
        prmModaladd:false,
        buttonAddPrm:false,
        buttonAddText:"Add",
        buttonEditPrm:false,
        buttonEditText:"CANCEL",
        tambahkodebarang:"",
        tambahnamabarang:"",
        tambahunitbarang:"",
        tambahsatuanbarang:"",
        tambahkonversibarang:"",
        tambahqtybarang:"",
        tambahqtyUnit:"",
        tambahqtySatuan:"",
        tambahStokBarang:"",
        tambahStokBarangToShow:"",
        prmModaledit:false,
        prmmasterBarangList:[],
        prmBarang:"",
        masterBarangList:[],
        prmVendor:"",
        masterVendorList:[],
        tambahkodevendor:"",
        listReturnBarang:[],
        detailponumber:"",
        detailbuatpo:"",
        dateForm:"",
        totalPembelian:0,
        dataWST:[],
        dataWSTD:[],
        detaildataWST:"",
        tanggalKirim: new Date(),
        prmOutlet:"",
        masterOutletList:[],
        tambahkodeoutlet:"",
        tambahParameterPajak:""
    };
  }
  componentDidMount = () =>  {
    this.setState({
      ...this.state,
      loading:true,
    });
    let PRMOUTLET = localStorage.getItem("outletID")
    const dataToSend = {
        PRMOUTLET: PRMOUTLET
    };
    axios
    .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/getWasteData`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(result => {
      this.setState({
        ...this.state,
        dataWST: result.data.dataWST,
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
    let PRMOUTLET = localStorage.getItem("outletID")
    const dataToSend = {
        PRMOUTLET: PRMOUTLET
    };
    axios
    .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/getWasteData`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(result => {
      this.setState({
        ...this.state,
        dataWST: result.data.dataWST,
        loading:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  modalAddOpen = async () =>  {
    await this.setState({
      ...this.state,
      loadingParam:"block",
    });
    axios
    .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/getFromWaste`)
    .then( result => {
      this.setState({
        ...this.state,
        masterBarangList: result.data.dataMasterBarang
      });
      const dateToForm = moment().format("YYYY-MM-DD HH:mm:ss")
      this.setState({
        ...this.state,
        loadingParam:"none",
        prmModaladd: true,
        dateForm:dateToForm
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  modalAddClose = async () =>  {
    await this.setState(this.baseState);
    this.refreshPageData()
  }
  modalEditOpen = async (data) =>  {
    const dataToSend = {
      kodeWST: data.kode_waste_h
    };
        axios
        .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/getWasteDetail`, dataToSend, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
    .then( result => {
      this.setState({
        ...this.state,
        dataWSTD:result.data.dataWSTD
      });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({
      ...this.state,
      prmModaledit: true,
      detaildataWST:data
    });
  }
  modalEditClose = async () =>  {
    await this.setState(this.baseState);
    this.refreshPageData()
  }
  addData = async () => {
    if(this.state.tambahkodebarang === ""){
      alert("Item barang tidak boleh kosong")
    } else if(this.state.tambahqtybarang == 0 || this.state.tambahqtybarang === ""){
        alert("Qty Pembelian tidak boleh kosong")
    } else {
      let daftarBarang = this.state.listReturnBarang
      let resultChecked = daftarBarang.find(o => o.kode_barang === `${this.state.tambahkodebarang}`);
      if(resultChecked===undefined){
        // batas
        let qtyRTN =parseInt(this.state.tambahqtybarang==""?0:this.state.tambahqtybarang)
        let convertionQtyRTN =parseInt(this.state.tambahkonversibarang)
        let qtyRTNProcessA = Math.floor(qtyRTN/convertionQtyRTN)
        let qtyRTNProcessB = qtyRTN%convertionQtyRTN
        let qtyRTNToShow = qtyRTNProcessA+"/"+qtyRTNProcessB
        // batas
        let dataTopush = {
            kode_barang:`${this.state.tambahkodebarang}`,
            nama_barang:`${this.state.tambahnamabarang}`,
            qty:`${this.state.tambahqtybarang}`,
            qtyToShow:`${qtyRTNToShow} ${this.state.tambahunitbarang}/${this.state.tambahsatuanbarang}`
        }
        await daftarBarang.push(dataTopush)
        await this.setState({
          ...this.state,
          listReturnBarang: daftarBarang,
          tambahkodebarang:"",
          tambahnamabarang:"",
          tambahunitbarang:"",
          tambahsatuanbarang:"",
          tambahkonversibarang:"",
          tambahqtybarang:"",
          tambahqtyUnit:"",
          tambahqtySatuan:"",
          tambahStokBarang:"",
          tambahStokBarangToShow:"",
          prmBarang:""
        });
      } else {
        alert("Item sudah ada di list return")
        this.setState({
          ...this.state,
          tambahkodebarang:"",
          tambahnamabarang:"",
          tambahunitbarang:"",
          tambahsatuanbarang:"",
          tambahkonversibarang:"",
          tambahqtybarang:"",
          tambahqtyUnit:"",
          tambahqtySatuan:"",
          tambahStokBarang:"",
          tambahStokBarangToShow:"",
          prmBarang:""
        });
      }
    }
  }
  eraseAddData = async (keyArray) => {
    let daftarBarang = this.state.listReturnBarang
    await daftarBarang.splice(keyArray, 1)
    await this.setState({
      ...this.state,
      listReturnBarang: daftarBarang
    });
  }
  handleChange = event =>  {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }
  onSelectChangedMasterVendor = async (value) => {
    await this.filterListBarang(value.value)
    this.setState({
      ...this.state,
      prmVendor: value,
      tambahkodevendor:value.value
    });
  }
  filterListBarang = async (value) => {
    let prmMasterBarangList = this.state.prmmasterBarangList
    let filteredListMasterBarang = prmMasterBarangList.filter(o => o.kode_vendor === `${value}`);
    await this.setState({
      ...this.state,
      masterBarangList:filteredListMasterBarang
    });
  }
  onSelectChangedMasterBarang = async (value) => {
    await this.setState({
      ...this.state,
      prmBarang: value,
      tambahkodebarang:value.value,
      tambahnamabarang:value.label,
      tambahunitbarang:value.unit,
      tambahsatuanbarang:value.satuan,
      tambahStokBarang:value.qty_in_inventory,
      tambahStokBarangToShow:value.qtyInvToShow,
      tambahkonversibarang:value.konversi
    });
  }
  submitData = () => {
    let PRMOUTLET = localStorage.getItem("outletID")
    const dataToSend = {
      PRMOUTLET: PRMOUTLET,
      VENDORCODE: this.state.tambahkodevendor,
      USER:this.props.userinfo.id_user,
      ADDDATA: this.state.listReturnBarang,
      TANGGALWASTE: this.state.dateForm
    };
    const cekAddData = this.state.listReturnBarang.length
    if (cekAddData < 1){
      alert("Data barang tidak boleh kosong")
    } else {
      this.setState({
        ...this.state,
        buttonAddPrm:true,
        buttonAddText:""
      });
      console.log(dataToSend);
      axios
      .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/addFormWasteCK`, dataToSend, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(async result => {
        await this.setState({
          ...this.state,
          buttonAddPrm:false,
          buttonAddText:"Save",
        });
        alert("data berhasil Ditambahkan")
        await this.modalAddClose()
        // window.open(`${process.env.REACT_APP_PRINT}/purchaseOrderPrint?ID=${result.data.id_po_h}`, "_blank")
        this.refreshPageData()
      })
      .catch(error => {
        console.log(error);
        console.log(this.props);
      });
    }
  }
  updateData = () => {
    this.setState({
      ...this.state,
      buttonEditPrm:true,
      buttonEditText:""
    });
    const dataToSend = {
      IDPO:this.state.detaildataWST.kode_purchase_order_h
    };
    console.log(dataToSend);
    let APIroute = localStorage.getItem("APIROUTE")
        axios
        .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/cancelPO`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(async result => {
      await this.setState({
        ...this.state,
        buttonEditPrm:false,
        buttonEditText:"CANCEL",
      });
      alert("Data purchase order berhasil di cancel")
      await this.modalEditClose()
      this.refreshPageData()
    })
    .catch(error => {
      console.log(error);
      console.log(this.props);
    });
  }
  handleChangeunitReturn = event =>  {
    let unitSend = event.target.value==""?0:parseInt(event.target.value)
    let satuanSend = this.state.tambahqtySatuan==""?0:parseInt(this.state.tambahqtySatuan)
    let cekHasilqty_send = parseInt(satuanSend)+(parseInt(unitSend)*parseInt(this.state.tambahkonversibarang))
    if(cekHasilqty_send>parseInt(this.state.tambahStokBarang)){
      alert("qty yang anda input melebihi stok")
    } else {
      this.setState({
        ...this.state,
        tambahqtybarang:parseInt(satuanSend)+(parseInt(unitSend)*parseInt(this.state.tambahkonversibarang)),
        tambahqtyUnit:event.target.value
      });
    }
  }
  handleChangesatuanReturn = event =>  {
    let maxSatuan = parseInt(this.state.tambahkonversibarang)-1
    if(event.target.value>maxSatuan){
      alert("angka yang anda input melebihi batas satuan")
    } else{
      let unitSend = this.state.tambahqtyUnit==""?0:parseInt(this.state.tambahqtyUnit)
      let satuanSend = event.target.value==""?0:parseInt(event.target.value)
      let cekHasilqty_send = parseInt(satuanSend)+(parseInt(unitSend)*parseInt(this.state.tambahkonversibarang))
      if(cekHasilqty_send>parseInt(this.state.tambahStokBarang)){
        alert("qty yang anda input melebihi stok")
      } else {
        this.setState({
          ...this.state,
          tambahqtybarang:parseInt(satuanSend)+(parseInt(unitSend)*parseInt(this.state.tambahkonversibarang)),
          tambahqtySatuan:event.target.value
        });
      }
    }
  }
  render() {
    const DataButton = (data) => (
      <div>
        <button className="myBtn" onClick={()=> this.modalEditOpen(data)}><i className="fa fa-search fa-2x" aria-hidden="true"></i></button>
      </div>
    );
    const columns = [
      {
        name: 'Nomor Waste',
        selector: 'nomor_waste',
        sortable: true,
      },
      {
        name: 'Tanggal Waste',
        selector: 'tanggal_waste',
        sortable: true,
      },
      {
        name: 'Outlet',
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
        <Modal isOpen={this.state.prmModaladd} backdrop={"static"} size="xl">
          <ModalHeader toggle={() => this.modalAddClose()}>Form waste</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                    <Label for="detailbuatpo">Tanggal buat</Label>
                    <Input type="text" name="detailbuatpo" id="detailbuatpo" value={this.state.dateForm} onChange={this.handleChange} placeholder="Tanggal buat PO" disabled={true} />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:10,paddingBottom:10}}>
                <Col>
                    <Row>
                        <Col xs="12" sm="12" md="6" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                            <span style={{fontWeight:"bold"}}>Item waste</span>
                        </Col>
                        <Col xs="12" sm="12" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <span style={{fontWeight:"bold"}}>Stok</span>
                        </Col>
                        <Col xs="12" sm="12" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <span style={{fontWeight:"bold"}}>Unit waste</span>
                        </Col>
                        <Col xs="12" sm="12" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <span style={{fontWeight:"bold"}}>Satuan waste</span>
                        </Col>
                    </Row>
                    <Row style={{paddingTop:10,paddingBottom:10}}>
                        <Col xs="12" sm="12" md="6">
                            <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isClearable={false}
                            isSearchable={true}
                            name="prmBarang"
                            value={this.state.prmBarang}
                            options={this.state.masterBarangList}
                            onChange={this.onSelectChangedMasterBarang.bind(this)}
                            placeholder="Pilih Barang"
                            />
                        </Col>
                        <Col xs="12" sm="12" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            {this.state.tambahStokBarang != ""&&
                                <span style={{fontWeight:"bold"}}>{`${this.state.tambahStokBarangToShow} ${this.state.tambahunitbarang}/${this.state.tambahsatuanbarang}`}</span>
                            }
                        </Col>
                        <Col xs="12" sm="12" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <InputGroup>
                                <Input type="number" name="tambahqtyUnit" id="tambahqtyUnit" value={this.state.tambahqtyUnit} onChange={this.handleChangeunitReturn} min="0" />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><span style={{fontWeight:"bold"}}>{this.state.tambahunitbarang}</span></InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                        <Col xs="12" sm="12" md="2">
                            <InputGroup>
                                <Input type="number" name="tambahqtySatuan" id="tambahqtySatuan" value={this.state.tambahqtySatuan} onChange={this.handleChangesatuanReturn} min="0" max={this.state.tambahkonversibarang-1} />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><span style={{fontWeight:"bold"}}>{this.state.tambahsatuanbarang}</span></InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row style={{paddingTop:10,paddingBottom:10}}>
                        <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <Button color="success" onClick={() => this.addData()} block={true}>
                            Add
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000"}}>
              <Col>
                <Row>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>KODE BARANG</span></Col>
                  <Col xs="6"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
                  <Col xs="3"><span style={{fontWeight:"bold"}}>WASTE QTY</span></Col>
                  <Col xs="1"><span style={{fontWeight:"bold"}}>TOOL</span></Col>
                </Row>
              </Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.listReturnBarang.length > 0 && this.state.listReturnBarang.map((listReturnBarang,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listReturnBarang.kode_barang}</span></Col>
                    <Col xs="6"><span style={{fontWeight:"bold"}}>{listReturnBarang.nama_barang}</span></Col>
                    <Col xs="3"><span style={{fontWeight:"bold"}}>{listReturnBarang.qtyToShow}</span></Col>
                    <Col xs="1">
                      <button className="myBtn" onClick={() => this.eraseAddData(index)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => { if (window.confirm('Apakah anda yakin akan menyelesaikan proses ini ?')) this.submitData() }}>
              <ScaleLoader
                height={18}
                width={4}
                radius={2}
                margin={2}
                color={'#FFFFFF'}
                loading={this.state.buttonAddPrm}
              />
              {this.state.buttonAddText}
            </Button>
            <Button color="danger" onClick={() => this.modalAddClose()}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.prmModaledit} backdrop={"static"} size="xl">
          <ModalHeader toggle={() => this.modalEditClose()}>Detail Waste</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label>Nomor Waste</Label>
                  <Input type="text" value={this.state.detaildataWST.nomor_waste} onChange={this.handleChange} disabled={true} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label>Tanggal Waste</Label>
                  <Input type="text" value={this.state.detaildataWST.tanggal_waste} onChange={this.handleChange} disabled={true} />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000"}}>
                <Col xs="3">
                    <span style={{fontWeight:"bold"}}>KODE BARANG</span>
                </Col>
                <Col xs="6">
                    <span style={{fontWeight:"bold"}}>NAMA BARANG</span>
                </Col>
                <Col xs="3">
                    <span style={{fontWeight:"bold"}}>QTY</span>
                </Col>
            </Row>
            <Row className="bodyData">
                <Col>
                {this.state.dataWSTD.length > 0 && this.state.dataWSTD.map((dataWSTD,index) =>
                    <Row key={index}>
                        <Col xs="3">
                            <span style={{fontWeight:"bold"}}>{dataWSTD.kode_barang}</span>
                        </Col>
                        <Col xs="6">
                            <span style={{fontWeight:"bold"}}>{dataWSTD.nama_barang}</span>
                        </Col>
                        <Col xs="3">
                            <span style={{fontWeight:"bold"}}>
                                {`${dataWSTD.qty_toShow} ${dataWSTD.unit_barang} / ${dataWSTD.satuan_barang}`}
                            </span>
                        </Col>
                    </Row>
                )}
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
                      <span style={{fontWeight:"bold"}}>Waste list</span>
                    </Col>
                    <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                      <button className="myBtn" onClick={() => this.modalAddOpen()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <DataTableExtensions
                      columns={columns}
                      data={this.state.dataWST}
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

const mapStateToProps = (state) => {
  return {
    userinfo: state.reducer.userinfo
  };
};

export default withRouter(connect(mapStateToProps)(itemWaste));