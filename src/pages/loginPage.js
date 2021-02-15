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
        prmoverlay:false,
        APIROUTE:"",
        loginNik:"",
        loginPass:"",
        buttonLoginPrm:false,
        buttonLoginText:"Login",
    };
  }
  componentDidMount = async () =>  {
    let authToken = await localStorage.getItem("authToken")
    authToken != null && this.props.history.push({ pathname: "/home" })
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
      .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/login`, dataToSend, {
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
        } else {
          this.setState({
            ...this.state,
            buttonLoginPrm:false,
            buttonLoginText:"Login"
          });
          alert(result.data.message)
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
                    <span style={{color:"#ffffff"}}>Waiting for data . . . </span>
                </div>
            </div>
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
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    anbyaBoilerplate: state.reducer.anbyaBoilerplate
  };
};

export default withRouter(connect(mapStateToProps)(loginPage));