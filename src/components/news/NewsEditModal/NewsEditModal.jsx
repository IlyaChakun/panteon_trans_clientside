import React, { useState } from 'react'
import { Row, Col, notification, Form, Input, Typography } from 'antd'
import { Button, Modal } from 'antd'

import { withRouter, Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Upload, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { addArticle, editArticle } from '../../../redux/actions/news'
import ParagrapsForm from '../ParagrapsForm/ParagrapsForm'

const { Title } = Typography

const NewsEditModal = (props) => {

  const [form] = Form.useForm()

  const [title, setTitle] = useState({ value: '' })
  const [description, setDescription] = useState({ value: '' })

  const [image, setImage] = useState()
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const dispatch = useDispatch()

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const validateFields = () => {

    if (props.image && !image) {
      notification.error({
        message: 'Вы не добавили изображение',
      })
      return false
    }
    return true
  }

  const handleSubmit = (values) => {
    if (validateFields()) {
      setConfirmLoading(true)
      let editData = {}
      if (title.value) {
        editData.title = title.value
      }
      if (description.value) {
        editData.description = description.value
      }
      if (values.sections) {
        const content = {
          image: '',
          sections: values.sections
        }
        editData.content = JSON.stringify(content)
      }
      if (image) {
        editData.image = image
      }

      dispatch(editArticle(props.match.params.id, editData))
        .then(() => {
          setConfirmLoading(false)
          setVisible(false)
          notification.success({
            message: 'Данные изменены',
          })
        })
        .catch(error => {
          setConfirmLoading(false)
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
    <React.Fragment>
      <Button type="primary" onClick={showModal}>
        {props.title && 'Заголовок'}
        {props.description && 'Описание'}
        {props.content && 'Содержимое'}
        {props.image && 'Изображение'}
      </Button>
      <Modal
        title={
          props.title ? 'Изменение заголовка' :
          props.description ? 'Изменение описания' :
          props.content ? 'Изменение содержимого' :
          props.image ? 'Замена изображения' : ''
        }
        visible={visible}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleSubmit(values)
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            })
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form}>
          {props.image && (
            <Form.Item
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Введите новые данные'
                }
              ]}
            >
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
          )}
          {(props.title || props.description) && (
            <Form.Item
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Введите новые данные'
                }
              ]}
              onChange={
                props.title ? handleTitleChange :
                  props.description ? handleDescriptionChange : ''
              }
            >
              <Input.TextArea
                name={
                  props.title ? 'title' :
                    props.description ? 'description' : ''
                }
                autoComplete='off'
                placeholder={'Новые данные'}
                value={
                  props.title ? title.value :
                    props.description ? description.value : ''
                }

              />
            </Form.Item>
          )}
          {props.image && props.content && (
            <React.Fragment>
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
            </React.Fragment>
          )}
        </Form>
      </Modal>
    </React.Fragment>
  )
}

export default NewsEditModal
