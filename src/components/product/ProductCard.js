import React, { useState } from 'react'
import { Card, Col, InputNumber, Radio, Rate, Row } from 'antd'
import './ProductCard.css'

const { Meta } = Card

const ProductCard = ({ product, editAction, deleteAction, buyAction, oneClickAction }) => {

  const [idRadio, setIdRadio] = useState(product.productLengthCost[0].id)
  const [amount, setAmount] = useState(1)

  const [productState, setProductState] = useState({ amount: 1, lengthId: 0 })

  const radioStyle = {
    display: 'block',
    height: '24px',
    lineHeight: '24px'
  }

  const onLengthChange = (e) => {
    setIdRadio(e.target.value)
    setProductState({ amount, lengthId: idRadio })
  }

  const onInputChange = (value) => {
    setAmount(value)
    setProductState({ amount: value, lengthId: idRadio })
  }

  return (
    <Card
      className={'product-card'}
      style={{ border: '1px solid grey', padding: '2px' }}
      bodyStyle={{ padding: '10px' }}
      hoverable
      cover={<img alt={product.title} src={product.image}/>}
      actions={[
        editAction,
        deleteAction
      ]}
      extra={
        <Radio.Group className='radio-group' onChange={onLengthChange} value={idRadio}>
          {product.productLengthCost.map(lengthcost => (
            <Radio style={radioStyle} key={lengthcost.id} value={lengthcost.id}
                   checked={lengthcost.id === idRadio}
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
                    {product.productLengthCost.find(x => x.id === idRadio).cost} BYN
                  </Col>
                  <Col span={12} className='product-count'>
                    <InputNumber
                      min={1}
                      max={100000}
                      defaultValue={1}
                      onChange={onInputChange}
                    />
                  </Col>
                </Row>
                <Row align='center'>
                  <Col span={12}>ИТОГО:</Col>
                  <Col span={12}>{product.productLengthCost.find(x => x.id === idRadio).cost * amount} BYN</Col>
                </Row>
                <Row className='product-rating'>
                  <Rate disabled defaultValue={2}/>
                </Row>
                <Row className='product-title'>
                  {product.title}
                </Row>
                <Row className='product-art'>
                  Арт.: {product.uniqueId}
                </Row>
              </Col>
            </Row>
            <Row>
              {oneClickAction(productState)}
              {product.availableAmount > 0 ? buyAction(productState) : ''}
            </Row>
          </>
        }
      />
    </Card>
  )
}

export default ProductCard
