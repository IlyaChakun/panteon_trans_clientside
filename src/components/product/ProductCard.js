import React from 'react'
import { Card, Col, InputNumber, Radio, Rate, Row } from 'antd'
import './ProductCard.css'

const { Meta } = Card

const ProductCard = (props) => {
  const onRadioChange = (e) => {
    props.onProductLengthChange(e.target.value)
  }

  const radioStyle = {
    display: 'block',
    height: '24px',
    lineHeight: '24px'
  }

  const costById = props.product.productLengthCost.find(x => x.id === props.lengthId).cost
  const priceById = costById * props.quantity

  return (
    <Card
      className={'product-card'}
      style={{ border: '1px solid grey', padding: '2px' }}
      bodyStyle={{ padding: '10px' }}
      hoverable
      cover={<img alt={props.product.title}
        src={props.product.image === null ? '' : props.product.image.imageUrl}/>}
      actions={[
        props.firstAction,
        props.secondAction
      ]}
      extra={
        <Radio.Group className='radio-group' onChange={onRadioChange} value={props.lengthId}>
          {props.product.productLengthCost.map(lengthcost => (
            <Radio style={radioStyle} key={lengthcost.id} value={lengthcost.id}
              checked={lengthcost.id === props.lengthId}
            >
              {lengthcost.stemLength + 'см'}
            </Radio>
          ))}
        </Radio.Group>
      }>
      <Meta
        title={
          <>
            <Row>
              <Col span={24}>
                <Row>
                  <Col span={12} className='product-cost'>
                    {costById} BYN
                  </Col>
                  <Col span={12} className='product-count'>
                    <InputNumber
                      min={1}
                      max={99}
                      defaultValue={props.quantity}
                      onChange={props.onQuantityChange}
                    />
                  </Col>
                </Row>
                <Row align='center'>
                  <Col span={12}>ИТОГО:</Col>
                  <Col span={12}>{priceById} BYN</Col>
                </Row>
                <Row className='product-rating'>
                  <Rate disabled defaultValue={2}/>
                </Row>
                <Row className='product-title'>
                  {props.product.title}
                </Row>
                <Row className='product-art'>
                  Арт.: {props.product.uniqueId}
                </Row>
              </Col>
            </Row>
            <Row>
              {props.oneClickAction && props.product.availableAmount > 0 ? props.oneClickAction : ''}
              {props.thirdAction && props.product.availableAmount > 0 ? props.thirdAction : ''}
            </Row>
          </>
        }
      />
    </Card>
  )
}

export default ProductCard
