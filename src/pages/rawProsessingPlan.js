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

class rawProsessing extends Component {
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
      detailData:"",
      editNote:"",
      buttonEditPrm:false,
      buttonEditText:"Selesaikan proses ini",
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
    .get(`https://api.jaygeegroupapp.com/centralkitchen/getRawProsessingPlanPageH`)
    .then(result => {
      this.setState({
        ...this.state,
        dataProduksiH: result.data.dataRawProcessingH,
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
    .get(`https://api.jaygeegroupapp.com/centralkitchen/getRawProsessingPlanPageH`)
    .then(result => {
      this.setState({
        ...this.state,
        dataProduksiH: result.data.dataRawProcessingH,
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
    .get(`https://api.jaygeegroupapp.com/centralkitchen/getFormRawProsessingPlan`)
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
      IDRAWPROCESSH: data.kode_raw_processing_h,
      IDMASTERRAWPROCESS: data.kode_master_rawprosessing_h
    };
    await axios
    .post(`https://api.jaygeegroupapp.com/centralkitchen/getRawProsessingPlanPageD`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then( result => {
      this.setState({
        ...this.state,
        dataProduksiPakaiD:result.data.dataRawMaterial,
        dataProduksiHasilD:result.data.dataFinishedGoods
      });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({
      ...this.state,
      prmModaledit: true,
      detailData:data,
      buttonEditPrm:false,
      buttonEditText:"Selesaikan proses ini",
      editNote:data.note_raw_processing
    });
  }
  modalEditClose = () =>  {
    this.setState({
      ...this.state,
      prmModaledit: false,
      dataProduksiPakaiD:[],
      dataProduksiSisaD:[],
      dataProduksiHasilD:[],
      detailData:"",
      buttonEditPrm:false,
      buttonEditText:"Selesaikan proses ini",
      editNote:""
    });
  }
  updateData = () => {
    const dataToSend = {
      COST:this.state.dataProduksiPakaiD[0].cost_satuan,
      IDRAWPROCESSH:this.state.detailData.kode_raw_processing_h,
      NOTE:this.state.editNote,
      FINISHEDGOODS:this.state.dataProduksiHasilD,
      USER:this.props.userinfo.id_user,
    };
    this.setState({
      ...this.state,
      buttonEditPrm:true,
      buttonEditText:""
    });
    axios
    .post(`https://api.jaygeegroupapp.com/centralkitchen/rawProcessCompletion`, dataToSend, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(async result => {
      await this.setState({
        ...this.state,
        buttonEditPrm:false,
        buttonEditText:"Selesaikan proses ini",
      });
      alert("Raw process berhasil di tutup")
      await this.modalEditClose()
      this.refreshPageData()
    })
    .catch(error => {
      console.log(error);
      console.log(this.props);
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
        TANGGALRAWPROCES: this.state.dateForm,
        USER:this.props.userinfo.id_user,
        NOTE:this.state.addNote,
        ADDDATARAWMATERIAL: this.state.listAddBarangHasil
    };
    const cekAddDataBarangHasil = this.state.listAddBarangHasil.length
    if (cekAddDataBarangHasil < 1){
      alert("Data item produksi tidak boleh kosong")
    } else {
      console.log(dataToSend);
      this.setState({
        ...this.state,
        buttonAddPrm:true,
        buttonAddText:""
      });
      axios
      .post(`https://api.jaygeegroupapp.com/centralkitchen/addFormRawProsessingPlan`, dataToSend, {
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
        window.open(`http://localhost:3000/rawProsessingPlanPrint?ID=${result.data.kodeRawProcessingH}`, "_blank")
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
    } else if(parseInt(this.state.prmBarangHasil.qty_in_stok) < parseInt(this.state.tambahqtybaranghasil)){
      alert("Stok tidak mencukupi")
    } else if(this.state.tambahqtybaranghasil === 0 || this.state.tambahqtybaranghasil === "0"){
      alert("Qty tidak boleh 0 (Nol)")
    } else {
        let daftarBarang = this.state.listAddBarangHasil
        let dataTopush = {kode_barang:`${this.state.tambahkodebaranghasil}`,nama_barang:`${this.state.tambahnamabaranghasil}`,qty:`${this.state.tambahqtybaranghasil}`,satuan:`${this.state.tambahsatuanbaranghasil}`,prmMasterRawProsessing:`${this.state.prmBarangHasil.kode_master_rawprosessing_h}`}
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
  handleChangeDatapakaiD = event =>  {
    let IdData = event.target.id
    let daftarBarang = this.state.dataProduksiHasilD
    // let maxSend = daftarBarang[IdData].qty_in_inventory
    daftarBarang[IdData].qty=event.target.value
    this.setState({
      ...this.state,
      dataProduksiHasilD: daftarBarang
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
        name: 'Nomor Raw Process',
        selector: 'nomor_raw_processing',
        sortable: true,
      },
      {
        name: 'Tanggal Raw Process',
        selector: 'tanggal_raw_processing',
        sortable: true,
      },
      {
        name: 'Item Raw Process',
        selector: 'raw_material',
        sortable: true,
      },
      {
        name: 'Quantity Raw Process',
        selector: 'raw_material_qty_plan',
        sortable: true,
      },
      {
        name: 'Satuan Raw Process',
        selector: 'satuan_raw_material',
        sortable: true,
      },
      {
        name: 'Note Raw Process',
        selector: 'note_raw_processing',
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
          <ModalHeader toggle={() => this.modalAddClose()}>Raw processing plan form</ModalHeader>
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
                <Col xs="12" sm="12" md="6">
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
                        <Label for="prmBarangHasil">Qty in stok</Label>
                        <Input type="text" value={this.state.prmBarangHasil.qty_in_stok == undefined?"---":this.state.prmBarangHasil.qty_in_stok} disabled={true} />
                    </FormGroup>
                </Col>
                <Col xs="12" sm="12" md="2">
                    <FormGroup>
                        <Label for="prmBarangHasil">Qty request</Label>
                        <Input
                          type="number"
                          name="tambahqtybaranghasil"
                          id="tambahqtybaranghasil"
                          value={this.state.tambahqtybaranghasil}
                          onChange={this.handleChange}
                          placeholder="Qty"
                          min="1"
                          max={this.state.prmBarangHasil.qty_in_stok}
                        />
                    </FormGroup>
                </Col>
                <Col xs="12" sm="12" md="2">
                    <FormGroup>
                        <Label for="prmBarangHasil">Satuan</Label>
                        <Input type="text" value={this.state.prmBarangHasil.satuan == undefined?"---":this.state.prmBarangHasil.satuan} disabled={true} />
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
          <ModalHeader toggle={() => this.modalEditClose()}>Detail raw processing plan</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Nomor raw process</Label>
                  <Input type="text" name="detailbuatpo" id="detailbuatpo" value={this.state.detailData.nomor_raw_processing} onChange={this.handleChange} placeholder="Tanggal buat PO" disabled={true} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <Label for="detailbuatpo">Tanggal raw process</Label>
                  <Input type="text" name="detailbuatpo" id="detailbuatpo" value={this.state.detailData.tanggal_raw_processing} onChange={this.handleChange} placeholder="Tanggal buat PO" disabled={true} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12">
                <FormGroup>
                  <Label for="editNote">Note raw process</Label>
                  <Input type="textarea" name="editNote" id="editNote" value={this.state.editNote} onChange={this.handleChange} placeholder="Note" />
                </FormGroup>
              </Col>
            </Row>
            {/* hasil produksi section */}
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:10}}>
              <Col xs="12" sm="12" md="12">
                <h3>Raw material list</h3>
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
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiPakaiD.total_qty}</span></Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiPakaiD.satuan_barang}</span></Col>
                  </Row>
                )}
              </Col>
            </Row>
            {/* pakai produksi section */}
            <Row style={{backgroundColor:"#f7f7f7",paddingTop:10}}>
              <Col xs="12" sm="12" md="12">
                <h3>Finished goods</h3>
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
                    <Col xs="2">
                        <Input
                            type="number"
                            name={`${index}`}
                            id={`${index}`}
                            value={`${dataProduksiHasilD.qty}`}
                            onChange={this.handleChangeDatapakaiD}
                            min="0"
                        />
                    </Col>
                    <Col xs="2"><span style={{fontWeight:"bold"}}>{dataProduksiHasilD.satuan_barang}</span></Col>
                  </Row>
                )}
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Button color="success" block={true} onClick={() => { if (window.confirm('Apakah anda yakin akan menyeleesaikan proses ini ?')) this.updateData() } }>
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
                      <span style={{fontWeight:"bold"}}>Raw processing plan list</span>
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

export default withRouter(connect(mapStateToProps)(rawProsessing));