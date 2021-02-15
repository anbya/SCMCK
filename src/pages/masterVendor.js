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
import { ScaleLoader } from 'react-spinners';
import Select from 'react-select';

class masterVendor extends Component {
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
      tambahnamavendor:"",
      tambahAlamatvendor:"",
      tambahPICvendor:"",
      tambahTelpvendor:"",
      tambahEmailvendor:"",
      prmModaledit:false,
      buttonEditPrm:false,
      buttonEditText:"Save",
      editkodevendor:"",
      editnamavendor:"",
      editAlamatvendor:"",
      editPICvendor:"",
      editTelpvendor:"",
      editEmailvendor:"",
      masterVendorList:[]
    };
  }
  componentDidMount = () =>  {
    this.setState({
      ...this.state,
      loading:true,
    });
    let APIroute = localStorage.getItem("APIROUTE")
        axios
        .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/dataVendor`)
    .then(result => {
      this.setState({
        ...this.state,
        masterVendorList: result.data.result,
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
        .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/dataVendor`)
    .then(result => {
      this.setState({
        ...this.state,
        masterVendorList: result.data.result,
        loading:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  modalAddOpen = () =>  {
    this.setState({
      ...this.state,
      prmModaladd: true
    });
  }
  modalAddClose = () =>  {
    this.setState({
      ...this.state,
      prmModaladd: false,
      buttonAddPrm:false,
      buttonAddText:"Save",
      tambahnamavendor:"",
      tambahAlamatvendor:"",
      tambahPICvendor:"",
      tambahTelpvendor:"",
      tambahEmailvendor:""
    });
  }
  modalEditOpen = (data) =>  {
    this.setState({
      ...this.state,
      prmModaledit: true,
      editkodevendor:data.kode_vendor,
      editnamavendor:data.nama_vendor,
      editAlamatvendor:data.alamat_vendor,
      editPICvendor:data.pic,
      editTelpvendor:data.telp_vendor,
      editEmailvendor:data.email_vendor
    });
  }
  modalEditClose = () =>  {
    this.setState({
      ...this.state,
      prmModaledit: false,
      buttonEditPrm:false,
      buttonEditText:"Save",
      editkodevendor:"",
      editnamavendor:"",
      editAlamatvendor:"",
      editPICvendor:"",
      editTelpvendor:"",
      editEmailvendor:""
    });
  }
  updateData = () => {
    this.setState({
      ...this.state,
      buttonEditPrm:true,
      buttonEditText:""
    });
    const dataToSend = {
      ID: this.state.editkodevendor,
      NAME: this.state.editnamavendor,
      ALAMAT: this.state.editAlamatvendor,
      PIC: this.state.editPICvendor,
      TELP: this.state.editTelpvendor,
      EMAIL: this.state.editEmailvendor
    };
    let APIroute = localStorage.getItem("APIROUTE")
        axios
        .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/editdataVendor`, dataToSend, {
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
  addData = () => {
    const dataToSend = {
      NAME: this.state.tambahnamavendor,
      ALAMAT: this.state.tambahAlamatvendor,
      PIC: this.state.tambahPICvendor,
      TELP: this.state.tambahTelpvendor,
      EMAIL: this.state.tambahEmailvendor
    };
    if(dataToSend.NAME === ""){
      alert("nama vendor tidak boleh kosong")
    } else {
      this.setState({
        ...this.state,
        buttonAddPrm:true,
        buttonAddText:""
      });
      axios
      .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/adddataVendor`, dataToSend, {
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
  render() {
    const DataButton = (data) => (
      <div>
        <button className="myBtn" onClick={()=> this.modalEditOpen(data)}><i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>
      </div>
    );
    const columns = [
      {
        name: 'Kode vendor',
        selector: 'kode_vendor',
        sortable: true,
      },
      {
        name: 'Nama vendor',
        selector: 'nama_vendor',
        sortable: true,
      },
      {
        name: 'Alamat vendor',
        selector: 'alamat_vendor',
        sortable: true,
      },
      {
        name: 'PIC vendor',
        selector: 'pic',
        sortable: true,
      },
      {
        name: 'Telp vendor',
        selector: 'telp_vendor',
        sortable: true,
      },
      {
        name: 'Email vendor',
        selector: 'email_vendor',
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
          <ModalHeader toggle={() => this.modalAddClose()}>Tambah master vendor</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="tambahnamavendor">Nama vendor</Label>
                  <Input type="text" name="tambahnamavendor" id="tambahnamavendor" value={this.state.tambahnamavendor} onChange={this.handleChange} placeholder="Nama vendor" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="tambahAlamatvendor">Alamat vendor</Label>
                  <Input type="textarea" name="tambahAlamatvendor" id="tambahAlamatvendor" value={this.state.tambahAlamatvendor} onChange={this.handleChange} placeholder="Alamat vendor" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="tambahPICvendor">PIC vendor</Label>
                  <Input type="text" name="tambahPICvendor" id="tambahPICvendor" value={this.state.tambahPICvendor} onChange={this.handleChange} placeholder="PIC vendor" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="tambahTelpvendor">Telp vendor</Label>
                  <Input type="text" name="tambahTelpvendor" id="tambahTelpvendor" value={this.state.tambahTelpvendor} onChange={this.handleChange} placeholder="Telp vendor" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="tambahEmailvendor">Email vendor</Label>
                  <Input type="text" name="tambahEmailvendor" id="tambahEmailvendor" value={this.state.tambahEmailvendor} onChange={this.handleChange} placeholder="Email vendor" />
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
          <ModalHeader toggle={() => this.modalEditClose()}>Edit master vendor</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="editnamabeditnamavendorarang">Nama vendor</Label>
                  <Input type="text" name="editnamavendor" id="editnamavendor" value={this.state.editnamavendor} onChange={this.handleChange} placeholder="Nama vendor" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="editAlamatvendor">Alamat vendor</Label>
                  <Input type="textarea" name="editAlamatvendor" id="editAlamatvendor" value={this.state.editAlamatvendor} onChange={this.handleChange} placeholder="Alamat vendor" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="editPICvendor">PIC vendor</Label>
                  <Input type="text" name="editPICvendor" id="editPICvendor" value={this.state.editPICvendor} onChange={this.handleChange} placeholder="PIC vendor" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="editTelpvendor">Telp vendor</Label>
                  <Input type="text" name="editTelpvendor" id="editTelpvendor" value={this.state.editTelpvendor} onChange={this.handleChange} placeholder="Telp vendor" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="editEmailvendor">Email vendor</Label>
                  <Input type="text" name="editEmailvendor" id="editEmailvendor" value={this.state.editEmailvendor} onChange={this.handleChange} placeholder="Email vendor" />
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
                      <span style={{fontWeight:"bold"}}>Master vendor</span>
                    </Col>
                    <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                      <button className="myBtn" onClick={() => this.modalAddOpen()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <DataTableExtensions
                      columns={columns}
                      data={this.state.masterVendorList}
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
    anbyaBoilerplate: state.reducer.anbyaBoilerplate
  };
};

export default withRouter(connect(mapStateToProps)(masterVendor));