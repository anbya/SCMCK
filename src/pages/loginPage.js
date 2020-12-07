import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../App.css";
import {
  // InputGroup,
  Input,
  Container,
  Row,
  Col,
  FormGroup,
  Label
} from "reactstrap";
import jgLogo from '../assets/img/icon.png';
import { HashLoader , ScaleLoader } from 'react-spinners';


class loginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginNik:"",
      loginPass:"",
      buttonLoginPrm:false,
      buttonLoginText:"Login",
    };
  }
  loginCheck = async () =>{
    const dataToSend = {
      NIK:this.state.loginNik,
      PASS:this.state.loginPass
    };
    if(dataToSend.NIK === "" || dataToSend.PASS === ""){
      alert("NIK dan password user tidak boleh kosong")
    } else {
      this.setState({
        ...this.state,
        buttonLoginPrm:true,
        buttonLoginText:""
      });
      axios
      .post(`${process.env.REACT_APP_LINK}/centralkitchen/login`, dataToSend, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(async result => {
        if(result.data.status === "00"){
          let prmNIK = result.data.nik
          await this.setState({
            ...this.state,
            buttonLoginPrm:false,
            buttonLoginText:"Login"
          });
          await localStorage.setItem("authToken",prmNIK)
          await localStorage.setItem("outletID","OUT0000001")
          this.props.history.push({ pathname: "/home" })
        } else if(result.data.status === "01") {
          this.setState({
            ...this.state,
            buttonLoginPrm:false,
            buttonLoginText:"Login"
          });
          alert("Password salah")
        } else if(result.data.status === "02") {
          this.setState({
            ...this.state,
            buttonLoginPrm:false,
            buttonLoginText:"Login"
          });
          alert("User tidak ditemukan")
        }
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
    return (
      <Container fluid={true} style={{backgroundColor:"#003060",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div className="card" style={{backgroundColor:"rgba(255, 255, 255, 0)"}}>
          <div className="card-body" style={{backgroundColor:"rgba(255, 255, 255, 0.6)",borderRadius:10}}>
            <Row style={{paddingTop:30,paddingBottom:30}}>
              <Col style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <img className="portoimage" width="50%" src={jgLogo} alt="jgLogo" style={{borderRadius:150}} />
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="loginNik">NIK</Label>
                  <Input type="text" name="loginNik" id="loginNik" value={this.state.loginNik} onChange={this.handleChange} placeholder="Input NIK" />
                </FormGroup>
                <FormGroup>
                  <Label for="loginPass">Password</Label>
                  <Input type="password" name="loginPass" id="loginPass" value={this.state.loginPass} onChange={this.handleChange} placeholder="Input Password" />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{paddingBottom:30}}>
              <Col>
                <button className="my-btn full-widht" onClick={() => this.loginCheck()}>
                  <ScaleLoader
                    height={18}
                    width={4}
                    radius={2}
                    margin={2}
                    color={'#FFFFFF'}
                    loading={this.state.buttonLoginPrm}
                  />
                  {this.state.buttonLoginText}
                </button>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    anbyaBoilerplate: state.reducer.anbyaBoilerplate
  };
};

export default withRouter(connect(mapStateToProps)(loginPage));