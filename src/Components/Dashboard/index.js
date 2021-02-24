import React from "react";
import { PageHeader, Col, Row, Layout, Typography, Menu, Modal } from "antd";

import Sidebar from "./Sidebar";
import AppCategories from "./AppCategories";
import AppLeads from "./foods";

import { AppsList } from "../../shared";

import { get_category } from "../../Redux/Actions/authentication";
import { connect } from "react-redux";

class AppDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      app: {},
      selectedKey: "appUsers",
      isCollapsed: false,
      isAppleModalOpen: false,
      isAndroidModalOpen: false,
    };
  }

  changeTheme = (appName, selectedTheme) => {
    const app = AppsList.find((app) => app.appName === appName);
    app.selectedTheme = selectedTheme;
    this.setState({ app });
  };

  changeProfRoute = (key) => this.setState({ selectedKey: key });

  openAndroidModal = () => this.setState({ isAndroidModalOpen: true });
  closeAndroidModal = () => this.setState({ isAndroidModalOpen: false });

  openAppleModal = () => this.setState({ isAndroidModalOpen: true });
  closeAppleModal = () => this.setState({ isAndroidModalOpen: false });

  // componentDidMount() {
  //   const app = AppsList.find(app => app.appName === "Mobile App Admin Panal");

  //   this.setState({ app, isLoading: true }, () => {
  //     getCategories(data => this.setState({ isLoading: false }, () => this.props.getCate(data)));
  //   });
  // }

  collapseSidebar = (broken) => this.setState({ isCollapsed: broken });

  profRouteRenderer = () => {
    const { app } = this.state;
    const { selectedKey } = this.state;
    if (selectedKey === "appUsers") return <AppCategories app={app} />;
    if (selectedKey === "pendingLeads") return <AppLeads app={app} />;
    // if (selectedKey === "progressLeads") return <AppLeads app={app} />;
    if (selectedKey === "finishLeads") return <AppLeads app={app} />;

    // if (selectedKey === "appAccounts") return <AppAccounts app={app} />;
    // if (selectedKey === "appTheme") return <AppTheme app={app} />;
    // if (selectedKey === "appFeatures") rueturn <AppFeatures app={app} />;
    // if (selectedKey === "appOrder") return <AppAccounts app={app} />;
    // if (selectedKey === "appCategory") return <ProductCategories app={app} />;
  };

  render() {
    return (
      <div style={{ padding: "10px" }}>
        <Row style={{ marginBottom: "5px" }}>
          <Col push={1} span={17}>
            <Typography.Title> Leads Management Admin Panel</Typography.Title>
          </Col>
          <Col push={2} span={4}>
            <div>
              {" "}
              <img src="/images/logo.jpeg" style={{ width: "200px" }} />
            </div>
          </Col>
          <Col
            style={{
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              backgroundColor: "white",
            }}
            span={6}
          ></Col>
        </Row>
        <Layout>
          <Layout.Sider
            breakpoint="sm"
            trigger={null}
            collapsible
            collapsed={this.state.isCollapsed}
            onBreakpoint={this.collapseSidebar}
          >
            <Sidebar
              selectedTheme={this.state.app.selectedTheme}
              changeProfRoute={this.changeProfRoute}
            />
          </Layout.Sider>
          <Layout.Content style={{ marginLeft: "5px" }}>
            {this.profRouteRenderer()}
          </Layout.Content>
        </Layout>
        <Modal
          title="Android"
          visible={this.state.isAndroidModalOpen}
          onCancel={this.closeAndroidModal}
        />
        <Modal
          title="IOS"
          visible={this.state.isAppleModalOpen}
          onCancel={this.closeAppleModal}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCate: (value) => dispatch(get_category(value)),
});

export default connect(null, mapDispatchToProps)(AppDetail);
