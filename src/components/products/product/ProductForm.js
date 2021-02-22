import React, {Component} from 'react'

import s from "../../user/profile/Profile.module.css";
import { Button, Form, Select, Input, Row, Col, Space, Divider, Tooltip } from 'antd'
import ImageLoader from "../../common/image/ImageLoader";
import {ERROR, SUCCESS} from "../../../constants";
import validateId from "../product/ProductValidation";

import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentUser, updateUserProfile } from '../../../redux/reducers/AuthSliceReducer'


const Option = Select.Option;

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};


class ProductForm extends Component {


    state = {
        id: this.props.flower.id,

        dateOfLastUpdate: {
            value: this.props.flower.dateOfLastUpdate,
            validateStatus: this.props.validateStatus
        },

        flowerType: {
            id: this.props.flower.flowerType.id,
            value: this.props.flower.flowerType.flowerType,
            validateStatus: this.props.validateStatus
        },
        flowerColor: {
            value: this.props.flower.flowerColor,
            validateStatus: this.props.validateStatus
        },
        flowerLengthCosts: {
            value: this.props.flower.flowerLengthCosts,
            validateStatus: this.props.validateStatus
        },
        flowerSort: {
            value: this.props.flower.flowerSort,
            validateStatus: this.props.validateStatus
        },
        country: {
            id: this.props.flower.country.id,
            value: this.props.flower.country.countryNameRu,
            validateStatus: this.props.validateStatus
        },
        description: {
            value: this.props.flower.description,
            validateStatus: this.props.validateStatus
        },
        availableAmountOnStock: {
            value: this.props.flower.availableAmountOnStock,
            validateStatus: this.props.validateStatus
        },

        imageUrl: this.props.flower.image === null ? '' : this.props.flower.image.imageUrl
    }


    isFormInvalid = () => {
        return !(
            this.state.country.validateStatus === SUCCESS
        )
    }

    handleSubmit = (values) => {

        console.log('Received values of form:', values)

        const flowerRequest = {
            "shop": {
                "id": this.props.shopId,
            },

            "id": this.state.id,
            "flowerType": {
                "id": this.state.flowerType.id
            },
            "flowerColor": {
                "id": this.state.flowerColor.id
            },
            "flowerSort": {
                "id": this.state.flowerSort.id,
            },
            "flowerLengthCosts": [
                {
                    "stemLength": 70.5,
                    "price": 25.3
                }
            ],
            "country": {
                "id": this.state.country.id
            },
            "description": this.state.description.value,
            "availableAmountOnStock": this.state.availableAmountOnStock.value,
            "image": {
                "imageUrl": this.state.imageUrl
            }
        }

        console.log('flowerRequest request: ' + flowerRequest)

        this.props.handleSubmitButton(flowerRequest);
    }


