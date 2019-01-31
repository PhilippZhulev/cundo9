import connect from "react-redux/es/connect/connect";
import Root from '../Root';
import {bindApp} from "../actions";

function mapStateToProps (payload) {
  return {
    storeApp: payload.handleApp
  }
}

export default connect(mapStateToProps, {bindApp})(Root);