import React, { useEffect } from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, productSelector } from '../../../redux/reducers/ProductsSliceReducer'

const { SubMenu } = Menu

// submenu keys of first level
const rootSubmenuKeys = ['sub0', 'sub1', 'sub2', 'sub3']

const SideMenu = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const { categories } = useSelector(productSelector)

  const onCategorySelected = (value) => {
    console.log('key= ', value.key)

    props.loadListWithCategory(value.key)
  }

  const menuCategories = categories
    .map((category, index) => (
      <SubMenu key={`sub${index}`} icon={<AppstoreOutlined/>} title={category.name} >
        {category.children === undefined ? '' : (
          category.children
            .map(child =>
              <Menu.Item key={child.id} onClick={onCategorySelected}>
                {child.name}
              </Menu.Item>)
        )}
      </SubMenu>
    )
    )

  const [openKeys, setOpenKeys] = React.useState(['sub0'])

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
