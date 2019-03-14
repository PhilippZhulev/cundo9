import connect from "react-redux/es/connect/connect";
import DriverForm from '../components/DriverForm';
import {bindApp, bindDriversData, bindGroup, bindValues} from "../actions";

function mapStateToProps (payload) {
  return {
    storeApp: payload.handleApp,
    storeGroup: payload.handleGroup,
    storeDriversData: payload.handleDriversData,
    storeValues: payload.handleValues
  }
}

export default connect(mapStateToProps, {bindApp, bindDriversData, bindGroup, bindValues})(DriverForm);