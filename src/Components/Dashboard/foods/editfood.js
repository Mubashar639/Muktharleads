import React from "react";
import { Modal, Input, Select, DatePicker, Checkbox } from "antd";
import { Updatefood } from "../../../Redux/Epics/food";
import { connect } from "react-redux";
const { Option } = Select;
const { TextArea } = Input;
class EditCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lead: "",
      dateTime: "",
      contactNo: "",
      address: "",
      tokenNo: "",
      paymentCollectionAmount: "",
      bioMetricFor: true,
      userId: "",
      leadStage: "pending",
      status: "Pending",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.isModalInitialized && nextProps.isEditModalOpen) {
      return {
        ...prevState,
        isModalInitialized: true,
        lead: nextProps.category.lead,
        dateTime: new Date(nextProps.category.dateTime * 1000),
        contactNo: nextProps.category.contactNo,
        address: nextProps.category.address,
        tokenNo: Number(nextProps.category.tokenNo),
        paymentCollectionAmount: Number(
          nextProps.category.paymentCollectionAmount
        ),
        bioMetricFor: nextProps.category.bioMetricFor,
        userId: nextProps.category.userId,
        userName: nextProps.category.userName,

        leadStage: nextProps.category.leadStage,
        status: nextProps.category.status,
        id: nextProps.category.id,
      };
    }

    return prevState;
  }

  onOkHandler = () => {
    console.log(this.state);
    // const form = new FormData();
    // form.append("name", this.state.name);
    // // form.append("price", this.state.price)
    // // form.append("photo", this.state.photo)
    // console.log(form)

    this.props.dispatch(
      Updatefood({ ...this.state }, this.props.refreshTheItem)
    );
    this.resetSate();
    this.props.closeEditModal();
  };

  resetSate = () =>
    this.setState({
      lead: "",
      dateTime: "",
      contactNo: "",
      address: "",
      tokenNo: "",
      paymentCollectionAmount: "",
      bioMetricFor: true,
      userId: "",
      userName: "",
      leadStage: "pending",
      status: "Pending",
      isModalInitialized: false,
    });

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  onsubcate = (e) => {
    // console.log(e)

    let array = [];
    array.push(e);
    this.setState({ path: array });
  };
  onSellector = (e) => {
    const user = this.props.user.find((user) => user.id === e);
    this.setState({
      userId: user.id,
      userName: user.name,
    });
  };
  filehandler = (e) => {
    // const files = Array.from(e.target.files)
    const photo = e.target.files[0];
    this.setState({ photo });
  };

  cancelHandler = () => {
    this.resetSate();
    this.props.closeEditModal();
  };
  onOk = (value, dateString) => {
    debugger;
    console.log(value);
    console.log(value._d);
    this.setState({ dateTime: new Date(value._d) });
  };

  onChangeTime = (value, dateString) => {
    this.setState({ dateTime: new Date(value._d) });
  };
  render() {
    return (
      <div>
        <Modal
          visible={this.props.isEditModalOpen}
          onCancel={this.cancelHandler}
          title="Edit facility"
          maskClosable={false}
          width="80%"
          onOk={this.onOkHandler}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItem: "center",
              justifyContent: "space-around",
            }}
          >
            {/* <div>
              <div>
                <h3> Select Sub Category </h3>
                <Select
                  style={{ width: "200px" }}
                  onSelect={this.onsubcate}
                  name="subcategory"
                  defaultValue={this.state.path}
                >
                  {this.state.category !== "select category" &&
                    this.state.category.children.map((item, key) => {
                      return (
                        <Option key={key} value={item}>
                          {item.split("/")[2]}
                        </Option>
                      );
                    })}
                </Select>
              </div>
            </div> */}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItem: "center",
              justifyContent: "space-around",
            }}
          >
            <div>
              <h3>lead Id</h3>
              <Input
                placeholder="Enter your  name"
                name="lead"
                value={this.state.lead}
                allowClear
                onChange={this.onChange}
              />
            </div>

            {/* name: "",
      dateTime:"",
      contactNo:"",
      address:"",
      tokenNo:"",
      paymentCollectionAmount:"",
      bioMetricFor:"",
      userId:"" */}
            <div>
              <h3> Contact No</h3>
              <Input
                placeholder="Enter contact"
                value={this.state.contactNo}
                name="contactNo"
                allowClear
                onChange={this.onChange}
              />
            </div>

            <div>
              <h3> address</h3>
              <Input
                placeholder="Enter address"
                value={this.state.address}
                name="address"
                allowClear
                onChange={this.onChange}
              />
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div>
                <h3> biometric </h3>
                <Checkbox
                  value={this.state.bioMetricFor}
                  onChange={(e) =>
                    this.setState({ bioMetricFor: e.target.checked })
                  }
                >
                  biometric
                </Checkbox>
              </div>
              <div>
                <h3> date and time </h3>
                <DatePicker
                  showTime
                  placeholder="Select Time"
                  onChange={this.onChangeTime}
                  onOk={this.onOk}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div>
                <h3> token No</h3>
                <Input
                  placeholder="Enter token"
                  value={this.state.tokenNo}
                  name="tokenNo"
                  allowClear
                  onChange={this.onChange}
                />
              </div>
              <div>
                <h3> payment Collection Amount</h3>
                <Input
                  type={"number"}
                  placeholder="Enter collect Amount"
                  value={this.state.paymentCollectionAmount}
                  name="paymentCollectionAmount"
                  allowClear
                  onChange={this.onChange}
                />
              </div>
              <div>
                <h3> Select user </h3>
                <Select
                  style={{ width: "200px" }}
                  onSelect={this.onSellector}
                  name="category"
                  defaultValue={this.state.userName}
                >
                  {this.props.user &&
                    this.props.user.map((item, key) => {
                      return (
                        <Option key={key} value={item.id}>
                          {item.name}
                        </Option>
                      );
                    })}
                </Select>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  categorymy: state.Category.category,
  user: state.Facility.facilities,
});
export default connect(mapStateToProps, null)(EditCategory);
