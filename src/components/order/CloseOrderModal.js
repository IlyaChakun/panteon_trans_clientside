import React from 'react'
import { Popconfirm } from 'antd'

import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { partialOrderUpdate } from '../../redux/reducers/OrdersSliceReducer'


const CloseOrderModal = ({ orderId, button }) => {
  const dispatch = useDispatch()


  const confirm = (e) => {
    console.log(e)

    const orderPartialUpdate = {
      orderId: orderId,
      orderClose: {
        description: 'I don\'t want this order'
      }
    }

    dispatch(partialOrderUpdate(orderPartialUpdate))
  }

  const cancel = (e) => {
    console.log(e)
    // message.error('Click on No');
  }

  return (
    <Popconfirm
      title='Вы уверены, что хотите закрыть заказ?'
      onConfirm={confirm}
      onCancel={cancel}
      okText='Да'
      cancelText='Нет'>
      {button}
    </Popconfirm>
  )
}

export default withRouter(CloseOrderModal)
