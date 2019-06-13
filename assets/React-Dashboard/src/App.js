import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import {
  Layout,
  Menu,
  Statistic,
  Row,
  Col,
  Input,
  Button,
  Dropdown,
  Icon,
  Select
} from "antd";
import Papa from "papaparse";
import InstagramBubbleGraph from "./BubbleGraph";
import PrivatePublicPieChart from "./PrivatePublicPieChart";
import FakeRealPieChart from "./FakeRealPieChart";

const { Header, Content, Footer } = Layout;
const SearchInput = Input.Search;

const { Option } = Select;

export function convertRange(value, r1, r2) {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
}

class App extends React.Component {
  state = {
    plotData: []
  };

  componentDidMount() {
    this.parseCsv();
  }

  parseCsv = async () => {
    let req = await fetch("/InstagramSpammer.csv");
    let csvString = await req.text();
    let parsedCsv = Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      worker: false
    });
    if (parsedCsv.errors.length !== 0) {
      return;
    }
    this.setState({
      plotData: parsedCsv.data
    });
  };

  render() {
    return (
      <Layout className="layout">
        <Header
        style={{ backgroundColor: "#000" }}
        >
          <div className="logo">
            <img src="/statgram.png" /> <h3 style={{ color: "#fff", marginLeft: 10 }}>Analytics</h3>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px", backgroundColor: "#000" }}
          >
            <Menu.Item key="1" style={{ float: "right" }} className="headerSearchInput">
              <SearchInput
                placeholder="search"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
              />
            </Menu.Item>
          </Menu>
        </Header>
        <Content className="contentContainer">
          <div style={{ background: "#fff", padding: 24, minHeight: "100%" }}>
            <div className="mobileSearchInput">
              <SearchInput
                placeholder="search"
                onSearch={value => console.log(value)}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: 25, textAlign: "right" }}>
              <Select
                showSearch
                style={{ width: 200, marginRight: 20 }}
                placeholder="Select a user"
                size="large"
                className="userSelect"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="jack">
                  <Icon type="user" /> Jack
                </Option>
                <Option value="lucy">
                  <Icon type="user" /> Lucy
                </Option>
                <Option value="tom">
                  <Icon type="user" /> Tom
                </Option>
              </Select>
              <br className="responsiveBr" />
              <Button
                type="primary"
                shape="round"
                icon="area-chart"
                size={"large"}
                className="addVisualization"
              >
                Add Visualization
              </Button>
            </div>
            <Row gutter={0}>
              <Col
                md={14}
                xs={24}
                sm={24}
                style={{
                  height: 400,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // background: "rgba(236, 236, 236, 0.5)"
                }}
              >
                <Statistic
                  className="currentFollowersStatistic"
                  title="Current Followers"
                  value={this.state.plotData.length}
                  style={{ background: "#fff", padding: 50}}
                />
              </Col>
              <Col md={10} sm={24} xs={24}>
                <PrivatePublicPieChart plotData={this.state.plotData} />
              </Col>
              <Col md={14} sm={24} xs={24} style={{ display: "relative" }}>
                <InstagramBubbleGraph plotData={this.state.plotData} />
              </Col>
              <Col md={10} sm={24} xs={24}>
                <FakeRealPieChart plotData={this.state.plotData} />
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }} />
      </Layout>
    );
  }
}

export default App;
