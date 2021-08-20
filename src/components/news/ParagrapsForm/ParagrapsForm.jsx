import { Button, Col, Form, Input, Row, Typography } from 'antd'
import React from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const { Title } = Typography

const ParagrapsForm = ({ fieldKey }) => {
  return (
    <Form.List name={[fieldKey, "paragraphs"]}>
      {(paragraphs, { add, remove }) => (
        <React.Fragment>
          <Title level={5}>Абзацы</Title>
          {paragraphs.map(({ key, name, fieldKey, ...restField }) => (
            <Row key={key} align="middle">
              <Col span={20}>
                <Form.Item
                  {...restField}
                  name={[name, 'text']}
                  fieldKey={[fieldKey, 'text']}
                  rules={[{ required: true, message: 'Missing text' }]}
                >
                  <Input placeholder="Текст" />
                </Form.Item>
              </Col>
              <Col span={4} style={{display: 'flex', justifyContent: 'center'}}>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Col>
            </Row>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Добавить абзац
            </Button>
          </Form.Item>
        </React.Fragment>
      )}
    </Form.List>
  )
}

export default ParagrapsForm