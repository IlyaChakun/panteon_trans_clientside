import React from 'react'
import LoadingIndicator from '../common/util/LoadingIndicator'
import { Col, List, Row } from 'antd'
import { orderSelector } from '../../redux/reducers/OrdersSliceReducer'
import { useDispatch, useSelector } from 'react-redux'
import { floristsSelector } from '../../redux/reducers/FloristSliceReducer'
import { productSelector } from '../../redux/reducers/ProductsSliceReducer'

const ClientPage = (props) => {
  const dispatch = useDispatch()
  const { orders } = useSelector(orderSelector)
  const { products } = useSelector(productSelector)
  const { loading } = useSelector(floristsSelector)
  // const order = orders.find(x => x.id === props.orderId)

  if (loading || products === null) {
    return <LoadingIndicator />
  }

  const orderProductsDataSource = []
  // let product
  // order.orderProducts
  //   .map(orderProduct => {
  //       product = dispatch(getProduct(orderProduct.productId))
  //
  //       orderProductsDataSource.push(
  //         <OrderProduct
  //           key={orderProduct.id}
  //           quantity={orderProduct.quantity}
  //           orderProduct={orderProduct}
  //           product={product}
  //         />
  //       )
  //     }
  //   )

  return (
    <Row justify='center'>
      <Col span={22}>
        <h1>Заказ №</h1>
        <div className='border-info border'>
          <Row justify='space'>
            <Col span={10}>
              {/*<p>Статус заказа: {order.orderStatus}</p>*/}
              {/*<p>Общая стоимость заказа: {order.orderPriceInfo.totalAmount} руб.</p>*/}
            </Col>
            <Col span={10}>
              {/*<p>Комментарий к заказу: {order.comment}</p>*/}
              <br />
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

export default ClientPage

