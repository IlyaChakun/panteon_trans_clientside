import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import LoadingIndicator from '../common/util/LoadingIndicator'
import OrderProduct from './OrderProduct'
import { Col, List, Row } from 'antd'
import { orderSelector } from '../../redux/reducers/OrdersSliceReducer'
import { useDispatch, useSelector } from 'react-redux'
import { floristsSelector, getFlorist, getFlorists } from '../../redux/reducers/FloristSliceReducer'
import { getProduct, productSelector } from '../../redux/reducers/ProductsSliceReducer'

const OrderPage = (props) => {
  const dispatch = useDispatch()
  const { orders } = useSelector(orderSelector)
  const { products } = useSelector(productSelector)
  const { florists } = useSelector(floristsSelector)
  const order = orders.find(x => x.id === props.orderId)

  useEffect(() => {
    dispatch(getFlorists())
    dispatch(getProduct())
  }, [dispatch])


  if (order === null) {
    return <LoadingIndicator />
  }

  const orderProductsDataSource = []
  let product
  order.orderProducts
    .map(orderProduct => {
        product = dispatch(getProduct(orderProduct.productId))

        orderProductsDataSource.push(
          <OrderProduct
            key={orderProduct.id}
            quantity={orderProduct.quantity}
            orderProduct={product}
          />
        )
      }
    )

  const florist = florists.find(x => x.id === order.orderFloristInfo.floristId)

  console.log('florist', florist)
  return (
    <Row justify='center'>
      <Col span={22}>
        <h1>Заказ №{order.id}</h1>
        <div className='border-info border'>
          <Row justify='space'>
            <Col span={10}>
              <p>Статус заказа: {order.orderStatus}</p>
              <p>Общая стоимость заказа: {order.orderPriceInfo.totalAmount} руб.</p>
            </Col>
            <Col span={10}>
              <p>Комментарий к заказу: {order.comment}</p>
              <p>Доставка: {order.orderDeliveryInfo.address},
                этаж: {order.orderDeliveryInfo.floorNumber},
                подъезд: {order.orderDeliveryInfo.entranceNumber}</p>
              <p>Тип доставки: {order.orderDeliveryInfo.deliveryType.deliveryTypeName}</p>
              <br />
              <p>Флорист ответсвенный за выполнение: {florist.user.name}</p>
              <p>Опыт флориста: {florist.floristRatingSum}</p>
              <p>Комментарий флориста: {order.orderFloristInfo.floristComment}</p>
              <p> Заказ размещен в магазине по адресу: </p>
              <p> Комментарий: {order.comment}</p>
              <p> Причина закрытия заказа: {order.closeDescription}</p>
              <p> Отзыв: {order.orderReview}</p>
            </Col>
          </Row>
        </div>

        <h2>Список товаров:</h2>
        <List
          grid={{
            gutter: 8,
            column: 1
          }}

          dataSource={orderProductsDataSource}

          renderItem={item => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
      </Col>
    </Row>
  )

}

export default withRouter(OrderPage)

