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

class order extends Component {
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
      prmModaledit:false,
      prmBarang:"",
      masterBarangList:[],
      prmOutlet:"",
      masterOutletList:[],
      tambahkodeoutlet:"",
      listAddBarang:[],
      detailbuatpo:"",
      dateForm:"",
      dataOrderH:[],
      dataOrderD:[],
      detailDataOrder:""
    };
  }
  componentDidMount = () =>  {
    this.setState({
      ...this.state,
      loading:true,
    });
    axios
    .get(`${process.env.REACT_APP_LINK}/centralkitchen/getOrderData`)
    .then(result => {
      this.setState({
        ...this.state,
        dataOrderH: result.data.dataOrderH,
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
    axios
    .get(`${process.env.REACT_APP_LINK}/centralkitchen/getOrderData`)
    .then(result => {
      this.setState({
        ...this.state,
        dataOrderH: result.data.dataOrderH,
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
    await axios
    .get(`${process.env.REACT_APP_LINK}/centralkitchen/getFormAddOrder`)
    .then( result => {
      this.setState({
        ...this.state,
        masterOutletList: result.data.dataOutlet,
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
      listAddBarang:[],
      prmOutlet:"",
      masterOutletList:[],
      tambahkodeoutlet:"",
      dateForm:""
    });
  }
  modalEditOpen = async (data) =>  {
    const dataToSend = {
      kodeOrderH: data.kode_order_h
    };
    await axios
    .post(`${process.env.REACT_APP_LINK}/centralkitchen/getDetailOrderData`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then( result => {
      this.setState({
        ...this.state,
        dataOrderD:result.data.result
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
      dataToEdit:""
    });
  }
  addData = async () => {
    if(this.state.tambahkodebarang === "" || this.state.tambahqtybarang === ""){
      alert("barang, qty dan harga barang tidak boleh kosong")
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
          prmBarang:""
        });
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
      tambahnamabarang:value.label,
      tambahsatuanbarang:value.satuan
    });
  }
  submitData = () => {
    const dataToSend = {
        IDOUTLET: this.state.tambahkodeoutlet,
        TANGGALORDER: this.state.dateForm,
        USER:this.props.userinfo.id_user,
        ADDDATA: this.state.listAddBarang
    };
    const cekAddData = this.state.listAddBarang.length
    if(dataToSend.OUTLETCODE === ""){
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
      .post(`${process.env.REACT_APP_LINK}/centralkitchen/addFormOrderData`, dataToSend, {
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
        window.open("http://google.com", "_blank")
        this.refreshPageData()
      })
      .catch(error => {
        console.log(error);
        console.log(this.props);
      });
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
        name: 'Nomor order',
        selector: 'nomor_order',
        sortable: true,
      },
      {
        name: 'Tanggal buat',
        selector: 'tanggal_buat',
        sortable: true,
      },
      {
        name: 'Outlet',
        selector: 'nama_outlet',
        sortable: true,
      },
      {
        name: 'Status order',
        selector: 'status_order',
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
          <ModalHeader toggle={() => this.modalAddClose()}>Form pengajuan order</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Outlet yang mengajukan order</Label>
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
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Tanggal buat order</Label>
                  <Input type="text" name="detailbuatpo" id="detailbuatpo" value={this.state.dateForm} onChange={this.handleChange} placeholder="Tanggal buat PO" disabled={true} />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:10,paddingBottom:10}}>
              <Col xs="12" sm="12" md="5">
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
              <Col xs="12" sm="12" md="5">
                <Input type="number" name="tambahqtybarang" id="tambahqtybarang" value={this.state.tambahqtybarang} onChange={this.handleChange} placeholder="Qty" min="0" />
              </Col>
              <Col xs="12" sm="12" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
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
                  <Col xs="2"><span style={{fontWeight:"bold"}}>QTY</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>SATUAN</span></Col>
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
          <ModalHeader toggle={() => this.modalEditClose()}>Detail ORDER</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label>Nomor order</Label>
                  <Input type="text" value={this.state.detailDataOrder.nomor_order} onChange={this.handleChange} disabled={true} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label>Tanggal buat order</Label>
                  <Input type="text" value={this.state.detailDataOrder.tanggal_buat} onChange={this.handleChange} disabled={true} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="6">
              </Col>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Outlet yang mengajukan order</Label>
                  <Input type="text" value={this.state.detailDataOrder.nama_outlet} onChange={this.handleChange} disabled={true} />
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
                {this.state.dataOrderD.length > 0 && this.state.dataOrderD.map((dataOrderD,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataOrderD.kode_barang}</span></Col>
                    <Col xs="6"><span style={{fontWeight:"bold"}}>{dataOrderD.nama_barang}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataOrderD.qty_req}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataOrderD.satuan_barang}</span></Col>
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
                      <span style={{fontWeight:"bold"}}>List Order</span>
                    </Col>
                    <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                      <button className="myBtn" onClick={() => this.modalAddOpen()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <DataTableExtensions
                      columns={columns}
                      data={this.state.dataOrderH}
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

export default withRouter(connect(mapStateToProps)(order));