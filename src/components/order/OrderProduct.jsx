import React from 'react'
import { Card, Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { productSelector } from '../../redux/reducers/ProductsSliceReducer'

const { Meta } = Card

const OrderProduct = ({ quantity, orderProduct, product }) => {
  const dispatch = useDispatch()
  const { countries, categories, loading } = useSelector(productSelector)

  // const stemLength = product.productLengthCosts[0].stemLength
  // const price = product.productLengthCosts[0].cost


  const category = categories.find(cat => {
    if (cat.id === orderProduct.categoryId) {
      return cat
    } else {
      cat.children.forEach(it => {
        if (it.id === orderProduct.categoryId) return it
      })
    }
  })
  const categoryName = category.name

  const countryName = countries.find(x => x.id === orderProduct.countryId).countryNameRu
  const title = product.title
  const description = product.description
// const imageUrl = product.image === null ? '' : product.image.imageUrl

  return (
    <Card
      bodyStyle={{ padding: '10px' }}
      hoverable
      extra={'Страна поставщик: ' + 'countryName'}
      title={<span>{categoryName} - {title}</span>}
    >

      <Meta
        style={{ padding: '5px' }}
        avatar={<img alt={title} src={'imageUrl'} />}
        title={
          <Row>
            <Col span={8}>
              <p>
                {/*Длина стебля: {stemLength}*/}
                <br />
                {/*Цена: {price}*/}
                <br />
                Кол-во: {quantity}
              </p>
            </Col>
            <Col span={8}>
              Описание: {description}
            </Col>
            <Col span={8}>
              {/*Стоимость: {price * quantity}*/}
            </Col>
          </Row>
        }

        description={
          <></>
        }
      />
    </Card>

  )
}

export default OrderProduct
