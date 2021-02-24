import React from "react";
import { Modal, Input, Select, DatePicker, Checkbox } from "antd";

import { UpdateFacilities } from "../../../Redux/Epics/facilities";
import { connect } from "react-redux";
import moment from "moment";
const CheckboxGroup = Checkbox.Group;

const { Option } = Select;
class EditCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email_id: "",
      password: "",
      address: "",
      biometric: "",
      contactNo: "",
      prepassword: "",
      paymentAccount: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.isModalInitialized && nextProps.isEditModalOpen) {
      return {
        ...prevState,
        isModalInitialized: true,
        name: nextProps.category.name,
        email_id: nextProps.category.email_id,
        password: nextProps.category.password,
        prepassword: nextProps.category.password,

        address: nextProps.category.address,
        biometric: nextProps.category.biometric,
        contactNo: nextProps.category.contactNo,
        paymentAccount: nextProps.category.paymentAccount,
        id: nextProps.category.id,
      };
    }
    return prevState;
  }

  resetSate = () =>
    this.setState({
      name: "",
      email_id: "",
      password: "",
      address: "",
      biometric: "",
      contactNo: "",
      paymentAccount: "",
      isModalInitialized: false,
    });
  inputChangehandler = (e) =>
    this.setState({ [e.target.name]: e.target.value });
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
  selectedDays = (visitationDays) => {
    this.setState({
      visitationDays,
      indeterminate:
        !!visitationDays.length &&
        visitationDays.length < visitationDays.length,
      checkAll: visitationDays.length === this.state.day.length,
    });
    // console.log(visitationDays)
  };
  cancelHandler = () => {
    this.resetSate();
    this.props.closeEditModal();
  };
  onOkHandler = () => {
    const { email_id, name, password } = this.state;
    if (email_id || name || password) {
      this.props.dispatch(
        UpdateFacilities(
          {
            ...this.state,
          },
          this.props.refreshTheItem
        )
      );
      this.resetSate();
      this.props.closeEditModal();
    } else {
      alert("Please enter the required value ");
    }
  };
  onSellector = (e) => {
    // console.log(e)
    this.setState({
      sexType: e,
    });
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
            <div>
              <h3> name</h3>
              <Input
                placeholder="Enter your user name"
                value={this.state.name}
                name="name"
                onChange={this.onChange}
              />
            </div>
            <div>
              <h3> address</h3>
              <Input
                placeholder="Enter your user address"
                value={this.state.address}
                name="address"
                onChange={this.onChange}
              />
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItem: "center",
                justifyContent: "space-around",
              }}
            >
              <div>
                <h3> email</h3>
                <Input
                  placeholder="email_id of user"
                  value={this.state.email_id}
                  name="email_id"
                  disabled={true}
                  onChange={this.onChange}
                />
              </div>
              <div>
                <h3> password</h3>
                <Input
                  placeholder="Enter your password"
                  value={this.state.password}
                  name="password"
                  type="password"
                  disabled={true}
                  onChange={this.onChange}
                />
              </div>
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
              <h3> Biometric Cost</h3>
              <Input
                placeholder="Enter your biometric"
                value={this.state.biometric}
                name="biometric"
                type="number"
                onChange={this.onChange}
              />
            </div>

            <div>
              <h3> Contact No </h3>
              <Input
                placeholder="Enter your Contact No "
                value={this.state.contactNo}
                name="contactNo"
                type="number"
                onChange={this.onChange}
              />
            </div>
            <div>
              <h3> Payment Account</h3>
              <Input
                placeholder="Enter your Payment Account"
                value={this.state.paymentAccount}
                name="paymentAccount"
                type="text"
                onChange={this.onChange}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default connect()(EditCategory);
