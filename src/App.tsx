import React, { Component, useState } from "react";
import {
  Layout,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Cascader,
  InputNumber,
  Checkbox,
  Radio,
  Slider,
  Row,
  Col
} from "antd";
import ReactJSONView, {
  ReactJsonViewProps,
  OnSelectProps
} from "react-json-view";
import "normalize.css";
import Search from "antd/lib/input/Search";
import { SliderValue } from "antd/lib/slider";

const { Content, Sider } = Layout;
const { Option } = Select;

// 出参
const entering = {
  callType: 1,
  channel: 1,
  data: {
    bonusIds: "1,2,3",
    cat2Id: 1001,
    cat3Id: 1001,
    categoryId: 1001,
    deliveryType: 1,
    fromCommissionRatio: 10,
    fromPrice: 10,
    hasCoupon: 1,
    isCare: "1是，0否",
    isHot: 1,
    isPinGou: 1,
    isZY: 1,
    key: 1001,
    keywordType: 1,
    lock: 1,
    orientationFlag: 1,
    searchType: 1,
    searchUUID: 1,
    shopId: 20,
    skuIds: 1,
    sort: "desc",
    sortName: "wlCommission",
    toCommissionRatio: 20,
    toPrice: 20
  },
  pageNo: 1,
  pageSize: 10,
  totalCount: 1,
  uuid: "xxxxxxx"
};
// 入参
const participation = {
  a: 1
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};

const formItemOptions = [
  {
    key: "input",
    component: Input
  },
  {
    key: "checkbox",
    component: Checkbox
  },
  {
    key: "radio",
    component: Radio
  },
  {
    key: "select",
    component: Select
  }
];

interface Props {
  jsonTheme: ReactJsonViewProps["theme"];
}

function MySlider() {
  let [left, setLeft] = useState(6);
  return (
    <>
      <Row align="middle" type="flex">
        <Col span={6}>label宽度</Col>
        <Col span={18}>
          <Slider
            max={24}
            value={left}
            onChange={val => setLeft(val as number)}
          />
        </Col>
      </Row>
      <Row align="middle" type="flex">
        <Col span={6}>组件宽度</Col>
        <Col span={18}>
          <Slider max={24} range value={[left, 24]} />
        </Col>
      </Row>
    </>
  );
}

class App extends Component<Props> {
  static defaultProps = {
    jsonTheme: "monokai"
  };
  onSelect = (val: OnSelectProps) => {
    console.log("TCL: App -> onSelect -> val", val);
  };
  render() {
    const { jsonTheme } = this.props;
    return (
      <Layout style={{ height: "100%", padding: "20px" }}>
        <Sider width={300}>
          <ReactJSONView
            theme={jsonTheme}
            name="入参"
            src={entering}
            onSelect={this.onSelect}
          />
          <ReactJSONView theme={jsonTheme} name="出参" src={participation} />
        </Sider>
        <Layout>
          <Search placeholder="接口地址" enterButton />
          <Layout>
            <Sider width={300} style={{ padding: "0 10px" }} theme="light">
              <div style={{ padding: "10px 0 0 10px" }}>
                <span>选择组件: </span>
                <Select defaultValue={"input"} style={{ width: 200 }}>
                  {formItemOptions.map(item => (
                    <Option value={item.key} key={item.key}>
                      {item.key}
                    </Option>
                  ))}
                </Select>
              </div>
              <hr />
              <MySlider />
            </Sider>
            <Content>
              <Form {...formItemLayout}>
                <Form.Item
                  label="Fail"
                  validateStatus="error"
                  help="Should be combination of numbers & alphabets"
                >
                  <Input placeholder="unavailable choice" id="error" />
                </Form.Item>
              </Form>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
