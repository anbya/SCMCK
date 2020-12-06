import React, { Component,useState } from 'react';
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class navbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        navCollapse:false,
        fixedNav:"",
        dropdownState:false,
        testState:true,
        testArray:[1,2,5,6]
      };
    }
    componentDidMount = async () =>  {
      let aksesPage = this.props.aksespage
      if(aksesPage == ""){
        let prmNIK = localStorage.getItem("authToken")
        const dataToSend = {
          NIK: prmNIK
        };
        axios
        .post(`https://api.jaygeegroupapp.com/centralkitchen/getAkses`, dataToSend, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then( result => {
          this.props.dispatch({ type: "SETAKSES", payload: result.data.akses });
          this.props.dispatch({ type: "SETUSERINFO", payload: result.data.userinfo });
        })
        .catch(error => {
          console.log(error);
          console.log(this.props);
        });
      }
    }
    navToggle = () =>  {
      this.setState({
        ...this.state,
        navCollapse: !this.state.navCollapse
      });
    }
    dropdownToggle = () =>  {
      this.setState({
        ...this.state,
        dropdownState: !this.state.dropdownState
      });
    }
    logout = async () =>{
      await this.props.history.push({ pathname: "/" })
      await this.props.dispatch({ type: "SETAKSES", payload: "" });
      localStorage.removeItem("authToken");
      localStorage.removeItem("outletID");
    }
    render() {
        return (
              <Navbar color="light" light expand="md" style={{position:"sticky",top:0,zIndex:1}}>
                <NavbarBrand href="/home" style={{width:"150px"}}>
                  JAYGEEGROUP
                </NavbarBrand>
                <NavbarToggler onClick={() => this.navToggle()} />
                <Collapse isOpen={this.state.navCollapse} navbar>
                  <Nav className="ml-auto" navbar>
                    { this.props.aksespage === "MASTER USER" || this.props.aksespage === "ADMIN" || this.props.aksespage === "COST CONTROL" || this.props.aksespage === "PURCHASING" ?
                    <NavItem style={{cursor:"pointer"}}>
                      <NavLink onClick={() =>  {this.props.history.push({pathname: "/home"})}}>Dashboard</NavLink>
                    </NavItem>: ""
                    }
                    { this.props.aksespage === "MASTER USER" ?
                    <NavItem style={{cursor:"pointer"}}>
                      <NavLink onClick={() =>  {this.props.history.push({pathname: "/user"})}}>User Management</NavLink>
                    </NavItem>: ""
                    }
                    { this.props.aksespage === "MASTER USER" || this.props.aksespage === "COST CONTROL"?
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Master Data
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/masteroutlet"})}}>
                          Master Outlet
                        </DropdownItem>
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/mastervendor"})}}>
                          Master Vendor
                        </DropdownItem>
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/masterbarang"})}}>
                          Master Barang
                        </DropdownItem>
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/masterRawProcessingPage"})}}>
                          Master Raw Processing
                        </DropdownItem>
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/masterproduksi"})}}>
                          Master Plan Produksi
                        </DropdownItem>
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/masterplu"})}}>
                          Master Plu
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>: ""
                    }
                    { this.props.aksespage === "MASTER USER" || this.props.aksespage === "PURCHASING" || this.props.aksespage === "ADMIN"?
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Purchase Order
                      </DropdownToggle>
                      <DropdownMenu right>
                        { this.props.aksespage === "MASTER USER" || this.props.aksespage === "PURCHASING"?
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/productin"})}}>
                          Buat Purchase Order
                        </DropdownItem>: ""
                        }
                        { this.props.aksespage === "MASTER USER" || this.props.aksespage === "ADMIN"?
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/receive_po"})}}>
                          Terima Purchase Order
                        </DropdownItem>: ""
                        }
                      </DropdownMenu>
                    </UncontrolledDropdown>: ""
                    }
                    { this.props.aksespage === "MASTER USER" || this.props.aksespage === "ADMIN"?
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Delivery Order
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/productout"})}}>
                          Buat Delivery Order
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>: ""
                    }
                    { this.props.aksespage === "MASTER USER" || this.props.aksespage === "ADMIN" ?
                    <UncontrolledDropdown nav inNavbar style={{cursor:"pointer",borderBottom:this.props.navState == "betweentransfer"?"1px solid #000":"1px solid rgb(247, 247, 247)"}}>
                      <DropdownToggle nav caret>
                        Between Transfer
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/transferin"});this.props.dispatch({ type: "SETNAVSTATE", payload: "betweentransfer" })}}>
                          Transfer In
                        </DropdownItem>
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/transferout"});this.props.dispatch({ type: "SETNAVSTATE", payload: "betweentransfer" })}}>
                          Transfer Out
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>: ""
                    }
                    { this.props.aksespage === "MASTER USER" || this.props.aksespage === "ADMIN"?
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Raw Processing
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/rawProsessingPlan"})}}>
                          Raw Processing plan
                        </DropdownItem>
                        {/* <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/rawProsessingPlan"})}}>
                          Raw Processing completion
                        </DropdownItem> */}
                      </DropdownMenu>
                    </UncontrolledDropdown>: ""
                    }
                    { this.props.aksespage === "MASTER USER" || this.props.aksespage === "ADMIN"?
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Production
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/planproduksiPage"})}}>
                          Production plan
                        </DropdownItem>
                        {/* <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/completionplanproduksiPage"})}}>
                          Production completion
                        </DropdownItem> */}
                      </DropdownMenu>
                    </UncontrolledDropdown>: ""
                    }
                    { this.props.aksespage === "MASTER USER" || this.props.aksespage === "ADMIN"?
                    <NavItem style={{cursor:"pointer",borderBottom:this.props.navState == "pembelian"?"1px solid #000":"1px solid rgb(247, 247, 247)"}}>
                      <NavLink
                      onClick={() =>  {this.props.history.push({pathname: "/pembelian"});this.props.dispatch({ type: "SETNAVSTATE", payload: "pembelian" })}}
                      >
                        Modul Pembelian
                      </NavLink>
                    </NavItem>: ""
                    }
                    {/* { this.props.aksespage === "MASTER USER" || this.props.aksespage === "COST CONTROL" ?
                    <NavItem style={{cursor:"pointer"}}>
                      <NavLink onClick={() =>  {this.props.history.push({pathname: "/report"})}}>Report</NavLink>
                    </NavItem>: ""
                    } */}
                    <NavItem style={{cursor:"pointer"}}>
                      <NavLink onClick={() =>  this.logout()}>Log Out</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
        );
    }
}

// export default withRouter(navbar);
const mapStateToProps = (state) => {
  return {
    aksespage: state.reducer.aksespage
  };
};

export default withRouter(connect(mapStateToProps)(navbar));