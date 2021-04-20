import React, { useEffect } from 'react'
import { Col, Row, Table, Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderById, orderSelector } from '../../redux/reducers/OrdersSliceReducer'
import LoadingIndicator from '../common/util/LoadingIndicator'
import { withRouter } from 'react-router-dom'
import { fetchCategories, fetchCountries, productSelector } from '../../redux/reducers/ProductsSliceReducer'

const { Column } = Table

const OrderPage = ({ orderId }) => {

  const dispatch = useDispatch()
  const {
    order,
    orderLoading
  } = useSelector(orderSelector)

  const {
    countries,
    categories
  } = useSelector(productSelector)

  useEffect(() => {
    console.log('inside effect', orderId)
    dispatch(fetchCategories())
    dispatch(fetchCountries())
    dispatch(getOrderById(orderId))
  }, [orderId])

  if (orderLoading === true || order === null) {
    return <LoadingIndicator />
  }

  console.log(order)

  const dataSource = []

  order.products.map(product => {
    const quantity = product.quantity
    const singleProduct = product.product
    const price = singleProduct.productLengthCost.find(x => x.id === 1).cost
    dataSource.push({
      key: singleProduct.id,
      dateOfCreation: singleProduct.dateOfCreation,
      description: singleProduct.description,
      image: singleProduct.image,
      productLengthCost: singleProduct.productLengthCost,
      title: singleProduct.title,
      category: countries.find(x => x.id === singleProduct.categoryId),
      country: countries.find(x => x.id === singleProduct.countryId),
      price: price,
      cost: price * quantity,
      quantity: quantity
    })
  })


  // let florist = {}
  // if (order.orderFloristInfo !==null && order.orderFloristInfo.floristId !== null) {
  //   florist = florists.find(x => x.id === order.orderFloristInfo.floristId)
  // }

  // console.log('floristId', order.orderFloristInfo.floristId)
  // console.log('florist', florist)

  return (
    <Row justify='center'>
      <Col span={22}>
        <h1>Заказ №{order.id}</h1>
        <div className='border-info border'>
          <Row justify='space'>
            <Col span={10}>
              <p>Статус заказа: {order.orderStatus}</p>
              <p>Дата создания заказа: {order.dateOfCreation}</p>
            </Col>
            <Col span={10}>
              {order.orderDeliveryInfo !== null ? (
                  <>
                    <p>Тип доставки: {order.orderDeliveryInfo.deliveryType.deliveryTypeName}</p>
                    {order.orderDeliveryInfo.deliveryType.id !== 1 ?
                      (<p>Доставка: {order.orderDeliveryInfo.address},
                          этаж: {order.orderDeliveryInfo.floorNumber},
                          подъезд: {order.orderDeliveryInfo.entranceNumber}</p>
                      )
                      : ''
                    }
                  </>
                )
                : ''
              }

              <p>Комментарий к заказу: {order.comment}</p>
              <br />
              {/*<p>Флорист ответсвенный за выполнение: {florist.user.name}</p>*/}
              {order.orderFloristInfo !== null ? (
                <>
                  {order.orderFloristInfo.floristComment !== null ?
                    (<p> Комментарий флориста: {order.orderFloristInfo.floristComment}</p>)
                    : ''}
                  {order.orderFloristInfo.floristAppointmentTime !== null ?
                    (<p> Начало работы флориста: {order.orderFloristInfo.floristAppointmentTime}</p>)
                    : ''}
                  {order.orderFloristInfo.floristCompletionTime !== null ?
                    (<p> Окончание работы флориста: {order.orderFloristInfo.floristCompletionTime}</p>)
                    : ''}
                </>
              ) : ''
              }

              {order.closeDescription !== null ?
                (<p> Причина закрытия заказа: {order.closeDescription}</p>)
                : ''}
              {order.orderReview !== null ?
                (<p> Отзыв к заказу: {order.orderReview.text}</p>)
                : ''}
            </Col>
          </Row>
        </div>

        <h2>Список товаров:</h2>

        <Table
          pagination={{

            // loading: loading,
            showSizeChanger: true,

            // defaultCurrent: page,
            // defaultPageSize: size,

            pageSizeOptions: ['100'],
            position: 'bottom'

            // total: totalElements,

            // showQuickJumper: true,
            // onShowSizeChange: onSizeChangeHandler,
            // onChange: onPageChangeHandler,

            // loadMore: loadMore
          }}

          dataSource={dataSource}
          footer={() => order.orderPriceInfo !== null ? (
            <p>Общая стоимость заказа: {order.orderPriceInfo.totalAmount} руб.</p>
          ) :''
          }
        >


          <Column
            title='Название продукта'
            dataIndex='title'
            key='title'
            render={title => (
              <Tag color='grey' key={title}>
                {title}
              </Tag>
            )}
          />
          <Column title='Описание' dataIndex='description' key='description' />
          <Column title='Цена' dataIndex='price' key='price' />
          <Column title='Кол-во' dataIndex='quantity' key='quantity' />
          <Column title='Сумма' dataIndex='cost' key='cost' />
        </Table>

      </Col>
    </Row>
  )

}

export default withRouter(OrderPage)

