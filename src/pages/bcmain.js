import React, { Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import scrollToComponent from 'react-scroll-to-component';
import "../App.css";
import {
  Container,
  Row,
  Col
} from "reactstrap";
import Navbarpage from "./navbar";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';


class mainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navCollapse:false,
      navState:"",
      theposition:"",
      people: [
        { name: "Keanu Reeves", profession: "Actor",test1:"test1",test2:"test2",test3:"test3",test4:"test4",test5:"test5",test6:"test6" },
        { name: "Lionel Messi", profession: "Football Player",test1:"test1",test2:"test2",test3:"test3",test4:"test4",test5:"test5",test6:"test6" },
        { name: "Cristiano Ronaldo", profession: "Football Player",test1:"test1",test2:"test2",test3:"test3",test4:"test4",test5:"test5",test6:"test6" },
        { name: "Jack Nicklaus", profession: "Golf Player",test1:"test1",test2:"test2",test3:"test3",test4:"test4",test5:"test5",test6:"test6" },
      ],
      // data table recent purchase
      dataRecentPurchase: [],
      loadingRecentPurchase:false,
      // data table open order
      dataOpenOrder: [],
      loadingOpenOrder:false,
      // data table inventory
      dataInventory: [],
      loadingInventory:false,
      // checkbox test state
      hobbies:[],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    var value = target.value;
    if(target.checked){
      let DataTest = this.state.hobbies
      DataTest.push(value)
      this.setState({
        ...this.state,
        hobbies: DataTest
      }); 
    }else{
      let DataTest = this.state.hobbies
      const isLargeNumber = (element) => element == value;
      let dataKey = DataTest.findIndex(isLargeNumber)
      DataTest.splice(dataKey, 1);
      this.setState({
        ...this.state,
        hobbies: DataTest
      }); 
    }
}
  componentDidMount = () =>  {
    this.setState({
      ...this.state,
      loadingRecentPurchase:true,
      loadingOpenOrder:true,
      loadingInventory:true,
    });
    axios
    .get(`https://191d92824391.ngrok.io/centralkitchen/dataDashboard`)
    .then(result => {
      this.setState({
        ...this.state,
        dataRecentPurchase: result.data.dataPOH,
        dataOpenOrder: result.data.dataOrderH,
        dataInventory: result.data.dataInventory,
        loadingRecentPurchase:false,
        loadingOpenOrder:false,
        loadingInventory:false,
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
    .get(`https://191d92824391.ngrok.io/centralkitchen/getPOData`)
    .then(result => {
      this.setState({
        ...this.state,
        dataRecentPurchase: result.data.dataPOH,
        loading:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  navToggle = () =>  {
    this.setState({
      ...this.state,
      navCollapse: !this.state.navCollapse
    });
  }
  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "My Awesome Report";
    const headers = [["NAME", "PROFESSION", "TEST1", "TEST2", "TEST3", "TEST4", "TEST5", "TEST6", "TEST1", "TEST2", "TEST3", "TEST4", "TEST5", "TEST6"]];

    const data = this.state.people.map(elt=> [elt.name, elt.profession, elt.test1, elt.test2, elt.test3, elt.test4, elt.test5, elt.test6, elt.test1, elt.test2, elt.test3, elt.test4, elt.test5, elt.test6]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }
  render() {
    console.log(this.state.hobbies);
    // data table recent purchase
    const recentPurchaseDataButton = (data) => (
      <div>
        <button className="myBtn" onClick={()=> this.modalEditOpen(data)}><i className="fa fa-search fa-2x" aria-hidden="true"></i></button>
      </div>
    );
    const recentPurchaseColumns = [
      {
        name: 'Nomor PO',
        selector: 'nomor_po',
        sortable: true,
      },
      {
        name: 'Tanggal buat',
        selector: 'tanggal_buat',
        sortable: true,
      },
      {
        name: 'Vendor',
        selector: 'nama_vendor',
        sortable: true,
      },
      {
        name: 'PO Status',
        selector: 'po_status',
        sortable: true,
      },
      // {
      //   name: 'Tool',
      //   button: true,
      //   cell: row => recentPurchaseDataButton(row),
      // },
    ];
    // data table open order
    const openOrderDataButton = (data) => (
      <div>
        <button className="myBtn" onClick={()=> this.modalEditOpen(data)}><i className="fa fa-search fa-2x" aria-hidden="true"></i></button>
      </div>
    );
    const openOrderColumns = [
      {
        name: 'Nomor order',
        selector: 'nomor_order',
        sortable: true,
      },
      {
        name: 'Tanggal buat',
        selector: 'tanggal_buat',
        sortable: true,
      },
      {
        name: 'Outlet',
        selector: 'nama_outlet',
        sortable: true,
      },
      {
        name: 'Status order',
        selector: 'status_order',
        sortable: true,
      },
      // {
      //   name: 'Tool',
      //   button: true,
      //   cell: row => openOrderDataButton(row),
      // },
    ];
    // data table inventory
    const inventoryDataButton = (data) => (
      <div>
        <button className="myBtn" onClick={()=> this.modalEditOpen(data)}><i className="fa fa-search fa-2x" aria-hidden="true"></i></button>
      </div>
    );
    const inventoryColumns = [
      {
        name: 'Kode Barang',
        selector: 'kode_barang',
        sortable: true,
      },
      {
        name: 'Nama Barang',
        selector: 'nama_barang',
        sortable: true,
      },
      {
        name: 'Nama Vendor',
        selector: 'nama_vendor',
        sortable: true,
      },
      {
        name: 'OnHand Qty',
        selector: 'onhand_qty',
        sortable: true,
      },
      {
        name: 'Satuan Barang',
        selector: 'satuan_barang',
        sortable: true,
      },
      // {
      //   name: 'Tool',
      //   button: true,
      //   cell: row => inventoryDataButton(row),
      // },
    ];
    const conditionalInventoryRowStyles = [
      {
        when: row => row.onhand_qty == 0,
        style: {
          color: 'red',
          '&:hover': {
            color: 'red',
            cursor: 'pointer',
          },
        },
      },
    ];
    return (
      <div>
        { this.props.aksespage === "STORE MANAGER"?
          <Container fluid={true} style={{paddingBottom:30}}>
            <Row>
              <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                <span style={{fontWeight:"bold"}}>Hello {this.props.userinfo.nama_user}</span>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12">
                <div className="card" style={{marginTop:15}}>
                  <div className="card-header">
                    <Row>
                      <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                        <span style={{fontWeight:"bold"}}>Open Order</span>
                      </Col>
                      {/* <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                        <button className="myBtn" onClick={() => this.exportPDF()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                      </Col> */}
                    </Row>
                  </div>
                  <div className="card-body" style={{minHeight:"55vh"}}>
                    <DataTableExtensions
                        columns={openOrderColumns}
                        data={this.state.dataOpenOrder}
                        print={false}
                        exportHeaders={false}
                        export={false}
                    >
                      <DataTable
                        defaultSortField="title"
                        pagination={true}
                        highlightOnHover={true}
                        striped={false}
                        progressPending={this.state.loadingOpenOrder}
                        noHeader={true}
                        fixedHeader={false}
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5,10]}
                        fixedHeaderScrollHeight="300px"
                      />
                    </DataTableExtensions>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        :
          <Container fluid={true} style={{paddingBottom:30}}>
            <Row>
              <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Hobbies :</label><br />
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh1" value="1a" onChange={this.handleInputChange} checked={this.state.hobbies.includes("1a")?true:false} />
                            <label className="form-check-label" for="inlineCheckboxh1">Reading</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh2" value="2b" onChange={this.handleInputChange} checked={this.state.hobbies.includes("2b")?true:false} />
                            <label className="form-check-label" for="inlineCheckboxh2">Developing</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh3" value="3c" onChange={this.handleInputChange} checked={this.state.hobbies.includes("3c")?true:false} />
                            <label className="form-check-label" for="inlineCheckboxh3">Desiging</label>
                        </div>
                    </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                <span style={{fontWeight:"bold"}}>Hello {this.props.userinfo.nama_user}</span>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12">
                <div className="card" style={{marginTop:15}}>
                  <div className="card-header">
                    <Row>
                      <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                        <span style={{fontWeight:"bold"}}>Inventory</span>
                      </Col>
                      {/* <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                        <button className="myBtn" onClick={() => this.exportPDF()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                      </Col> */}
                    </Row>
                  </div>
                  <div className="card-body" style={{minHeight:"55vh"}}>
                    <DataTableExtensions
                        columns={inventoryColumns}
                        data={this.state.dataInventory}
                        print={false}
                        exportHeaders={false}
                        export={false}
                    >
                      <DataTable
                        defaultSortField="title"
                        pagination={true}
                        highlightOnHover={true}
                        striped={false}
                        progressPending={this.state.loadingInventory}
                        noHeader={true}
                        fixedHeader={false}
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5,10]}
                        fixedHeaderScrollHeight="300px"
                        conditionalRowStyles={conditionalInventoryRowStyles}
                      />
                    </DataTableExtensions>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="6" sm="6" md="6">
                <div className="card" style={{marginTop:15}}>
                  <div className="card-header">
                    <Row>
                      <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                        <span style={{fontWeight:"bold"}}>Recent Purchase</span>
                      </Col>
                      {/* <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                        <button className="myBtn" onClick={() => this.exportPDF()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                      </Col> */}
                    </Row>
                  </div>
                  <div className="card-body" style={{minHeight:"55vh"}}>
                    <DataTableExtensions
                        columns={recentPurchaseColumns}
                        data={this.state.dataRecentPurchase}
                        print={false}
                        exportHeaders={false}
                        export={false}
                    >
                      <DataTable
                        defaultSortField="title"
                        pagination={true}
                        highlightOnHover={true}
                        striped={false}
                        progressPending={this.state.loadingRecentPurchase}
                        noHeader={true}
                        fixedHeader={false}
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5,10]}
                        fixedHeaderScrollHeight="300px"
                      />
                    </DataTableExtensions>
                  </div>
                </div>
              </Col>
              <Col xs="6" sm="6" md="6">
                <div className="card" style={{marginTop:15}}>
                  <div className="card-header">
                    <Row>
                      <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                        <span style={{fontWeight:"bold"}}>Open Order</span>
                      </Col>
                      {/* <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                        <button className="myBtn" onClick={() => this.exportPDF()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                      </Col> */}
                    </Row>
                  </div>
                  <div className="card-body" style={{minHeight:"55vh"}}>
                    <DataTableExtensions
                        columns={openOrderColumns}
                        data={this.state.dataOpenOrder}
                        print={false}
                        exportHeaders={false}
                        export={false}
                    >
                      <DataTable
                        defaultSortField="title"
                        pagination={true}
                        highlightOnHover={true}
                        striped={false}
                        progressPending={this.state.loadingOpenOrder}
                        noHeader={true}
                        fixedHeader={false}
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5,10]}
                        fixedHeaderScrollHeight="300px"
                      />
                    </DataTableExtensions>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    aksespage: state.reducer.aksespage,
    userinfo: state.reducer.userinfo
  };
};

export default withRouter(connect(mapStateToProps)(mainPage));