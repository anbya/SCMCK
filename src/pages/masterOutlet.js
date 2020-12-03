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
  Label,
  InputGroupAddon,
  InputGroup
} from "reactstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { ScaleLoader } from 'react-spinners';
import Select from 'react-select';

class masterOutlet extends Component {
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
      tambahnamaoutlet:"",
      tambahAlamatoutlet:"",
      tambahPICoutlet:"",
      tambahTelpoutlet:"",
      tambahEmailoutlet:"",
      tambahPassoutlet:"",
      PRMtambahPassoutlet:true,
      prmModaledit:false,
      buttonEditPrm:false,
      buttonEditText:"Save",
      editkodeoutlet:"",
      editnamaoutlet:"",
      editAlamatoutlet:"",
      editPICoutlet:"",
      editTelpoutlet:"",
      editEmailoutlet:"",
      editPassoutlet:"",
      PRMeditPassoutlet:true,
      masterOutletList:[]
    };
  }
  componentDidMount = () =>  {
    this.setState({
      ...this.state,
      loading:true,
    });
    axios
    .get(`https://api.jaygeegroupapp.com/centralkitchen/dataOutlet`)
    .then(result => {
      this.setState({
        ...this.state,
        masterOutletList: result.data.result,
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
    .get(`https://api.jaygeegroupapp.com/centralkitchen/dataOutlet`)
    .then(result => {
      this.setState({
        ...this.state,
        masterOutletList: result.data.result,
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
      tambahnamaoutlet:"",
      tambahAlamatoutlet:"",
      tambahPICoutlet:"",
      tambahTelpoutlet:"",
      tambahEmailoutlet:""
    });
  }
  modalEditOpen = (data) =>  {
    this.setState({
      ...this.state,
      prmModaledit: true,
      editkodeoutlet:data.id_outlet,
      editnamaoutlet:data.nama_outlet,
      editAlamatoutlet:data.alamat_outlet,
      editPICoutlet:data.pic,
      editTelpoutlet:data.telp,
      editEmailoutlet:data.email
    });
  }
  modalEditClose = () =>  {
    this.setState({
      ...this.state,
      prmModaledit: false,
      buttonEditPrm:false,
      buttonEditText:"Save",
      editkodeoutlet:"",
      editnamaoutlet:"",
      editAlamatoutlet:"",
      editPICoutlet:"",
      editTelpoutlet:"",
      editEmailoutlet:""
    });
  }
  updateData = () => {
    this.setState({
      ...this.state,
      buttonEditPrm:true,
      buttonEditText:""
    });
    const dataToSend = {
      ID: this.state.editkodeoutlet,
      NAME: this.state.editnamaoutlet,
      ALAMAT: this.state.editAlamatoutlet,
      PIC: this.state.editPICoutlet,
      TELP: this.state.editTelpoutlet,
      EMAIL: this.state.editEmailoutlet
    };
    axios
    .post(`https://api.jaygeegroupapp.com/centralkitchen/editdataOutlet`, dataToSend, {
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
      NAME: this.state.tambahnamaoutlet,
      ALAMAT: this.state.tambahAlamatoutlet,
      PIC: this.state.tambahPICoutlet,
      TELP: this.state.tambahTelpoutlet,
      EMAIL: this.state.tambahEmailoutlet
    };
    if(dataToSend.NAME === ""){
      alert("nama outlet tidak boleh kosong")
    } else {
      this.setState({
        ...this.state,
        buttonAddPrm:true,
        buttonAddText:""
      });
      axios
      .post(`https://api.jaygeegroupapp.com/centralkitchen/adddataOutlet`, dataToSend, {
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
  toogleTambahPass = () =>{
    this.setState({
      ...this.state,
      PRMtambahPassoutlet:!this.state.PRMtambahPassoutlet
    })
  }
  render() {
    const DataButton = (data) => (
      <div>
        <button className="myBtn" onClick={()=> this.modalEditOpen(data)}><i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>
      </div>
    );
    const columns = [
      {
        name: 'Kode outlet',
        selector: 'id_outlet',
        sortable: true,
      },
      {
        name: 'Nama outlet',
        selector: 'nama_outlet',
        sortable: true,
      },
      {
        name: 'Alamat outlet',
        selector: 'alamat_outlet',
        sortable: true,
      },
      {
        name: 'PIC outlet',
        selector: 'pic',
        sortable: true,
      },
      {
        name: 'Telp outlet',
        selector: 'telp',
        sortable: true,
      },
      {
        name: 'Email outlet',
        selector: 'email',
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
          <ModalHeader toggle={() => this.modalAddClose()}>Tambah master outlet</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="tambahnamaoutlet">Nama outlet</Label>
                  <Input type="text" name="tambahnamaoutlet" id="tambahnamaoutlet" value={this.state.tambahnamaoutlet} onChange={this.handleChange} placeholder="Nama outlet" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="tambahAlamatoutlet">Alamat outlet</Label>
                  <Input type="textarea" name="tambahAlamatoutlet" id="tambahAlamatoutlet" value={this.state.tambahAlamatoutlet} onChange={this.handleChange} placeholder="Alamat outlet" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="tambahPICoutlet">PIC outlet</Label>
                  <Input type="text" name="tambahPICoutlet" id="tambahPICoutlet" value={this.state.tambahPICoutlet} onChange={this.handleChange} placeholder="PIC outlet" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="tambahTelpoutlet">Telp outlet</Label>
                  <Input type="text" name="tambahTelpoutlet" id="tambahTelpoutlet" value={this.state.tambahTelpoutlet} onChange={this.handleChange} placeholder="Telp outlet" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="tambahEmailoutlet">Email outlet</Label>
                  <Input type="text" name="tambahEmailoutlet" id="tambahEmailoutlet" value={this.state.tambahEmailoutlet} onChange={this.handleChange} placeholder="Email outlet" />
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
          <ModalHeader toggle={() => this.modalEditClose()}>Edit master outlet</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="editnamabeditnamavendorarang">Nama outlet</Label>
                  <Input type="text" name="editnamaoutlet" id="editnamaoutlet" value={this.state.editnamaoutlet} onChange={this.handleChange} placeholder="Nama outlet" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="editAlamatoutlet">Alamat outlet</Label>
                  <Input type="textarea" name="editAlamatoutlet" id="editAlamatoutlet" value={this.state.editAlamatoutlet} onChange={this.handleChange} placeholder="Alamat outlet" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="editPICoutlet">PIC outlet</Label>
                  <Input type="text" name="editPICoutlet" id="editPICoutlet" value={this.state.editPICoutlet} onChange={this.handleChange} placeholder="PIC outlet" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="editTelpoutlet">Telp outlet</Label>
                  <Input type="text" name="editTelpoutlet" id="editTelpoutlet" value={this.state.editTelpoutlet} onChange={this.handleChange} placeholder="Telp outlet" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="editEmailoutlet">Email outlet</Label>
                  <Input type="text" name="editEmailoutlet" id="editEmailoutlet" value={this.state.editEmailoutlet} onChange={this.handleChange} placeholder="Email outlet" />
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
                      <span style={{fontWeight:"bold"}}>Master Outlet</span>
                    </Col>
                    <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                      <button className="myBtn" onClick={() => this.modalAddOpen()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <DataTableExtensions
                      columns={columns}
                      data={this.state.masterOutletList}
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

export default withRouter(connect(mapStateToProps)(masterOutlet));