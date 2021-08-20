import React, { useState } from 'react'
import { Row, Col, notification } from 'antd'
import { Button, Form, Input, Space, Typography } from 'antd'

import { withRouter, Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Upload, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { addArticle } from '../../../redux/actions/news'
import ParagrapsForm from '../ParagrapsForm/ParagrapsForm'

const { Title } = Typography

const NewsForm = (props) => {

  const [title, setTitle] = useState({ value: '' })
  const [description, setDescription] = useState({ value: '' })
  // const [content, setContent] = useState({ value: {} })
  const [image, setImage] = useState()

  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const validateFields = () => {
    if (!image) {
      notification.error({
        message: 'Вы не добавили изображение',
      })
      return false
    }
    return true
  }

  const handleSubmit = (values) => {
    const { title, description, sections } = values
    const content = { sections }

    if (validateFields()) {
      setLoading(true)
      dispatch(addArticle(image, {
        title: title,
        description: description,
        content: JSON.stringify(content)
      }))
        .then(() => {
          setLoading(false)
          props.history.push('/news')
        })
        .catch(error => {
          setLoading(false)
          notification.error({
            message: 'Ошибка отправки данных',
          })
        })
    }
  }

  const handleTitleChange = (event) => {
    setTitle({
      value: event.target.value,
    })
  }

  const handleDescriptionChange = (event) => {
    setDescription({
      value: event.target.value,
    })
  }

  const handleImageChange = (info) => {
    setImage(info.file)
  }

  return (
    <Row style={{ minHeight: 'calc(100vh - 64px)' }} align={'middle'}>
      <Col xs={{ span: 20, offset: 2 }} sm={{ span: 16, offset: 4 }} md={{ span: 10, offset: 7 }}>
        <Form
          style={{ padding: '25px', backgroundColor: '#fff' }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name='title'
            rules={[{ required: true, message: 'Введите заголовок' }]}
            onChange={handleTitleChange}
          >
            <Input
               value={title.value}
               name='title'
               placeholder={'Заголовок'}
            />
          </Form.Item>

          <Form.Item
            name='description'
            rules={[{ required: true, message: 'Введите описание' }]}
            onChange={handleDescriptionChange}
          >
            <Input
              name='description'
              value={description.value}
              placeholder={'Описание'}
            />
          </Form.Item>

          <Form.List name="sections">
            {(fields, { add, remove }) => (
              <React.Fragment>
                <Title level={5}>Содержимое</Title>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Row key={key} align="middle">
                    <Col span={20}>
                      <Form.Item
                        {...restField}
                        name={[name, 'header']}
                        fieldKey={[fieldKey, 'header']}
                        rules={[{ required: true, message: 'Missing header' }]}
                      >
                        <Input placeholder="Заголовок" />
                      </Form.Item>

                      <ParagrapsForm fieldKey={name} />
                    </Col>
                    <Col span={4} style={{display: 'flex', justifyContent: 'center'}}>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Добавить секцию
                  </Button>
                </Form.Item>
              </React.Fragment>
            )}
          </Form.List>

          <Form.Item>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={
                {
                  showDownloadIcon: false,
                  showPreviewIcon: false,
                  showRemoveIcon: true
                }
              }
              onChange={handleImageChange}
              beforeUpload={Upload.LIST_IGNORE}
              maxCount={1}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            style={{marginBottom: '0'}}
          >
            <Button
              type='primary'
              htmlType='submit'
              style={{width: '100%', marginBottom: '16px'}}
              loading={loading}
            >
              {'Запостить'}
            </Button>
            <Button type={'link'} style={{padding: '0'}}><Link to={'/news'} style={{ textDecoration: 'none' }}>Вернуться на основной раздел</Link></Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default withRouter(NewsForm)
