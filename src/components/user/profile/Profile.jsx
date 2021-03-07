import React, { useState } from 'react'
import { Button, Form, Input, Tabs } from 'antd'
import s from './Profile.module.css'

import ChangePasswordModal from '../modal/ChangePasswordModal'

import { SUCCESS } from '../../../constants'
import { validatePhoneNumber, validateUserName } from '../../common/validation/ValidationFunctions'
import ImageLoader from '../../common/image/ImageLoader'
import { withRouter } from 'react-router-dom'
import OrderList from '../../order/OrderList'
import LoadingIndicator from '../../common/util/LoadingIndicator'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, updateUserProfile } from '../../../redux/reducers/AuthSliceReducer'


const Profile =(props)=> {

  const {TabPane} = Tabs

  const layout = {
    labelCol: {  span: 9   },
    wrapperCol: {      span: 15    },
  }

  const dispatch = useDispatch()
  const { currentUser } = useSelector(authSelector)

  const [name, setName]=useState({  value: currentUser.payload.name,  validateStatus: SUCCESS,  errorMsg: null})
  const [email, setEmail]=useState( {  value: currentUser.payload.email,  validateStatus: SUCCESS})
  const [phoneNumber, setPhoneNumber] = useState({  value: currentUser.payload.phoneNumber,  validateStatus: SUCCESS,  errorMsg: null})
  const [imageUrl, setImageUrl] = useState(currentUser.payload.image === undefined ? '' : currentUser.payload.image.imageUrl)

  const handleSubmit = () => {
    const updateUserRequest = {
      id: currentUser.payload.id,
      name: name.value,
      phoneNumber: phoneNumber.value,
      image: {
        imageUrl: imageUrl
      }
    }

    console.log(updateUserRequest)

    dispatch(updateUserProfile(updateUserRequest))
    props.history.push('/profile')
  }


  const handleNameChange = (event, validationFun) => {
    setName( {value: event.target.value, ...validationFun(event.target.value) })
  }

  const handlePhoneChange = (event, validationFun) => {
    setPhoneNumber( {
      value: event.target.value,
      ...validationFun(event.target.value)
    })
  }

  const isFormInvalid = () => {
    return !(
      name.validateStatus === SUCCESS &&
      email.validateStatus === SUCCESS &&
      phoneNumber.validateStatus === SUCCESS
    )
  }

  const handleImageUrlChange = (imageUrl) => {
    setImageUrl(imageUrl)
  }

  const loadingIndicatorOrReadyOrderListForm = currentUser === null ?
    (
      <LoadingIndicator/>
    ) : (
      <OrderList currentUser={currentUser}/>
    )

  return (
    <div className="container py-5 px-3 mb-5">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Личный кабинет" key="1">
          <div className="col-sm-12 mb-5">
            <Form {...layout}
                  onFinish={handleSubmit} className={s.form}>

              <div className="row mb-5">
                <div className="col-sm-6">
                  <ImageLoader
                    imageUrl={imageUrl}
                    handleImageUrlChange={handleImageUrlChange}
                  />
                </div>
                <div className="col-sm-6">
                  <Form.Item
                    className={s.formItem}
                    label='Ваше имя'
                    validateStatus={name.validateStatus}
                    hasFeedback={!isFormInvalid()}
                    onChange={(event) => handleNameChange(event, validateUserName)}
                    help={name.errorMsg}
                    rules={[
                      {
                        required: true,
                        message: 'Пожалуйста, введите ваше имя!',
                      },
                    ]}
                  >
                    <Input
                      name="name"
                      type=""
                      size="middle"
                      value={name.value}>
                    </Input>
                  </Form.Item>

                  <Form.Item
                    className={s.formItem}
                    label='Email'
                    validateStatus={email.validateStatus}
                  >
                    <Input
                      type="email"
                      name="email"
                      size="middle"
                      disabled={true}
                      value={email.value}>
                    </Input>
                  </Form.Item>

                  <Form.Item
                    className={s.formItem}
                    label='Номер телефона'
                    validateStatus={phoneNumber.validateStatus}
                    hasFeedback={!isFormInvalid()}
                    onChange={(event) => handlePhoneChange(event, validatePhoneNumber)}
                    help={phoneNumber.errorMsg}
                    rules={[
                      {
                        required: true,
                        message: 'Пожалуйста, введите ваш телефон!',
                      },
                    ]}
                  >

                    <Input
                      name="phoneNumber"
                      size="middle"
                      value={phoneNumber.value}>
                    </Input>
                  </Form.Item>
                </div>
              </div>

              <div className="row mb-5 d-flex justify-content-end">
                <div className="col-3">
                  <Form.Item className={s.formItem}>
                    <Button
                      htmlType="submit"
                      type="primary"
                      style={{background: "black", color: "white"}}
                      shape="round"
                      disabled={isFormInvalid()}
                    >
                      Изменить профиль
                    </Button>
                  </Form.Item>
                </div>
                <div className="col-3">
                  <ChangePasswordModal currentUserId={currentUser.payload.id}/>
                </div>
              </div>
            </Form>
          </div>
        </TabPane>
        <TabPane tab="Ваши заказы" key="2">
          {loadingIndicatorOrReadyOrderListForm}
        </TabPane>
      </Tabs>
    </div>
  )
}

export default withRouter(Profile)
