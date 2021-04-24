import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Modal from 'antd/es/modal'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { addFlorist } from '../../redux/reducers/CompanySliceReducer'
import FloristForm from './FloristForm'
import s from '../user/profile/Profile.module.css'

const AddFloristModal = (props) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const cargo = {
    id: '',
    user: {
      name: '',
      email: '',
      password: ''
    },
    experience: '',
    salary: ''
  }

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  const handleSubmitButton = (floristRequest) => {
    console.log('cargo request: ' + { ...floristRequest })

    const addFloristRequest = {
      userSignUpRequest: {
        roleType: floristRequest.roleType,
        name: floristRequest.name,
        email: floristRequest.email,
        phoneNumber: floristRequest.phoneNumber,
        image: {
          imageUrl: floristRequest.imageUrl
        },
        password: floristRequest.password,
        confirmedPassword: floristRequest.password
      },
      experience: floristRequest.experience,
      salary: floristRequest.salary,
      shopId: floristRequest.shopId
    }

    dispatch(addFlorist(addFloristRequest))
    props.updateList()
    handleCancel()
  }

  return (
    <div className='pt-3 float-right'>
      <Button
        type='primary'
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
        cancelText='Отменить'
        onCancel={handleCancel}
        centered
        width={1200}
      >

        <FloristForm
          cargo={cargo}
          action={'Добавить'}
          validateStatus={''}
          handleSubmitButton={handleSubmitButton}
        />

      </Modal>
    </div>
  )
}

export default withRouter(AddFloristModal)
