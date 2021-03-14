import React from 'react'

import './ShopCard.css'
import { Card } from 'antd'
import { withRouter } from 'react-router-dom'

const { Meta } = Card

const ShopCard = ({ shop, firstAction }) => {

  const imageUrl = shop.image === undefined ? '' : shop.image.imageUrl

  return (
    <div className='site-card-wrapper'>
      <Card
        hoverable
        style={{ marginTop: 16 }}
        extra={''}
        title={<a href='#'>{shop.contacts.city} {shop.contacts.address}</a>}
        actions={[firstAction]}>

        <Meta
          style={{ padding: 0 }}
          avatar={<img src={imageUrl} alt='' />}

          title={
            <p>
                            <span className='text_wrap' data-coordinates='53.930613,27.588529'>
                                <i className='fas fa-map-marker-alt' />
                                <span className='text'> Показать на карте</span>
                            </span>
            </p>
          }

          description={
            <div>
              <div>
                <i className='far fa-clock' />
                <span className='text  muted777'>{shop.workingHours.hours}</span>
              </div>
              <div className='phone'>
                <a href='tel:{contacts.firstPhoneNumber}' className='black'>
                  {shop.contacts.firstPhoneNumber}</a>
              </div>
              <div className='phone'>
                <a href='tel:{contacts.firstPhoneNumber}' className='black'>
                  {shop.contacts.secondPhoneNumber}</a>
              </div>

              <div>
                Последнее обновление: {shop.dateOfLastUpdate}
                <br />
                Дата открытия: {shop.dateOfCreation}
              </div>
            </div>
          }
        />
      </Card>
    </div>
  )

}

export default withRouter(ShopCard)

