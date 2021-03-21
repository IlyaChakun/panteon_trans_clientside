import React, { useEffect, useState } from 'react'

import s from '../user/profile/Profile.module.css'
import { Button, Col, Form, Input, Row, Select } from 'antd'
import ImageLoader from '../common/image/ImageLoader'
import { SUCCESS } from '../../constants'
import { validateAmount, validateDescription, validateId, validateTitle } from './ProductValidation'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCategories,
  fetchCountries,
  fetchProductLengths,
  productSelector
} from '../../redux/reducers/ProductsSliceReducer'


const ProductForm = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCountries())
    dispatch(fetchCategories())
    dispatch(fetchProductLengths())
  }, [dispatch])

  const {
    categories,
    countries,
    productLengths
  } = useSelector(productSelector)

  const id = props.product.id
  const [category, setCategory] = useState({
    id: props.product.categoryId,
    value: categories.find(x => x.id === props.product.categoryId),
    validateStatus: props.validateStatus
  })
  const [country, setCountry] = useState({
    id: props.product.countryId,
    value: countries.find(x => x.id === props.product.countryId),
    validateStatus: props.validateStatus
  })
  const [title, setTitle] = useState({ value: props.product.title, validateStatus: props.validateStatus })
  const [description, setDescription] = useState({
    value: props.product.description,
    validateStatus: props.validateStatus
  })
  const [availableAmount, setAvailableAmount] = useState({
    value: props.product.availableAmount,
    validateStatus: props.validateStatus
  })
  const [imageUrl, setImageUrl] = useState(props.product.image == null ? '' : props.product.image.imageUrl)
  const productLengthCost = props.product.productLengthCost


  const { Option, OptGroup } = Select

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  }

  const isFormInvalid = () => {
    return !(
      title.validateStatus === SUCCESS,
      description.validateStatus === SUCCESS
    )
  }

  const handleSubmit = (values) => {

    console.log('Received values of form:', values)

    const flowerRequest = {
      'id': id,
      'categoryId': category.id,
      'countryId': country.id,
      'title': title.value,
      'description': description.value,
      'availableAmount': availableAmount.value,
      'productLengthCost': values.productLengthCostList,
      'image': imageUrl
    }

    console.log('flowerRequest request: ', flowerRequest)

    props.handleSubmitButton(flowerRequest)
  }

  const handleAmountChange = (event) => {
    console.log('amount event', event)
    setAvailableAmount({
      value: event.target.value,
      ...validateAmount(event.target.value)
    })
  }

  const handleTitleChange = (event) => {
    console.log('title event', event)
    setTitle({
      value: event.target.value,
      ...validateTitle(event.target.value)
    })
  }

  const handleDescriptionChange = (event) => {
    console.log('desc event', event)
    setDescription({
      value: event.target.value,
      ...validateDescription(event.target.value)
    })
  }

  const handleImageUrlChange = (imageUrl) => {
    setImageUrl(imageUrl)
  }

  const onChangeCountrySelect = (input, option) => {
    setCountry({
      id: option.value,
      value: option.value,
      ...validateId(option.key)
    })
  }

  const onChangeCategorySelect = (input, option) => {
    setCategory({
      id: option.value,
      value: option.value,
      ...validateId(option.key)
    })
  }

  const countriesOptions = countries.map(
    element =>
      <Option key={`${element.id}-${element.countryNameEn}`} value={element.id}>
        {element.countryNameRu}
      </Option>
  )

  console.log(JSON.stringify(categories))

  const categoriesOptions = categories.map(
    element =>
      element.parentId === null ? (
        <OptGroup key={element.parentId} label={element.name}>
          {
            element.children.map(
              child =>
                <Option key={element.id} value={child.id}>{child.name}</Option>
            )
          }
        </OptGroup>
      ) : ''
  )

  const initialProductCosts = productLengthCost

  return (
    <Form {...layout}
          onFinish={handleSubmit}

          name='dynamic_form_nest_item'
          autoComplete='off'
    >
      <Row>
        <Col span={24}>
          <Row>
            <Col span={10}>
              <ImageLoader
                imageUrl={imageUrl}
                handleImageUrlChange={handleImageUrlChange}
              />
            </Col>

            <Col span={14}>

              <Form.Item
                label={'Название'}
                validateStatus={title.validateStatus}
                hasFeedback
                onChange={(event) => handleTitleChange(event)}
                help={title.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите название!'
                  }
                ]}
              >
                <Input
                  name='title'
                  value={title.value}
                  placeholder='Название'
                  style={{ fontSize: '16px', width: 200 }}
                />
              </Form.Item>


              <Form.Item
                label='Страна поставщик'
                validateStatus={country.validateStatus}
                hasFeedback
                help={country.errorMsg}
              >

                <Select
                  name='country'
                  value={country.id}
                  showSearch
                  style={{ width: 200 }}
                  placeholder='Выберите страну'
                  onChange={onChangeCountrySelect}
                >
                  {countriesOptions}
                </Select>

              </Form.Item>

              <Form.Item
                label='Категория продукта'
                validateStatus={category.validateStatus}
                hasFeedback
                help={category.errorMsg}
              >

                <Select
                  name='category'
                  value={category.id}
                  showSearch
                  style={{ width: 200 }}
                  placeholder='Выберите категорию продукта'
                  onChange={onChangeCategorySelect}
                >
                  {categoriesOptions}
                </Select>

              </Form.Item>

              <Form.List name='productLengthCostList' initialValue={initialProductCosts}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <div
                        key={field.key}
                        style={{ display: 'flex' }}
                        align='baseline'>

                        <Form.Item
                          noStyle
                          shouldUpdate={(prevValues, curValues) =>
                            prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                          }
                        >
                          {() => (
                            <Form.Item
                              {...field}
                              label='Длина'
                              labelCol={{ span: 11, offset: 1 }}
                              wrapperCol={{ span: 12 }}
                              name={[field.name, 'stemLength']}
                              fieldKey={[field.fieldKey, 'stemLength']}
                              rules={[{ required: true, message: 'Введите длину' }]}
                            >
                              <Select
                                // disabled={!form.getFieldValue('area')}
                                style={{ width: 120 }}
                              >
                                {productLengths.map(item => (
                                  <Option key={item} value={item.productLength}>
                                    {item.productLength}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          )}
                        </Form.Item>

                        <Form.Item
                          {...field}
                          labelCol={{ span: 8, offset: 2 }}
                          wrapperCol={{ span: 14 }}
                          label='Цена'
                          name={[field.name, 'cost']}
                          fieldKey={[field.fieldKey, 'cost']}
                          rules={[{ required: true, message: 'Введите цену' }]}
                        >
                          <Input />
                        </Form.Item>

                        <MinusCircleOutlined
                          style={{ marginLeft: 16, paddingTop: 8 }}
                          onClick={() => remove(field.name)} />
                      </div>
                    ))}

                    <Form.Item>
                      <Button type='dashed'
                              block
                              style={{ marginBottom: 0 }}
                              onClick={() => add()}
                              icon={<PlusOutlined />}
                      >
                        Добавить длину и цену
                      </Button>

                    </Form.Item>
                  </>
                )}
              </Form.List>


              <Form.Item
                label={'Описание'}
                validateStatus={description.validateStatus}
                hasFeedback
                onChange={(event) => handleDescriptionChange(event)}
                help={description.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите описание!'
                  }
                ]}
              >
                <Input.TextArea
                  name='description'
                  value={description.value}
                  placeholder={'описание'}
                  style={{ fontSize: '16px', width: 200 }}
                  autosize={{ minRows: 3, maxRows: 6 }} />
              </Form.Item>


              <Form.Item
                label={'Кол-во на складе'}
                validateStatus={availableAmount.validateStatus}
                hasFeedback
                onChange={(event) => handleAmountChange(event)}
                help={availableAmount.errorMsg}
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите описание!'
                  }
                ]}
              >
                <Input
                  type={'number'}
                  min={0}
                  max={10_000}
                  name='availableAmount'
                  placeholder={'колво на складе'}
                  style={{ fontSize: '16px', width: 200 }}
                  value={availableAmount.value}
                />
              </Form.Item>

            </Col>
          </Row>
          <Row>
            <Col span={4} offset={20}>
              <Form.Item className={s.formItem}>
                <Button
                  type='primary'
                  htmlType='submit'
                  size='large'
                  className={s.button}
                  disabled={isFormInvalid()}>
                  {props.action}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  )
}

export default withRouter(ProductForm)
