import React, {useState} from 'react'
import {Button, Form, Input, Modal, Typography} from 'antd'

const {Title} = Typography

const AddDriver = () => {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
      <div>
        <Button
            type='primary'
            onClick={showModal}
        >
          Добавить водителя
        </Button>
        <Modal
            title='Добавление водителя'
            visible={isModalVisible}
            cancelText='Отменить'
            okText={'Добавить'}
            onOk={() => {
              form
                  .validateFields()
                  .then((values) => {
                    const transformedObj = {
                      accountReq: {
                        user: {
                          email: values.email,
                          firstName: values.firstName,
                          lastName: values.lastName
                        },
                        passportSeries: values.passportSeries,
                        passportNumber: values.passportNumber
                      }
                    }
                    console.log('Values:', transformedObj);
                  })
                  .catch(info => {
                    console.log('Validate Failed:', info);
                  });
            }}
            onCancel={handleCancel}
        >
          <Form
              layout={"vertical"}
              form={form}
          >
            <Title level={4}>Основная информация</Title>
            <Form.Item
                name={'email'}
                rules={[
                  {
                    required: true,
                    message: 'Введите E-Mail'
                  }
                ]}
                label={'Имя:'}
            >
              <Input
                  name='email'
                  autoComplete='off'
                  placeholder={'E-Mail'}
              />
            </Form.Item>
            <Form.Item
                name={'firstName'}
                rules={[
                  {
                    required: true,
                    message: 'Введите имя'
                  }
                ]}
                label={'Имя:'}
            >
              <Input
                  name='firstName'
                  autoComplete='off'
                  placeholder={'Имя'}
              />
            </Form.Item>
            <Form.Item
                name={'lastName'}
                rules={[
                  {
                    required: true,
                    message: 'Введите фамилию'
                  }
                ]}
                label={'Фамилия:'}
            >
              <Input
                  name='lastName'
                  autoComplete='off'
                  placeholder={'Фамилия'}
              />
            </Form.Item>
            <Form.Item
                name={'passportSeries'}
                rules={[
                  {
                    required: true,
                    message: 'Введите серию паспорта'
                  }
                ]}
                label={'Серия паспорта:'}
            >
              <Input
                  name='passportSeries'
                  autoComplete='off'
                  placeholder={'Серия паспорта'}
              />
            </Form.Item>
            <Form.Item
                name={'passportNumber'}
                rules={[
                  {
                    required: true,
                    message: 'Введите номер паспорта'
                  }
                ]}
                label={'Номер папорта:'}
            >
              <Input
                  name='passportNumber'
                  autoComplete='off'
                  placeholder={'Номер паспорта'}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>

  )
}
export default AddDriver