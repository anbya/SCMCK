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

class produksi extends Component {
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
      prmModaledit:false,
      detailbuatpo:"",
      dataProduksiH:[],
      dataProduksiPakaiD:[],
      dataProduksiSisaD:[],
      dataProduksiHasilD:[],
      detailDataProduksi:"",
      // state form add produksi
      prmModaladd:false,
      dateForm:"",
      addNote:"",
      // state button add produksi
      buttonAddPrm:false,
      buttonAddText:"Add",
      // state tambah barang pakai produksi
      prmBarangPakai:"",
      masterBarangPakaiList:[],
      inStok:"",
      tambahkodebarangpakai:"",
      tambahnamabarangpakai:"",
      tambahsatuanbarangpakai:"",
      tambahqtybarangpakai:"",
      listAddBarangPakai:[],
      // state tambah barang sisa produksi
      prmBarangSisa:"",
      masterBarangSisaList:[],
      tambahkodebarangsisa:"",
      tambahnamabarangsisa:"",
      tambahsatuanbarangsisa:"",
      tambahqtybarangsisa:"",
      listAddBarangSisa:[],
      // state tambah barang hasil produksi
      buttonAddBarangHasilPrm:false,
      buttonAddBarangHasilText:"Add",
      prmBarangHasil:"",
      masterBarangHasilList:[],
      tambahkodebaranghasil:"",
      tambahnamabaranghasil:"",
      tambahsatuanbaranghasil:"",
      tambahqtybaranghasil:"",
      listAddBarangHasil:[],
    };
  }
  componentDidMount = () =>  {
    this.setState({
      ...this.state,
      loading:true,
    });
    axios
    .get(`https://api.jaygeegroupapp.com/centralkitchen/getProduksiPageH`)
    .then(result => {
      this.setState({
        ...this.state,
        dataProduksiH: result.data.dataProduksiH,
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
    .get(`https://api.jaygeegroupapp.com/centralkitchen/getProduksiPageH`)
    .then(result => {
      this.setState({
        ...this.state,
        dataProduksiH: result.data.dataProduksiH,
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
    .get(`https://api.jaygeegroupapp.com/centralkitchen/getFormAddProduksi`)
    .then( result => {
      this.setState({
        ...this.state,
        masterBarangPakaiList: result.data.dataMasterBarang,
        masterBarangSisaList: result.data.dataMasterBarang,
        masterBarangHasilList: result.data.dataMasterBarang,
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
      dateForm:dateToForm,
      addNote:"",
      // state tambah barang pakai produksi
      prmBarangPakai:"",
      inStok:"",
      tambahkodebarangpakai:"",
      tambahnamabarangpakai:"",
      tambahsatuanbarangpakai:"",
      tambahqtybarangpakai:"",
      listAddBarangPakai:[],
      // state tambah barang sisa produksi
      prmBarangSisa:"",
      tambahkodebarangsisa:"",
      tambahnamabarangsisa:"",
      tambahsatuanbarangsisa:"",
      tambahqtybarangsisa:"",
      listAddBarangSisa:[],
      // state tambah barang hasil produksi
      prmBarangHasil:"",
      tambahkodebaranghasil:"",
      tambahnamabaranghasil:"",
      tambahsatuanbaranghasil:"",
      tambahqtybaranghasil:"",
      listAddBarangHasil:[],
    });
  }
  modalAddClose = () =>  {
    this.setState({
      ...this.state,
      prmModaladd: false,
      buttonAddPrm:false,
      buttonAddText:"Save",
      dateForm:"",
      addNote:"",
      // state tambah barang pakai produksi
      masterBarangPakaiList:[],
      prmBarangPakai:"",
      inStok:"",
      tambahkodebarangpakai:"",
      tambahnamabarangpakai:"",
      tambahsatuanbarangpakai:"",
      tambahqtybarangpakai:"",
      listAddBarangPakai:[],
      // state tambah barang sisa produksi
      masterBarangSisaList:[],
      prmBarangSisa:"",
      tambahkodebarangsisa:"",
      tambahnamabarangsisa:"",
      tambahsatuanbarangsisa:"",
      tambahqtybarangsisa:"",
      listAddBarangSisa:[],
      // state tambah barang hasil produksi
      prmBarangHasil:"",
      masterBarangHasilList:[],
      tambahkodebaranghasil:"",
      tambahnamabaranghasil:"",
      tambahsatuanbaranghasil:"",
      tambahqtybaranghasil:"",
      listAddBarangHasil:[],
    });
  }
  modalEditOpen = async (data) =>  {
    const dataToSend = {
      KODEPRODUKSIH: data.kode_produksi_h
    };
    await axios
    .post(`https://api.jaygeegroupapp.com/centralkitchen/getProduksiPageD`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then( result => {
      this.setState({
        ...this.state,
        dataProduksiPakaiD:result.data.dataProduksiPakaiD,
        dataProduksiSisaD:result.data.dataProduksiSisaD,
        dataProduksiHasilD:result.data.dataProduksiHasilD,
      });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({
      ...this.state,
      prmModaledit: true,
      detailDataProduksi:data
    });
  }
  modalEditClose = () =>  {
    this.setState({
      ...this.state,
      prmModaledit: false,
      dataProduksiPakaiD:[],
      dataProduksiSisaD:[],
      dataProduksiHasilD:[],
      detailDataProduksi:"",
    });
  }
  handleChange = event =>  {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }
  submitData = () => {
    const dataToSend = {
        TANGGALPRODUKSI: this.state.dateForm,
        USER:this.props.userinfo.id_user,
        NOTE:this.state.addNote,
        ADDDATABARANGPAKAI: this.state.listAddBarangPakai,
        ADDDATABARANGSISA: this.state.listAddBarangSisa,
        ADDDATABARANGHASIL: this.state.listAddBarangHasil
    };
    const cekAddDataBarangPakai = this.state.listAddBarangPakai.length
    const cekAddDataBarangHasil = this.state.listAddBarangHasil.length
    if (cekAddDataBarangHasil < 1){
      alert("Data barang hasil produksi tidak boleh kosong")
    } else if (cekAddDataBarangPakai < 1){
      alert("Data barang pakai produksi tidak boleh kosong")
    } else {
      this.setState({
        ...this.state,
        buttonAddPrm:true,
        buttonAddText:""
      });
      axios
      .post(`https://api.jaygeegroupapp.com/centralkitchen/addProduksi`, dataToSend, {
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
  onSelectChangedMasterBarangHasil = async (value) => {
    await this.setState({
      ...this.state,
      prmBarangHasil: value,
      tambahkodebaranghasil:value.value,
      tambahnamabaranghasil:value.label,
      tambahsatuanbaranghasil:value.satuan,
    });
  }
  addDataHasil = async () => {
    if(this.state.tambahkodebaranghasil === "" || this.state.tambahqtybaranghasil === ""){
      alert("barang dan qty barang tidak boleh kosong")
    } else if(this.state.tambahqtybaranghasil === 0 || this.state.tambahqtybaranghasil === "0"){
      alert("Qty tidak boleh 0 (Nol)")
    } else {
      let daftarBarang = this.state.listAddBarangHasil
      let resultChecked = daftarBarang.find(o => o.kode_barang === `${this.state.tambahkodebaranghasil}`);
      if(resultChecked===undefined){
        let dataTopush = {kode_barang:`${this.state.tambahkodebaranghasil}`,nama_barang:`${this.state.tambahnamabaranghasil}`,qty:`${this.state.tambahqtybaranghasil}`,satuan:`${this.state.tambahsatuanbaranghasil}`}
        await daftarBarang.push(dataTopush)
        let dataToSend = {
          PRMBARANGHASIL: this.state.prmBarangHasil.prmBarangHasil
        };
        await this.setState({
          ...this.state,
          listAddBarangHasil: daftarBarang,
          prmBarangHasil:"",
          tambahkodebaranghasil:"",
          tambahnamabaranghasil:"",
          tambahsatuanbaranghasil:"",
          tambahqtybaranghasil:"",
        });
        await axios
        .post(`https://api.jaygeegroupapp.com/centralkitchen/getDetailBarangProduksi`, dataToSend, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then( result => {
          this.setState({
            ...this.state,
            listAddBarangPakai:result.data.dataProduksiPakaiD,
            listAddBarangSisa:result.data.dataProduksiSisaD,
          });
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        let dataToSend = {
          PRMBARANGHASIL: this.state.prmBarangHasil.prmBarangHasil
        };
        let indexArray = daftarBarang.findIndex(x => x.kode_barang === `${this.state.tambahkodebaranghasil}`);
        let qtyAwal = daftarBarang[indexArray].qty
        let qtyAkhir = parseInt(qtyAwal)+parseInt(this.state.tambahqtybaranghasil)
        daftarBarang[indexArray].qty=qtyAkhir
        this.setState({
          ...this.state,
          listAddBarangHasil: daftarBarang,
          prmBarangHasil:"",
          tambahkodebaranghasil:"",
          tambahnamabaranghasil:"",
          tambahsatuanbaranghasil:"",
          tambahqtybaranghasil:"",
        });
        await axios
        .post(`https://api.jaygeegroupapp.com/centralkitchen/getDetailBarangProduksi`, dataToSend, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then( result => {
          this.setState({
            ...this.state,
            listAddBarangPakai:result.data.dataProduksiPakaiD,
            listAddBarangSisa:result.data.dataProduksiSisaD,
          });
        })
        .catch(error => {
          console.log(error);
        });
      }
    }
  }
  eraseAddDataHasil = async (keyArray) => {
    let daftarBarang = this.state.listAddBarangHasil
    await daftarBarang.splice(keyArray, 1)
    await this.setState({
      ...this.state,
      listAddBarangHasil: daftarBarang,
      listAddBarangPakai:[],
      listAddBarangSisa:[]
    });
  }
  handleChangeDatapakaiD = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.listAddBarangPakai
    let maxSend = daftarBarang[IdData].qty_in_inventory
    daftarBarang[IdData].qty=event.target.value
    this.setState({
      ...this.state,
      listAddBarangPakai: daftarBarang
    });
  }
  handleChangeDataSisaD = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.listAddBarangSisa
    daftarBarang[IdData].qty=event.target.value
    this.setState({
      ...this.state,
      listAddBarangSisa: daftarBarang
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
        name: 'Nomor Produksi',
        selector: 'nomor_produksi',
        sortable: true,
      },
      {
        name: 'Note Produksi',
        selector: 'note_produksi',
        sortable: true,
      },
      {
        name: 'Tanggal Produksi',
        selector: 'tanggal_produksi',
        sortable: true,
      },
      {
        name: 'Create User',
        selector: 'create_user',
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
          <ModalHeader toggle={() => this.modalAddClose()}>Form produksi</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Tanggal produksi</Label>
                  <Input type="text" name="detailbuatpo" id="detailbuatpo" value={this.state.dateForm} onChange={this.handleChange} placeholder="Tanggal buat PO" disabled={true} />
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
            {/* hasil produksi section */}
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:10}}>
              <Col xs="12" sm="12" md="12">
                <h3>Barang hasil produksi</h3>
              </Col>
            </Row>
            {
            this.state.listAddBarangHasil.length > 0 ?""
            :
            <Row style={{backgroundColor:"#f7f7f7",paddingBottom:10}}>
              <Col xs="12" sm="12" md="5">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={false}
                  isSearchable={true}
                  name="prmBarangHasil"
                  value={this.state.prmBarangHasil}
                  options={this.state.masterBarangHasilList}
                  onChange={this.onSelectChangedMasterBarangHasil.bind(this)}
                  placeholder="Pilih Barang"
                />
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input type="number" name="tambahqtybaranghasil" id="tambahqtybaranghasil" value={this.state.tambahqtybaranghasil} onChange={this.handleChange} placeholder="Qty" min="1" />
              </Col>
              <Col xs="12" sm="12" md="1">
                <span style={{fontWeight:"bold"}}>{this.state.prmBarangHasil.satuan}</span>
              </Col>
              <Col xs="12" sm="12" md="2" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Button color="success" onClick={() => this.addDataHasil()}>
                  <ScaleLoader
                    height={18}
                    width={4}
                    radius={2}
                    margin={2}
                    color={'#FFFFFF'}
                    loading={this.state.buttonAddBarangHasilPrm}
                  />
                  {this.state.buttonAddBarangHasilText}
                </Button>
              </Col>
            </Row>
            }
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
                {this.state.listAddBarangHasil.length > 0 && this.state.listAddBarangHasil.map((listAddBarangHasil,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarangHasil.kode_barang}</span></Col>
                    <Col xs="5"><span style={{fontWeight:"bold"}}>{listAddBarangHasil.nama_barang}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarangHasil.qty}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarangHasil.satuan}</span></Col>
                    <Col xs="1">
                      <button className="myBtn" onClick={() => this.eraseAddDataHasil(index)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
            {/* pakai produksi section */}
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:10}}>
              <Col xs="12" sm="12" md="12">
                <h3>Barang pakai produksi</h3>
              </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000"}}>
              <Col>
                <Row>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>KODE BARANG</span></Col>
                  <Col xs="5"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
                  <Col xs="1"><span style={{fontWeight:"bold"}}>IN STOK</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>QTY</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>SATUAN</span></Col>
                </Row>
              </Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.listAddBarangPakai.length > 0 && this.state.listAddBarangPakai.map((listAddBarangPakai,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarangPakai.kode_barang}</span></Col>
                    <Col xs="5"><span style={{fontWeight:"bold"}}>{listAddBarangPakai.nama_barang}</span></Col>
                    <Col xs="1"><span style={{fontWeight:"bold"}}>{listAddBarangPakai.qty_in_inventory}</span></Col>
                    <Col xs="2">
                      <Input
                        type="number"
                        name={`${index}`}
                        id={`${index}`}
                        value={listAddBarangPakai.qty}
                        onChange={this.handleChangeDatapakaiD}
                        min="0" max={`${listAddBarangPakai.qty_in_inventory}`}
                      />
                    </Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarangPakai.satuan}</span></Col>
                  </Row>
                )}
              </Col>
            </Row>
            {/* sisa produksi section */}
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:10}}>
              <Col xs="12" sm="12" md="12">
                <h3>Barang sisa produksi</h3>
              </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000"}}>
              <Col>
                <Row>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>KODE BARANG</span></Col>
                  <Col xs="6"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>QTY</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>SATUAN</span></Col>
                </Row>
              </Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.listAddBarangSisa.length > 0 && this.state.listAddBarangSisa.map((listAddBarangSisa,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarangSisa.kode_barang}</span></Col>
                    <Col xs="6"><span style={{fontWeight:"bold"}}>{listAddBarangSisa.nama_barang}</span></Col>
                    <Col xs="2">
                      <Input
                        type="number"
                        name={`${index}`}
                        id={`${index}`}
                        value={listAddBarangSisa.qty}
                        onChange={this.handleChangeDataSisaD}
                        min="0"
                      />
                    </Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarangSisa.satuan}</span></Col>
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
          <ModalHeader toggle={() => this.modalEditClose()}>Detail Produksi</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Tanggal produksi</Label>
                  <Input type="text" name="detailbuatpo" id="detailbuatpo" value={this.state.detailDataProduksi.tanggal_produksi} onChange={this.handleChange} placeholder="Tanggal buat PO" disabled={true} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12">
                <FormGroup>
                  <Label for="addNote">Note</Label>
                  <Input type="textarea" name="addNote" id="addNote" value={this.state.detailDataProduksi.note_produksi} onChange={this.handleChange} placeholder="Note" disabled={true}  />
                </FormGroup>
              </Col>
            </Row>
            {/* pakai produksi section */}
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:10}}>
              <Col xs="12" sm="12" md="12">
                <h3>Barang pakai produksi</h3>
              </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000"}}>
              <Col>
                <Row>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>KODE BARANG</span></Col>
                  <Col xs="6"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>QTY</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>SATUAN</span></Col>
                </Row>
              </Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.dataProduksiPakaiD.length > 0 && this.state.dataProduksiPakaiD.map((dataProduksiPakaiD,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiPakaiD.kode_barang}</span></Col>
                    <Col xs="6"><span style={{fontWeight:"bold"}}>{dataProduksiPakaiD.nama_barang}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiPakaiD.qty}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiPakaiD.satuan_barang}</span></Col>
                  </Row>
                )}
              </Col>
            </Row>
            {/* sisa produksi section */}
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:10}}>
              <Col xs="12" sm="12" md="12">
                <h3>Barang sisa produksi</h3>
              </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000"}}>
              <Col>
                <Row>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>KODE BARANG</span></Col>
                  <Col xs="6"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>QTY</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>SATUAN</span></Col>
                </Row>
              </Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.dataProduksiSisaD.length > 0 && this.state.dataProduksiSisaD.map((dataProduksiSisaD,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiSisaD.kode_barang}</span></Col>
                    <Col xs="6"><span style={{fontWeight:"bold"}}>{dataProduksiSisaD.nama_barang}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiSisaD.qty}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiSisaD.satuan_barang}</span></Col>
                  </Row>
                )}
              </Col>
            </Row>
            {/* hasil produksi section */}
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:10}}>
              <Col xs="12" sm="12" md="12">
                <h3>Barang hasil produksi</h3>
              </Col>
            </Row>
            <Row style={{borderBottom:"1px solid #000000"}}>
              <Col>
                <Row>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>KODE BARANG</span></Col>
                  <Col xs="6"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>QTY</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>SATUAN</span></Col>
                </Row>
              </Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.dataProduksiHasilD.length > 0 && this.state.dataProduksiHasilD.map((dataProduksiHasilD,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiHasilD.kode_barang}</span></Col>
                    <Col xs="6"><span style={{fontWeight:"bold"}}>{dataProduksiHasilD.nama_barang}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiHasilD.qty}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiHasilD.satuan_barang}</span></Col>
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
                      <span style={{fontWeight:"bold"}}>List Produksi</span>
                    </Col>
                    <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                      <button className="myBtn" onClick={() => this.modalAddOpen()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <DataTableExtensions
                      columns={columns}
                      data={this.state.dataProduksiH}
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

export default withRouter(connect(mapStateToProps)(produksi));