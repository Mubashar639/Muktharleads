import React from "react";
import { Row, Col, Typography, Button, Divider, Table, Input } from "antd";
import { CategoriesModel } from "../../../shared";
import AddCategory from "./addfood";
import EditCategory from "./editfood";
import { connect } from "react-redux";
import { Getfood, Deletefood } from "../../../Redux/Epics/food";
import { Url } from "../../../shared";

// import { deleteFacility } from "../../../../../../android3/android/servers/order server/controllers/ficilityController";

class ApFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isEditModalOpan: false,
      categoriesModel: new CategoriesModel(),
      categoryToEdit: {},
      categories: [],
      filterfoods: [],
      food: [],
    };
  }
  componentDidMount() {
    this.props.dispatch(Getfood(this.props.getdataKey));
  }
  refreshTheItem = () => {
    this.props.dispatch(Getfood(this.props.getdataKey));
  };

  addCategory = (category) => {
    // adding new Category
    category.appName = this.props.app.appName;
    this.state.categoriesModel.addNewCategory(category);
    this.closeModal();
  };
  closeModal = () => this.setState({ isModalOpen: false });
  openModal = () => this.setState({ isModalOpen: true });

  openEditModal = () => this.setState({ isEditModalOpan: true });
  closeEditModal = () => this.setState({ isEditModalOpan: false });

  // shouldComponentUpdate(nextprops){
  //   if(nextprops.facility != this.props.facility){
  //     return true
  //   }else  return false
  // }
  onRowClickHandler = (category) => () => {
    this.setState({ categoryToEdit: category, isEditModalOpan: true });
  };

  onChangePrice = (e) => {
    let value = e.target.value;
    const transports = [...this.state.filterfoods];
    const array = [...transports];
    const transport = array.filter((transport) => {
      if (transport.name.includes(value)) {
        return transport;
      }
    });

    if (value) {
      this.setState({ foods: transport });
    } else {
      this.setState({ foods: transports });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.food !== this.props.food) {
      this.setState({
        foods: this.props.food.foods,
        filterfoods: this.props.food.foods,
      });
    }

    if (prevProps.getdataKey !== this.props.getdataKey) {
      this.props.dispatch(Getfood(this.props.getdataKey));
    }
  }

  // lead: "",
  //     dateTime: "",
  //     contactNo: "",
  //     address: "",
  //     tokenNo: "",
  //     paymentCollectionAmount: "",
  //     bioMetricFor: true,
  //     userId: "",
  //     leadStage: "pending",
  //     status: "Pending",
  //   };
  tableColumnsFinish = [
    {
      key: "lead",
      title: "lead",
      dataIndex: "lead",
    },
    {
      key: "dateTime",
      title: "date of lead",
      render: (text, record) => (
        // new Date(1612536692*1000)
        <span>
          {new Date(record.dateTime.seconds * 1000).toDateString() +
            " " +
            new Date(record.dateTime.seconds * 1000).toTimeString()}
        </span>
      ),
    },
    {
      key: "userName",
      title: "User name",
      // title: "Category",
      dataIndex: "userName",
    },
    {
      key: "status",
      title: "status",
      // title: "Category",
      dataIndex: "status",
    },
    {
      key: "tokenNo",
      title: "token No",
      // title: "Category",
      dataIndex: "tokenNo",
    },
    {
      key: "userPaymentStatus",
      title: "Payment Status",
      // title: "Category",
      dataIndex: "userPaymentStatus",
    },
    {
      key: "paymentProof",
      title: "Payment proof",
      // title: "Category",
      dataIndex: "paymentProof",
    },
  ];
  tableColumns = [
    {
      key: "lead",
      title: "lead",
      dataIndex: "lead",
    },
    {
      key: "dateTime",
      title: "date of lead",
      render: (text, record) => (
        // new Date(1612536692*1000)
        <span>
          {new Date(record.dateTime.seconds * 1000).toDateString() +
            " " +
            new Date(record.dateTime.seconds * 1000).toTimeString()}
        </span>
      ),
    },
    {
      key: "leadStage",
      title: "Lead stage",
      dataIndex: "leadStage",
    },
    {
      key: "paymentCollectionAmount",
      title: "Lead Amount ",
      dataIndex: "paymentCollectionAmount",
    },
    {
      key: "address",
      title: "address",
      dataIndex: "address",
    },
    {
      key: "userId",
      title: "user Id",
      // title: "Category",
      dataIndex: "userId",
    },
    {
      key: "userName",
      title: "User name",
      // title: "Category",
      dataIndex: "userName",
    },
    {
      key: "status",
      title: "status",
      // title: "Category",
      dataIndex: "status",
    },
    {
      key: "tokenNo",
      title: "token No",
      // title: "Category",
      dataIndex: "tokenNo",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          {/* {this.props.getdataKey !== "Finished" && ( */}
          <a onClick={this.onRowClickHandler(record)}> Edit </a>
          {/* )} */}
        </span>
      ),
    },
  ];
  // facilities
  render() {
    // console.log(this.props.food)
    return (
      <div>
        <Row>
          <Col span={24}>
            <Typography.Title level={4}>
              punerentagreement.in Leads Management Admin Panel
            </Typography.Title>
          </Col>
          <Col>
            <Divider />
          </Col>
        </Row>
        <Row type="flex" justify="end">
          <Col style={{ marginTop: "5px" }}>
            <Button
              onClick={this.openModal}
              shape="circle"
              size="large"
              type="primary"
              icon="plus"
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col>
            {/* <Input
              placeholder="Enter name for Search"
              style={{ width: "300px" }}
              name="price"
              onChange={this.onChangePrice}
            /> */}
            {this.props.food ? (
              this.props.getdataKey !== "Finished" ? (
                <Table
                  dataSource={this.state.foods}
                  pagination={false}
                  columns={this.tableColumns}
                  rowKey={(record) => record._id}
                  // onRow={(record) => ({
                  //   onClick: this.onRowClickHandler(record)
                  // })}
                />
              ) : (
                <Table
                  dataSource={this.state.foods}
                  pagination={false}
                  columns={this.tableColumnsFinish}
                  rowKey={(record) => record._id}
                  // onRow={(record) => ({
                  //   onClick: this.onRowClickHandler(record)
                  // })}
                />
              )
            ) : (
              <h1>No data</h1>
            )}
          </Col>
        </Row>
        <AddCategory
          closeModal={this.closeModal}
          isModalOpen={this.state.isModalOpen}
          addCategory={this.addCategory}
          refreshTheItem={this.refreshTheItem}
          currencyVariationList={
            this.state.categoriesModel.currencyVariationList
          }
        />
        <EditCategory
          refreshTheItem={this.refreshTheItem}
          isEditModalOpen={this.state.isEditModalOpan}
          closeEditModal={this.closeEditModal}
          category={this.state.categoryToEdit}
          currencyVariation={this.state.categoriesModel.currencyVariation}
          editCategory={this.state.categoriesModel.editCategory}
          currencyVariationList={
            this.state.categoriesModel.currencyVariationList
          }
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  food: state.Foods,
});
// export default ApFood;
export default connect(mapStateToProps)(ApFood);
