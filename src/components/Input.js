import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

class Input extends Component {

  render() {
    const props = this.props,
          {classes} = props;
    return (
      <div>
        {
          typeof this.props.label !== "undefined"
            ? <span className={classes.label}>{props.label}</span>
            : null
        }
        <input
          disabled={this.props.disabled}
          onKeyUp={(e) => this.props.onKeyUp(e)}
          onChange={(e) => this.props.onChange(e)}
          className={`${classes.input} ${this.props.disabled ? classes.disabled : ""}`}
          type={props.type}
          value={props.value}
        />
      </div>
    )
  }
}

const styles = theme => ({
  label: {

    fontStyle: "normal",
    fontWeight: 300,
    display: "block",
    color: theme.palette.primary.labels,
    lineHeight: "normal",
    marginBottom: 5,
    fontSize: 12
  },
  input: {
    background: "#b4bbd8",
    border: "1px solid #b4bbd8",
    boxSizing: "border-box",
    borderRadius: 3,
    height: 32,
    textAlign: "center",
    width: 111,
    "&:focus": {
      outline: "none",
      border: `1px solid ${theme.palette.primary.group}`,
    },
    "&::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
    },
    "&::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
    }
  },
  disabled: {
    background: "#576384",
    border: "1px solid #576384"
  }
});

export default withStyles(styles)(Input);