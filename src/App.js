import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import "./assets/font-awesome/css/font-awesome.min.css";
import 'react-data-table-component-extensions/dist/index.css';
import { Provider } from "react-redux";
import store from "./redux/store";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './route/PrivateRoute';
import Mainpage from "./pages/dashboardPage";
import Loginpage from "./pages/loginPage";
import Navbarpage from "./pages/navbar";
import MasterBarang from "./pages/masterBarangPage";
import MasterVendor from "./pages/masterVendorPage";
import MasterOutlet from "./pages/masterOutletPage";
import InventoryPage from "./pages/inventory";
import MasterProduksiPage from "./pages/masterProduksiPage";
import MasterRawProcessingPage from "./pages/masterRawProcessingPage";
import MasterPluPage from "./pages/masterPluPage";
import ProduksiPage from "./pages/produksiPage";
import RawProsessingPage from "./pages/rawProsessingPlanPage";
import PlanproduksiPage from "./pages/planproduksiPage";
import CompletionplanproduksiPage from "./pages/completionplanproduksiPage";
import ProductinPage from "./pages/purchaseOrderPage";
import ReceivepoPage from "./pages/receivePoPage";
import ProductoutPage from "./pages/deliveryOrderPage";
import OrderPage from "./pages/orderPage";
import UserPage from "./pages/userPage";
import ReportPage from "./pages/reportPage";
import TestReport from "./pages/testReport";
import PurchaseOrderPrint from "./pages/purchaseOrderPrint";
import ProductionPlanPrint from "./pages/productionPlanPrint";
import RawProsessingPlanPrint from "./pages/rawProsessingPlanPrint";
import PrepareDeliveryOrderPrint from "./pages/prepareDeliveryOrderPrint";
import DeliveryOrderPrint from "./pages/deliveryOrderPrint";
import StockReconciliationPrint from "./pages/stockReconciliationPrint";
import TransferOutPrint from "./pages/transferOutPrint";
import TransferInPage from "./pages/transferInPage";
import TransferOutPage from "./pages/transferOutPage";
import ReturnPage from "./pages/returnPage";
import WastePage from "./pages/wastePage";
import PembelianPage from "./pages/pembelianPage";
import StockReconciliationPage from "./pages/stockReconciliationPage";
import FormAddStockReconciliation from "./pages/formAddStockReconciliation";
import InvBreakdownRPT from "./pages/InvBreakdownRPT";
import LoadingRoutes from './LoadingRoutes';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // base state
        prmLoading:true
        // base state --
      };
    }
    componentDidMount = async () =>  {
         await localStorage.removeItem("APIROUTE");
        // localStorage.setItem("APIROUTE","https://3ef97221024d.ngrok.io")
        localStorage.setItem("APIROUTE","http://localhost:3009")
        this.setState({
            ...this.state,
            prmLoading: false
        });
        // axios
        // .get(`${process.env.REACT_APP_LINK}`)
        // .then(async result => {
        //     await localStorage.setItem("APIROUTE",result.data.APIROUTE)
        //     this.setState({
        //         ...this.state,
        //         prmLoading: false
        //     });
        // })
        // .catch(error => {
        //   console.log(error);
        // });
    }
    render() {
        if(this.state.prmLoading === true){
            return(
                <Router>
                    <LoadingRoutes />
                </Router>
            )
        } else {
            return (
                <div>
                <Provider store={store}>
                  <Router>
                    <Switch>
                        <Route exact path="/">
                            <Loginpage />
                        </Route>
                        <Route path="/purchaseOrderPrint">
                            <PurchaseOrderPrint />
                        </Route>
                        <Route path="/productionPlanPrint">
                            <ProductionPlanPrint />
                        </Route>
                        <Route path="/rawProsessingPlanPrint">
                            <RawProsessingPlanPrint />
                        </Route>
                        <Route path="/prepareDeliveryOrderPrint">
                            <PrepareDeliveryOrderPrint />
                        </Route>
                        <Route path="/deliveryOrderPrint">
                            <DeliveryOrderPrint />
                        </Route>
                        <Route path="/stockReconciliationPrint">
                            <StockReconciliationPrint />
                        </Route>
                        <Route path="/transferOutPrint">
                            <TransferOutPrint />
                        </Route>
                        <PrivateRoute component={Mainpage} path="/home"/>
                        <PrivateRoute component={UserPage} path="/user"/>
                        <PrivateRoute component={MasterVendor} path="/mastervendor"/>
                        <PrivateRoute component={MasterOutlet} path="/masteroutlet"/>
                        <PrivateRoute component={MasterBarang} path="/masterbarang"/>
                        <PrivateRoute component={MasterProduksiPage} path="/masterproduksi"/>
                        <PrivateRoute component={MasterRawProcessingPage} path="/masterRawProcessingPage"/>
                        <PrivateRoute component={MasterPluPage} path="/masterplu"/>
                        <PrivateRoute component={ProductinPage} path="/productin"/>
                        <PrivateRoute component={ReceivepoPage} path="/receive_po"/>
                        <PrivateRoute component={RawProsessingPage} path="/rawProsessingPlan"/>
                        <PrivateRoute component={PlanproduksiPage} path="/planproduksiPage"/>
                        <PrivateRoute component={CompletionplanproduksiPage} path="/completionplanproduksiPage"/>
                        <PrivateRoute component={ProduksiPage} path="/produksi"/>
                        <PrivateRoute component={ProductoutPage} path="/productout"/>
                        <PrivateRoute component={ReportPage} path="/report"/>
                        <PrivateRoute component={TestReport} path="/testreport"/>
                        <PrivateRoute component={TransferInPage} path="/transferin"/>
                        <PrivateRoute component={TransferOutPage} path="/transferout"/>
                        <PrivateRoute component={ReturnPage} path="/return"/>
                        <PrivateRoute component={WastePage} path="/waste"/>
                        <PrivateRoute component={PembelianPage} path="/pembelian"/>
                        <PrivateRoute component={StockReconciliationPage} path="/stokrecon"/>
                        <PrivateRoute component={FormAddStockReconciliation} path="/formAddStockReconciliation"/>
                        <PrivateRoute component={InvBreakdownRPT} path="/InvBreakdownRPT"/>
                    </Switch>
                  </Router>
                </Provider>
                </div>
            );
        }
    }
}

export default App;
