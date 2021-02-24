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
        CreateFacilities({
          ...this.state,
        })
      );
      this.props.closeModal();
      this.resetSate();
      this.props.refreshTheItem();
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
                name="name"
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
                alignItem: "center",
                justifyContent: "space-around",
              }}
            >
              <div>
                <h3> email</h3>
                <Input
                  placeholder="email_id of user"
                  name="email_id"
                  allowClear
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
              <h3> password</h3>
              <Input
                placeholder="Enter your password"
                name="password"
                type="password"
                allowClear
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
