import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Modal from 'antd/es/modal'

import SettingOutlined from '@ant-design/icons/lib/icons/SettingOutlined'

import { useDispatch, useSelector } from 'react-redux'
import { SUCCESS } from '../../constants'
import FloristForm from './FloristForm'
import { floristsSelector, updateFlorist } from '../../redux/reducers/FloristSliceReducer'

const EditFloristModal = (props) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const { florists } = useSelector(floristsSelector)
  const florist = florists.find(x => x.id === props.floristId)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    console.log(e)
    setVisible(false)
  }

  const handleSubmitButton = (floristRequest) => {
    console.log('updateFloristRequest: ', floristRequest)

    const updateRequest = {
      id: props.floristId,
      user: {
        name: floristRequest.name,
        email: floristRequest.email,
        phoneNumber: floristRequest.phoneNumber,
        image: {
          imageUrl: floristRequest.imageUrl
        },
        roleType: floristRequest.roleType
      },
      shopId: floristRequest.shopId,
      experience: floristRequest.experience,
      salary: floristRequest.salary
    }
    console.log('compose updateFloristRequest: ', updateRequest)
    console.log('compose updateFloristRequest flo id: ', props.floristId)

    dispatch(updateFlorist(props.floristId, updateRequest))
    props.updateList()
    handleCancel()
  }

  return (
    <div>
      <span>
        <SettingOutlined style={{ fontSize: '25px' }} onClick={showModal} />
      </span>

      <Modal
        title='Изменить информацию о флористе'
        visible={visible}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={handleCancel}
        centered
        width={1200}
      >
        <FloristForm
          florist={florist}
          action={'Изменить'}
          validateStatus={SUCCESS}
          handleSubmitButton={handleSubmitButton}
        />
      </Modal>
    </div>
  )
}

export default withRouter(EditFloristModal)
