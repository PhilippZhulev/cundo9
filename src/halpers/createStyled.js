import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";

/*Хук для динамического изменения стилей*/
const createStyled = function(styles, options) {
  function Styled(props) {
    const { children, ...other } = props;
    return children(other);
  }
  Styled.propTypes = {
    children: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };
  return withStyles(styles, options)(Styled);
};

export {createStyled}