    render() {

        const countriesOptions = this.props.countriesValues.map(
            element =>
                <Option key={element.id} value={element.countryNameRu}>
                    {element.countryNameRu}
                </Option>
        )

        const flowerColorsOptions = this.props.flowerColorsValues.map(
            element =>
                <Option key={element.id}
                        value={element.colorName}
                        label={element.colorName}
                >
                    {element.colorName}
                </Option>
        )

        const flowerTypesOptions = this.props.flowerTypesValues.map(
            element =>
                <Option key={element.id} value={element.flowerType}>
                    {element.flowerType}
                </Option>
        )

        const flowerSortsOptions = this.props.flowerSortsValues.map(
            element =>
                <Option key={element.id} value={element.sortNameRu}>
                    {element.sortNameRu}
                </Option>
        )

        const flowerLengthCostsOptions = this.props.flowerLengthCostValues.map(
            element =>
                <Option key={element.id} value={element.length}>
                    {element.stemLength} см - {element.cost} руб
                </Option>
        )



        return (
            <Form {...layout}
                  onFinish={this.handleSubmit}
                  initialValues={{}}
                  name="dynamic_form_nest_item"
                  autoComplete="off"
            >
                <Row>
                    <Col span={24}>
                        <Row>
                            <Col span={10}>
                                <ImageLoader
                                    imageUrl={this.state.imageUrl}
                                    handleImageUrlChange={this.handleImageUrlChange}
                                />
                            </Col>

                            <Col span={14}>

                                <Form.Item
                                    label={'Страна поставщик'}
                                    validateStatus={this.state.country.validateStatus}
                                    hasFeedback
                                    help={this.state.country.errorMsg}
                                >

                                    <Select
                                        name="country"
                                        value={this.state.country.value}
                                        showSearch
                                        style={{width: 200}}
                                        placeholder="Выберите страну"
                                        onChange={this.onChangeCountrySelect}
                                    >
                                        {countriesOptions}
                                    </Select>

                                </Form.Item>

                                <Form.Item
                                    label={'Тип цветка'}
                                    validateStatus={this.state.flowerType.validateStatus}
                                    hasFeedback
                                    help={this.state.flowerType.errorMsg}
                                >

                                    <Select
                                        name="flowerType"
                                        value={this.state.flowerType.value}
                                        showSearch
                                        style={{width: 200}}
                                        placeholder="Выберите тип"
                                        onChange={this.onChangeFlowerTypeSelect}
                                    >
                                        {flowerTypesOptions}
                                    </Select>

                                </Form.Item>


                                <Form.Item
                                    label={'Цвета'}
                                    validateStatus={this.state.flowerColor.validateStatus}
                                    hasFeedback
                                    help={this.state.flowerColor.errorMsg}

                                >
                                    <Select
                                        name="flowerType"
                                        value={this.state.flowerColor.value}
                                        showSearch
                                        style={{width: 200}}
                                        placeholder="Выберите тип букета"
                                        onChange={this.onChangeColorsSelect}
                                    >
                                        {flowerColorsOptions}
                                    </Select>
                                </Form.Item>


                                <Form.Item
                                    label={'Сорта'}
                                    validateStatus={this.state.flowerSort.validateStatus}
                                    hasFeedback
                                    help={this.state.flowerSort.errorMsg}
                                >

                                    <Select
                                        name={"flowerSort"}
                                        value={this.state.flowerSort.value}
                                        showSearch
                                        style={{width: 200}}
                                        placeholder="Выберите сорт"
                                        onChange={this.onChangeFlowerSortsSelect}
                                    >
                                        {flowerSortsOptions}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label={'Длина стебля - цена'}
                                    validateStatus={this.state.flowerLengthCosts.validateStatus}
                                    hasFeedback
                                    help={this.state.flowerLengthCosts.errorMsg}
                                    rules={[{required: true, message: 'Missing area'}]}
                                >

                                    <Select
                                        name="flowerLengthCosts"
                                        value={this.state.flowerLengthCosts.value}
                                        showSearch
                                        style={{width: 200}}
                                        placeholder="Выберите длину стебля - цена'"
                                        onChange={this.onChangeFlowerLengthCostsSelect}
                                        options={this.state.flowerLengthCostValues}
                                    >
                                        {flowerLengthCostsOptions}
                                    </Select>

                                </Form.Item>


                                <Form.List name="lengthcosts" >
                                  {(fields, {add, remove}) => (
                                    <>
                                      {fields.map((field,index) => (
                                        <div
                                          key={field.key}
                                          style={{ display: 'flex'}}
                                          align="baseline">

                                          <Form.Item
                                            noStyle
                                            shouldUpdate={(prevValues, curValues) =>
                                              prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                            }
                                          >
                                            {() => (
                                              <Form.Item
                                                {...field}
                                                label="Длина"
                                                name={[field.name, 'length']}
                                                labelCol={{span: 11, offset: 1}}
                                                wrapperCol={{span:12}}
                                                fieldKey={[field.fieldKey, 'length']}
                                                rules={[{required: true, message: 'Введите длину'}]}
                                              >
                                                <Select
                                                  // disabled={!form.getFieldValue('area')}
                                                  style={{width:120}}
                                                >
                                                  {(this.props.flowerLengthCostValues['stemLength'] || []).map(item => (
                                                    <Option key={item} value={item}>
                                                      {item}
                                                    </Option>
                                                  ))}
                                                </Select>
                                              </Form.Item>
                                            )}
                                          </Form.Item>

                                          <Form.Item
                                            {...field}
                                            labelCol={{span: 8, offset: 2}}
                                            wrapperCol={{span:14}}
                                            label="Цена"
                                            name={[field.name, 'price']}
                                            fieldKey={[field.fieldKey, 'price']}
                                            rules={[{required: true, message: 'Введите цену'}]}
                                          >
                                            <Input/>
                                          </Form.Item>

                                          <MinusCircleOutlined
                                            style={{marginLeft:16, paddingTop: 8}}
                                            onClick={() => remove(field.name)}/>
                                        </div>
                                      ))}

                                      <Form.Item>
                                        <Button type="dashed"
                                                block
                                                style={{marginBottom:0}}
                                                onClick={() => add()}
                                                icon={<PlusOutlined/>}
                                        >
                                          Добавить длину и цену
                                        </Button>

                                      </Form.Item>
                                    </>
                                  )}
                                </Form.List>



                                <Form.Item
                                    label={'Описание'}
                                    validateStatus={this.state.description.validateStatus}
                                    hasFeedback
                                    onChange={(event) => this.handleInputChange(event, this.validateDescription)}
                                    help={this.state.description.errorMsg}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Пожалуйста, введите описание!',
                                        },
                                    ]}
                                >
                                    <Input.TextArea
                                        name="description"
                                        value={this.state.description.value}
                                        placeholder={'описание'}
                                        style={{fontSize: '16px', width: 200}}
                                        autosize={{minRows: 3, maxRows: 6}}/>
                                </Form.Item>


                                <Form.Item
                                    label={'Колво на складе'}
                                    validateStatus={this.state.availableAmountOnStock.validateStatus}
                                    hasFeedback
                                    onChange={(event) => this.handleInputChange(event, this.validateAmountOnStock)}
                                    help={this.state.availableAmountOnStock.errorMsg}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Пожалуйста, введите описание!',
                                        },
                                    ]}
                                >
                                    <Input
                                        type={"number"}
                                        min={0}
                                        max={10_000}
                                        name="availableAmountOnStock"
                                        placeholder={'колво на складе'}
                                        style={{fontSize: '16px', width: 200}}
                                        value={this.state.availableAmountOnStock.value}
                                    />
                                </Form.Item>

                            </Col>
                        </Row>
                        <Row>
                            <Col span={4} offset={20}>
                                <Form.Item className={s.formItem}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        className={s.button}
                                        disabled={this.isFormInvalid()}>
                                        {this.props.action}
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        )
    }

    handleInputChange = (event, validationFun) => {
        const target = event.target
        const inputName = target.name
        const inputValue = target.value

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        })
    }


    handleImageUrlChange = (imageUrl) => {
        this.setState({
            imageUrl: imageUrl
        })
    }


    onChangeCountrySelect = (input, option) => {
        this.setState({
            country: {
                id: option.props.key,
                value: option.props.value,
                ...validateId(option.props.key)
            }
        })
    }

    onChangeFlowerTypeSelect = (input, option) => {
        this.setState({
            flowerType: {
                id: option.props.key,
                value: option.props.value,
                ...validateId(option.props.key)
            }
        })
    }

    onChangeColorsSelect = (input, option) => {
        this.setState({
            flowerColor: {
                id: option.props.key,
                value: option.props.value,
                ...validateId(option.props.key)
            }
        })
    }

    onChangeFlowerSortsSelect = (input, option) => {
        this.setState({
            flowerSort: {
                id: option.props.key,
                value: option.props.value,
                ...validateId(option.props.key)
            }
        })
    }


    onChangeFlowerLengthCostsSelect = (input, option) => {
        this.setState({
            flowerLengthCosts: {
                id: option.props.key,
                value: option.props.value,
                ...validateId(option.props.key)
            }
        })
    }


    validateDescription = (description) => {
        if (description === undefined || description.length > 520) {
            return {
                validateStatus: ERROR,
                errorMsg: 'Описание слишком длинное'
            }
        }

        return {
            validateStatus: SUCCESS,
            errorMsg: null
        }
    }

    validateAmountOnStock = (amount) => {
        if (amount === undefined || amount > 10_000) {
            return {
                validateStatus: ERROR,
                errorMsg: 'Количество слишком большое'
            }
        }

        return {
            validateStatus: SUCCESS,
            errorMsg: null
        }
    }

}

const mapStateToProps = state => ({
    flowerTypesValues: state.productsState.flowerTypesValues,
    flowerSortsValues: state.productsState.flowerSortsValues,
    flowerColorsValues: state.productsState.flowerColorsValues,
    flowerLengthCostValues: state.productsState.flowerLengthCostValues,
    countriesValues: state.productsState.countriesValues,
})

export default withRouter(connect(
  mapStateToProps,
  { getCurrentUser, updateUserProfile }
)(ProductForm))
