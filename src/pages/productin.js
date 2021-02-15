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

class productIn extends Component {
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
      tambahsatuanbarang:"",
      tambahqtybarang:"",
      tambahhargabarang:"",
      prmModaledit:false,
      prmmasterBarangList:[],
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
      dataPOH:[],
      dataPOD:[],
      detailDataPO:"",
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
        .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/getPOData`)
    .then(result => {
      this.setState({
        ...this.state,
        dataPOH: result.data.dataPOH,
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
        .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/getPOData`)
    .then(result => {
      this.setState({
        ...this.state,
        dataPOH: result.data.dataPOH,
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
    let APIroute = localStorage.getItem("APIROUTE")
        axios
        .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/getFormPOData`)
    .then( result => {
      this.setState({
        ...this.state,
        masterVendorList: result.data.dataVendor,
        prmmasterBarangList: result.data.dataMasterBarang,
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
      listAddBarang:[],
      prmOutlet:"",
      tambahkodeoutlet:"",
      dateForm:dateToForm,
      tambahParameterPajak:""
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
      tambahParameterPajak:""
    });
  }
  modalEditOpen = async (data) =>  {
    const dataToSend = {
      kodePOH: data.kode_purchase_order_h
    };
        axios
        .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/getDetailPOData`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then( result => {
      this.setState({
        ...this.state,
        dataPOD:result.data.dataPOD
      });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({
      ...this.state,
      prmModaledit: true,
      detailDataPO:data
    });
  }
  modalEditClose = () =>  {
    this.setState({
      ...this.state,
      prmModaledit: false,
      buttonEditPrm:false,
      buttonEditText:"CANCEL",
      editnamabarang:"",
      editsatuanbarang:"",
      dataToEdit:""
    });
  }
  addData = async () => {
    if(this.state.tambahkodebarang === "" || this.state.tambahqtybarang === "" || this.state.tambahhargabarang === ""){
      alert("barang, qty dan harga barang tidak boleh kosong")
    } else {
      let daftarBarang = this.state.listAddBarang
      let resultChecked = daftarBarang.find(o => o.kode_barang === `${this.state.tambahkodebarang}`);
      if(resultChecked===undefined){
        let dataTopush = {kode_barang:`${this.state.tambahkodebarang}`,nama_barang:`${this.state.tambahnamabarang}`,qty:`${this.state.tambahqtybarang}`,satuan:`${this.state.tambahsatuanbarang}`,harga:`${this.state.tambahhargabarang}`}
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
        let indexArray = daftarBarang.findIndex(x => x.kode_barang === `${this.state.tambahkodebarang}`);
        let qtyAwal = daftarBarang[indexArray].qty
        let qtyAkhir = parseInt(qtyAwal)+parseInt(this.state.tambahqtybarang)
        daftarBarang[indexArray].qty=qtyAkhir
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
      tambahsatuanbarang:value.unit,
      tambahhargabarang:value.harga_barang
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
    const dataToSend = {
      VENDORCODE: this.state.tambahkodevendor,
      OUTLETCODE: this.state.tambahkodeoutlet,
      PAJAK: this.state.tambahParameterPajak,
      TANGGALPO: this.state.dateForm,
      TOTALPURCHASE: this.state.totalPembelian,
      USER:this.props.userinfo.id_user,
      ADDDATA: this.state.listAddBarang,
      TANGGALKIRIM: this.state.tanggalKirim
    };
    const cekAddData = this.state.listAddBarang.length
    if(dataToSend.VENDORCODE === ""){
      alert("Data vendor tidak boleh kosong")
    } else if (cekAddData < 1){
      alert("Data barang tidak boleh kosong")
    } else if (this.state.tambahkodeoutlet === ""){
      alert("Lokasi pengiriman tidak boleh kosong")
    } else if (this.state.tambahParameterPajak === ""){
      alert("Parameter pajak tidak boleh kosong")
    }else {
      this.setState({
        ...this.state,
        buttonAddPrm:true,
        buttonAddText:""
      });
      axios
      .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/addFormPOData`, dataToSend, {
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
        window.open(`${process.env.REACT_APP_PRINT}/#/purchaseOrderPrint?ID=${result.data.id_po_h}`, "_blank")
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
  updateData = () => {
    this.setState({
      ...this.state,
      buttonEditPrm:true,
      buttonEditText:""
    });
    const dataToSend = {
      IDPO:this.state.detailDataPO.kode_purchase_order_h
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
  render() {
    const DataButton = (data) => (
      <div>
        <button className="myBtn" onClick={()=> this.modalEditOpen(data)}><i className="fa fa-search fa-2x" aria-hidden="true"></i></button>
      </div>
    );
    const columns = [
      {
        name: 'Nomor PO',
        selector: 'nomor_po',
        sortable: true,
      },
      {
        name: 'Tanggal buat',
        selector: 'tanggal_buat',
        sortable: true,
      },
      {
        name: 'Vendor',
        selector: 'nama_vendor',
        sortable: true,
      },
      {
        name: 'Total pembelian',
        selector: 'jumlah_pembelian',
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
          <ModalHeader toggle={() => this.modalAddClose()}>Form pembuatan purchase order</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Tanggal buat PO</Label>
                  <Input type="text" name="detailbuatpo" id="detailbuatpo" value={this.state.dateForm} onChange={this.handleChange} placeholder="Tanggal buat PO" disabled={true} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Vendor</Label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={false}
                    isSearchable={true}
                    name="prmVendor"
                    value={this.state.prmVendor}
                    options={this.state.masterVendorList}
                    onChange={this.onSelectChangedMasterVendor.bind(this)}
                    placeholder="Pilih Vendor"
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Lokasi pengiriman</Label>
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
              <Col xs="12" sm="12" md="3">
                <FormGroup>
                  <Label for="tambahParameterPajak">Pajak</Label>
                    <Input type="select" name="tambahParameterPajak" id="tambahParameterPajak" value={this.state.tambahParameterPajak}  onChange={this.handleChange}>
                      <option value="">Pilih parameter pajak</option>
                      <option value="YES">DENGAN PAJAK</option>
                      <option value="NO">TANPA PAJAK</option>
                    </Input>
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="3">
                <FormGroup>
                  <Label for="detailbuatpo">Tanggal kirim</Label>
                  <br></br>
                  <DatePicker
                    selected={this.state.tanggalKirim}
                    onChange={this.datepickerHandleChange}
                    dateFormat="dd-MMMM-yyyy"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:10,paddingBottom:10}}>
              <Col xs="12" sm="12" md="4">
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
              <Col xs="12" sm="12" md="2">
                <Input type="number" name="tambahqtybarang" id="tambahqtybarang" value={this.state.tambahqtybarang} onChange={this.handleChange} placeholder="Qty" min="0" />
              </Col>
              <Col xs="12" sm="12" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
              <span style={{fontWeight:"bold"}}>{this.state.prmBarang.unit == undefined?"---":this.state.prmBarang.unit}</span>
              </Col>
              <Col xs="12" sm="12" md="3">
                <Input type="number" name="tambahhargabarang" id="tambahhargabarang" value={this.state.tambahhargabarang} onChange={this.handleChange} placeholder="Harga perunit" min="0"/>
              </Col>
              <Col xs="12" sm="12" md="1" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Button color="success" onClick={() => this.addData()}>
                  Add
                </Button>
              </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000"}}>
              <Col>
                <Row>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>KODE BARANG</span></Col>
                  <Col xs="5"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
                  <Col xs="1"><span style={{fontWeight:"bold"}}>QTY</span></Col>
                  <Col xs="1"><span style={{fontWeight:"bold"}}>UNIT</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>HARGA</span></Col>
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
                    <Col xs="1"><span style={{fontWeight:"bold"}}>{listAddBarang.qty}</span></Col>
                    <Col xs="1"><span style={{fontWeight:"bold"}}>{listAddBarang.satuan}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarang.harga}</span></Col>
                    <Col xs="1">
                      <button className="myBtn" onClick={() => this.eraseAddData(index)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:"3vh",paddingBottom:"3vh"}}>
              <Col xs="12" sm="12" md="9">
              </Col>
              <Col xs="12" sm="12" md="3">
                  <Row>
                      <Col>
                        <span style={{fontWeight:"bold"}}>Total Pembelian : {this.state.totalPembelian}</span>
                      </Col>
                  </Row>
                  <Row>
                      <Col>
                        <span style={{fontWeight:"bold"}}>ppn 10% : {this.state.tambahParameterPajak == "YES" ? Math.round(this.state.totalPembelian*1.1-this.state.totalPembelian) : 0}</span>
                      </Col>
                  </Row>
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
          <ModalHeader toggle={() => this.modalEditClose()}>Detail PO</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label>Nomor PO</Label>
                  <Input type="text" value={this.state.detailDataPO.nomor_po} onChange={this.handleChange} disabled={true} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label>Tanggal buat PO</Label>
                  <Input type="text" value={this.state.detailDataPO.tanggal_buat} onChange={this.handleChange} disabled={true} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="6">
              </Col>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Vendor</Label>
                  <Input type="text" value={this.state.detailDataPO.nama_vendor} onChange={this.handleChange} disabled={true} />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000"}}>
              <Col xs="2"><span style={{fontWeight:"bold"}}>KODE BARANG</span></Col>
              <Col xs="6"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
              <Col xs="1"><span style={{fontWeight:"bold",padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}>QTY</span></Col>
              <Col xs="1"><span style={{fontWeight:"bold",padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}>SATUAN</span></Col>
              <Col xs="2"><span style={{fontWeight:"bold",padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}>HARGA</span></Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.dataPOD.length > 0 && this.state.dataPOD.map((dataPOD,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataPOD.kode_barang}</span></Col>
                    <Col xs="6"><span style={{fontWeight:"bold"}}>{dataPOD.nama_barang}</span></Col>
                    <Col xs="1"><span style={{fontWeight:"bold",padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}>{dataPOD.qty}</span></Col>
                    <Col xs="1"><span style={{fontWeight:"bold",padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}>{dataPOD.unit_barang}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold",padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}>{dataPOD.harga}</span></Col>
                  </Row>
                )}
              </Col>
            </Row>
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:"3vh",paddingBottom:"3vh"}}>
              <Col xs="12" sm="12" md="6">
              </Col>
              <Col xs="12" sm="12" md="6">
                  <Row>
                      <Col>
                        <span style={{fontWeight:"bold"}}>Total Pembelian : {this.state.detailDataPO.jumlah_pembelian}</span>
                      </Col>
                  </Row>
                  <Row>
                      <Col>
                        <span style={{fontWeight:"bold"}}>ppn 10% : {this.state.detailDataPO.taxParameter == "YES" ? Math.round(this.state.detailDataPO.jumlah_pembelian*1.1-this.state.detailDataPO.jumlah_pembelian) : 0}</span>
                      </Col>
                  </Row>
              </Col>
            </Row>
            {this.state.detailDataPO.tanggal_masuk_barang==""?
            <Row>
              <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Button color="danger" block={true} onClick={() => { if (window.confirm('Apakah anda yakin akan cancel data PO ini ?')) this.updateData() } }>
                  <ScaleLoader
                    height={18}
                    width={4}
                    radius={2}
                    margin={2}
                    color={'#FFFFFF'}
                    loading={this.state.buttonEditPrm}
                  />
                  {this.state.buttonEditText}
                </Button>
              </Col>
            </Row>:""
            }
          </ModalBody>
        </Modal>
        <Container fluid={true} style={{paddingBottom:30}}>
          <Row>
            <Col xs="12" sm="12" md="12">
              <div className="card" style={{marginTop:15}}>
                <div className="card-header">
                  <Row>
                    <Col xs="10" sm="10" md="10" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                      <span style={{fontWeight:"bold"}}>Daftar purchase order</span>
                    </Col>
                    <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                      <button className="myBtn" onClick={() => this.modalAddOpen()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <DataTableExtensions
                      columns={columns}
                      data={this.state.dataPOH}
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

export default withRouter(connect(mapStateToProps)(productIn));