import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select, Row, Col, Typography, notification } from 'antd'
import { withRouter } from 'react-router-dom'
import { localizedStrings } from '../../../../../util/localization'
import { registerCompany } from '../../../../../redux/actions/company'
import { useDispatch, useSelector } from 'react-redux'

const { Option } = Select
const { Title } = Typography

const CompanyRegistration = ({ buttonText }) => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.authState)

  const [isLoading, setLoading] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [site, setSite] = useState('')
  const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState('')
  const [title, setTitle] = useState('')
  const [unp, setUnp] = useState('')
  const [description, setDescription] = useState('')
  const [businessType, setType] = useState()
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState()
  const [foundationDate, setDate] = useState('')

  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  const createObjectFromState = () => {
    return {
      title,
      description,
      unp,
      ownerId: currentUser.id,
      email,
      site,
      address: {
        countryId: country,
        cityId: 0,
        address: address,
        apartment: 1
      },
      phoneNumbers: [phoneNumber, additionalPhoneNumber],
      foundationDate,
      businessType
    }
  }

  const handleSubmit = () => {
    setLoading(true)
    console.log('data: ', createObjectFromState())
    dispatch(registerCompany(createObjectFromState()))
      .then((data) => {
        console.log('success: ', data)
        setLoading(false)
        setVisible(false)
      })
      .catch(error => {
        setLoading(false)
        notification.error({
          message: 'Не удалось зарегистрировать',
          description: 'При регистрации возникла ошибка'
        })
        console.log('reg err: ', error)
      })
  }

  const onChangeCountrySelect = (input, option) => {
    setCountry(option.value)
  }

  const onChangeTypeSelect = (input, option) => {
    setType(option.value)
  }

  const handleCompanyTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleUNP = (event) => {
    setUnp(event.target.value)
  }

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handleAdditionalPhoneNumber = (event) => {
    setAdditionalPhoneNumber(event.target.value)
  }

  const handleAddress = (event) => {
    setAddress(event.target.value)
  }

  const countryOptions = [
    <Option key={1} value={1}>
      Беларусь
    </Option>,
    <Option key={2} value={2}>
      Россия
    </Option>
  ]

  const typesOptions = [
    <Option key={'FREIGHT_OWNER'} value={'FREIGHT_OWNER'}>
      Грузовладелец
    </Option>,
    <Option key={'FREIGHT_OPERATOR'} value={'FREIGHT_OPERATOR'}>
      Грузоперевозчик
    </Option>,
    <Option key={'FREIGHT_FORWARDER'} value={'FREIGHT_FORWARDER'}>
      Экспедитор
    </Option>
  ]

  return (
    <Row style={{ height: 'calc(100vh - 64px)', padding: '20px' }} align={'top'} justify={'start'}>
      <Col span={18} style={{ backgroundColor: '#fff', padding: '16px 32px' }} >
        <Title style={{ marginBottom: '20px' }} level={4}>Регистрация Вашей компании</Title>
        <Form
          layout="vertical"
        >
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                  name='title'
                  label={'Наименование организации'}
                  rules={[{ required: true, message: localizedStrings.alertBadEmail }]}
                  onChange={handleCompanyTitle}
              >
                <Input
                    value={title}
                    name='title'
                    placeholder={'Наименование организации'}
                />
              </Form.Item>

              <Form.Item
                  name='unp'
                  label={'УНП/ИНН'}
                  rules={[{ required: true }]}
                  onChange={handleUNP}
              >
                <Input
                    name='unp'
                    value={unp}
                    placeholder={'УНП/ИНН'}
                />
              </Form.Item>
              <Form.Item
                  name='email'
                  label={'E-mail'}
                  rules={[{ required: true }]}
                  onChange={event => setEmail(event.target.value)}
              >
                <Input
                    name='email'
                    value={email}
                    placeholder={'E-mail'}
                />
              </Form.Item>
              <Form.Item
                  name='site'
                  label={'Сайт'}
                  rules={[{ required: true }]}
                  onChange={event => setSite(event.target.value)}
              >
                <Input
                    name='site'
                    value={site}
                    placeholder={'Сайт'}
                />
              </Form.Item>
              <Form.Item
                  name='description'
                  label={'Описание'}
                  rules={[{ required: true }]}
                  onChange={event => setDescription(event.target.value)}
              >
                <Input
                    name='description'
                    value={description}
                    placeholder={'Описание'}
                />
              </Form.Item>
              <Form.Item
                  name='foundationDate'
                  label={'Дата основания'}
                  rules={[{ required: true }]}
                  onChange={event => setDate(event.target.value)}
              >
                <Input
                    name='foundationDate'
                    value={foundationDate}
                    placeholder={'Дата основания'}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                  name='address'
                  label={'Страна: '}
                  rules={[{ required: true }]}
              >
                <Select
                    name='country'
                    value={country}
                    showSearch
                    placeholder='Страна'
                >
                  {countryOptions}
                </Select>
              </Form.Item>
              <Form.Item
                  name='address'
                  label={'Город: '}
                  rules={[{ required: true }]}
              >
                <Select
                    name='city'
                    value={country}
                    showSearch
                    placeholder='Город'
                >
                  {countryOptions}
                </Select>
              </Form.Item>
              <Form.Item
                  name='businessType'
                  label={'Тип компании: '}
                  rules={[{ required: true }]}
              >
                <Select
                    name='businessType'
                    value={country}
                    showSearch
                    placeholder='Тип компании'
                >
                  {typesOptions}
                </Select>
              </Form.Item>

              <Form.Item
                  name='address'
                  label={'Юр. адрес'}
                  rules={[{ required: true }]}
              >
                <Input
                    name='address'
                    value={site}
                    placeholder={'Юр. адрес'}
                />
              </Form.Item>

              <Form.Item
                  name='address'
                  label={'Номер телефона: '}
                  rules={[{ required: true }]}
              >
                <Input
                    name='phone'
                    value={site}
                    placeholder={'Номер телефона: '}
                />
              </Form.Item>

              <Form.Item
                  label={'Номер телефона (доп.)'}
                  onChange={(event) => handleAdditionalPhoneNumber(event)}
              >
                <Input
                    name='additionalPhoneNumber'
                    value={additionalPhoneNumber}
                    placeholder='Номер телефона (доп.)'
                />
              </Form.Item>
            </Col>
          </Row>


          <Form.Item>
            <Button type={'primary'}>Зарегистрировать</Button>
          </Form.Item>
        </Form>
        </Col>
      </Row>
  )
}

export default withRouter(CompanyRegistration)
