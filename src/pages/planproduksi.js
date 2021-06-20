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

class planProduksi extends Component {
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
      prmPlanProduksi:true,
      // state button add produksi
      buttonAddPrm:false,
      buttonAddText:"Add",
      // state button edit produksi
      buttonEditPrm:false,
      buttonEditText:"Selesaikan produksi ini",
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
    let APIroute = localStorage.getItem("APIROUTE")
        axios
        .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/getProductionPlanPageH`)
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
    let APIroute = localStorage.getItem("APIROUTE")
        axios
        .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/getProductionPlanPageH`)
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
    let APIroute = localStorage.getItem("APIROUTE")
        axios
        .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/getFormProductionPlan`)
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
      IDPRODUKSIH: data.kode_produksi_h
    };
    let APIroute = localStorage.getItem("APIROUTE")
        axios
        .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/getProductionPlanPageD`, dataToSend, {
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
      detailDataProduksi:data,
      buttonEditPrm:false,
      buttonEditText:"Selesaikan produksi ini"
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
      buttonEditPrm:false,
      buttonEditText:"Selesaikan produksi ini"
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
      .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/addFormProductionPlan`, dataToSend, {
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
        window.open(`${process.env.REACT_APP_PRINT}/productionPlanPrint?ID=${result.data.kodeProduksiH}`, "_blank")
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
        let dataTopush = {kode_barang:`${this.state.tambahkodebaranghasil}`,nama_barang:`${this.state.tambahnamabaranghasil}`,qty:`${parseInt(this.state.tambahqtybaranghasil)*parseInt(this.state.prmBarangHasil.qty)}`,satuan:`${this.state.tambahsatuanbaranghasil}`,prmMasterProduksi:`${this.state.prmBarangHasil.kode_master_produksi_h}`}
        await daftarBarang.push(dataTopush)
        this.setState({
            ...this.state,
            listAddBarangHasil: daftarBarang
        });
        let dataToSend = {
            KEYPLANPRODUCTION: this.state.prmBarangHasil.kode_master_produksi_h,
            MULTIPLEBY:this.state.tambahqtybaranghasil
        };
        let APIroute = localStorage.getItem("APIROUTE")
        axios
        .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/addItemProductionPlan`, dataToSend, {
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
  handleChangeDatapakaiD = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.dataProduksiHasilD
    if(parseInt(event.target.value) > parseInt(daftarBarang[IdData].qty_plan)){
      alert("jumlah yang di input melebihi total plan produksi")
    } else {
      daftarBarang[IdData].qty_produksi=event.target.value
      this.setState({
        ...this.state,
        listAddBarangPakai: daftarBarang
      });
    }
  }
  handleChangeDataSisaD = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.dataProduksiPakaiD
    if(parseInt(event.target.value) > parseInt(daftarBarang[IdData].qty)){
      alert("jumlah yang di input melebihi total pemakaian produksi")
    } else {
      daftarBarang[IdData].qty_sisa=event.target.value
      this.setState({
        ...this.state,
        dataProduksiPakaiD: daftarBarang
      });
    }
  }
  updateData = () => {
    const dataToSend = {
      COST:this.state.detailDataProduksi.total_cost,
      IDPRODUKSIH:this.state.detailDataProduksi.kode_produksi_h,
      HASILPRODUKSI:this.state.dataProduksiHasilD,
      // PAKAIPRODUKSI:this.state.dataProduksiPakaiD,
      USER:this.props.userinfo.id_user,
    };
    console.log(dataToSend);
    this.setState({
      ...this.state,
      buttonEditPrm:true,
      buttonEditText:""
    });
    let APIroute = localStorage.getItem("APIROUTE")
        axios
        .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/productionPlanCompletion`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(async result => {
      await this.setState({
        ...this.state,
        buttonEditPrm:false,
        buttonEditText:"Selesaikan produksi ini",
      });
      alert("Produksi ini berhasil di tutup")
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
                  <Label for="detailbuatpo">Tanggal pengajuan rencana produksi</Label>
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
                        <Label for="prmBarangHasil">Satuan</Label>
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
            </Row>
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
                  <Col xs="2"><span style={{fontWeight:"bold"}}>PRODUCE QTY</span></Col>
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
                            onChange={this.handleChangeDatapakaiD}
                            min="0"
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
                  <Col xs="6"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>QTY PAKAI</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>SATUAN</span></Col>
                </Row>
                {/* <Row>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>KODE BARANG</span></Col>
                  <Col xs="4"><span style={{fontWeight:"bold"}}>NAMA BARANG</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>QTY PAKAI</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>QTY SISA</span></Col>
                  <Col xs="2"><span style={{fontWeight:"bold"}}>SATUAN</span></Col>
                </Row> */}
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
                {/* {this.state.dataProduksiPakaiD.length > 0 && this.state.dataProduksiPakaiD.map((dataProduksiPakaiD,index) =>
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
                            onChange={this.handleChangeDataSisaD}
                            min="0"
                        />
                    </Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiPakaiD.satuan_barang}</span></Col>
                  </Row>
                )} */}
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Button color="success" block={true} onClick={() => { if (window.confirm('Apakah anda yakin akan menyelesaikan proses ini ?')) this.updateData() } }>
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
          </ModalBody>
        </Modal>
        <Container fluid={true} style={{paddingBottom:30}}>
          <Row>
            <Col xs="12" sm="12" md="12">
              <div className="card" style={{marginTop:15}}>
                <div className="card-header">
                  <Row>
                    <Col xs="10" sm="10" md="10" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                      <span style={{fontWeight:"bold"}}>Production plan list</span>
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

export default withRouter(connect(mapStateToProps)(planProduksi));