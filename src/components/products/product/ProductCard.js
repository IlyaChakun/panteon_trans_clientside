import React, { useState } from 'react'
import { Card, Col, Radio, Rate, Row } from 'antd'
import './ProductCard.css'

const { Meta } = Card

function ProductCard({ product, editAction, deleteAction, buyAction, oneClickAction }) {

  const [idRadio, setIdRadio] = useState(product.productLengthCost[0].id)

  const radioStyle = {
    display: 'block',
    height: '24px',
    lineHeight: '24px'
  }

  const onChange = (e) => {
    console.log('radio changed', e.target.value)
    setIdRadio(e.target.value)
  }

  return (
    <Card
      style={{ border: '1px solid grey', padding: '2px' }}
      bodyStyle={{ padding: '10px' }}
      hoverable
      cover={<img alt={product.title} src={product.image} />}
      actions={[
        editAction,
        deleteAction
      ]}
      extra={
        <Radio.Group className='radio-group' onChange={onChange} value={idRadio}>
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
                <div className='product-rating'>
                  <Rate disabled defaultValue={2} />
                </div>
                <div className='product-title'>
                  {product.title}
                </div>
                <div className='product-art'>
                  Арт.: {product.unique_id}
                </div>
                <div className='product-cost'>
                  {product.productLengthCost.find(x => x.id === idRadio).cost} руб.
                </div>
              </Col>
            </Row>
            <Row>
              {oneClickAction}
              {product.availableAmount > 0 ? buyAction : ''}
            </Row>
          </>
        }
      />
    </Card>
  )
}

// ProductCard.propTypes = {
//   product: PropTypes.any,
//   editAction: PropTypes.any,
//   deleteAction: PropTypes.any,
//   buyAction: PropTypes.any,
//   oneClickAction: PropTypes.any,
//   props: PropTypes.any
// }

export default ProductCard
