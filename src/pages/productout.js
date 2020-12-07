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

class productout extends Component {
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
      buttonAddText:"Proses delivery order",
      prmModaledit:false,
      prmOrder:"",
      masterOrderList:[],
      tambahkodeOrder:"",
      kodeOrderh:"",
      dataOrderD:[],
      dateForm:"",
      dataDeliveryOrderH:[],
      dataDeliveryOrderD:[],
      detailDataDeliveryOrder:"",
      // state detail delivery order
      detailViewOutletTujuan:"",
      detailViewNomorDO:"",
      detailViewTanggalPengiriman:"",
      detailViewNomorOrder:"",
      detailViewTanggalOrder:"",
      detailViewDataDO:[],
    };
  }
  componentDidMount = () =>  {
    this.setState({
      ...this.state,
      loading:true,
    });
    axios
    .get(`${process.env.REACT_APP_LINK}/centralkitchen/getDeliveryOrderData`)
    .then(result => {
      this.setState({
        ...this.state,
        dataDeliveryOrderH: result.data.dataDeliveryOrderH,
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
    .get(`${process.env.REACT_APP_LINK}/centralkitchen/getDeliveryOrderData`)
    .then(result => {
      this.setState({
        ...this.state,
        dataDeliveryOrderH: result.data.dataDeliveryOrderH,
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
    .get(`${process.env.REACT_APP_LINK}/centralkitchen/getOrderOption`)
    .then( result => {
      this.setState({
        ...this.state,
        masterOrderList: result.data.dataToShow
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
      dataOrderD:[],
      dateForm:dateToForm
    });
  }
  modalAddClose = () =>  {
    this.setState({
      ...this.state,
      prmModaladd: false,
      buttonAddPrm:false,
      buttonAddText:"Proses delivery order",
      prmBarang:"",
      masterBarangList: [],
      tambahkodebarang:"",
      tambahnamabarang:"",
      tambahsatuanbarang:"",
      tambahqtybarang:"",
      tambahhargabarang:"",
      dataOrderD:[],
      prmOrder:"",
      masterOrderList:[],
      tambahkodeOrder:"",
      dateForm:"",
      kodeOrderh:"",
    });
  }
  modalEditOpen = async (data) =>  {
    await this.setState({
      ...this.state,
      loadingParam:"block",
    });
    const dataToSend = {
      KODEDO: data.kode_delivery_order
    };
    await axios
    .post(`${process.env.REACT_APP_LINK}/centralkitchen/getDeliveryOrderDetail`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then( async result => {
      console.log();
      await this.setState({
        ...this.state,
        prmModaledit: true,
        // state detail delivery order
        detailViewOutletTujuan:result.data.outlet_tujuan,
        detailViewNomorDO:result.data.nomor_delivery_order,
        detailViewTanggalPengiriman:result.data.tanggal_kirim,
        detailViewNomorOrder:result.data.nomor_order,
        detailViewTanggalOrder:result.data.tanggal_order,
        detailViewDataDO:result.data.dataDeliveryOrderD,
      });
      await this.setState({
        ...this.state,
        loadingParam:"none"
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  modalEditClose = () =>  {
    this.setState({
      ...this.state,
      prmModaledit: false,
      // state detail delivery order
      detailViewOutletTujuan:"",
      detailViewNomorDO:"",
      detailViewTanggalPengiriman:"",
      detailViewNomorOrder:"",
      detailViewTanggalOrder:"",
      detailViewDataDO:[],
    });
  }
  addData = async () => {
    if(this.state.tambahkodebarang === "" || this.state.tambahqtybarang === "" || this.state.tambahhargabarang === ""){
      alert("barang, qty dan harga barang tidak boleh kosong")
    } else {
      let daftarBarang = this.state.dataOrderD
      let resultChecked = daftarBarang.find(o => o.kode_barang === `${this.state.tambahkodebarang}`);
      if(resultChecked===undefined){
        let dataTopush = {kode_barang:`${this.state.tambahkodebarang}`,nama_barang:`${this.state.tambahnamabarang}`,qty:`${this.state.tambahqtybarang}`,satuan:`${this.state.tambahsatuanbarang}`,harga:`${this.state.tambahhargabarang}`}
        await daftarBarang.push(dataTopush)
        await this.setState({
          ...this.state,
          dataOrderD: daftarBarang,
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
          dataOrderD: daftarBarang,
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
    let daftarBarang = this.state.dataOrderD
    await daftarBarang.splice(keyArray, 1)
    await this.setState({
      ...this.state,
      dataOrderD: daftarBarang
    });
    this.hitungTotal()
  }
  // minusOrderData = async (keyArray) => {
  //   let daftarBarang = this.state.dataOrderD
  //   let qtyAwal = daftarBarang[keyArray].qty_send
  //   if(qtyAwal>0){
  //     let qtyAkhir = parseInt(qtyAwal)-1
  //     daftarBarang[keyArray].qty_send=qtyAkhir
  //     this.setState({
  //       ...this.state,
  //       dataOrderD: daftarBarang
  //     });
  //   }
  // }
  // plusOrderData = async (keyArray) => {
  //   let daftarBarang = this.state.dataOrderD
  //   let qtyAwal = daftarBarang[keyArray].qty_send
  //   let qtyAkhir = parseInt(qtyAwal)+1
  //   daftarBarang[keyArray].qty_send=qtyAkhir
  //   this.setState({
  //     ...this.state,
  //     dataOrderD: daftarBarang
  //   });
  // }
  handleChange = event =>  {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }
  handleChangeDataOrderD = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.dataOrderD
    let maxSend = daftarBarang[IdData].qty_in_inventory
    if(parseInt(event.target.value) > parseInt(maxSend)){
      alert("jumlah yang di input melebihi stok")
    } else {
      daftarBarang[IdData].qty_send=event.target.value
      this.setState({
        ...this.state,
        dataOrderD: daftarBarang
      });
    }
  }
  onSelectChangedMasterOrder = async (value) => {
    const dataToSend = {
      kodeOrderH:value.value
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
        kodeOrderh:value.value,
        prmOrder: value,
        dataOrderD:result.data.orderList
      });
    })
    .catch(error => {
      console.log(error);
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
  hitungTotal = () => {
    let daftarBarang = this.state.dataOrderD
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
  handleChangeunitSend = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.dataOrderD
    daftarBarang[IdData].unit_qty_send=event.target.value
    let unitSend = event.target.value==""?0:parseInt(event.target.value)
    let satuanSend = daftarBarang[IdData].satuan_qty_send==""?0:parseInt(daftarBarang[IdData].satuan_qty_send)
    daftarBarang[IdData].qty_send=parseInt(satuanSend)+(parseInt(unitSend)*parseInt(daftarBarang[IdData].konversi_barang))
    if(daftarBarang[IdData].qty_send>parseInt(daftarBarang[IdData].qty_in_inventory)){
      alert("qty yang anda input melebihi stok")
    } else {
      this.setState({
        ...this.state,
        dataOrderD: daftarBarang
      });
    }
  }
  handleChangesatuanSend = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.dataOrderD
    let maxSatuan = parseInt(daftarBarang[IdData].konversi_barang)-1
    if(event.target.value>maxSatuan){
      alert("angka yang anda input melebihi batas satuan")
    } else{
      daftarBarang[IdData].satuan_qty_send=event.target.value
      let unitSend = daftarBarang[IdData].unit_qty_send==""?0:parseInt(daftarBarang[IdData].unit_qty_send)
      let satuanSend = event.target.value==""?0:parseInt(event.target.value)
      daftarBarang[IdData].qty_send=parseInt(satuanSend)+(parseInt(unitSend)*parseInt(daftarBarang[IdData].konversi_barang))
      if(daftarBarang[IdData].qty_send>parseInt(daftarBarang[IdData].qty_in_inventory)){
        alert("qty yang anda input melebihi stok")
      } else {
        this.setState({
          ...this.state,
          dataOrderD: daftarBarang
        });
      }
    }
  }
  submitData = () => {
    const dataToSend = {
      TANNGALKIRIM:this.state.dateForm,
      USER:this.props.userinfo.id_user,
      KODEORDER:this.state.kodeOrderh,
      DATAORDERD:this.state.dataOrderD
    };
    if(this.state.prmOrder === ""){
      alert("Data order tidak boleh kosong")
    } else {
      this.setState({
        ...this.state,
        buttonAddPrm:true,
        buttonAddText:""
      });
      axios
      .post(`${process.env.REACT_APP_LINK}/centralkitchen/addFormDeliveryOrder`, dataToSend, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(async result => {
        await this.setState({
          ...this.state,
          buttonAddPrm:false,
          buttonAddText:"Proses delivery order",
        });
        alert("data berhasil Ditambahkan")
        await this.modalAddClose()
        window.open(`${process.env.REACT_APP_PRINT}/deliveryOrderPrint?ID=${result.data.kodeDeliveryOrderH}`, "_blank")
        this.refreshPageData()
      })
      .catch(error => {
        console.log(error);
        console.log(this.props);
      });
    }
  }
  render() {
    console.log(this.state.dataOrderD);
    const DataButton = (data) => (
      <div>
        <button className="myBtn" onClick={()=> this.modalEditOpen(data)}><i className="fa fa-search fa-2x" aria-hidden="true"></i></button>
      </div>
    );
    const columns = [
      {
        name: 'Nomor Delivery Order',
        selector: 'nomor_delivery_order',
        sortable: true,
      },
      {
        name: 'Tanggal Kirim',
        selector: 'tanggal_kirim',
        sortable: true,
      },
      {
        name: 'Nomor Order',
        selector: 'nomor_order',
        sortable: true,
      },
      {
        name: 'Outlet Tujuan',
        selector: 'outlet_tujuan',
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
          <ModalHeader toggle={() => this.modalAddClose()}>Form pembuatan delivery order</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="4">
                <FormGroup>
                  <Label for="detailbuatpo">Tanggal buat delivery order</Label>
                  <Input type="text" name="detailbuatpo" id="detailbuatpo" value={this.state.dateForm} onChange={this.handleChange} placeholder="Tanggal buat delivery order" disabled={true} />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="8">
                <FormGroup>
                  <Label for="detailbuatpo">Daftar order</Label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={false}
                    isSearchable={true}
                    name="prmOrder"
                    value={this.state.prmOrder}
                    options={this.state.masterOrderList}
                    onChange={this.onSelectChangedMasterOrder.bind(this)}
                    placeholder="Pilih data order"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000"}}>
              <Col xs="2"><span style={{fontWeight:"bold"}}>KODE BARANG</span></Col>
              <Col xs="2"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
              <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}><span style={{fontWeight:"bold"}}>QTY REQ</span></Col>
              <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}><span style={{fontWeight:"bold"}}>QTY STOK</span></Col>
              <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}><span style={{fontWeight:"bold"}}>UNIT SEND</span></Col>
              <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}><span style={{fontWeight:"bold"}}>SATUAN SEND</span></Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.dataOrderD.length > 0 && this.state.dataOrderD.map((dataOrderD,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataOrderD.kode_barang}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataOrderD.nama_barang}</span></Col>
                    <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}><span style={{fontWeight:"bold"}}>{`${dataOrderD.qty_req_ToShow} ${dataOrderD.unit_barang}.${dataOrderD.satuan_barang}`}</span></Col>
                    <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}><span style={{fontWeight:"bold"}}>{`${dataOrderD.qty_in_inventory_ToShow} ${dataOrderD.unit_barang}.${dataOrderD.satuan_barang}`}</span></Col>
                    <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <InputGroup>
                        <Input type="number" name={`${index}`} id={`${index}`} value={dataOrderD.unit_qty_send} onChange={this.handleChangeunitSend} min="0" />
                        <InputGroupAddon addonType="append">
                          <InputGroupText><span style={{fontWeight:"bold"}}>{dataOrderD.unit_barang}</span></InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                    <Col xs="2" style={{padding:0,display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <InputGroup>
                      <Input type="number" name={`${index}`} id={`${index}`} value={dataOrderD.satuan_qty_send} onChange={this.handleChangesatuanSend} min="0" max={dataOrderD.konversi_barang-1} />
                        <InputGroupAddon addonType="append">
                          <InputGroupText><span style={{fontWeight:"bold"}}>{dataOrderD.satuan_barang}</span></InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button className="myBtn" onClick={() => 
            window.open(`${process.env.REACT_APP_PRINT}/prepareDeliveryOrderPrint?ID=${this.state.kodeOrderh}`, "_blank")
            } style={{visibility:this.state.dataOrderD.length > 0?"visible":"hidden"}}>
              <i className="fa fa-print fa-2x" aria-hidden="true"></i>
            </button>
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
          <ModalHeader toggle={() => this.modalEditClose()}>Detail Delivery Order</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="2">
                <span style={{fontWeight:"bold"}}>Outlet Tujuan</span>
              </Col>
              <Col xs="12" sm="12" md="4">
                <span style={{fontWeight:"bold"}}>: {this.state.detailViewOutletTujuan}</span>
              </Col>
              <Col xs="12" sm="12" md="2">
                <span style={{fontWeight:"bold"}}>Nomor Order</span>
              </Col>
              <Col xs="12" sm="12" md="4">
                <span style={{fontWeight:"bold"}}>:  {this.state.detailViewNomorOrder}</span>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="2">
                <span style={{fontWeight:"bold"}}>Nomor DO</span>
              </Col>
              <Col xs="12" sm="12" md="4">
                <span style={{fontWeight:"bold"}}>:  {this.state.detailViewNomorDO}</span>
              </Col>
              <Col xs="12" sm="12" md="2">
                <span style={{fontWeight:"bold"}}>Tanggal Order</span>
              </Col>
              <Col xs="12" sm="12" md="4">
                <span style={{fontWeight:"bold"}}>:  {this.state.detailViewTanggalOrder}</span>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="2">
                <span style={{fontWeight:"bold"}}>Tanggal Pengiriman</span>
              </Col>
              <Col xs="12" sm="12" md="4">
                <span style={{fontWeight:"bold"}}>:  {this.state.detailViewTanggalPengiriman}</span>
              </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000",marginTop:"2vh"}}>
              <Col xs="2" className="dataTableJSAC"><span style={{fontWeight:"bold"}}>KODE BARANG</span></Col>
              <Col xs="7" className="dataTableJSAC"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
              <Col xs="1" className="dataTableJCAC" style={{padding:0}}><span style={{fontWeight:"bold"}}>QTY Req</span></Col>
              <Col xs="1" className="dataTableJCAC" style={{padding:0}}><span style={{fontWeight:"bold"}}>QTY Send</span></Col>
              <Col xs="1" className="dataTableJCAC" style={{padding:0}}><span style={{fontWeight:"bold"}}>SATUAN</span></Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.detailViewDataDO.length > 0 && this.state.detailViewDataDO.map((detailViewDataDO,index) =>
                  <Row key={index}>
                    <Col xs="2" className="dataTableJSAC"><span style={{fontWeight:"bold"}}>{detailViewDataDO.kode_barang}</span></Col>
                    <Col xs="7" className="dataTableJSAC"><span style={{fontWeight:"bold"}}>{detailViewDataDO.nama_barang}</span></Col>
                    <Col xs="1" className="dataTableJCAC" style={{padding:0}}><span style={{fontWeight:"bold"}}>{detailViewDataDO.qty_req}</span></Col>
                    <Col xs="1" className="dataTableJCAC" style={{padding:0}}><span style={{fontWeight:"bold"}}>{detailViewDataDO.qty_send}</span></Col>
                    <Col xs="1" className="dataTableJCAC" style={{padding:0}}><span style={{fontWeight:"bold"}}>{detailViewDataDO.satuan_barang}</span></Col>
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
                      <span style={{fontWeight:"bold"}}>Daftar Delivery order</span>
                    </Col>
                    <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                      <button className="myBtn" onClick={() => this.modalAddOpen()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <DataTableExtensions
                      columns={columns}
                      data={this.state.dataDeliveryOrderH}
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

export default withRouter(connect(mapStateToProps)(productout));