import React from 'react'
import { Button, Card, Col, Dropdown, Menu, message, Rate, Row } from 'antd'
import './ProductCard.css'
import DownOutlined from '@ant-design/icons/lib/icons/DownOutlined'

import image from '../../../img/8dfe3aad5c7fc4614d3f7a09716b2094.jpg'

const { Meta } = Card

function handleMenuClick(e) {
  message.info('Click on menu item.')
  console.log('click', e)
}

const ProductCard = (props) => {
  return (
      <Card
        style={{ border:'1px solid grey', padding:'2px'}}
        bodyStyle={{ padding: '10px'}}
        hoverable
        cover={<img alt={props.product.title} src={image} />}
        actions={[
          props.firstAction,
          props.secondAction,
          props.product.availableAmountOnStock > 0 ? props.thirdAction : ''
        ]}>

        <Meta
          title={
            <Row>
              <Col span={24}>
                <div className='product-rating'>
                  <Rate disabled defaultValue={2} />
                </div>
                <div className='product-title'>
                  Сет "Нежный"
                </div>
                <div className='product-art'>
                  Арт.: 009
                </div>
                <div className='product-cost'>
                  28 руб.
                </div>
              </Col>
            </Row>
          }
        />
      </Card>
  )
}

export default ProductCard
