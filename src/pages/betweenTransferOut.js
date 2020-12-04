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
  Label
} from "reactstrap";
import Select from 'react-select';
import { HashLoader , ScaleLoader } from 'react-spinners';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class transferOut extends Component {
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
      tambahkodebarang:"",
      tambahnamabarang:"",
      tambahsatuanbarang:"",
      tambahqtybarang:"",
      tambahhargabarang:"",
      addNote:"",
      prmModaledit:false,
      prmOutletPengirim:"",
      prmBarang:"",
      masterBarangList:[],
      prmVendor:"",
      masterVendorList:[],
      tambahkodevendor:"",
      listAddBarang:[],
      detailponumber:"",
      detailbuatpo:"",
      dateForm:"",
      totalPembelian:0,
      dataTransferOut:[],
      dataTOD:[],
      detailDataTO:"",
      tanggalKirim: new Date(),
      prmOutlet:"",
      masterOutletList:[],
      tambahkodeoutlet:"",
    };
  }
  componentDidMount = () =>  {
    let prmOUTLET = localStorage.getItem("outletID")
    this.setState({
      ...this.state,
      loading:true,
    });
    const dataToSend = {
      OUTLET: prmOUTLET
    };
    axios
    .post(`https://api.jaygeegroupapp.com/centralkitchen/getTransferoutData`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(result => {
      this.setState({
        ...this.state,
        dataTransferOut: result.data.dataTransferout,
        loading:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  refreshPageData = () =>  {
    let prmOUTLET = localStorage.getItem("outletID")
    this.setState({
      ...this.state,
      loading:true,
    });
    const dataToSend = {
      OUTLET: prmOUTLET
    };
    axios
    .post(`https://api.jaygeegroupapp.com/centralkitchen/getTransferoutData`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(result => {
      this.setState({
        ...this.state,
        dataTransferOut: result.data.dataTransferout,
        loading:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  modalAddOpen = async () =>  {
    let PRMOUTLET = localStorage.getItem("outletID")
    const dataToSend = {
      PRMOUTLET:PRMOUTLET
    };
    await this.setState({
      ...this.state,
      loadingParam:"block",
    });
    await axios
    .post(`https://api.jaygeegroupapp.com/centralkitchen/getFormTOCK`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then( result => {
      this.setState({
        ...this.state,
        prmOutletPengirim:result.data.nama_outlet,
        masterBarangList: result.data.dataMasterBarang,
        masterOutletList: result.data.dataOutlet
      });
    })
    .catch(error => {
      console.log(error);
    });
    const dateToForm = moment().format("YYYY-MM-DD HH:mm:ss")
    this.setState({
      ...this.state,
      loadingParam:"none",
      prmModaladd: true,
      prmBarang:"",
      tambahkodebarang:"",
      tambahnamabarang:"",
      tambahqtybarang:"",
      tambahhargabarang:"",
      addNote:"",
      listAddBarang:[],
      prmOutlet:"",
      tambahkodeoutlet:"",
      dateForm:dateToForm
    });
  }
  modalAddClose = () =>  {
    this.setState({
      ...this.state,
      prmModaladd: false,
      buttonAddPrm:false,
      buttonAddText:"Save",
      prmBarang:"",
      masterBarangList: [],
      tambahkodebarang:"",
      tambahnamabarang:"",
      tambahsatuanbarang:"",
      tambahqtybarang:"",
      tambahhargabarang:"",
      addNote:"",
      listAddBarang:[],
      prmVendor:"",
      masterVendorList:[],
      tambahkodevendor:"",
      detailponumber:"",
      detailbuatpo:"",
      dateForm:"",
      totalPembelian:0,
      prmOutlet:"",
      masterOutletList:[],
      tambahkodeoutlet:"",
      tanggalKirim: new Date(),
      prmOutletPengirim:"",
    });
  }
  modalEditOpen = async (data) =>  {
    const dataToSend = {
      kodeTO: data.kode_between_transfer
    };
    await axios
    .post(`https://api.jaygeegroupapp.com/centralkitchen/getDetailTransferoutData`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then( result => {
      this.setState({
        ...this.state,
        dataTOD:result.data.result
      });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({
      ...this.state,
      prmModaledit: true,
      detailDataTO:data
    });
  }
  modalEditClose = () =>  {
    this.setState({
      ...this.state,
      prmModaledit: false,
      buttonEditPrm:false,
      buttonEditText:"Save",
      editnamabarang:"",
      editsatuanbarang:"",
      dataToEdit:""
    });
  }
  addData = async () => {
    if(this.state.tambahkodebarang === "" || this.state.tambahqtybarang === ""){
      alert("barang, qty dan harga barang tidak boleh kosong")
    } else if(this.state.tambahqtybarang === 0 || this.state.tambahqtybarang === "0"){
      alert("Qty tidak boleh 0(NOL)")
    } else {
      let daftarBarang = this.state.listAddBarang
      let resultChecked = daftarBarang.find(o => o.kode_barang === `${this.state.tambahkodebarang}`);
      if(resultChecked===undefined){
        let dataTopush = {kode_barang:`${this.state.tambahkodebarang}`,nama_barang:`${this.state.tambahnamabarang}`,qty:`${this.state.tambahqtybarang}`,satuan:`${this.state.tambahsatuanbarang}`}
        await daftarBarang.push(dataTopush)
        await this.setState({
          ...this.state,
          listAddBarang: daftarBarang,
          tambahkodebarang:"",
          tambahnamabarang:"",
          tambahsatuanbarang:"",
          tambahqtybarang:"",
          tambahhargabarang:"",
          prmBarang:""
        });
        this.hitungTotal()
      } else {
        alert("Data barang sudah ada di list barang yang akan di transfer")
        this.setState({
          ...this.state,
          listAddBarang: daftarBarang,
          tambahkodebarang:"",
          tambahnamabarang:"",
          tambahsatuanbarang:"",
          tambahqtybarang:"",
          tambahhargabarang:"",
          prmBarang:""
        });
        // let indexArray = daftarBarang.findIndex(x => x.kode_barang === `${this.state.tambahkodebarang}`);
        // let qtyAwal = daftarBarang[indexArray].qty
        // let qtyAkhir = parseInt(qtyAwal)+parseInt(this.state.tambahqtybarang)
        // daftarBarang[indexArray].qty=qtyAkhir
        // this.setState({
        //   ...this.state,
        //   listAddBarang: daftarBarang,
        //   tambahkodebarang:"",
        //   tambahnamabarang:"",
        //   tambahsatuanbarang:"",
        //   tambahqtybarang:"",
        //   tambahhargabarang:"",
        //   prmBarang:""
        // });
      }
    }
  }
  eraseAddData = async (keyArray) => {
    let daftarBarang = this.state.listAddBarang
    await daftarBarang.splice(keyArray, 1)
    await this.setState({
      ...this.state,
      listAddBarang: daftarBarang
    });
    this.hitungTotal()
  }
  handleChange = event =>  {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }
  handleChangeQtyTransfer = event =>  {
    parseInt(event.target.value) > parseInt(this.state.prmBarang.qty_in_stok)
    ?
    alert("Qty yang anda input melebihi stok"):
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }
  onSelectChangedMasterVendor = async (value) => {
    await this.setState({
      ...this.state,
      prmVendor: value,
      tambahkodevendor:value.value
    });
  }
  onSelectChangedMasterBarang = async (value) => {
    await this.setState({
      ...this.state,
      prmBarang: value,
      tambahkodebarang:value.value,
      tambahnamabarang:value.label,
      tambahsatuanbarang:value.unit
    });
  }
  onSelectChangedMasterOutlet = async (value) => {
    await this.setState({
      ...this.state,
      prmOutlet: value,
      tambahkodeoutlet:value.value
    });
  }
  hitungTotal = () => {
    let daftarBarang = this.state.listAddBarang
    if(daftarBarang.length > 0){
      let totalPembelian = 0
      for(let i=0;i<daftarBarang.length;i++){
        let xAwal = parseInt(totalPembelian)
        let xHarga = parseInt(daftarBarang[i].harga)
        let xQty = parseInt(daftarBarang[i].qty)
        let xPenambah = xHarga * xQty
        totalPembelian = xAwal+xPenambah
      }
      this.setState({
        ...this.state,
        totalPembelian: totalPembelian
      });
    } else {
      this.setState({
        ...this.state,
        totalPembelian: 0
      });
    }
  }
  submitData = () => {
    let PRMOUTLET = localStorage.getItem("outletID")
    const dataToSend = {
      OUTLETPENGIRIM: PRMOUTLET,
      OUTLETTUJUAN: this.state.tambahkodeoutlet,
      TANGGALTO: this.state.dateForm,
      USER:this.props.userinfo.id_user,
      ADDDATA: this.state.listAddBarang,
      ADDNOTE: this.state.addNote
    };
    const cekAddData = this.state.listAddBarang.length
    if (this.state.prmOutlet === ""){
      alert("Outlet penerima tidak boleh kosong")
    } else if (cekAddData < 1){
      alert("Data barang tidak boleh kosong")
    } else {
      this.setState({
        ...this.state,
        buttonAddPrm:true,
        buttonAddText:""
      });
      axios
      .post(`https://api.jaygeegroupapp.com/centralkitchen/addFormTOCK`, dataToSend, {
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
        window.open(`http://localhost:3090/transferOutPrint?ID=${result.data.kodeTO}`, "_blank")
        this.refreshPageData()
      })
      .catch(error => {
        console.log(error);
        console.log(this.props);
      });
    }
  }
  datepickerHandleChange = date => {
    this.setState({
      ...this.state,
      tanggalKirim: date
    });
  };
  render() {
    // console.log(this.state.prmBarang.unit);
    const DataButton = (data) => (
      <div>
        <button className="myBtn" onClick={()=> this.modalEditOpen(data)}><i className="fa fa-search fa-2x" aria-hidden="true"></i></button>
      </div>
    );
    const columns = [
      {
        name: 'Nomor Transfer Out',
        selector: 'nomor_between_transfer',
        sortable: true,
      },
      {
        name: 'Tanggal Transfer Out',
        selector: 'tanggal_kirim_between_transfer',
        sortable: true,
      },
      {
        name: 'Outlet Tujuan Pengiriman',
        selector: 'nama_outlet_penerima',
        sortable: true,
      },
      {
        name: 'Status Transfer Out',
        selector: 'between_transfer_state',
        sortable: true,
      },
      {
        name: 'Note',
        selector: 'note_transfer',
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
          <ModalHeader toggle={() => this.modalAddClose()}>Transfer Out Form</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Tanggal Transfer Out</Label>
                  <Input type="text" name="detailbuatpo" id="detailbuatpo" value={this.state.dateForm} onChange={this.handleChange} placeholder="Tanggal buat PO" disabled={true} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6">
              </Col>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="prmOutletPengirim">Outlet Pengirim</Label>
                  <Input type="text" name="prmOutletPengirim" id="prmOutletPengirim" value={this.state.prmOutletPengirim} onChange={this.handleChange} placeholder="Outlet pengirim" disabled={true} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Outlet Penerima</Label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={false}
                    isSearchable={true}
                    name="prmOutlet"
                    value={this.state.prmOutlet}
                    options={this.state.masterOutletList}
                    onChange={this.onSelectChangedMasterOutlet.bind(this)}
                    placeholder="Pilih tujuan kirim"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12">
                <FormGroup>
                  <Label for="addNote">Note</Label>
                  <Input type="textarea" name="addNote" id="addNote" value={this.state.addNote} onChange={this.handleChange} placeholder="Note" />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:10,paddingBottom:10}}>
              <Col xs="12" sm="12" md="4">
                <FormGroup>
                  <Label for="detailbuatpo">Barang Transfer</Label>
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
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <FormGroup>
                  <Label for="detailbuatpo">Qty In Stok</Label><br/>
                  <span style={{fontWeight:"bold"}}>{this.state.prmBarang.qty_in_stok == undefined?"---":this.state.prmBarang.qty_in_stok}</span>
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="2">
                <FormGroup>
                  <Label for="detailbuatpo">Qty Transfer</Label>
                  <Input
                    type="number"
                    name="tambahqtybarang"
                    id="tambahqtybarang"
                    value={this.state.tambahqtybarang}
                    onChange={this.handleChangeQtyTransfer}
                    placeholder="Qty"
                    min="0"
                    max={this.state.prmBarang.qty_in_stok}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <FormGroup>
                  <Label for="detailbuatpo">Satuan</Label><br/>
                  <span style={{fontWeight:"bold"}}>{this.state.prmBarang.satuan == undefined?"---":this.state.prmBarang.satuan}</span>
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Button block={true} color="success" onClick={() => this.addData()}>
                  Add
                </Button>
              </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000"}}>
              <Col>
                <Row>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>KODE BARANG</span></Col>
                  <Col xs="5"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>QTY</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>UNIT</span></Col>
                  <Col xs="1"><span style={{fontWeight:"bold"}}>TOOL</span></Col>
                </Row>
              </Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.listAddBarang.length > 0 && this.state.listAddBarang.map((listAddBarang,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarang.kode_barang}</span></Col>
                    <Col xs="5"><span style={{fontWeight:"bold"}}>{listAddBarang.nama_barang}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarang.qty}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarang.satuan}</span></Col>
                    <Col xs="1">
                      <button className="myBtn" onClick={() => this.eraseAddData(index)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => this.submitData()}>
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
          <ModalHeader toggle={() => this.modalEditClose()}>Detail Transfer Out</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label>Nomor Transfer Out</Label>
                  <Input type="text" value={this.state.detailDataTO.nomor_between_transfer} onChange={this.handleChange} disabled={true} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label>Tanggal Transfer Out</Label>
                  <Input type="text" value={this.state.detailDataTO.tanggal_kirim_between_transfer} onChange={this.handleChange} disabled={true} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label>Outlet Pengirim</Label>
                  <Input type="text" value={this.state.detailDataTO.nama_outlet_pengirim} onChange={this.handleChange} disabled={true} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label>Outlet Penerima</Label>
                  <Input type="text" value={this.state.detailDataTO.nama_outlet_penerima} onChange={this.handleChange} disabled={true} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label>Status Transfer Out</Label>
                  <Input type="text" value={this.state.detailDataTO.between_transfer_state} onChange={this.handleChange} disabled={true} />
                </FormGroup>
              </Col>
              {
                this.state.detailDataTO.between_transfer_state == "RECEIVED" ?
                <Col xs="12" sm="12" md="6">
                  <FormGroup>
                    <Label>Tanggal Receive</Label>
                    <Input type="text" value={this.state.detailDataTO.tanggal_terima_between_transfer} onChange={this.handleChange} disabled={true} />
                  </FormGroup>
                </Col>
                :""
              }
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12">
                <FormGroup>
                  <Label for="addNote">Note</Label>
                  <Input type="textarea" name="addNote" id="addNote" value={this.state.detailDataTO.note_transfer} onChange={this.handleChange} placeholder="Note" disabled={true}  />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000"}}>
              <Col xs="2"><span style={{fontWeight:"bold"}}>KODE BARANG</span></Col>
              <Col xs="6"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
              <Col xs="2"><span style={{fontWeight:"bold"}}>QTY</span></Col>
              <Col xs="2"><span style={{fontWeight:"bold"}}>SATUAN</span></Col>
            </Row>
            <Row style={{height:"30vh",overflowX:"hidden",overflowY:"scroll"}}>
              <Col>
                {this.state.dataTOD.length > 0 && this.state.dataTOD.map((dataTOD,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataTOD.kode_barang}</span></Col>
                    <Col xs="6"><span style={{fontWeight:"bold"}}>{dataTOD.nama_barang}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataTOD.qty}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataTOD.satuan_barang}</span></Col>
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
                      <span style={{fontWeight:"bold"}}>Transfer Out List</span>
                    </Col>
                    <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                      <button className="myBtn" onClick={() => this.modalAddOpen()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <DataTableExtensions
                      columns={columns}
                      data={this.state.dataTransferOut}
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

export default withRouter(connect(mapStateToProps)(transferOut));