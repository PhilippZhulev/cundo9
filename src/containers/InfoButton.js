import connect from "react-redux/es/connect/connect";
import InfoButton from '../components/InfoButton';
import {bindInfoId} from "../actions";

function mapStateToProps (payload) {
    return {
        storeInfoId: payload.handleInfoId,
    }
}

export default connect(mapStateToProps, {bindInfoId})(InfoButton);