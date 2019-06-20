import React from "react";
import createPlotlyComponent from "react-plotly.js/factory";

const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

class FakeRealPieChart extends React.Component {
  render() {
    let fakeAccounts = 0;
    let realAccounts = 0;
    this.props.plotData.map(row =>
      row["fake"] === 0 ? (realAccounts += 1) : (fakeAccounts += 1)
    );

    return (
      <Plot
        data={[
          {
            values: [fakeAccounts, realAccounts],
            labels: ["Fake Accounts", "Real Accounts"],
            type: "pie"
          }
        ]}
        responsive={true}
        useResizeHandler={true}
        style={{ width: "100%", height: 400 }}
        layout={{
          autosize: true,
          title: "Fake vs. Real Accounts"
        }}
      />
    );
  }
}

export default FakeRealPieChart;
