import React, { useEffect } from 'react'
import LoadingIndicator from '../common/util/LoadingIndicator'
import OrderProduct from './OrderProduct'
import { Col, List, Row } from 'antd'
import { orderSelector } from '../../redux/reducers/OrdersSliceReducer'
import { useDispatch, useSelector } from 'react-redux'
import { floristsSelector, getFlorists } from '../../redux/reducers/FloristSliceReducer'
import { getProduct, getProducts, productSelector } from '../../redux/reducers/ProductsSliceReducer'

const OrderPage = (props) => {
  const dispatch = useDispatch()
  const { orders } = useSelector(orderSelector)
  const { products } = useSelector(productSelector)
  const { florists, loading } = useSelector(floristsSelector)
  const order = orders.find(x => x.id === props.orderId)

  if (loading || products === null || order === null) {
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
            orderProduct={orderProduct}
            product={product}
          />
        )
      }
    )

  let florist = null
  if (order.orderFloristInfo.floristId !== null) {
    florist = florists.find(x => x.id === order.orderFloristInfo.floristId)
  }

  console.log('floristId', order.orderFloristInfo.floristId)
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
              <p>Тип доставки: {order.orderDeliveryInfo.deliveryType.deliveryTypeName}</p>
              {
                (order.orderDeliveryInfo.deliveryType.id !== 1) ?
                  (<p>Доставка: {order.orderDeliveryInfo.address},
                    этаж: {order.orderDeliveryInfo.floorNumber},
                    подъезд: {order.orderDeliveryInfo.entranceNumber}</p>)
                  : ''
              }
              <p>Комментарий к заказу: {order.comment}</p>
              <br />
              <p>Флорист ответсвенный за выполнение: {florist.user.name}</p>

              {order.orderFloristInfo.floristComment !== null ?
                (<p> Комментарий флориста: {order.orderFloristInfo.floristComment}</p>)
                : ''}
              {order.orderFloristInfo.floristAppointmentTime !== null ?
                (<p> Начало работы флориста: {order.orderFloristInfo.floristAppointmentTime}</p>)
                : ''}
              {order.orderFloristInfo.floristCompletionTime !== null ?
                (<p> Окончание работы флориста: {order.orderFloristInfo.floristCompletionTime}</p>)
                : ''}
              {order.closeDescription !== null ?
                (<p> Причина закрытия заказа: {order.closeDescription}</p>)
                : ''}
              {order.orderReview !== null ?
                (<p> Отзыв к заказу: {order.orderReview}</p>)
                : ''}
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

export default OrderPage

