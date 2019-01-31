import connect from "react-redux/es/connect/connect";
import MainPage from '../views/MainPage';
import {
  bindApp,
  bindIncomeData,
  bindCompensation,
  bindKomDoh,
  bindAnaliticSelect,
  bindDataFactDohod,
  bindkomDohTabs,
  bindDrivers,
  bindDin
} from "../actions";

function mapStateToProps (payload) {
  return {
    storeApp: payload.handleApp,
    storeIncomeData: payload.handleDataIncomeData,
    storeCompensation: payload.handleCompensation,
    storeKomDoh: payload.handleKomDoh,
    storeAnaliticChart: payload.handleSelect,
    storeFactDohod: payload.handleDataFactDohod,
    storekomDohTabs: payload.handleDohTabs,
    storeDin: payload.handleDin,
    storeDrivers: payload.handleDrivers,
  }
}

export default connect(mapStateToProps, {
  bindApp,
  bindIncomeData,
  bindCompensation,
  bindKomDoh,
  bindAnaliticSelect,
  bindDataFactDohod,
  bindkomDohTabs,
  bindDrivers,
  bindDin
})(MainPage);