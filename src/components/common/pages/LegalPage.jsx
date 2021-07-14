import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import SideNav from '../SideNav/SideNav'

class LegalPage extends Component {
  render () {
    return (
      <div className="row py-5 px-3">
        <div className="col-2">
          <SideNav/>
        </div>
        <div className="col-10">
            Юридическим лицам
            Главная—О компании—Юридическим лицам
            Оптовый отдел
            Информация
            Документы
            Мы осуществляем продажу цветочной продукции юридическим лицам для перепродажи (цель приобретения: оптовая и (или) розничная торговля) по наличному или безналичному расчету.
            Телефон оптового отдела: +375 (29) 619-77-77

            Адреса по которым можно приобрести продукцию
            г. Минск, ул. Сырокомли, 38, помещение 1Н (вход со двора)
            Дзержинский р-н, д. Большая Шатановщина, ул. Садовая, 10
        </div>
      </div>
    )
  };
}

export default withRouter(LegalPage)
