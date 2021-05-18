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
        .post(`${localStorage.getItem("APIROUTE")}/centralkitchen/getAkses`, dataToSend, {
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
        await localStorage.removeItem("authToken");
        await localStorage.removeItem("outletID");
        await this.props.history.push({ pathname: "/" })
        await this.props.dispatch({ type: "SETAKSES", payload: "" });
        await this.props.dispatch({ type: "SETUSERINFO", payload: "" });
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
                    <NavItem className={this.props.history.location.pathname=="/home"?"myNavbarStyle-active":"myNavbarStyle"}>
                      <NavLink onClick={() =>  {this.props.history.push({pathname: "/home"})}}>Dashboard</NavLink>
                    </NavItem>: ""
                    }
                    { this.props.aksespage === "MASTER USER" || this.props.aksespage === "COST CONTROL"|| this.props.aksespage === "PURCHASING"?
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret className={
                          this.props.history.location.pathname=="/masteroutlet"||
                          this.props.history.location.pathname=="/mastervendor"||
                          this.props.history.location.pathname=="/masterbarang"||
                          this.props.history.location.pathname=="/masterRawProcessingPage"||
                          this.props.history.location.pathname=="/masterproduksi"||
                          this.props.history.location.pathname=="/masterplu"||
                          this.props.history.location.pathname=="/stokrecon"||
                          this.props.history.location.pathname=="/user"?"myNavbarStyle-active":"myNavbarStyle"}>
                        Master Data
                      </DropdownToggle>
                      <DropdownMenu right>
                        { this.props.aksespage === "MASTER USER" &&
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/user"})}}>
                          User Management
                        </DropdownItem>
                        }
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
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/stokrecon"})}}>
                            Stock Reconciliation
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>: ""
                    }
                    { this.props.aksespage === "MASTER USER" || this.props.aksespage === "PURCHASING" || this.props.aksespage === "ADMIN"?
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret className={
                          this.props.history.location.pathname=="/productin"||
                          this.props.history.location.pathname=="/receive_po"?"myNavbarStyle-active":"myNavbarStyle"}>
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
                      <DropdownToggle nav caret className={
                          this.props.history.location.pathname=="/planproduksiPage"?"myNavbarStyle-active":"myNavbarStyle"}>
                        Product
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/waste"})}}>
                          Product waste
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>: ""
                    }
                    { this.props.aksespage === "MASTER USER" || this.props.aksespage === "ADMIN"?
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret className={
                          this.props.history.location.pathname=="/productout"?"myNavbarStyle-active":"myNavbarStyle"}>
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
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret className={
                          this.props.history.location.pathname=="/transferin"||
                          this.props.history.location.pathname=="/transferout"?"myNavbarStyle-active":"myNavbarStyle"}>
                        Between Transfer
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/transferin"})}}>
                          Transfer In
                        </DropdownItem>
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/transferout"})}}>
                          Transfer Out
                        </DropdownItem>
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/return"})}}>
                          Return To Vendor
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>: ""
                    }
                    { this.props.aksespage === "MASTER USER" || this.props.aksespage === "ADMIN"?
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret className={
                          this.props.history.location.pathname=="/rawProsessingPlan"?"myNavbarStyle-active":"myNavbarStyle"}>
                        Raw Processing
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/rawProsessingPlan"})}}>
                          Raw Processing plan
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>: ""
                    }
                    { this.props.aksespage === "MASTER USER" || this.props.aksespage === "ADMIN"?
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret className={
                          this.props.history.location.pathname=="/planproduksiPage"?"myNavbarStyle-active":"myNavbarStyle"}>
                        Production
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={() =>  {this.props.history.push({pathname: "/planproduksiPage"})}}>
                          Production plan
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>: ""
                    }
                    { this.props.aksespage === "MASTER USER" || this.props.aksespage === "ADMIN"?
                    <NavItem className={this.props.history.location.pathname=="/pembelian"?"myNavbarStyle-active":"myNavbarStyle"}>
                      <NavLink
                      onClick={() =>  {this.props.history.push({pathname: "/pembelian"})}}
                      >
                        Modul Pembelian
                      </NavLink>
                    </NavItem>: ""
                    }
                    {this.props.aksespage === "ADMIN"&&
                    <NavItem className={this.props.history.location.pathname=="/stokrecon"?"myNavbarStyle-active":"myNavbarStyle"}>
                      <NavLink
                      onClick={() =>  {this.props.history.push({pathname: "/stokrecon"})}}
                      >
                        Stock Reconciliation
                      </NavLink>
                    </NavItem>
                    }
                    { this.props.aksespage === "MASTER USER" || this.props.aksespage === "COST CONTROL" ?
                    <NavItem style={{cursor:"pointer"}}>
                      <NavLink onClick={() =>  {this.props.history.push({pathname: "/report"})}}>Report</NavLink>
                    </NavItem>: ""
                    }
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