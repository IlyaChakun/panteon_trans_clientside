import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

function BreadCrumbComponent(props) {
  const breadcrumbNameMap = {
    '/login': 'Авторизация',
    '/sign-up': 'Регистрация',
    '/profile': 'Личный кабинет',
    '/company/shops/:id': 'Детальный просмотр магазина',
    '/company': 'Компания',
    '/reviews': 'Отзывы пользователей',
    '/company/shops': 'Магазины компании',
    '/basket': 'Корзина',
    '/bouquets': 'Букеты',
    '/products': 'Товары',
    '/orders/:id': 'Детальный просмотр заказа',
    '/florists': 'Флористы'
    //TODO на детальных заказах не отрабатывает
    //TODO на детальных магазинах не отрабатывает
  }

  const { location } = props.properties
  const pathSnippets =
    location
      .pathname.split('/')
      .filter(i => i)// return break url one by one
      .filter(i => { // if it `s a number then miss it if not number it`s must be in url map
        if (!Number.isInteger(Number.parseInt(i))) {
          return i
        } else {
          return ''
        }
      })

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`

    console.log(url)

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    )
  })
  const breadcrumbItems = [
    <Breadcrumb.Item key='home'>
      <Link to='/'>Главная страница</Link>
    </Breadcrumb.Item>
  ].concat(extraBreadcrumbItems)

  return (
    <Breadcrumb>{breadcrumbItems}</Breadcrumb>
  )
}

export default BreadCrumbComponent
