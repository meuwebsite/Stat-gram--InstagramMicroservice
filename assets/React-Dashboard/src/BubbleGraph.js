import React from "react";
import createPlotlyComponent from "react-plotly.js/factory";
import { convertRange } from "./App";
import { Checkbox } from "antd";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Fake", "Real"];
const defaultCheckedList = ["Fake", "Real"];

const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

class InstagramBubbleGraph extends React.Component {
  state = {
    display: "all",
    checkedList: defaultCheckedList,
    indeterminate: false,
    checkAll: true
  };

  onChange = checkedList => {
    let display = "";
    if (checkedList.length === plainOptions.length) {
      display = "all";
    } else {
      display = checkedList[0];
    }
    this.setState({
      checkedList,
      display,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length
    });
  };

  onCheckAllChange = e => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
      display: e.target.checked ? "all" : undefined
    });
  };

  render() {
    let dataset = this.props.plotData;
    if (!this.state.display) dataset = [];
    let fakeAccounts = dataset.filter(row => row["fake"] === 1);
    let realAccounts = dataset.filter(row => row["fake"] === 0);

    if (this.state.display !== "all") {
      if (this.state.display === "Fake") {
        realAccounts = [];
      } else if (this.state.display === "Real") {
        fakeAccounts = [];
      }
    }

    // Fake accounts trace
    let fakePosts = fakeAccounts.map(row => row["#posts"]);
    let minFakePosts = Math.min(...fakePosts);
    let maxFakePosts = Math.max(...fakePosts);
    let fakeData = {
      followers: fakeAccounts.map(row => row["#followers"]),
      following: fakeAccounts.map(row => row["#follows"]),
      posts: fakeAccounts.map(row => row["#posts"]),
      maxPosts: maxFakePosts,
      minPosts: minFakePosts,
      labels: fakeAccounts.map(row => {
        return `${row["#followers"]} followers <br>${
          row["#follows"]
        } following<br>${row["#posts"]} posts`;
      }),
      sizes: fakeAccounts.map(row =>
        convertRange(row["#posts"], [minFakePosts, maxFakePosts], [5, 7])
      )
    };

    // Real accounts trace
    let realPosts = realAccounts.map(row => row["#posts"]);
    let minRealPosts = Math.min(...realPosts);
    let maxRealPosts = Math.max(...realPosts);
    let realData = {
      followers: realAccounts.map(row => row["#followers"]),
      following: realAccounts.map(row => row["#follows"]),
      posts: realAccounts.map(row => row["#posts"]),
      maxPosts: maxRealPosts,
      minPosts: minRealPosts,
      labels: realAccounts.map(row => {
        return `${row["#followers"]} followers <br>${
          row["#follows"]
        } following<br>${row["#posts"]} posts`;
      }),
      sizes: realAccounts.map(row =>
        convertRange(row["#posts"], [minRealPosts, maxRealPosts], [5, 7])
      )
    };

    return (
      <React.Fragment>
        <Plot
          data={[
            {
              name: "Fake",
              x: fakeData.following,
              y: fakeData.followers,
              mode: "markers",
              text: fakeData.labels,
              marker: {
                size: fakeData.sizes,
                sizeref: 0.2,
                sizeMode: "area",
                color: "#f5222d"
              }
            },
            {
              name: "Real",
              x: realData.following,
              y: realData.followers,
              mode: "markers",
              text: realData.labels,
              marker: {
                size: realData.sizes,
                sizeref: 0.2,
                sizeMode: "area",
                color: "#a0d911"
              }
            }
          ]}
          useResizeHandler={true}
          style={{ width: "100%", height: 400 }}
          layout={{
            showlegend: true,
            autosize: true,
            title: "Followers<br><span style='font-size: 13px;'>Size: # of posts</span>",
            xaxis: { title: "# of follows" },
            yaxis: { title: "# of followers" }
          }}
          responsive={true}
        />
        <Checkbox
          indeterminate={this.state.indeterminate}
          onChange={this.onCheckAllChange}
          checked={this.state.checkAll}
        >
          All
        </Checkbox>
        <CheckboxGroup
          options={plainOptions}
          value={this.state.checkedList}
          onChange={this.onChange}
        />
      </React.Fragment>
    );
  }
}

export default InstagramBubbleGraph;
