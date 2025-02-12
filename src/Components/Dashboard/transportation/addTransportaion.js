import React from "react";
import { Modal, Input, Select, DatePicker, Checkbox, Button } from "antd";
import { connect } from "react-redux";
import { CreateTransport } from "../../../Redux/Epics/transportation";
const { Option } = Select;
// const plainOptions = ['Apple', 'Pear', 'Orange'];
// const defaultCheckedList = ['Apple', 'Orange'];

const CheckboxGroup = Checkbox.Group;
class AddCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: "",
      facilities: [],
      ticketPrice: {
        type: "adult",
        price: "",
      },
      operationDays: "",
      pickUpLocation: [],
      day: [
        "Monday",
        "Tuesday",
        "Wendsday",
        "Thursday",
        "Friday",
        "SatureDay",
        "Sunday",
      ],

      operationDays: [],
      indeterminate: true,
      checkAll: false,
      // plainOptions
    };
  }
  cancelHandler = () => {
    this.resetSate();
    this.props.closeModal();
  };
  onSellect = (e) => {
    this.setState({
      securityLevel: e,
    });
  };
  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  onChangeTime = (value, dateString) => {
    this.setState({ visitTime: value });
  };

  onOk = (value) => {
    this.setState({ visitTime: value });
  };
  onCheck = (facilities) => {
    this.setState({
      facilities,
      indeterminate:
        !!facilities.length && facilities.length < facilities.length,
      checkAll: facilities.length === this.props.facility.facilityName.length,
    });
    // console.log(facilities)
  };

  onOkHandler = () => {
    this.props.dispatch(
      CreateTransport({
        ...this.state,
      })
    );
    this.resetSate();
  };
  onSellector = (e) => {
    let ticketPrice = { ...this.state.ticketPrice };
    ticketPrice.type = e;

    this.setState({
      ticketPrice,
    });
  };
  onChangePrice = (e) => {
    let ticketPrice = { ...this.state.ticketPrice };
    const name = e.target.name;
    const value = e.target.value;
    ticketPrice[name] = value;
    this.setState({
      ticketPrice,
    });
  };
  selectedDays = (operationDays) => {
    this.setState({
      operationDays,
      indeterminate:
        !!operationDays.length && operationDays.length < operationDays.length,
      checkAll: operationDays.length === this.state.day.length,
    });
    console.log(operationDays);
  };
  onChangePosition = (e) => {
    let pickUpLocation = { ...this.state.pickUpLocation };
    let longi,
      lati = "";
    let coordinates = [...this.state.pickUpLocation.coordinates];

    if (e.target.name === "longi") {
      longi = e.target.value;
      coordinates[0] = longi;
    } else {
      lati = e.target.value;
      coordinates[1] = lati;
    }
    pickUpLocation.coordinates = coordinates;
    this.setState({
      pickUpLocation,
    });
  };
  resetSate = () =>
    this.setState({
      name: "",
      phone: "",
      facilities: [],
      ticketPrice: {
        type: "aldult",
        price: "",
      },
      operationDays: "",
      pickUpLocation: [],

      indeterminate: true,
      checkAll: false,
      plainOptions: [],
    });
  addlocation = () => {
    const value = this.refs.location.state.value;
    console.log(value);
    if (value == "") return alert("Please enter the location");
    let pickUpLocation = [...this.state.pickUpLocation, value];
    this.setState({ pickUpLocation });
    this.refs.location.state.value = "";
  };
  removelocation = () => {
    const value = this.refs.location.state.value;
    console.log(value);
    if (value == "") return alert("Please enter the location");
    let pickUpLocation = [...this.state.pickUpLocation];
    pickUpLocation = pickUpLocation.filter((string) => string !== value);
    this.setState({ pickUpLocation });
    this.refs.location.state.value = "";
  };
  onSellectorPostion = (e) => {
    let pickUpLocation = { ...this.state.pickUpLocation };
    pickUpLocation.type = e;
    this.setState({
      pickUpLocation,
    });
  };
  render() {
    return (
      <div>
        <Modal
          visible={this.props.isModalOpen}
          onCancel={this.cancelHandler}
          title="Add New User"
          destroyOnClose={true}
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
            <div>
              <h3> Tranport Name</h3>
              <Input
                placeholder="Enter your transport name"
                name="name"
                allowClear
                onChange={this.onChange}
              />
            </div>
            <div>
              <h3> Select you Facilities </h3>
              <CheckboxGroup
                options={this.props.facility.facilityName}
                value={this.state.facilities}
                onChange={this.onCheck}
              />
            </div>
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
              <h3> Phone</h3>
              <Input
                placeholder="Enter your Phone"
                name="phone"
                allowClear
                onChange={this.onChange}
              />
            </div>
            <div style={{ width: "300px" }}>
              <h3> Select you days </h3>
              <CheckboxGroup
                options={this.state.day}
                value={this.state.operationDays}
                onChange={this.selectedDays}
              />
            </div>
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
              <h3> Select Age </h3>
              <div style={{ display: "flex", flexDirection: "row" }}>
                {" "}
                <Select
                  style={{ width: "200px" }}
                  onSelect={this.onSellector}
                  name="ticketPrice"
                  defaultValue={this.state.ticketPrice.type}
                >
                  <Option value="adult">adult</Option>
                  <Option value="child">child</Option>
                </Select>
                <Input
                  placeholder="Enter Price"
                  value={this.state.ticketPrice.price}
                  name="price"
                  allowClear
                  onChange={this.onChangePrice}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "20%",
            }}
          >
            <div>
              <h3> Add Location </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Input
                  placeholder="enter location"
                  ref="location"
                  name="longi"
                  allowClear
                />
                <Button onClick={this.addlocation}> Add </Button>
                {this.state.pickUpLocation.length > 0 && (
                  <Button onClick={this.removelocation}> remove </Button>
                )}
              </div>
              {this.state.pickUpLocation.length > 0 && (
                <p style={{ border: "green" }}>
                  <h2>Location </h2>
                  {this.state.pickUpLocation.join(" , ")}
                </p>
              )}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  facility: state.Facility,
});
export default connect(mapStateToProps, null)(AddCategory);
