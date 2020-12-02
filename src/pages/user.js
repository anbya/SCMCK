import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../App.css";
import {
  InputGroup,
  InputGroupAddon,
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

class user extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // overlay state
      prmoverlay:false,
      // page state
      pagination:true,
      highlight:true,
      striped:false,
      loading:false,
      noHeader:true,
      fixedHeader:false,
      masterUserList:[],
      // add state
      prmModaladd:false,
      buttonAddPrm:false,
      buttonAddText:"Add",
      addUserList:[],
      prmAddUser:"",
      tambahNikUser:"",
      tambahNamaUser:"",
      tambahAksesUser:"",
      tambahPassUser:"",
      PRMtambahPassoutlet:true,
      // edit state
      prmModaledit:false,
      buttonEditPrm:false,
      buttonEditText:"Save",
      editkodeuser:"",
      editnikuser:"",
      editnamauser:"",
      editaksesuser:"",
      editpassuser:"",
      PRMeditPassoutlet:true,
    };
  }
  // page master function
  componentDidMount = () =>  {
    this.setState({
      ...this.state,
      loading:true,
    });
    axios
    .get(`https://191d92824391.ngrok.io/centralkitchen/getUser`)
    .then(result => {
      this.setState({
        ...this.state,
        masterUserList: result.data.result,
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
    .get(`https://191d92824391.ngrok.io/centralkitchen/getUser`)
    .then(result => {
      this.setState({
        ...this.state,
        masterUserList: result.data.result,
        loading:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  handleChange = event =>  {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }
  // add data function
  modalAddOpen = async () =>  {
    await this.setState({
      ...this.state,
      prmoverlay: true
    });
    await axios
    .get(`https://191d92824391.ngrok.io/hris`)
    .then( async result => {
      await this.setState({
        ...this.state,
        addUserList: result.data.dataToShow
      });
      this.setState({
        ...this.state,
        prmoverlay: false
      });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({
      ...this.state,
      prmModaladd: true,
      prmAddUser:"",
      tambahNikUser:"",
      tambahNamaUser:"",
      tambahAksesUser:"",
      tambahPassUser:"",
    });
  }
  modalAddClose = () =>  {
    this.setState({
      ...this.state,
      prmModaladd: false,
      buttonAddPrm:false,
      buttonAddText:"Save",
      addUserList:[],
      prmAddUser:"",
      tambahNikUser:"",
      tambahNamaUser:"",
      tambahAksesUser:"",
      tambahPassUser:"",
      PRMtambahPassoutlet:true,
    });
  }
  addData = () => {
    const dataToSend = {
      NIK:this.state.tambahNikUser,
      NAMA:this.state.tambahNamaUser,
      AKSES:this.state.tambahAksesUser,
      PASS:this.state.tambahPassUser
    };
    if(dataToSend.AKSES === "" || dataToSend.PASS === ""){
      alert("Akses dan password user tidak boleh kosong")
    } else {
      this.setState({
        ...this.state,
        buttonAddPrm:true,
        buttonAddText:""
      });
      axios
      .post(`https://191d92824391.ngrok.io/centralkitchen/addUser`, dataToSend, {
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
  onSelectChangedAddUser = async (value) => {
    await this.setState({
      ...this.state,
      prmAddUser: value,
      tambahNikUser:value.value,
      tambahNamaUser:value.nama
    });
  }
  // edit data function
  modalEditOpen = (data) =>  {
    this.setState({
      ...this.state,
      prmModaledit: true,
      editkodeuser:data.id_user,
      editnikuser:data.nik,
      editnamauser:data.nama_user,
      editaksesuser:data.akses_page,
      editpassuser:data.pass_user
    });
  }
  modalEditClose = () =>  {
    this.setState({
      ...this.state,
      prmModaledit: false,
      buttonEditPrm:false,
      buttonEditText:"Save",
      editkodeuser:"",
      editnikuser:"",
      editnamauser:"",
      editaksesuser:"",
      editpassuser:"",
      PRMeditPassoutlet:true,
    });
  }
  updateData = () => {
    this.setState({
      ...this.state,
      buttonEditPrm:true,
      buttonEditText:""
    });
    const dataToSend = {
      ID: this.state.editkodeuser,
      AKSES: this.state.editaksesuser,
      PASS: this.state.editpassuser
    };
    axios
    .post(`https://191d92824391.ngrok.io/centralkitchen/editUser`, dataToSend, {
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
  toogleTambahPass = () =>{
    this.setState({
      ...this.state,
      PRMtambahPassoutlet:!this.state.PRMtambahPassoutlet
    })
  }
  toogleEditPass = () =>{
    this.setState({
      ...this.state,
      PRMeditPassoutlet:!this.state.PRMeditPassoutlet
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
        name: 'NIK',
        selector: 'nik',
        sortable: true,
      },
      {
        name: 'Nama user',
        selector: 'nama_user',
        sortable: true,
      },
      {
        name: 'Akses',
        selector: 'akses_page',
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
        <div style={{visibility:this.state.prmoverlay==true?"visible":"hidden"}}>
          <div className="overlayMask">
            <ScaleLoader
              height={90}
              width={20}
              radius={10}
              margin={10}
              color={'#ffffff'}
              loading={this.state.prmoverlay == true?true:false}
            />
          </div>
        </div>
        <Modal isOpen={this.state.prmModaladd} backdrop={"static"}>
          <ModalHeader toggle={() => this.modalAddClose()}>Tambah user</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="prmAddUser">Data User</Label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={false}
                    isSearchable={true}
                    name="prmAddUser"
                    value={this.state.prmAddUser}
                    options={this.state.addUserList}
                    onChange={this.onSelectChangedAddUser.bind(this)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="tambahAksesUser">Akses</Label>
                    <Input type="select" name="tambahAksesUser" id="tambahAksesUser" value={this.state.tambahAksesUser}  onChange={this.handleChange}>
                      <option value="">Pilih Akses User</option>
                      <option value="MASTER USER">MASTER USER</option>
                      <option value="COST CONTROL">COST CONTROL</option>
                      <option value="PURCHASING">PURCHASING</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="STORE MANAGER">STORE MANAGER</option>
                    </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="tambahPassUser">Password</Label>
                  <InputGroup>
                    <Input type={this.state.PRMtambahPassoutlet == true?"password":"text"} name="tambahPassUser" id="tambahPassUser" value={this.state.tambahPassUser} onChange={this.handleChange} placeholder="Password" autoComplete="new-password" />
                    <InputGroupAddon addonType="append">
                      <Button color="primary" onClick={() => this.toogleTambahPass()}><i className={this.state.PRMeditPassoutlet == true?"fa fa-eye fa-1x":"fa fa-eye-slash fa-1x"} aria-hidden="true"></i></Button>
                    </InputGroupAddon>
                  </InputGroup>
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
                  <Label for="editnikuser">Nik</Label>
                  <Input type="text" name="editnikuser" id="editnikuser" value={this.state.editnikuser} onChange={this.handleChange} placeholder="Nik" disabled={true} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="editnamauser">Nama user</Label>
                  <Input type="text" name="editnamauser" id="editnamauser" value={this.state.editnamauser} onChange={this.handleChange} placeholder="Nama user" disabled={true} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="editaksesuser">Akses</Label>
                    <Input type="select" name="editaksesuser" id="editaksesuser" value={this.state.editaksesuser}  onChange={this.handleChange}>
                      <option value="">Pilih Akses User</option>
                      <option value="MASTER USER">MASTER USER</option>
                      <option value="COST CONTROL">COST CONTROL</option>
                      <option value="PURCHASING">PURCHASING</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="STORE MANAGER">STORE MANAGER</option>
                    </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="editpassuser">Password</Label>
                  <InputGroup>
                    <Input type={this.state.PRMeditPassoutlet == true?"password":"text"} name="editpassuser" id="editpassuser" value={this.state.editpassuser} onChange={this.handleChange} placeholder="Password" />
                    <InputGroupAddon addonType="append">
                      <Button color="primary" onClick={() => this.toogleEditPass()}><i className={this.state.PRMeditPassoutlet == true?"fa fa-eye fa-1x":"fa fa-eye-slash fa-1x"} aria-hidden="true"></i></Button>
                    </InputGroupAddon>
                  </InputGroup>
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
                      <span style={{fontWeight:"bold"}}>User Management</span>
                    </Col>
                    <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                      <button className="myBtn" onClick={() => this.modalAddOpen()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                    </Col>
                  </Row>
                </div>
                <div className="card-body">
                  <DataTableExtensions
                      columns={columns}
                      data={this.state.masterUserList}
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

export default withRouter(connect(mapStateToProps)(user));