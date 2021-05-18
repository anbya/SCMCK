import React, { Component } from "react";
import axios from "axios";
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
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import dataDummy from './dummyData'
import { HashLoader , ScaleLoader } from 'react-spinners';
import Select from 'react-select';

class masterBarang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination:true,
      highlight:true,
      striped:false,
      loading:false,
      noHeader:true,
      fixedHeader:false,
      prmModaladd:false,
      buttonAddPrm:false,
      buttonAddText:"Add",
      tambahnamabarang:"",
      tambahsatuanbarang:"",
      tambahhargabarang:0,
      tambahUnitbarang:"",
      tambahKonversibarang:"",
      tambahtypebarang:"",
      prmModaledit:false,
      buttonEditPrm:false,
      buttonEditText:"Save",
      editkodebarang:"",
      editnamabarang:"",
      editsatuanbarang:"",
      edithargabarang:0,
      editUnitbarang:"",
      editKonversibarang:"",
      edittypebarang:"",
      masterBarangList:[],
      vendorList:[],
      prmVendor:"",
      tambahkodevendor:""
    };
  }
  componentDidMount = () =>  {
    this.setState({
      ...this.state,
      loading:true,
    });
    axios
    .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/masterbarang`)
    .then(result => {
      this.setState({
        ...this.state,
        masterBarangList: result.data.result,
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
        .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/masterbarang`)
    .then(result => {
      this.setState({
        ...this.state,
        masterBarangList: result.data.result,
        loading:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  modalAddOpen = async () =>  {
    let APIroute = localStorage.getItem("APIROUTE")
    axios
    .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/getVendorOption`)
    .then(result => {
      this.setState({
        ...this.state,
        vendorList: result.data.dataToShow
      });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({
      ...this.state,
      prmModaladd: true,
      tambahnamabarang:"",
      tambahsatuanbarang:"",
      tambahhargabarang:0,
      tambahUnitbarang:"",
      tambahKonversibarang:"",
      tambahtypebarang:"",
      prmVendor:"",
      tambahkodevendor:""
    });
  }
  modalAddClose = () =>  {
    this.setState({
      ...this.state,
      prmModaladd: false,
      buttonAddPrm:false,
      buttonAddText:"Save",
      tambahnamabarang:"",
      tambahsatuanbarang:"",
      tambahhargabarang:0,
      tambahUnitbarang:"",
      tambahKonversibarang:"",
      tambahtypebarang:"",
      vendorList: [],
      prmVendor:"",
      tambahkodevendor:""
    });
  }
  modalEditOpen = async (data) =>  {
    var dataPRMvendor = {
      value: data.kode_vendor,
      label: data.vendor_name
    };
    let APIroute = localStorage.getItem("APIROUTE")
        axios
        .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/getVendorOption`)
    .then(result => {
      this.setState({
        ...this.state,
        vendorList: result.data.dataToShow
      });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({
      ...this.state,
      prmModaledit: true,
      editkodebarang:data.kode_barang,
      editnamabarang:data.nama_barang,
      editsatuanbarang:data.satuan_barang,
      edithargabarang:data.harga_barang,
      editUnitbarang:data.unit_barang,
      editKonversibarang:data.conversi_satuan,
      edittypebarang:data.type_barang,
      prmVendor:dataPRMvendor,
      tambahkodevendor:data.kode_vendor
    });
  }
  modalEditClose = () =>  {
    this.setState({
      ...this.state,
      prmModaledit: false,
      buttonEditPrm:false,
      buttonEditText:"Save",
      editkodebarang:"",
      editnamabarang:"",
      editsatuanbarang:"",
      edithargabarang:0,
      editUnitbarang:"",
      editKonversibarang:"",
      edittypebarang:"",
      vendorList: [],
      prmVendor:"",
      tambahkodevendor:""
    });
  }
  updateData = () => {
    const dataToSend = {
      ID: this.state.editkodebarang,
      NAME: this.state.editnamabarang,
      UNIT: this.state.editUnitbarang,
      SATUAN: this.state.editsatuanbarang,
      HARGAPERUNIT: this.state.edithargabarang,
      KONVERSI: this.state.editKonversibarang,
      VENDORCODE: this.state.tambahkodevendor,
      TYPE: this.state.edittypebarang
    };
    if(dataToSend.NAME === ""){
      alert("Nama barang tidak boleh kosong")
    } else if(dataToSend.UNIT === ""){
      alert("Unit barang tidak boleh kosong")
    } else if(dataToSend.SATUAN === ""){
      alert("Satuan barang tidak boleh kosong")
    } else if(dataToSend.HARGAPERUNIT === ""){
      alert("harga barang tidak boleh kosong")
    } else if(dataToSend.KONVERSI === ""){
      alert("Konversi barang tidak boleh kosong")
    } else if(dataToSend.VENDORCODE === ""){
      alert("Vendor tidak boleh kosong")
    } else if(dataToSend.TYPE === ""){
      alert("Type barang tidak boleh kosong")
    } else {
      this.setState({
        ...this.state,
        buttonEditPrm:true,
        buttonEditText:""
      });
      axios
      .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/editMasterBarangData`, dataToSend, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(async result => {
        await this.setState({
          ...this.state,
          buttonEditPrm:false,
          buttonEditText:"Save"
        });
        alert("data berhasil diupdate")
        await this.modalEditClose()
        this.refreshPageData()
      })
      .catch(error => {
        console.log(error);
        console.log(this.props);
      });
    }
  }
  addData = () => {
    const dataToSend = {
      NAME: this.state.tambahnamabarang,
      UNIT: this.state.tambahUnitbarang,
      SATUAN: this.state.tambahsatuanbarang,
      HARGAPERUNIT: this.state.tambahhargabarang,
      KONVERSI: this.state.tambahKonversibarang,
      VENDORCODE: this.state.tambahkodevendor,
      TYPE: this.state.tambahtypebarang
    };
    if(dataToSend.NAME === ""){
      alert("Nama barang tidak boleh kosong")
    } else if(dataToSend.UNIT === ""){
      alert("Unit barang tidak boleh kosong")
    } else if(dataToSend.SATUAN === ""){
      alert("Satuan barang tidak boleh kosong")
    } else if(dataToSend.HARGAPERUNIT === ""){
      alert("harga barang tidak boleh kosong")
    } else if(dataToSend.KONVERSI === ""){
      alert("Konversi barang tidak boleh kosong")
    } else if(dataToSend.VENDORCODE === ""){
      alert("Vendor tidak boleh kosong")
    } else if(dataToSend.TYPE === ""){
      alert("Type barang tidak boleh kosong")
    } else {
      this.setState({
        ...this.state,
        buttonAddPrm:true,
        buttonAddText:""
      });
      axios
      .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/addMasterBarangData`, dataToSend, {
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
        this.refreshPageData()
      })
      .catch(error => {
        console.log(error);
        console.log(this.props);
      });
    }
  }
  handleChange = event =>  {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }
  onSelectChanged = async (value) => {
    await this.setState({
      ...this.state,
      prmVendor: value,
      tambahkodevendor:value.value
    });
  }
  render() {
    const DataButton = (data) => (
      <div>
        <button className="myBtn" onClick={()=> this.modalEditOpen(data)}><i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>
      </div>
    );
    const columns = [
      {
        name: 'Kode barang',
        selector: 'kode_barang',
        sortable: true,
      },
      {
        name: 'Nama barang',
        selector: 'nama_barang',
        sortable: true,
      },
      {
        name: 'Unit',
        selector: 'unit_barang',
        sortable: true,
      },
      {
        name: 'Satuan',
        selector: 'satuan_barang',
        sortable: true,
      },
      {
        name: 'Harga perunit',
        selector: 'harga_barang',
        sortable: true,
      },
      {
        name: 'Conversi',
        selector: 'conversi_satuan',
        sortable: true,
      },
      {
        name: 'Type',
        selector: 'type_barang',
        sortable: true,
      },
      {
        name: 'Vendor',
        selector: 'vendor_name',
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
        <Modal isOpen={this.state.prmModaladd} backdrop={"static"}>
          <ModalHeader toggle={() => this.modalAddClose()}>Tambah master barang</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="tambahnamabarang">Nama barang</Label>
                  <Input type="text" name="tambahnamabarang" id="tambahnamabarang" value={this.state.tambahnamabarang} onChange={this.handleChange} placeholder="Nama barang" />
                </FormGroup>
                <FormGroup>
                  <Label for="tambahUnitbarang">Unit barang</Label>
                  <Input type="text" name="tambahUnitbarang" id="tambahUnitbarang" value={this.state.tambahUnitbarang} onChange={this.handleChange} placeholder="Unit barang" />
                </FormGroup>
                <FormGroup>
                  <Label for="tambahsatuanbarang">Satuan barang</Label>
                  <Input type="text" name="tambahsatuanbarang" id="tambahsatuanbarang" value={this.state.tambahsatuanbarang} onChange={this.handleChange} placeholder="Satuan barang" />
                </FormGroup>
                <FormGroup>
                  <Label for="tambahKonversibarang">Konversi unit ke satuan</Label>
                  <Input
                    type="number"
                    name="tambahKonversibarang"
                    id="tambahKonversibarang"
                    value={this.state.tambahKonversibarang}
                    onChange={this.handleChange}
                    placeholder="Konversi barang"
                    min="1"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="tambahhargabarang">Harga barang perunit</Label>
                  <Input
                    type="number"
                    name="tambahhargabarang"
                    id="tambahhargabarang"
                    value={this.state.tambahhargabarang}
                    onChange={this.handleChange}
                    placeholder="Harga barang perunit"
                    min="0"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="tambahtypebarang">Type barang</Label>
                  <Input type="select" name="tambahtypebarang" id="tambahtypebarang" value={this.state.tambahtypebarang}  onChange={this.handleChange}>
                    <option value="">Pilih type barang</option>
                    <option value="RAW MATERIAL">Raw material</option>
                    <option value="WORK IN PROGRESS">WORK IN PROGRESS</option>
                    <option value="FINISHED GOODS">Finished goods</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="prmVendor">Vendor</Label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={false}
                    isSearchable={true}
                    name="prmVendor"
                    value={this.state.prmVendor}
                    options={this.state.vendorList}
                    onChange={this.onSelectChanged.bind(this)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => this.addData()}>
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
        <Modal isOpen={this.state.prmModaledit} backdrop={"static"}>
          <ModalHeader toggle={() => this.modalEditClose()}>Edit master barang</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="editnamabarang">Nama barang</Label>
                  <Input type="text" name="editnamabarang" id="editnamabarang" value={this.state.editnamabarang} onChange={this.handleChange} placeholder="Nama barang" />
                </FormGroup>
                <FormGroup>
                  <Label for="editUnitbarang">Unit barang</Label>
                  <Input type="text" name="editUnitbarang" id="editUnitbarang" value={this.state.editUnitbarang} onChange={this.handleChange} placeholder="Unit barang" />
                </FormGroup>
                <FormGroup>
                  <Label for="editsatuanbarang">Satuan barang</Label>
                  <Input type="text" name="editsatuanbarang" id="editsatuanbarang" value={this.state.editsatuanbarang} onChange={this.handleChange} placeholder="Satuan barang" />
                </FormGroup>
                <FormGroup>
                  <Label for="editKonversibarang">Konversi unit ke satuan</Label>
                  <Input type="text" name="editKonversibarang" id="editKonversibarang" value={this.state.editKonversibarang} onChange={this.handleChange} placeholder="Konversi barang" />
                </FormGroup>
                <FormGroup>
                  <Label for="edithargabarang">Harga barang perunit</Label>
                  <Input
                    type="number"
                    name="edithargabarang"
                    id="edithargabarang"
                    value={this.state.edithargabarang}
                    onChange={this.handleChange}
                    placeholder="Harga barang perunit"
                    min="0"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="edittypebarang">Type barang</Label>
                  <Input type="select" name="edittypebarang" id="edittypebarang" value={this.state.edittypebarang}  onChange={this.handleChange}>
                    <option value="">Pilih type barang</option>
                    <option value="RAW MATERIAL">Raw material</option>
                    <option value="WORK IN PROGRESS">WORK IN PROGRESS</option>
                    <option value="FINISHED GOODS">Finished goods</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="tambahsatuanbarang">Vendor</Label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={false}
                    isSearchable={true}
                    name="prmVendor"
                    value={this.state.prmVendor}
                    options={this.state.vendorList}
                    onChange={this.onSelectChanged.bind(this)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => this.updateData()}>
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
            <Button color="danger" onClick={() => this.modalEditClose()}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Container fluid={true} style={{paddingBottom:30}}>
          <Row>
            <Col xs="12" sm="12" md="12">
              <div className="card" style={{marginTop:15}}>
                <div className="card-header">
                  <Row>
                    <Col xs="10" sm="10" md="10" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                      <span style={{fontWeight:"bold"}}>Master barang</span>
                    </Col>
                    <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                      <button className="myBtn" onClick={() => this.modalAddOpen()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <DataTableExtensions
                      columns={columns}
                      data={this.state.masterBarangList}
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
                    {/* <DataTable
                      columns={columns}
                      data={this.state.masterBarangList}
                      defaultSortField="title"
                      pagination={this.state.pagination}
                      highlightOnHover={this.state.highlight}
                      striped={this.state.striped}
                      progressPending={this.state.loading}
                      noHeader={this.state.noHeader}
                      fixedHeader={this.state.fixedHeader}
                      fixedHeaderScrollHeight="300px"
                    /> */}
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
    anbyaBoilerplate: state.reducer.anbyaBoilerplate
  };
};

export default withRouter(connect(mapStateToProps)(masterBarang));