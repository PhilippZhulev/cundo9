import connect from "react-redux/es/connect/connect";
import App from '../App';
import {bindApp, bindIncomeData, bindCompensation, bindKomDoh, bindDataFactDohod, bindBlocks, bindDrivers, bindActiveBlock, bindPreloader, bindDin, bindValues, bindDriversData, bindGroup} from "../actions";

function mapStateToProps (payload) {
  return {
    storeApp: payload.handleApp,
    storeIncomeData: payload.handleDataIncomeData,
    storeCompensation: payload.handleCompensation,
    storeKomDoh: payload.handleKomDoh,
    storeFactDohod: payload.handleDataFactDohod,
    storeBlocks: payload.handleBlocks,
    storeDrivers: payload.handleDrivers,
    storeActiveBlock: payload.handleActiveBlock,
    storePreloader: payload.handlePreloader,
    storeValues: payload.handleValues,
    storeDriversData: payload.handleDriversData,
  }
}

export default connect(mapStateToProps, {bindApp, bindIncomeData, bindCompensation, bindKomDoh, bindDataFactDohod, bindBlocks, bindDrivers, bindActiveBlock, bindPreloader, bindDin, bindValues, bindDriversData,bindGroup})(App);