import React from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProductsSliceReducer, { productSelector } from '../../../redux/reducers/ProductsSliceReducer'
import FlowerCardProxy from '../../products/flower/FlowerCardProxy'

const { SubMenu } = Menu

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']


const SideMenu = () => {
  const handleClick = e => {
    console.log('click ', e)
  }

  const { categories } = useSelector(productSelector)


  const menuCategories = categories
    .map((category, index) => (
        <SubMenu key={`sub${index}`} icon={<AppstoreOutlined />} title={category}>
          <Menu.Item key='1'>Option 1</Menu.Item>
          <Menu.Item key='2'>Option 2</Menu.Item>
          <Menu.Item key='3'>Option 3</Menu.Item>
          <Menu.Item key='4'>Option 4</Menu.Item>
        </SubMenu>
      )
    )


  const [openKeys, setOpenKeys] = React.useState(['sub1'])

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  return (
    <Menu mode='inline'
          openKeys={openKeys}
          onOpenChange={onOpenChange}
    >
      {menuCategories}
    </Menu>
  )

}

export default withRouter(SideMenu)
