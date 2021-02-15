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

class receivepopage extends Component {
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
      tambahqtybarang:"",
      tambahhargabarang:"",
      prmModaledit:false,
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
      detailDataPO:""
    };
  }
  componentDidMount = () =>  {
    this.setState({
      ...this.state,
      loading:true,
    });
        axios
        .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/getOpenPOData`)
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
        .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/getOpenPOData`)
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
  modalEditOpen = async (data) =>  {
    const dataToSend = {
      kodePOH: data.kode_purchase_order_h
    };
    let APIroute = localStorage.getItem("APIROUTE")
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
      buttonEditText:"Save",
      editnamabarang:"",
      editsatuanbarang:"",
      dataToEdit:"",
      dataPOD:[],
      detailDataPO:""
    });
  }
  handleChange = event =>  {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
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
  handleChangeUnitReceive = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.dataPOD
    daftarBarang[IdData].unit_receive=event.target.value
    let unitReceive = event.target.value==""?0:parseInt(event.target.value)
    let satuanReceive = daftarBarang[IdData].satua_receive==""?0:parseInt(daftarBarang[IdData].satua_receive)
    daftarBarang[IdData].qty_receive=parseInt(satuanReceive)+(parseInt(unitReceive)*parseInt(daftarBarang[IdData].konversi_barang))
    this.setState({
      ...this.state,
      dataPOD: daftarBarang
    });
  }
  handleChangeSatuanReceive = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.dataPOD
    let maxSatuan = parseInt(daftarBarang[IdData].konversi_barang)-1
    if(event.target.value>maxSatuan){
      alert("angka yang anda input melebihi batas satuan")
    } else{
      daftarBarang[IdData].satua_receive=event.target.value
      let unitReceive = daftarBarang[IdData].unit_receive==""?0:parseInt(daftarBarang[IdData].unit_receive)
      let satuanReceive = event.target.value==""?0:parseInt(event.target.value)
      daftarBarang[IdData].qty_receive=parseInt(satuanReceive)+(parseInt(unitReceive)*parseInt(daftarBarang[IdData].konversi_barang))
      this.setState({
        ...this.state,
        dataPOD: daftarBarang
      });
    }
  }
  terimaPO = () => {
    const dataToSend = {
        KODEEPOH: this.state.detailDataPO.kode_purchase_order_h,
        PRMPAJAK: this.state.detailDataPO.taxParameter,
        USER:this.props.userinfo.id_user,
        DATAPOD:this.state.dataPOD
    };
    console.log(dataToSend);
    axios
    .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/receivePO`, dataToSend, {
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
    })
    .then(async result => {
        alert("PO berhasil diterima")
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
        name: 'Tool',
        button: true,
        cell: row => DataButton(row),
      },
    ];
    return (
      <div>
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
              <Col xs="4"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
              <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}><span style={{fontWeight:"bold"}}>QTY</span></Col>
              <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}><span style={{fontWeight:"bold"}}>UNIT Received</span></Col>
              <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}><span style={{fontWeight:"bold"}}>SATUAN Received</span></Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.dataPOD.length > 0 && this.state.dataPOD.map((dataPOD,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataPOD.kode_barang}</span></Col>
                    <Col xs="4"><span style={{fontWeight:"bold"}}>{dataPOD.nama_barang}</span></Col>
                    <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}><span style={{fontWeight:"bold"}}>{dataPOD.qty}{dataPOD.unit_barang}</span></Col>
                    <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <InputGroup>
                        <Input type="number" name={`${index}`} id={`${index}`} value={dataPOD.unit_receive} onChange={this.handleChangeUnitReceive} min="0" />
                        <InputGroupAddon addonType="append">
                          <InputGroupText><span style={{fontWeight:"bold"}}>{dataPOD.unit_barang}</span></InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                    <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <InputGroup>
                        <Input type="number" name={`${index}`} id={`${index}`} value={dataPOD.satua_receive} onChange={this.handleChangeSatuanReceive} min="0" max={dataPOD.konversi_barang-1} />
                        <InputGroupAddon addonType="append">
                          <InputGroupText><span style={{fontWeight:"bold"}}>{dataPOD.satuan_barang}</span></InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
            <Row style={{paddingBottom:30}}>
              <Col>
                <button className="my-btn full-widht" onClick={(e) => { if (window.confirm('Apakah anda yakin akan menerima PO ini ?')) this.terimaPO(e) } }>Terima PO ini</button>
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
                    <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                      <span style={{fontWeight:"bold"}}>Daftar PO yang belum di terima</span>
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

export default withRouter(connect(mapStateToProps)(receivepopage));