import React, { Component } from 'react'
import { localizedStrings } from '../../util/localization'
import '../../../index.css'

class AboutUsComponent extends Component {
  render () {
    return (
      <div className="first_bottom_menu">
        <div className="bottom-menu">
          <div className="items">
            <div className="item 0 childs   accordion-close ">
              <div className="title">
                <a href="/cargo"> О нас</a>
              </div>
            </div>

            <div id="bottom_help"
              className="wrap panel-collapse wrap_compact_mobile">
              <div className="item">
                <div className="title">
                  <a href="/cargo">{localizedStrings.aboutCompany}</a>
                </div>
              </div>
              <div className="item">
                <div className="title">
                  <a href="">Как оформить заказ</a>
                </div>
              </div>
              <div className="item">
                <div className="title">
                  <a href="">Отзывы</a>
                </div>
              </div>
              <div className="item active">
                <div className="title">
                  <a href="">{localizedStrings.companyShops}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AboutUsComponent
