import connect from "react-redux/es/connect/connect";
import GroupForm from '../components/GroupForm';
import {bindApp, bindGroup, bindDrivers, bindDriversData, bindPreloader, bindValues} from "../actions";

function mapStateToProps (payload) {
  return {
    storeApp: payload.handleApp,
    storeGroup: payload.handleGroup,
    storeDriversData: payload.handleDriversData,
    storePreloader: payload.handlePreloader,
    storeValues: payload.handleValues
  }
}

export default connect(mapStateToProps, {bindApp, bindGroup, bindDrivers, bindDriversData, bindPreloader, bindValues})(GroupForm);
