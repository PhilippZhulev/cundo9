import React, { Component } from 'react';
import {withStyles, withTheme} from '@material-ui/core/styles';
import 'amcharts3';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/themes/light';
import 'amcharts3/amcharts/plugins/export/export.min.js';
import 'amcharts3/amcharts/plugins/export/export.css';
import AmCharts from '@amcharts/amcharts3-react';

class Chart extends Component {



  amchartsSettings =
    {
      "type": "serial",
      "path": typeof window.bobrPath !== "undefined" ? window.bobrPath : `/`,
      "svgIcons": "false",
      "categoryField": "category",
        "thousandsSeparator": " ",
      "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "color": "#6F849B",
        "gridThickness": 0
      },
      "chartScrollbar": {
        "enabled": true,
        "backgroundColor": "#E5E9F2",
        "dragIcon": "dragIconRoundSmall",
        "dragIconWidth": 18,
        "offset": -2,
        "oppositeAxis": false,
        "scrollbarHeight": 2,
        "selectedBackgroundColor": "#B8C5D3"
      },
      "trendLines": [],
      "graphs": [
        {
          "balloonText": "[[title]] of [[category]]:[[value]]",
          "id": "AmGraph-2",
          "lineColor": "#EB5763",//"#FEC400",
          "lineThickness": 2,
          "title": "graph 2",
          "type": "smoothedLine",
          "valueField": "column-2"
        },
          {
              "balloonText": "[[title]] of [[category]]:[[value]]",
              "bulletBorderThickness": 0,
              "id": "AmGraph-1",
              "lineColor": "#3498DB",
              "lineThickness": 2,
              "title": "graph 1",
              "type": "smoothedLine",
              "valueField": "column-1"
          }
      ],
      "guides": [],
      "valueAxes": [
        {
          "id": "ValueAxis-1",
          "zeroGridAlpha": 0,
          "axisAlpha": 0,
          "color": "#6F849B",
          "gridAlpha": 1,
          "gridColor": "#6F849B",
          "minorGridAlpha": 0,
          "title": "",
          "titleColor": "#6F849B",
          "titleRotation": 1
        }
      ],
      "allLabels": [],
      "balloon": {
        "offsetX": 0,
        "offsetY": 0
      },
      "titles": [],
      "dataProvider": this.props.getProvider(this.props.data).chart
    };

  render() {
    return (
      <AmCharts.React
        key={0}
        className={this.props.classes.chartWrapper}
        options={this.amchartsSettings}
      />

    )
  }

}

const styles = theme => ({
  chartWrapper: {
    width: "100%",
    height: 220
  }
});

export default withStyles(styles)(withTheme()(Chart));