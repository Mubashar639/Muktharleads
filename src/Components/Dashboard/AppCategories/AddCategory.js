import React from "react";
import { Modal, Input, Select, DatePicker, Checkbox } from "antd";
import { connect } from "react-redux";
import { CreateFacilities } from "../../../Redux/Epics/facilities";
// const { Option } = Select;
// const CheckboxGroup = Checkbox.Group;
class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email_id: "",
      password: "",
      address: "",
      biometric: "",
      contactNo: "",
      paymentAccount: "",
    };
  }
  cancelHandler = () => {
    this.resetSate();
    this.props.closeModal();
  };

  onOkHandler = () => {
    const { email_id, name, password } = this.state;
    if (email_id || name || password) {
      this.props.dispatch(
        CreateFacilities(
          {
            ...this.state,
          },
          this.props.refreshTheItem
        )
      );
      this.props.closeModal();
      this.resetSate();
    } else {
      alert("Please enter the required value ");
    }
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  resetSate = () =>
    this.setState({
      name: "",
      email_id: "",
      password: "",
      address: "",
      biometric: "",
      contactNo: "",
      paymentAccount: "",
    });
  render() {
    // console.log(this.state.securityLevel)
    return (
      <div>
        <Modal
          visible={this.props.isModalOpen}
          onCancel={this.cancelHandler}
          title="Add New Users"
          destroyOnClose={true}
          maskClosable={false}
          width="50%"
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
export default connect(null, null)(AddCategory);
