import React from 'react';
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
import TransferInPage from "./pages/transferInPage";
import TransferOutPage from "./pages/transferOutPage";
import PembelianPage from "./pages/pembelianPage";


function App() {
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
            <PrivateRoute component={PembelianPage} path="/pembelian"/>
        </Switch>
      </Router>
    </Provider>
    </div>
  );
}

export default App;
