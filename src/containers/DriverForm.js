import connect from "react-redux/es/connect/connect";
import DriverForm from '../components/DriverForm';
import {bindApp, bindDriversData, bindGroup} from "../actions";

function mapStateToProps (payload) {
  return {
    storeApp: payload.handleApp,
    storeGroup: payload.handleGroup,
    storeDriversData: payload.handleDriversData,
  }
}

export default connect(mapStateToProps, {bindApp, bindDriversData, bindGroup})(DriverForm);