import React from 'react'
import { Popconfirm } from 'antd'

import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../../redux/reducers/ProductsSliceReducer'


const DeleteProductModal = (props) => {
  const dispatch = useDispatch()

  const confirm = (e) => {
    console.log(e)
    dispatch(deleteProduct(props.productId))
  }

  const cancel = (e) => {
    console.log(e)
    // message.error('Click on No');
  }

  return (
    <div>
      <Popconfirm
        title='Вы уверены, что хотите удалить продукт?'
        onConfirm={confirm}
        onCancel={cancel}
        okText='Да'
        cancelText='Нет'>
        {props.button}
      </Popconfirm>
    </div>
  )
}

export default withRouter(DeleteProductModal)
