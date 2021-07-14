import React from 'react'
import { Col, Layout, Row } from 'antd'
import './AppFooter.css'
import { Link, withRouter } from 'react-router-dom'

const Footer = Layout.Footer

const AppFooter = () => {


  return (
    <Footer>
      <div className='footer-top pb-5'>
        <Row>
          <Col span={4} offset={4}>
            <div className='items'>
              <div className='item'>
                <a href='/about/'>О нас</a>
              </div>
              <div className='item'>
                <Link to='/cargo/about'>О компании</Link>
              </div>
              <div className='item'>
                <Link to='/cargo/reviews'>Отзывы</Link>
              </div>
              <div className='item'>
                <Link to='/about/legal'>Юридическим лицам</Link>
              </div>
              <div className='item'>
                <Link to='/about/documents'>Документы</Link>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className='items'>
              <div className='item'>
                <a href='/info/oferta/'>Информация</a>
              </div>
              <div className='item'>
                <a href='/info/requisites/'>Реквизиты</a>
              </div>
              <div className='item'>
                <a href='/include/licenses_detail.php'>
                  Политика конфиденциальности</a>
              </div>
              <div className='item'>
                <a href='/info/oferta/'>Договор публичной оферты</a>
              </div>
              <div className='item'>
                <a href='/contacts/'>Контакты</a>
              </div>
            </div>
          </Col>
          <Col span={4}>
            <div className='items'>
              <div className='item'>
                <a href='/about/help/'>Сервисы</a>
              </div>
              <div className='item '>
                <a href='/about/delivery/'>Руководство пользователя</a>
              </div>
              <div className='item'>
                <a href='/about/payment/'>Новости</a>
              </div>
              <div className='item'>
                <a href='/about/warranty/'>Тарифные планы</a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className='footer-middle'>
        <Row>
          <Col span={24}>
            <div className='social-block'>
              <ul className='list-group list-group-horizontal justify-content-center'>
                <li className='list-group-item vk'>
                  <a href='#' target='_blank' rel='nofollow' title='Вконтакте'>
                    <i className='fa fa-vk' aria-hidden='true'></i>
                  </a>
                </li>
                <li class='list-group-item facebook'>
                  <a href='#' target='_blank' rel='nofollow' title='Facebook'>
                    <i className='fa fa-facebook'></i>
                  </a>
                </li>
                <li class='list-group-item instagram'>
                  <a href='#' target='_blank' rel='nofollow' title='Instagram'>
                    <i className='fa fa-instagram' aria-hidden='true'></i>
                  </a>
                </li>
                <li class='list-group-item telegram'>
                  <a href='#' target='_blank' rel='nofollow' title='Telegram'>
                    <i className='fa fa-telegram' aria-hidden='true'></i>
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
      <div className='footer_bottom pt-5'>
        <Row justify='center'>
          <Col>
            <div className='copy'>

            </div>
          </Col>
        </Row>
      </div>
    </Footer>
  )
}

export default withRouter(AppFooter)
