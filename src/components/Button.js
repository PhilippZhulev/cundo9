import React, { Component } from 'react';
import {withStyles, withTheme} from '@material-ui/core/styles';
import {createStyled} from "../halpers/createStyled"

class Button extends Component {

  buttonType = (props) => {
    switch (props.type) {
      case "red" : return {
        color: props.theme.palette.primary.red,
        border: props.theme.palette.primary.redBorder,
      };
      default: return {
        color: props.theme.palette.primary.blue,
        border: props.theme.palette.primary.blueBorder,
      };
    }
  };

  render() {
    const props = this.props,
         baseClasses = props.classes,

          Styled = createStyled({
            colors: {
              background: this.buttonType(props).color,
              border: `1px solid ${this.buttonType(props).border}`
            }
          });

    return (
      <Styled>
        {
          ({classes}) =>
            <div className={baseClasses.wrapper}>
              <button onClick={(e) => this.props.onClick(e)} className={`${baseClasses.root} ${classes.colors}`}>{props.text}</button>
            </div>
        }
      </Styled>
    )
  }
}

const styles = theme => ({
  root: {
    width: "100%",
    height: 40,
    borderRadius: "50px",
    fontWeight: 300,
    color: "#fff",
    transition: "all 300ms ease-in-out",
    marginBottom: 15,
    "&:focus": {
      outline: "none"
    },
    "&:hover": {
      background: theme.palette.primary.fade,
    },
  },
  wrapper: {
    padding: "0 15px"
  }
});

export default withStyles(styles)(withTheme()(Button));
