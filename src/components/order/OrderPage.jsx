import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import LoadingIndicator from '../common/util/LoadingIndicator'
import OrderProduct from './OrderProduct'
import { Col, List, Row } from 'antd'
import { getOrderById, orderSelector } from '../../redux/reducers/OrdersSliceReducer'
import { useDispatch, useSelector } from 'react-redux'

const OrderPage = (props) => {

  const dispatch = useDispatch()
  const { order, orderProducts } = useSelector(orderSelector)

  useEffect(() => {
    dispatch(getOrderById(props.orderId))
  }, [dispatch])


  if (order === null || orderProducts === null) {
    return <LoadingIndicator />
  }

  const orderProductsDataSource = []

  orderProducts
    .map(orderProduct => (
        orderProductsDataSource.push(
          <OrderProduct
            key={orderProduct.id}
            productId={orderProduct.productId}
            quantity={orderProduct.quantity}
            orderProduct={orderProduct}
          />
        )
      )
    )

  return (

    order === undefined ?
      (
        <LoadingIndicator />
      ) : (

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
                  <p>Флорист ответсвенный за выполнение: {order.orderFloristInfo.floristId}</p>
                  <p>Комментарий флориста: {order.orderFloristInfo.floristComment}</p>
                  <p>
                    Заказ размещен в магазине по адресу: {orderProducts[0].product.shop.contacts.city},
                    {orderProducts[0].product.shop.contacts.address}
                  </p>
                  <p>
                    Комментарий: {order.comment}
                  </p>
                  <p>
                    Причина закрытия заказа: {order.closeDescription}
                  </p>
                  <p>
                    Отзыв: {order.orderReview}
                  </p>

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
  )

}

export default withRouter(OrderPage)

