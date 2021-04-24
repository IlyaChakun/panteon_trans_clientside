import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'

class SideNav extends Component {
  render () {
    return (
      <Menu mode="vertical">
        <Menu.Item key="/cargo/about"><Link to="/cargo/about">О компании</Link></Menu.Item>
        <Menu.Item key="/about/help"><Link to="/about/help">Как оформить заказ</Link></Menu.Item>
        <Menu.Item key="/cargo/reviews"><Link to="/cargo/reviews">Отзывы</Link></Menu.Item>
        <Menu.Item key="/cargo/shops"><Link to="/cargo/shops">Магазины</Link></Menu.Item>
        <Menu.Item key="/about/legal"><Link to="/about/legal">Юридическим лицам</Link></Menu.Item>
        <Menu.Item key="/about/documents"><Link to="/about/documents">Документы</Link></Menu.Item>
      </Menu>
    )
  };
}

export default withRouter(SideNav)
