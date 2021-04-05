import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Modal from 'antd/es/modal'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { addFlorist } from '../../redux/reducers/FloristSliceReducer'
import FloristForm from './FloristForm'
import s from '../user/profile/Profile.module.css'

const AddFloristModal = (props) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const florist = {
    id: '',
    user: {
      name: '',
      email: '',
      password: ''
    },
    experience: ''
  }

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  const handleSubmitButton = (floristRequest) => {
    console.log('florist request: ' + { ...floristRequest })

    dispatch(addFlorist(floristRequest))
    props.updateList()
    handleCancel()
  }

  return (
    <div className='pt-3 float-right'>
      <Button type='primary'
        htmlType='submit'
        size='large'
        className={s.button}
        onClick={showModal}
      >
        Добавить флориста
      </Button>

      <Modal
        title='Добавить флориста'
        visible={visible}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={handleCancel}
        centered
        width={1200}
      >

        <FloristForm
          florist={florist}
          action={'Добавить'}
          validateStatus={''}
          handleSubmitButton={handleSubmitButton}
        />

      </Modal>
    </div>
  )
}

export default withRouter(AddFloristModal)
