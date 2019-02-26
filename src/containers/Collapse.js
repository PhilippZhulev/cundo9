import connect from "react-redux/es/connect/connect";
import Collapse from '../components/Collapse';
import {closeCollapses} from "../actions";

function mapStateToProps (payload) {
    return {
        storeCloseCollapses: payload.handleCloseCollapses
    }
}

export default connect(mapStateToProps, {closeCollapses})(Collapse);