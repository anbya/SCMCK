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

class completionPlanProduksi extends Component {
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
      dataProduksiTurunanD:[],
      dataProduksiHasilD:[],
      detailDataProduksi:"",
      // state form add produksi
      prmModaladd:false,
      dateForm:"",
      addNote:"",
      prmPlanProduksi:true,
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
    .get(`https://api.jaygeegroupapp.com/centralkitchen/getProductionPlanPageH`)
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
    .get(`https://api.jaygeegroupapp.com/centralkitchen/getProductionPlanPageH`)
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
    .get(`https://api.jaygeegroupapp.com/centralkitchen/getFormProductionPlan`)
    .then( result => {
      this.setState({
        ...this.state,
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
      prmPlanProduksi:true,
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
      IDPRODUKSIH: data.kode_produksi_h,
      PRMTURUNANPRODUKSI: data.kode_master_produksi_h
    };
    await axios
    .post(`https://api.jaygeegroupapp.com/centralkitchen/getCompletionProductionPageD`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then( result => {
      this.setState({
        ...this.state,
        dataProduksiPakaiD:result.data.dataPakaiProduksiD,
        dataProduksiHasilD:result.data.dataHasilProduksiD
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
      dataProduksiTurunanD:[],
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
    const cekAddDataBarangHasil = this.state.listAddBarangHasil.length
    if (cekAddDataBarangHasil < 1){
      alert("Data item produksi tidak boleh kosong")
    } else {
      this.setState({
        ...this.state,
        buttonAddPrm:true,
        buttonAddText:""
      });
      axios
      .post(`https://api.jaygeegroupapp.com/centralkitchen/addFormProductionPlan`, dataToSend, {
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
        window.open(`http://localhost:3090/productionPlanPrint?ID=${result.data.kodeProduksiH}`, "_blank")
        this.refreshPageData()
      })
      .catch(error => {
        console.log(error);
        console.log(this.props);
      });
    }
  }
  // function barang pakai produksi
  // onSelectChangedMasterBarangPakai = async (value) => {
  //   await this.setState({
  //     ...this.state,
  //     prmBarangPakai: value,
  //     tambahkodebarangpakai:value.value,
  //     tambahnamabarangpakai:value.label,
  //     tambahsatuanbarangpakai:value.satuan,
  //     inStok:value.qty_in_stok,
  //   });
  // }
  // addDataPakai = async () => {
  //   let qtyTambahPakai = parseInt(this.state.tambahqtybarangpakai)
  //   let qtyInStok = parseInt(this.state.inStok)
  //   if(this.state.tambahkodebarangpakai === "" || this.state.tambahqtybarangpakai === ""){
  //     alert("barang dan qty barang tidak boleh kosong")
  //   } else if(this.state.tambahqtybarangpakai === 0 || this.state.tambahqtybarangpakai === "0"){
  //     alert("Qty tidak boleh 0 (Nol)")
  //   } else if(qtyTambahPakai > qtyInStok){
  //     alert("Qty yang anda input melebihi stok")
  //   } else {
  //     let daftarBarang = this.state.listAddBarangPakai
  //     let resultChecked = daftarBarang.find(o => o.kode_barang === `${this.state.tambahkodebarangpakai}`);
  //     if(resultChecked===undefined){
  //       let dataTopush = {kode_barang:`${this.state.tambahkodebarangpakai}`,nama_barang:`${this.state.tambahnamabarangpakai}`,qty:`${this.state.tambahqtybarangpakai}`,satuan:`${this.state.tambahsatuanbarangpakai}`}
  //       await daftarBarang.push(dataTopush)
  //       await this.setState({
  //         ...this.state,
  //         listAddBarangPakai: daftarBarang,
  //         prmBarangPakai:"",
  //         inStok:"",
  //         tambahkodebarangpakai:"",
  //         tambahnamabarangpakai:"",
  //         tambahsatuanbarangpakai:"",
  //         tambahqtybarangpakai:"",
  //       });
  //     } else {
  //       let indexArray = daftarBarang.findIndex(x => x.kode_barang === `${this.state.tambahkodebarangpakai}`);
  //       let qtyAwal = daftarBarang[indexArray].qty
  //       let qtyAkhir = parseInt(qtyAwal)+parseInt(this.state.tambahqtybarangpakai)
  //       daftarBarang[indexArray].qty=qtyAkhir
  //       this.setState({
  //         ...this.state,
  //         listAddBarangPakai: daftarBarang,
  //         prmBarangPakai:"",
  //         inStok:"",
  //         tambahkodebarangpakai:"",
  //         tambahnamabarangpakai:"",
  //         tambahsatuanbarangpakai:"",
  //         tambahqtybarangpakai:"",
  //       });
  //     }
  //   }
  // }
  // eraseAddDataPakai = async (keyArray) => {
  //   let daftarBarang = this.state.listAddBarangPakai
  //   await daftarBarang.splice(keyArray, 1)
  //   await this.setState({
  //     ...this.state,
  //     listAddBarangPakai: daftarBarang
  //   });
  // }
  // function barang sisa produksi
  // onSelectChangedMasterBarangSisa = async (value) => {
  //   await this.setState({
  //     ...this.state,
  //     prmBarangSisa: value,
  //     tambahkodebarangsisa:value.value,
  //     tambahnamabarangsisa:value.label,
  //     tambahsatuanbarangsisa:value.satuan,
  //   });
  // }
  // addDataSisa = async () => {
  //   if(this.state.tambahkodebarangsisa === "" || this.state.tambahqtybarangsisa === ""){
  //     alert("barang dan qty barang tidak boleh kosong")
  //   } else if(this.state.tambahqtybarangsisa === 0 || this.state.tambahqtybarangsisa === "0"){
  //     alert("Qty tidak boleh 0 (Nol)")
  //   } else {
  //     let daftarBarang = this.state.listAddBarangSisa
  //     let resultChecked = daftarBarang.find(o => o.kode_barang === `${this.state.tambahkodebarangsisa}`);
  //     if(resultChecked===undefined){
  //       let dataTopush = {kode_barang:`${this.state.tambahkodebarangsisa}`,nama_barang:`${this.state.tambahnamabarangsisa}`,qty:`${this.state.tambahqtybarangsisa}`,satuan:`${this.state.tambahsatuanbarangsisa}`}
  //       await daftarBarang.push(dataTopush)
  //       await this.setState({
  //         ...this.state,
  //         listAddBarangSisa: daftarBarang,
  //         prmBarangSisa:"",
  //         tambahkodebarangsisa:"",
  //         tambahnamabarangsisa:"",
  //         tambahsatuanbarangsisa:"",
  //         tambahqtybarangsisa:"",
  //       });
  //     } else {
  //       let indexArray = daftarBarang.findIndex(x => x.kode_barang === `${this.state.tambahkodebarangsisa}`);
  //       let qtyAwal = daftarBarang[indexArray].qty
  //       let qtyAkhir = parseInt(qtyAwal)+parseInt(this.state.tambahqtybarangsisa)
  //       daftarBarang[indexArray].qty=qtyAkhir
  //       this.setState({
  //         ...this.state,
  //         listAddBarangSisa: daftarBarang,
  //         prmBarangSisa:"",
  //         tambahkodebarangsisa:"",
  //         tambahnamabarangsisa:"",
  //         tambahsatuanbarangsisa:"",
  //         tambahqtybarangsisa:"",
  //       });
  //     }
  //   }
  // }
  // eraseAddDataSisa = async (keyArray) => {
  //   let daftarBarang = this.state.listAddBarangSisa
  //   await daftarBarang.splice(keyArray, 1)
  //   await this.setState({
  //     ...this.state,
  //     listAddBarangSisa: daftarBarang
  //   });
  // }
  // function barang hasil produksi
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
        let dataTopush = {kode_barang:`${this.state.tambahkodebaranghasil}`,nama_barang:`${this.state.tambahnamabaranghasil}`,qty:`${parseInt(this.state.tambahqtybaranghasil)*parseInt(this.state.prmBarangHasil.qty)}`,satuan:`${this.state.tambahsatuanbaranghasil}`}
        await daftarBarang.push(dataTopush)
        this.setState({
            ...this.state,
            listAddBarangHasil: daftarBarang
        });
        let dataToSend = {
            KEYPLANPRODUCTION: this.state.prmBarangHasil.kode_master_produksi_h,
            MULTIPLEBY:this.state.tambahqtybaranghasil
        };
        axios
        .post(`https://api.jaygeegroupapp.com/centralkitchen/addItemProductionPlan`, dataToSend, {
            headers: {
            "Access-Control-Allow-Origin": "*"
            }
        })
        .then(async result => {
            await this.setState({
            ...this.state,
            listAddBarangPakai:result.data.dataKebutuhanProduksi
            });
            this.setState({
                ...this.state,
                prmBarangHasil:"",
                tambahkodebaranghasil:"",
                tambahnamabaranghasil:"",
                tambahsatuanbaranghasil:"",
                tambahqtybaranghasil:"",
            });
            this.cekPlanProduksi()
        })
        .catch(error => {
            console.log(error);
        });
    }
  }
  eraseAddDataHasil = async (keyArray) => {
    let daftarBarang = this.state.listAddBarangHasil
    await daftarBarang.splice(keyArray, 1)
    await this.setState({
      ...this.state,
      listAddBarangHasil: daftarBarang,
      listAddBarangPakai:[],
      listAddBarangSisa:[],
      prmPlanProduksi:true
    });
  }
  cekPlanProduksi = () =>  {
    let dataToCek = this.state.listAddBarangPakai
    let panjangData = this.state.listAddBarangPakai.length
    for(let i=0;i<panjangData;i++){
        let qtyReq=dataToCek[i].qty
        let qtyInStok=dataToCek[i].qty_in_stok
        if (parseInt(qtyInStok)<parseInt(qtyReq)){
            this.setState({
                ...this.state,
                prmPlanProduksi:false
            });
        }
    }
  }
  handleChangeDatahasilD = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.dataProduksiHasilD
    let max_qty = daftarBarang[IdData].qty_plan
    event.target.value > max_qty ? alert("kuantiti yang anda input melebihi qty plan") :
    daftarBarang[IdData].qty_produksi=event.target.value
    this.setState({
      ...this.state,
      dataProduksiHasilD: daftarBarang
    });
  }
  handleChangeDatapakaiD = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.dataProduksiPakaiD
    let max_qty = daftarBarang[IdData].qty
    event.target.value > max_qty ? alert("kuantiti yang anda input melebihi qty plan") :
    daftarBarang[IdData].qty_sisa=event.target.value
    this.setState({
      ...this.state,
      dataProduksiPakaiD: daftarBarang
    });
  }
  handleChangeDataSisaD = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.dataProduksiTurunanD
    daftarBarang[IdData].qty=event.target.value
    this.setState({
      ...this.state,
      dataProduksiTurunanD: daftarBarang
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
        name: 'Tanggal Produksi',
        selector: 'tanggal_produksi',
        sortable: true,
      },
      {
        name: 'Item Produksi',
        selector: 'production_item',
        sortable: true,
      },
      {
        name: 'Quantity Produksi',
        selector: 'production_qty_plan',
        sortable: true,
      },
      {
        name: 'Satuan Produksi',
        selector: 'satuan_production_item',
        sortable: true,
      },
      {
        name: 'Note Produksi',
        selector: 'note_produksi',
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
          <ModalHeader toggle={() => this.modalAddClose()}>Production plan form</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Nomor produksi</Label>
                  <Input type="text" name="detailbuatpo" id="detailbuatpo" value={this.state.dateForm} onChange={this.handleChange} placeholder="Tanggal buat PO" disabled={true} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Tanggal penyelesaian produksi</Label>
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
            <div>
                <Row style={{backgroundColor:"#f7f7f7",paddingTop:10}}>
                <Col xs="12" sm="12" md="12">
                    <h3>Production item</h3>
                </Col>
                </Row>
                {
                this.state.listAddBarangHasil.length > 0 ?""
                :
                <Row style={{backgroundColor:"#f7f7f7",paddingBottom:10}}>
                <Col xs="12" sm="12" md="4">
                    <FormGroup>
                        <Label for="prmBarangHasil">Production plan item</Label>
                        <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isClearable={false}
                        isSearchable={true}
                        name="prmBarangHasil"
                        value={this.state.prmBarangHasil}
                        options={this.state.masterBarangHasilList}
                        onChange={this.onSelectChangedMasterBarangHasil.bind(this)}
                        placeholder="Select a production plan item"
                        />
                    </FormGroup>
                </Col>
                <Col xs="12" sm="12" md="2">
                    <FormGroup>
                        <Label for="prmBarangHasil">Production per batch</Label>
                        <Input type="text" value={this.state.prmBarangHasil.qty == undefined?"---":this.state.prmBarangHasil.qty} disabled={true} />
                    </FormGroup>
                </Col>
                <Col xs="12" sm="12" md="2">
                    <FormGroup>
                        <Label for="prmBarangHasil">Unit</Label>
                        <Input type="text" value={this.state.prmBarangHasil.satuan == undefined?"---":this.state.prmBarangHasil.satuan} disabled={true} />
                    </FormGroup>
                </Col>
                <Col xs="12" sm="12" md="4">
                    <FormGroup>
                        <Label for="prmBarangHasil">Multiple batch by</Label>
                        <Input type="number" name="tambahqtybaranghasil" id="tambahqtybaranghasil" value={this.state.tambahqtybaranghasil} onChange={this.handleChange} placeholder="Qty" min="1" />
                    </FormGroup>
                </Col>
                <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Button color="success" block={true} onClick={() => this.addDataHasil()}>
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
            </div>
            {/* hasil produksi section */}
            {/* pakai produksi section */}
            <div>
                <Row style={{backgroundColor:"#f7f7f7",paddingTop:10}}>
                <Col xs="12" sm="12" md="12">
                    <h3>Raw material</h3>
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
                    <Row key={index} style={{color:parseInt(listAddBarangPakai.qty_in_stok) < parseInt(listAddBarangPakai.qty)?"#FF0000":"#000000"}}>
                        <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarangPakai.kode_barang}</span></Col>
                        <Col xs="5"><span style={{fontWeight:"bold"}}>{listAddBarangPakai.nama_barang}</span></Col>
                        <Col xs="1"><span style={{fontWeight:"bold"}}>{listAddBarangPakai.qty_in_stok}</span></Col>
                        <Col xs="2">
                        <span style={{fontWeight:"bold"}}>{listAddBarangPakai.qty}</span>
                        </Col>
                        <Col xs="2"><span style={{fontWeight:"bold"}}>{listAddBarangPakai.satuan_barang}</span></Col>
                    </Row>
                    )}
                </Col>
                </Row>
            </div>
            {/* pakai produksi section */}
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => this.submitData()} disabled={this.state.prmPlanProduksi == true ? false:true}>
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
                  <Label for="detailbuatpo">Nomor produksi</Label>
                  <Input type="text" name="detailbuatpo" id="detailbuatpo" value={this.state.detailDataProduksi.nomor_produksi} onChange={this.handleChange} placeholder="Tanggal buat PO" disabled={true} />
                </FormGroup>
              </Col>
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
                  <Col xs="4"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>PLAN QTY</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>HASIL QTY</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>SATUAN</span></Col>
                </Row>
              </Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.dataProduksiHasilD.length > 0 && this.state.dataProduksiHasilD.map((dataProduksiHasilD,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiHasilD.kode_barang}</span></Col>
                    <Col xs="4"><span style={{fontWeight:"bold"}}>{dataProduksiHasilD.nama_barang}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiHasilD.qty_plan}</span></Col>
                    <Col xs="2">
                        <Input
                            type="number"
                            name={`${index}`}
                            id={`${index}`}
                            value={`${dataProduksiHasilD.qty_produksi}`}
                            onChange={this.handleChangeDatahasilD}
                            min="0"
                            max={`${dataProduksiHasilD.qty_plan}`}
                        />
                    </Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiHasilD.satuan_barang}</span></Col>
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
                  <Col xs="4"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>PLAN QTY</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>SISA QTY</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>SATUAN</span></Col>
                </Row>
              </Col>
            </Row>
            <Row className="bodyData">
              <Col>
                {this.state.dataProduksiPakaiD.length > 0 && this.state.dataProduksiPakaiD.map((dataProduksiPakaiD,index) =>
                  <Row key={index}>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiPakaiD.kode_barang}</span></Col>
                    <Col xs="4"><span style={{fontWeight:"bold"}}>{dataProduksiPakaiD.nama_barang}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiPakaiD.qty}</span></Col>
                    <Col xs="2">
                        <Input
                            type="number"
                            name={`${index}`}
                            id={`${index}`}
                            value={`${dataProduksiPakaiD.qty_sisa}`}
                            onChange={this.handleChangeDatapakaiD}
                            min="0"
                            max={`${dataProduksiPakaiD.qty}`}
                        />
                    </Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiPakaiD.satuan_barang}</span></Col>
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
                      <span style={{fontWeight:"bold"}}>Open production plan list</span>
                    </Col>
                    <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                      {/* <button className="myBtn" onClick={() => this.modalAddOpen()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button> */}
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

export default withRouter(connect(mapStateToProps)(completionPlanProduksi));