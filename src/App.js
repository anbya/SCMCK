import React from 'react';
import './App.css';
import "./assets/font-awesome/css/font-awesome.min.css";
import 'react-data-table-component-extensions/dist/index.css';
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import orderPage from "./pages/orderPage";
import userPage from "./pages/userPage";
import reportPage from "./pages/reportPage";
import TestReport from "./pages/testReport";
import purchaseOrderPrint from "./pages/purchaseOrderPrint";
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
          <PrivateRoute component={Mainpage} path="/home" exact />
          <PrivateRoute component={userPage} path="/user" exact />
          <PrivateRoute component={MasterVendor} path="/mastervendor" exact />
          <PrivateRoute component={MasterOutlet} path="/masteroutlet" exact />
          <PrivateRoute component={MasterBarang} path="/masterbarang" exact />
          <PrivateRoute component={MasterProduksiPage} path="/masterproduksi" exact />
          <PrivateRoute component={MasterRawProcessingPage} path="/masterRawProcessingPage" exact />
          <PrivateRoute component={MasterPluPage} path="/masterplu" exact />
          <PrivateRoute component={ProductinPage} path="/productin" exact />
          <PrivateRoute component={ReceivepoPage} path="/receive_po" exact />
          <PrivateRoute component={RawProsessingPage} path="/rawProsessingPlan" exact />
          <PrivateRoute component={PlanproduksiPage} path="/planproduksiPage" exact />
          <PrivateRoute component={CompletionplanproduksiPage} path="/completionplanproduksiPage" exact />
          <PrivateRoute component={ProduksiPage} path="/produksi" exact />
          <PrivateRoute component={ProductoutPage} path="/productout" exact />
          {/* <PrivateRoute component={orderPage} path="/order" exact /> */}
          <PrivateRoute component={reportPage} path="/report" exact />
          <PrivateRoute component={TestReport} path="/testreport" exact />
          <PrivateRoute component={purchaseOrderPrint} path="/purchaseOrderPrint" exact />
          <PrivateRoute component={ProductionPlanPrint} path="/productionPlanPrint" exact />
          <PrivateRoute component={RawProsessingPlanPrint} path="/rawProsessingPlanPrint" exact />
          <PrivateRoute component={PrepareDeliveryOrderPrint} path="/prepareDeliveryOrderPrint" exact />
          <PrivateRoute component={DeliveryOrderPrint} path="/deliveryOrderPrint" exact />
          <PrivateRoute component={TransferInPage} path="/transferin" exact />
          <PrivateRoute component={TransferOutPage} path="/transferout" exact />
          <PrivateRoute component={PembelianPage} path="/pembelian" exact />
        </Switch>
      </Router>
    </Provider>
    </div>
  );
}

export default App;
