import React, {Component} from "react";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import App from "./containers/App";
import {darkTheme, whiteTheme} from "./template";


class Root extends Component {

  template = (theme) => {
    return theme === "dark" ? darkTheme : whiteTheme;
  };

  render() {

    console.log(this);
    console.log(this.props);

    const myTheme = createMuiTheme({
      typography : {
        useNextVariants :  true ,
      },
      //palette: this.template(this.props.storeApp.template)
    });

    return (
      <MuiThemeProvider theme={myTheme}>
        <App/>
      </MuiThemeProvider>
    )
  }
}

export default Root;