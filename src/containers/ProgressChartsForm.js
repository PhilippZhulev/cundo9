import connect from "react-redux/es/connect/connect";
import ProgressChartsForm from '../components/ProgressChartsForm';
import {bindApp, bindAnaliticSelect} from "../actions";

function mapStateToProps (payload) {
  return {
    storeApp: payload.handleApp,
    storeAnaliticChart: payload.handleSelect,
  }
}

export default connect(mapStateToProps, {bindApp, bindAnaliticSelect})(ProgressChartsForm);