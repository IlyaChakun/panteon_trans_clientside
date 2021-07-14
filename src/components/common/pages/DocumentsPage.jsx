import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import SideNav from '../SideNav/SideNav'

class DocumentsPage extends Component {
  render () {
    return (
      <div className="row py-5 px-3">
        <div className="col-2">
          <SideNav/>
        </div>
        <div className="col-10">
            Документы
            Главная—О компании—Документы
            Образцы чеков
            Оплата наличными
            Оплата наличными 171.6 кб
            Оплата по карте
            Оплата по карте 164.1 кб
        </div>
      </div>
    )
  };
}

export default withRouter(DocumentsPage)
