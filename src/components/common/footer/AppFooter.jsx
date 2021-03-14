import React from 'react'
import { Col, Layout, Row } from 'antd'
import './AppFooter.css'
import { Link, withRouter } from 'react-router-dom'
import LoadingIndicator from '../util/LoadingIndicator'
import { useSelector } from 'react-redux'
import { companySelector } from '../../../redux/reducers/CompanySliceReducer'

const Footer = Layout.Footer

const AppFooter = () => {

  const { currentCompany, isLoading } = useSelector(companySelector)

  if (!currentCompany || isLoading.payload) {
    return <LoadingIndicator />
  }

  const name = currentCompany.name
  // const description = currentCompany.description
  const licenceNumber = currentCompany.licenceNumber
  const firstPhoneNumber = currentCompany.contacts.firstPhoneNumber
  const secondPhoneNumber = currentCompany.contacts.secondPhoneNumber
  const email = currentCompany.contacts.email
  const city = currentCompany.contacts.city
  const address = currentCompany.contacts.address
  const payerAccountNumber = currentCompany.companyLegalAddress.payerAccountNumber
  const checkingAccount = currentCompany.companyLegalAddress.checkingAccount
  const bankName = currentCompany.companyLegalAddress.bankInfo.bankName
  const bankCode = currentCompany.companyLegalAddress.bankInfo.bankCode
  const postalCode = currentCompany.companyLegalAddress.bankInfo.contacts ? currentCompany.companyLegalAddress.bankInfo.contacts.postalCode : ''
  const bankAddress = currentCompany.companyLegalAddress.bankInfo.contacts ? currentCompany.companyLegalAddress.bankInfo.contacts.address : ''

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
                <Link to='/company/about'>О компании</Link>
              </div>
              <div className='item'>
                <Link to='/about/help'>Как оформить заказ</Link>
              </div>
              <div className='item'>
                <Link to='/company/reviews'>Отзывы</Link>
              </div>
              <div className='item'>
                <Link to='/company/shops'>Магазины</Link>
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
                <a href='/about/help/'>Как купить</a>
              </div>
              <div className='item '>
                <a href='/about/delivery/'>Доставка</a>
              </div>
              <div className='item'>
                <a href='/about/payment/'>Оплата</a>
              </div>
              <div className='item'>
                <a href='/about/warranty/'>Гарантии</a>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className='contact-block'>
              <div className='phone mt-4'>
                <Row justify='center'>
                  <Col span={12}>
                    <a rel='nofollow' href='tel:+375291456777'>
                      {firstPhoneNumber}
                    </a>
                  </Col>
                </Row>
              </div>
              <div className='email'>
                <Row justify='center'>
                  <Col span={12}>
                    <a href='mailto:info@donnarosa.by'
                       target='_blank'
                       rel='noopener noreferrer'
                    >
                      {email}
                    </a>
                  </Col>

                </Row>
              </div>
              <div className='address '>
                <Row justify='center'>
                  <Col span={12}>
                    {city}, {address}
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className='footer-middle'>
        <Row>
          <Col span={24}>
            <div className='social-block'>
              <ul className='list-group list-group-horizontal justify-content-center pb-2'>
                <li className='vk'>
                  <a href='#' target='_blank' rel='nofollow' title='Вконтакте'>
                    <i className='fa fa-vk' aria-hidden='true'></i>
                  </a>
                </li>
                <li className='facebook'>
                  <a href='#' target='_blank' rel='nofollow' title='Facebook'>
                    <i className='fa fa-facebook'></i>
                  </a>
                </li>
                <li className='instagram'>
                  <a href='#' target='_blank' rel='nofollow' title='Instagram'>
                    <i className='fa fa-instagram' aria-hidden='true'></i>
                  </a>
                </li>
                <li className='telegram'>
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
              2020 © {name} УНП № {checkingAccount}<br />
              Интернет-магазин зарегистрирован в торговом реестре 30.12.2019 под
              номером {licenceNumber}<br />
              Адрес: {city},{address}, E-mail: {email}, <br />
              Тел.: {firstPhoneNumber}, Доп. тел.: {secondPhoneNumber}<br />
              Р/с: {payerAccountNumber} в {bankName},
              {postalCode}, {bankAddress}, код банка: {bankCode}
            </div>
          </Col>
        </Row>
      </div>
    </Footer>
  )
}

export default withRouter(AppFooter)
