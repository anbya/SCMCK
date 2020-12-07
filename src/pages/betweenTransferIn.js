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

class transferIn extends Component {
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
      dataTIN:[],
      dataTOD:[],
      detailDataTO:"",
      buttonEditPrm:false,
      buttonEditText:"Terima transfer ini",
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
    .post(`${process.env.REACT_APP_LINK}/centralkitchen/getTransferinData`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(result => {
      this.setState({
        ...this.state,
        dataTIN: result.data.dataTransferin,
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
    .post(`${process.env.REACT_APP_LINK}/centralkitchen/getTransferinData`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(result => {
      this.setState({
        ...this.state,
        dataTIN: result.data.dataTransferin,
        loading:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  modalEditOpen = async (data) =>  {
    const dataToSend = {
      kodeTO: data.kode_between_transfer
    };
    await axios
    .post(`${process.env.REACT_APP_LINK}/centralkitchen/getDetailTransferoutData`, dataToSend, {
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
      dataToEdit:"",
      dataTOD:[],
      detailDataTO:"",
      buttonEditPrm:false,
      buttonEditText:"Terima transfer ini"
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
  handleChangeDataOrderD = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.dataTOD
    daftarBarang[IdData].qty_receive=event.target.value
    this.setState({
      ...this.state,
      dataTOD: daftarBarang
    });
  }
  terimaPO = () => {
    const dataToSend = {
        KODEEPOH: this.state.detailDataTO.kode_purchase_order_h,
        USER:this.props.userinfo.id_user,
        dataTOD:this.state.dataTOD
    };
    console.log(dataToSend);
    axios
      .post(`${process.env.REACT_APP_LINK}/centralkitchen/receivePO`, dataToSend, {
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
  updateData = () => {
    let PRMOUTLET = localStorage.getItem("outletID")
    const dataToSend = {
      ID:this.state.detailDataTO.kode_between_transfer,
      USER:this.props.userinfo.id_user,
      PRMOUTLET:PRMOUTLET
    };
    this.setState({
      ...this.state,
      buttonEditPrm:true,
      buttonEditText:""
    });
    axios
    .post(`${process.env.REACT_APP_LINK}/centralkitchen/receiveTransferOutCK`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(async result => {
      await this.setState({
        ...this.state,
        buttonEditPrm:false,
        buttonEditText:"Terima transfer ini"
      });
      alert("Transfer out ini berhasil di receive")
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
        <Modal isOpen={this.state.prmModaledit} backdrop={"static"} size="xl">
          <ModalHeader toggle={() => this.modalEditClose()}>Detail Transfer In</ModalHeader>
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
            {
              this.state.detailDataTO.between_transfer_state == "OPEN" ?
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
                    <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                      <span style={{fontWeight:"bold"}}>Transfer In List</span>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <DataTableExtensions
                      columns={columns}
                      data={this.state.dataTIN}
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

export default withRouter(connect(mapStateToProps)(transferIn));