import connect from "react-redux/es/connect/connect";
import TabsButton from '../components/TabsButton';
import {bindAnaliticSelect, bindPreloader} from "../actions";

function mapStateToProps (payload) {
    return {
        storeAnaliticChart: payload.handleSelect
    }
}

export default connect(mapStateToProps, {bindAnaliticSelect, bindPreloader})(TabsButton);