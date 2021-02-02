import React from 'react'
import { Button, Card, Col, Dropdown, Menu, message, Row } from 'antd'
import './ProductCard.css'
import DownOutlined from '@ant-design/icons/lib/icons/DownOutlined'

import image from '../../../img/8dfe3aad5c7fc4614d3f7a09716b2094.jpg'

const { Meta } = Card

function handleMenuClick(e) {
  message.info('Click on menu item.')
  console.log('click', e)
}

const ProductCard = (props) => {

  const flowerLengthCosts = props.product.productLengthCost
    .map(lengthCost => (
      <Menu.Item
        key={lengthCost.id}
      >
        Длина стебля: {lengthCost.stemLength}
        <br />
        Стоимость: {lengthCost.cost}
      </Menu.Item>
    ))
  const flowerLengthCostsMenu = (
    <Menu onClick={handleMenuClick}>
      {flowerLengthCosts}
    </Menu>
  )
  const flowerLengthCostsDropdown = (
    <Dropdown overlay={flowerLengthCostsMenu}
              overlayStyle={{ width: '100px' }}>
      <Button>
        Стоимость и длина <DownOutlined />
      </Button>
    </Dropdown>
  )

  return (

    <Card
      hoverable
      style={{ width: 240 }}
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>,


    <div className='site-card-wrapper'>
      <Card
        bodyStyle={{ padding: '10px' }}
        hoverable
        // cover={<img alt={props.product.title} src={image} />}
        // extra={'Страна поставщик: '}
        // title={<span>{props.product.flowerType}</span>}
        actions={[
          props.firstAction,
          props.secondAction,
          props.product.availableAmountOnStock > 0 ? props.thirdAction : ''
        ]}>

        <Meta
          style={{ padding: '5px' }}
          avatar={<img alt={props.product.title} src={image} />}
          title={
            <Row>
              <Col span={24}>
                <p>

                  Сет "Нежный"
                  Арт.: 009
                  28 руб.
                </p>
                <div>
                  {flowerLengthCostsDropdown}
                </div>
              </Col>
            </Row>
          }

          description={
            <div>
              <div className='product-content-body'>
                <p>В наличии: {props.product.availableAmount} штук

                  Сет "Нежный"
                  Арт.: 009
                  28 руб.
                </p>
              </div>


            </div>
          }
        />
      </Card>
    </div>

  )
}

export default ProductCard
