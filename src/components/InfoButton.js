import React, { Component } from 'react';
import {withStyles, withTheme} from '@material-ui/core/styles';

class InfoButton extends Component {

    handleInfoClick = () => {
        console.log("info click!");
        this.props.bindInfoId({infoId : this.props.id});
    };

    render() {
        const props = this.props,
        { classes } = props;

        return (
            <div className={classes.infoMenuButtonWrapper}>
                <button className={`${classes.infoMenuButton} ${(this.props.storeInfoId.infoId === this.props.id) ? classes.infoMenuButtonActive : ""}`} onClick={()=>{this.handleInfoClick()}} >{this.props.data[this.props.id].title}</button>
            </div>
        )
    }
}

const styles = theme => ({
    infoMenuButton: {
        color: "#CACFDD",
        fontSize: 16,
        background: "none",
        border: "none",
        height: 27,
        transition: "all 300ms ease-in-out",
        fontStyle: "normal",
        fontWeight: "300",
        lineHeight: "normal",
        borderRadius: 13.5,
        padding: "0 11px",
        "&:focus":{
            outline: "none"
        },
        "&:hover":{
            background: "unset!important"
        }
    },
    infoMenuButtonWrapper:{
        margin: "5px 0"
    },
    infoMenuButtonActive:{
        color:"#95D4FF",
        background: "rgba(52, 152, 219, 0.2)",
        border: "0.5px solid #3498DB",
        boxSizing: "border-box",
        borderRadius: 13.5,
        fontWeight: "500"
    },
});

export default withStyles(styles)(InfoButton);