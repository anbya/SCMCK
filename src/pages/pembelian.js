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

class pembelian extends Component {
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
      prmModaledit:false,
      prmBarang:"",
      masterBarangList:[],
      prmOutlet:"",
      masterOutletList:[],
      tambahkodeoutlet:"",
      listAddBarang:[],
      detailbuatpo:"",
      dateForm:"",
      dataPembelianH:[],
      dataPembelianD:[],
      detailDataOrder:"",
      buttonEditPrm:false,
      buttonEditText:"Receive order ini",
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
    .post(`https://api.jaygeegroupapp.com/centralkitchen/getPembelianH`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(result => {
      this.setState({
        ...this.state,
        dataPembelianH: result.data.dataPembelianH,
        loading:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  refreshPageData = async () =>  {
    let prmOUTLET = localStorage.getItem("outletID")
    this.setState({
      ...this.state,
      loading:true,
    });
    const dataToSend = {
      OUTLET: prmOUTLET
    };
    axios
    .post(`https://api.jaygeegroupapp.com/centralkitchen/getPembelianH`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(result => {
      this.setState({
        ...this.state,
        dataPembelianH: result.data.dataPembelianH,
        loading:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  modalAddOpen = async () =>  {
    let prmOUTLET = localStorage.getItem("outletID")
    await this.setState({
      ...this.state,
      loadingParam:"block",
    });
    const dataToSend = {
      OUTLET: prmOUTLET
    };
    axios
    .post(`https://api.jaygeegroupapp.com/centralkitchen/getFormAddOrder`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then( result => {
      this.setState({
        ...this.state,
        prmOutlet: result.data.dataOutlet[0],
        masterBarangList: result.data.dataMasterBarang
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
      listAddBarang:[],
      prmOutlet:"",
      masterOutletList:[],
      tambahkodeoutlet:"",
      dateForm:""
    });
  }
  modalEditOpen = async (data) =>  {
    const dataToSend = {
      kodePembelianH: data.kode_pembelian_h
    };
    await axios
    .post(`https://api.jaygeegroupapp.com/centralkitchen/getDetailPembelian`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then( result => {
      this.setState({
        ...this.state,
        dataPembelianD:result.data.result
      });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({
      ...this.state,
      prmModaledit: true,
      detailDataOrder:data
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
      dataToEdit:"",
      buttonEditPrm:false,
      buttonEditText:"Receive order ini",
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
      } else {
        alert("Item sudah ada di list item pembelian")
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
  }
  handleChange = event =>  {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }
  onSelectChangedMasterOutlet = async (value) => {
    await this.setState({
      ...this.state,
      prmOutlet: value,
      tambahkodeoutlet:value.value
    });
  }
  onSelectChangedMasterBarang = async (value) => {
    await this.setState({
      ...this.state,
      prmBarang: value,
      tambahkodebarang:value.value,
      tambahnamabarang:value.nama_barang,
      tambahsatuanbarang:value.satuan
    });
  }
  submitData = () => {
    let prmOUTLET = localStorage.getItem("outletID")
    const dataToSend = {
        IDOUTLET: prmOUTLET,
        TANGGALBELI: this.state.dateForm,
        USER:this.props.userinfo.id_user,
        ADDDATA: this.state.listAddBarang
    };
    const cekAddData = this.state.listAddBarang.length
    if(dataToSend.IDOUTLET === ""){
      alert("data outlet tidak boleh kosong")
    } else if (cekAddData < 1){
      alert("Data barang tidak boleh kosong")
    }else {
      this.setState({
        ...this.state,
        buttonAddPrm:true,
        buttonAddText:""
      });
      axios
      .post(`https://api.jaygeegroupapp.com/centralkitchen/addDataPembelianCK`, dataToSend, {
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
        // window.open("http://google.com", "_blank")
        this.refreshPageData()
      })
      .catch(error => {
        console.log(error);
        console.log(this.props);
      });
    }
  }
  updateData = () => {
    let PRMOUTLET = localStorage.getItem("outletID")
    const dataToSend = {
      IDDelivery:this.state.detailDataOrder.kode_delivery_order,
      IDOrder:this.state.detailDataOrder.kode_order_h,
      USER:this.props.userinfo.id_user,
      PRMOUTLET:PRMOUTLET
    };
    this.setState({
      ...this.state,
      buttonEditPrm:true,
      buttonEditText:""
    });
    axios
    .post(`https://api.jaygeegroupapp.com/centralkitchen/receiveOrder`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(async result => {
      await this.setState({
        ...this.state,
        buttonEditPrm:false,
        buttonEditText:"Receive order ini",
      });
      alert("Order ini berhasil di receive")
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
        name: 'Nomor pembelian',
        selector: 'nomor_pembelian',
        sortable: true,
      },
      {
        name: 'Tanggal beli',
        selector: 'tanggal_beli',
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
          <ModalHeader toggle={() => this.modalAddClose()}>Form pembelian</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  {/* <Label for="detailbuatpo">Outlet yang mengajukan order</Label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={false}
                    isSearchable={true}
                    name="prmOutlet"
                    value={this.state.prmOutlet}
                    options={this.state.masterOutletList}
                    onChange={this.onSelectChangedMasterOutlet.bind(this)}
                    placeholder="Pilih Outlet yang mengajukan order"
                  /> */}
                  <Label for="detailbuatpo">Outlet</Label>
                  <Input type="text" name="detailbuatpo" id="detailbuatpo" value={this.state.prmOutlet.label} onChange={this.handleChange} placeholder="-" disabled={true} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Tanggal pembelian</Label>
                  <Input type="text" name="detailbuatpo" id="detailbuatpo" value={this.state.dateForm} onChange={this.handleChange} placeholder="-" disabled={true} />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:10}}>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                    <Label for="detailbuatpo">Item</Label>
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
              <Col xs="12" sm="12" md="2">
                <FormGroup>
                    <Label for="detailbuatpo">Qty</Label>
                    <Input type="number" name="tambahqtybarang" id="tambahqtybarang" value={this.state.tambahqtybarang} onChange={this.handleChange} placeholder="Qty" min="0" />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <FormGroup>
                    <Label for="satuan">Satuan</Label>
                    <Input type="text" name="satuan" id="satuan" value={this.state.prmBarang.satuan == undefined?"---":this.state.prmBarang.satuan} placeholder="Tanggal buat PO" disabled={true} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="2">
                <FormGroup>
                    <Label for="detailbuatpo">Harga</Label>
                    <Input type="number" name="tambahhargabarang" id="tambahhargabarang" value={this.state.tambahhargabarang} onChange={this.handleChange} placeholder="Harga" min="0" />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{backgroundColor:"#f7f7f7",paddingBottom:10}}>
              <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Button block={true} color="success" onClick={() => this.addData()}>
                  Add
                </Button>
              </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000"}}>
              <Col>
                <Row>
                  <Col xs="5"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>QTY</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>SATUAN</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>HARGA</span></Col>
                  <Col xs="1"><span style={{fontWeight:"bold"}}>TOOL</span></Col>
                </Row>
              </Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.listAddBarang.length > 0 && this.state.listAddBarang.map((listAddBarang,index) =>
                  <Row key={index}>
                    <Col xs="5"><span style={{fontWeight:"bold"}}>{listAddBarang.nama_barang}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarang.qty}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarang.satuan}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarang.harga}</span></Col>
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
          <ModalHeader toggle={() => this.modalEditClose()}>Detail Pembelian</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label>Nomor Pembelian</Label>
                  <Input type="text" value={this.state.detailDataOrder.nomor_pembelian} onChange={this.handleChange} disabled={true} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label>Tanggal Pembelian</Label>
                  <Input type="text" value={this.state.detailDataOrder.tanggal_beli} onChange={this.handleChange} disabled={true} />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000"}}>
              <Col xs="2"><span style={{fontWeight:"bold"}}>KODE BARANG</span></Col>
              <Col xs="4"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
              <Col xs="2"><span style={{fontWeight:"bold"}}>QTY</span></Col>
              <Col xs="2"><span style={{fontWeight:"bold"}}>SATUAN</span></Col>
              <Col xs="2"><span style={{fontWeight:"bold"}}>HARGA</span></Col>
            </Row>
            <Row style={{height:"30vh",overflowX:"hidden",overflowY:"scroll"}}>
              <Col>
                {this.state.dataPembelianD.length > 0 && this.state.dataPembelianD.map((dataPembelianD,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataPembelianD.kode_barang}</span></Col>
                    <Col xs="4"><span style={{fontWeight:"bold"}}>{dataPembelianD.nama_barang}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataPembelianD.qty}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataPembelianD.satuan_barang}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataPembelianD.harga}</span></Col>
                  </Row>
                )}
              </Col>
            </Row>
            {
              this.state.detailDataOrder.status_order == "SEND" ?
              <Row>
                <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <Button color="success" block={true} onClick={() => { if (window.confirm('Apakah anda yakin akan mereceive order ini ?')) this.updateData() } }>
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
              </Row>
              :""
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
                      <span style={{fontWeight:"bold"}}>List Pembelian</span>
                    </Col>
                    <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                      <button className="myBtn" onClick={() => this.modalAddOpen()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <DataTableExtensions
                      columns={columns}
                      data={this.state.dataPembelianH}
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

export default withRouter(connect(mapStateToProps)(pembelian));