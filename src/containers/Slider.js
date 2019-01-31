import connect from "react-redux/es/connect/connect";
import Slider from '../components/Slider';
import {bindDriversData, bindBlocks, bindPreloader} from "../actions";

function mapStateToProps (payload) {
  return {
    storeDriversData: payload.handleDriversData,
    storeBlocks: payload.handleBlocks,
    storePreloader: payload.handlePreloader
  }
}

export default connect(mapStateToProps, {bindDriversData, bindBlocks, bindPreloader})(Slider);