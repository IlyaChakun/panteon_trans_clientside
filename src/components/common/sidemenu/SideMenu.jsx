import React from 'react'
import {Menu} from 'antd';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import {withRouter} from "react-router-dom";
import {useSelector} from "react-redux";
import ProductsSliceReducer, {productSelector} from "../../../redux/reducers/ProductsSliceReducer";
import FlowerCardProxy from "../../products/flower/FlowerCardProxy";

const {SubMenu} = Menu;

const SideMenu = () => {
    const handleClick = e => {
        console.log('click ', e);
    };

    const {categories} = useSelector(productSelector)

    const menuCategories = categories
        .map((category,index) => (
                <SubMenu key={index} icon={<AppstoreOutlined/>} title={category}>
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
            )
        )


    return (
        <Menu
            onClick={handleClick}
            style={{width: 256}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        >
            {menuCategories}
        </Menu>
    );

}

export default withRouter(SideMenu)
