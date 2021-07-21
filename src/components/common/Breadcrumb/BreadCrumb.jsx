import React from 'react'
import { Breadcrumb } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

function BreadCrumbComponent(props) {
  const breadcrumbNameMap = {
    'companies': 'Компании',
    'cargos': 'Грузы',
    'transports': 'Транспорт',
    'news': 'Новости',
    'company_id': useSelector(state => state.companyState.companies.company.title) || ''
  }
const location = {}
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

  const breadcrumbItems = props.location.pathname.split('/').map((item, index) => {
    return item ? (
      <Breadcrumb.Item key={item}>
        <Link to={props.location.pathname + `/${item}`}>{breadcrumbNameMap.item}</Link>
      </Breadcrumb.Item>
    ) : ''
  })

  return (
    <Breadcrumb>{breadcrumbItems}</Breadcrumb>
  )
}

export default withRouter(BreadCrumbComponent)
