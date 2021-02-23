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
      tambahkodePOH:"",
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
      prmPO:"",
      masterPOList:[],
      tambahkodevendor:"",
      listReturnBarang:[],
      detailponumber:"",
      detailbuatpo:"",
      dateForm:"",
      totalPembelian:0,
      dataRTRN:[],
      dataRTRND:[],
      detailDataRTRN:"",
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
        tambahkodePOH:"",
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
        prmPO:"",
        masterPOList:[],
        tambahkodevendor:"",
        listReturnBarang:[],
        detailponumber:"",
        detailbuatpo:"",
        dateForm:"",
        totalPembelian:0,
        dataRTRN:[],
        dataRTRND:[],
        detailDataRTRN:"",
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
    let APIroute = localStorage.getItem("APIROUTE")
        axios
        .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/getReturnData`)
    .then(result => {
      this.setState({
        ...this.state,
        dataRTRN: result.data.dataRTRN,
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
        .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/getReturnData`)
    .then(result => {
      this.setState({
        ...this.state,
        dataRTRN: result.data.dataRTRN,
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
    .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/getFromReturn`)
    .then( result => {
      this.setState({
        ...this.state,
        masterPOList: result.data.dataToShow
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
      kodeRTRN: data.kode_return_h
    };
        axios
        .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/getReturnDetail`, dataToSend, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
    .then( result => {
      this.setState({
        ...this.state,
        dataRTRND:result.data.dataRTRND
      });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({
      ...this.state,
      prmModaledit: true,
      detailDataRTRN:data
    });
  }
  modalEditClose = async () =>  {
    await this.setState(this.baseState);
    this.refreshPageData()
  }
  addData = async () => {
    if(this.state.tambahkodebarang === "" || this.state.tambahqtybarang === ""){
      alert("barang dan qty barang tidak boleh kosong")
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
        let dataTopush = {kode_barang:`${this.state.tambahkodebarang}`,nama_barang:`${this.state.tambahnamabarang}`,qty:`${this.state.tambahqtybarang}`,qtyToShow:`${qtyRTNToShow} ${this.state.tambahunitbarang}/${this.state.tambahsatuanbarang}`}
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
  onSelectChangedMasterPO = async (value) => {
    const dataToSend = {
        kodePOH:value.value
    };
    axios
    .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/getDetailPOData`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then( result => {
        let dataReturnBarang = result.data.dataPOD
        for(let i=0;i<dataReturnBarang.length;i++){
            dataReturnBarang[i]={
                ...dataReturnBarang[i],
                qtyReturn:0,
                unitReturn:0,
                satuanReturn:0
            }
        }
        this.setState({
            ...this.state,
            tambahkodePOH:value.value,
            prmPO: value,
            listReturnBarang:dataReturnBarang
        });
    })
    .catch(error => {
      console.log(error);
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
    const dataToSend = {
      POCODE: this.state.tambahkodePOH,
      USER:this.props.userinfo.id_user,
      ADDDATA: this.state.listReturnBarang,
      TANGGALRETURN: this.state.dateForm
    };
    const cekAddData = this.state.listReturnBarang.length
    if(dataToSend.VENDORCODE === ""){
      alert("Data vendor tidak boleh kosong")
    } else if (cekAddData < 1){
      alert("Data barang tidak boleh kosong")
    } else {
      this.setState({
        ...this.state,
        buttonAddPrm:true,
        buttonAddText:""
      });
    //   console.log(dataToSend);
      axios
      .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/addFormReturnCK`, dataToSend, {
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
        // window.open(`${process.env.REACT_APP_PRINT}/#/purchaseOrderPrint?ID=${result.data.id_po_h}`, "_blank")
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
      IDPO:this.state.detailDataRTRN.kode_purchase_order_h
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
    let IdData = event.target.id
    let daftarBarang = this.state.listReturnBarang
    let unitSend = event.target.value==""?0:parseInt(event.target.value)
    let satuanSend = daftarBarang[IdData].satuanReturn==""?0:parseInt(daftarBarang[IdData].satuanReturn)
    let cekHasilqty_send = parseInt(satuanSend)+(parseInt(unitSend)*parseInt(daftarBarang[IdData].konversi_barang))
    if(cekHasilqty_send>parseInt(daftarBarang[IdData].qty_receive)){
      alert("qty yang anda input melebihi qty receive")
    } else {
        daftarBarang[IdData].unitReturn=event.target.value
        daftarBarang[IdData].qtyReturn=parseInt(satuanSend)+(parseInt(unitSend)*parseInt(daftarBarang[IdData].konversi_barang))
      this.setState({
        ...this.state,
        listReturnBarang: daftarBarang
      });
    }
  }
  handleChangesatuanReturn = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.listReturnBarang
    let maxSatuan = parseInt(daftarBarang[IdData].konversi_barang)-1
    if(event.target.value>maxSatuan){
      alert("angka yang anda input melebihi batas satuan")
    } else{
      let unitSend = daftarBarang[IdData].unitReturn==""?0:parseInt(daftarBarang[IdData].unitReturn)
      let satuanSend = event.target.value==""?0:parseInt(event.target.value)
      let cekHasilqty_send = parseInt(satuanSend)+(parseInt(unitSend)*parseInt(daftarBarang[IdData].konversi_barang))
      if(cekHasilqty_send>parseInt(daftarBarang[IdData].qty_receive)){
        alert("qty yang anda input melebihi qty receive")
      } else {
        daftarBarang[IdData].satuanReturn=event.target.value
        daftarBarang[IdData].qtyReturn=parseInt(satuanSend)+(parseInt(unitSend)*parseInt(daftarBarang[IdData].konversi_barang))
        this.setState({
          ...this.state,
          listReturnBarang: daftarBarang
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
        name: 'Nomor Return',
        selector: 'nomor_return',
        sortable: true,
      },
      {
        name: 'Tanggal Return',
        selector: 'tanggal_return',
        sortable: true,
      },
      {
        name: 'Nomor PO',
        selector: 'kode_purchase_order_h',
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
          <ModalHeader toggle={() => this.modalAddClose()}>Form return ke vendor</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                    <Label for="detailbuatpo">Tanggal buat return</Label>
                    <Input type="text" name="detailbuatpo" id="detailbuatpo" value={this.state.dateForm} onChange={this.handleChange} placeholder="Tanggal buat PO" disabled={true} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Data PO</Label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={false}
                    isSearchable={true}
                    name="prmPO"
                    value={this.state.prmPO}
                    options={this.state.masterPOList}
                    onChange={this.onSelectChangedMasterPO.bind(this)}
                    placeholder="Pilih Data PO"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000"}}>
              <Col>
                <Row>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>KODE BARANG</span></Col>
                  <Col xs="4"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
                  <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}><span style={{fontWeight:"bold"}}>QTY RECEIVE</span></Col>
                  <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}><span style={{fontWeight:"bold"}}>UNIT RETURN</span></Col>
                  <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}><span style={{fontWeight:"bold"}}>SATUAN RETURN</span></Col>
                </Row>
              </Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.listReturnBarang.length > 0 && this.state.listReturnBarang.map((listReturnBarang,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listReturnBarang.kode_barang}</span></Col>
                    <Col xs="4"><span style={{fontWeight:"bold"}}>{listReturnBarang.nama_barang}</span></Col>
                    <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}><span style={{fontWeight:"bold"}}>{`${listReturnBarang.qtyReceiveToShow} ${listReturnBarang.unit_barang}.${listReturnBarang.satuan_barang}`}</span></Col>
                    <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <InputGroup>
                        <Input type="number" name={`${index}`} id={`${index}`} value={listReturnBarang.unitReturn} onChange={this.handleChangeunitReturn} min="0" />
                        <InputGroupAddon addonType="append">
                          <InputGroupText><span style={{fontWeight:"bold"}}>{listReturnBarang.unit_barang}</span></InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                    <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <InputGroup>
                      <Input type="number" name={`${index}`} id={`${index}`} value={listReturnBarang.satuanReturn} onChange={this.handleChangesatuanReturn} min="0" max={listReturnBarang.konversi_barang-1} />
                        <InputGroupAddon addonType="append">
                          <InputGroupText><span style={{fontWeight:"bold"}}>{listReturnBarang.satuan_barang}</span></InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
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
          <ModalHeader toggle={() => this.modalEditClose()}>Detail Return</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label>Nomor Return</Label>
                  <Input type="text" value={this.state.detailDataRTRN.nomor_return} onChange={this.handleChange} disabled={true} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label>Tanggal Return</Label>
                  <Input type="text" value={this.state.detailDataRTRN.tanggal_return} onChange={this.handleChange} disabled={true} />
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
                {this.state.dataRTRND.length > 0 && this.state.dataRTRND.map((dataRTRND,index) =>
                    <Row key={index}>
                        <Col xs="3">
                            <span style={{fontWeight:"bold"}}>{dataRTRND.kode_barang}</span>
                        </Col>
                        <Col xs="6">
                            <span style={{fontWeight:"bold"}}>{dataRTRND.nama_barang}</span>
                        </Col>
                        <Col xs="3">
                            <span style={{fontWeight:"bold"}}>
                                {`${dataRTRND.qty_toShow} ${dataRTRND.unit_barang} / ${dataRTRND.satuan_barang}`}
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
                      <span style={{fontWeight:"bold"}}>Return list</span>
                    </Col>
                    <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                      <button className="myBtn" onClick={() => this.modalAddOpen()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <DataTableExtensions
                      columns={columns}
                      data={this.state.dataRTRN}
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

export default withRouter(connect(mapStateToProps)(returnToVendor));