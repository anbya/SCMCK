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
      // data table recent purchase
      dataRecentPurchase: [],
      loadingRecentPurchase:false,
      // data table open order
      dataOpenOrder: [],
      loadingOpenOrder:false,
      // data table raw material
      dataInventory: [],
      loadingInventory:false,
      // data table finished goods
      dataInventory2: [],
      loadingInventory2:false,
    };
  }
  componentDidMount = () =>  {
    this.setState({
      ...this.state,
      loadingRecentPurchase:true,
      loadingOpenOrder:true,
      loadingInventory:true,
      loadingInventory2:true,
    });
    let APIroute = localStorage.getItem("APIROUTE")
        axios
        .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/dataDashboard`)
    .then(result => {
      this.setState({
        ...this.state,
        dataRecentPurchase: result.data.dataPOH,
        dataOpenOrder: result.data.dataOrderH,
        dataInventory: result.data.dataInventory,
        dataInventory2: result.data.dataInventoryFinshedGoods,
        loadingRecentPurchase:false,
        loadingOpenOrder:false,
        loadingInventory:false,
        loadingInventory2:false,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  refreshPageData = () =>  {
    this.setState({
      ...this.state,
      loadingRecentPurchase:true,
      loadingOpenOrder:true,
      loadingInventory:true,
      loadingInventory2:true,
    });
    let APIroute = localStorage.getItem("APIROUTE")
        axios
        .get(`${localStorage.getItem("APIROUTE")}/centralkitchen/dataDashboard`)
    .then(result => {
      this.setState({
        ...this.state,
        dataRecentPurchase: result.data.dataPOH,
        dataOpenOrder: result.data.dataOrderH,
        dataInventory: result.data.dataInventory,
        dataInventory2: result.data.dataInventoryFinshedGoods,
        loadingRecentPurchase:false,
        loadingOpenOrder:false,
        loadingInventory:false,
        loadingInventory2:false,
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
  render() {
    // data table recent purchase
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
    // data table raw material
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
        selector: 'onhand_qty_to_show',
        sortable: true,
      },
      {
        name: 'Satuan Barang',
        selector: 'satuan_to_show',
        sortable: true,
      },
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
    // data table finished goods
    const inventory2Columns = [
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
        selector: 'onhand_qty_to_show',
        sortable: true,
      },
      {
        name: 'Satuan Barang',
        selector: 'satuan_to_show',
        sortable: true,
      },
    ];
    const conditionalInventory2RowStyles = [
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
        <Container fluid={true} style={{paddingBottom:30}}>
            <Row>
              <Col xs="12" sm="12" md="12" style={{padding:0}}>
                <div className="card">
                  <div className="card-header">
                    <span style={{fontWeight:"bold"}}>Hello {this.props.userinfo.nama_user}</span>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12">
                <Row>
                  <Col xs="12" sm="12" md="6" style={{padding:5}}>
                    <div className="card" style={{height:"100%"}}>
                      <div className="card-header">
                        <Row>
                          <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                            <span style={{fontWeight:"bold"}}>Raw material</span>
                          </Col>
                          {/* <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                            <button className="myBtn" onClick={() => this.exportPDF()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                          </Col> */}
                        </Row>
                      </div>
                      <div className="card-body">
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
                            paginationRowsPerPageOptions={[5]}
                            fixedHeaderScrollHeight="300px"
                            conditionalRowStyles={conditionalInventoryRowStyles}
                          />
                        </DataTableExtensions>
                      </div>
                    </div>
                  </Col>
                  <Col xs="12" sm="12" md="6" style={{padding:5}}>
                    <div className="card" style={{height:"100%"}}>
                      <div className="card-header">
                        <Row>
                          <Col xs="12" sm="12" md="12" style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                            <span style={{fontWeight:"bold"}}>Finished Goods</span>
                          </Col>
                          {/* <Col xs="2" sm="2" md="2" style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                            <button className="myBtn" onClick={() => this.exportPDF()}><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></button>
                          </Col> */}
                        </Row>
                      </div>
                      <div className="card-body">
                        <DataTableExtensions
                            columns={inventory2Columns}
                            data={this.state.dataInventory2}
                            print={false}
                            exportHeaders={false}
                            export={false}
                        >
                          <DataTable
                            defaultSortField="title"
                            pagination={true}
                            highlightOnHover={true}
                            striped={false}
                            progressPending={this.state.loadingInventory2}
                            noHeader={true}
                            fixedHeader={false}
                            paginationPerPage={5}
                            paginationRowsPerPageOptions={[5]}
                            fixedHeaderScrollHeight="300px"
                            conditionalRowStyles={conditionalInventory2RowStyles}
                          />
                        </DataTableExtensions>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" sm="12" md="6" style={{padding:5}}>
                    <div className="card" style={{height:"100%"}}>
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
                      <div className="card-body">
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
                            paginationRowsPerPageOptions={[5]}
                            fixedHeaderScrollHeight="300px"
                          />
                        </DataTableExtensions>
                      </div>
                    </div>
                  </Col>
                  <Col xs="12" sm="12" md="6" style={{padding:5}}>
                    <div className="card" style={{height:"100%"}}>
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
                      <div className="card-body">
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
                            paginationRowsPerPageOptions={[5]}
                            fixedHeaderScrollHeight="300px"
                          />
                        </DataTableExtensions>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
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