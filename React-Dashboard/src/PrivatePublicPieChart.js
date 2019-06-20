import React from "react";
import createPlotlyComponent from "react-plotly.js/factory";

const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

class PrivatePublicPieChart extends React.Component {
  render() {
    let privateAccounts = 0;
    let publicAccounts = 0;
    this.props.plotData.map(row =>
      row["private"] === 0 ? (publicAccounts += 1) : (privateAccounts += 1)
    );

    return (
      <Plot
        data={[
          {
            values: [privateAccounts, publicAccounts],
            labels: ["Private Accounts", "Public Accounts"],
            type: "pie"
          }
        ]}
        useResizeHandler={true}
        style={{ width: "100%", height: 400 }}
        responsive={true}
        layout={{
          autosize: true,
          title: "Private vs. Public Accounts"
        }}
      />
    );
  }
}

export default PrivatePublicPieChart;
