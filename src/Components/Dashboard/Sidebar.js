import React from "react";
import { Menu } from "antd";
const Sidebar = (props) => (
  <Menu
    mode="inline"
    onSelect={({ key }) => props.changeProfRoute(key)}
    style={{ height: "100%" }}
    theme={props.selectedTheme}
    defaultSelectedKeys={["appUsers"]}
  >
    <Menu.Item key="appUsers">
      <span className="nav-text"> User </span>
    </Menu.Item>
    <Menu.Item key="pendingLeads">
      <span className="nav-text"> Pending Leads </span>
    </Menu.Item>
    {/* <Menu.Item key="progressLeads">
      <span className="nav-text"> progress Leads </span>
    </Menu.Item> */}
    <Menu.Item key="finishLeads">
      <span className="nav-text"> Finish Leads </span>
    </Menu.Item>
    {/* <Menu.Item key="appAccounts">
      <span className="nav-text"> Product </span>
    </Menu.Item>
    <Menu.Item key="appCategory">
      <span className="nav-text"> Category </span>
    </Menu.Item>
    <Menu.Item key="appFeatures">
      <span className="nav-text"> Order </span>
    </Menu.Item> */}

    {/* <Menu.Item key="appOder">
      <span className="nav-text"> Order </span>
    </Menu.Item> */}
  </Menu>
);

export default Sidebar;
