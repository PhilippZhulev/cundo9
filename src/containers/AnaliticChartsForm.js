import connect from "react-redux/es/connect/connect";
import AnaliticChartsForm from '../components/AnaliticChartsForm';
import {bindApp, bindAnaliticSelect, bindDataFactDohod} from "../actions";

function mapStateToProps (payload) {
  return {
    storeApp: payload.handleApp,
    storeAnaliticChart: payload.handleSelect,
    storeFactDohod: payload.handleDataFactDohod
  }
}

export default connect(mapStateToProps, {bindApp, bindAnaliticSelect, bindDataFactDohod})(AnaliticChartsForm);