import connect from "react-redux/es/connect/connect";
import TilesRender from '../halpers/tilesRender';
import {bindApp} from "../actions";

function mapStateToProps (payload) {
  return {
    storeApp: payload.handleApp
  }
}

export default connect(mapStateToProps, {bindApp})(TilesRender);