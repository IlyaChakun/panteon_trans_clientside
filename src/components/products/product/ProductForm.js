import React, {Component} from 'react'

import s from "../../user/profile/Profile.module.css";
import {Button, Form, Select, Input, Row, Col, Space} from "antd";
import ImageLoader from "../../common/image/ImageLoader";
import {
    getCountriesRequest,
    getFlowerColorsRequest, getFlowerLengthCostsRequest,
    getFlowerSortsRequest,
    getFlowerTypesRequest
} from "../../util/utilsAPI";
import {ERROR, SUCCESS} from "../../../constants";
import validateId from "../product/ProductValidation";

import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';


const Option = Select.Option;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};


export default class ProductForm extends Component {


    state = {

        flowerTypesValues: [],
        flowerSortsValues: [],
        flowerColorsValues: [],
        flowerLengthCostValues: [],
        countiesValues: [],

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
            // values: this.props.bouquet.flowerColors,
            value: this.props.flower.flowerColor,
            validateStatus: this.props.validateStatus
        },
        flowerLengthCosts: {
            value: this.props.flower.flowerLengthCosts,
            validateStatus: this.props.validateStatus
        },
        flowerSort: {
            // values: this.props.bouquet.flowerSorts,
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

    componentDidMount() {
        this.resolveCountries()
        this.resolveFlowerSorts()
        this.resolveFlowerTypes()
        this.resolveFlowerColors()
        this.resolveFlowerLengthCosts()
    }

    resolveCountries() {
        const promise = getCountriesRequest()
        promise
            .then(response => {

                this.setState({
                    countiesValues: response
                });

            }).catch(() => {

        });
    }

    resolveFlowerTypes() {
        const promise = getFlowerTypesRequest()
        promise
            .then(response => {

                this.setState({
                    flowerTypesValues: response
                });

            }).catch(() => {
        });
    }

    resolveFlowerSorts() {
        const promise = getFlowerSortsRequest()
        promise
            .then(response => {

                this.setState({
                    flowerSortsValues: response
                });

            }).catch(() => {
        });
    }

    resolveFlowerLengthCosts() {
        const promise = getFlowerLengthCostsRequest()
        promise
            .then(response => {
                console.log("getFlowerLengthCostsRequest")
                console.log(response)
                this.setState({
                    flowerLengthCostValues: response
                });

            }).catch(() => {
        });
    }


    resolveFlowerColors() {
        const promise = getFlowerColorsRequest()
        promise
            .then(response => {

                this.setState({
                    flowerColorsValues: response
                });

            }).catch(() => {
        });
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

        const countriesOptions = this.state.countiesValues.map(
            element =>
                <Option key={element.id} value={element.countryNameRu}>
                    {element.countryNameRu}
                </Option>
        )

        const flowerColorsOptions = this.state.flowerColorsValues.map(
            element =>
                <Option key={element.id}
                        value={element.colorName}
                        label={element.colorName}
                >
                    {element.colorName}
                </Option>
        )

        const flowerTypesOptions = this.state.flowerTypesValues.map(
            element =>
                <Option key={element.id} value={element.flowerType}>
                    {element.flowerType}
                </Option>
        )

        const flowerSortsOptions = this.state.flowerSortsValues.map(
            element =>
                <Option key={element.id} value={element.sortNameRu}>
                    {element.sortNameRu}
                </Option>
        )

        const flowerLengthCostsOptions = this.state.flowerLengthCostValues.map(
            element =>
                <Option key={element.id} value={element.length}>
                    {element.stemLength} см - {element.price} руб
                </Option>
        )

        const areas = [
            {label: 'Beijing', value: 'Beijing'},
            {label: 'Shanghai', value: 'Shanghai'},
        ];


        return (
            <Form {...layout}
                  onFinish={this.handleSubmit}
                  initialValues={{}}
            >
                <Row>
                    <Col span={24}>
                        <Row>
                            <Col span={12}>
                                <ImageLoader
                                    imageUrl={this.state.imageUrl}
                                    handleImageUrlChange={this.handleImageUrlChange}
                                />
                            </Col>

                            <Col span={12}>

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


                                    <Form.List name="sights">
                                        {(fields, {add, remove}) => (
                                            <>
                                                {fields.map(field => (
                                                    <Space key={field.key} align="baseline">
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
                                                                    fieldKey={[field.fieldKey, 'length']}
                                                                    rules={[{required: true, message: 'Missing length'}]}
                                                                >
                                                                    <Select
                                                                        // disabled={!form.getFieldValue('area')}
                                                                            style={{width: 130}}>
                                                                        {(this.state.flowerLengthCostValues['stemLength'] || []).map(item => (
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
                                                            label="Price"
                                                            name={[field.name, 'price']}
                                                            fieldKey={[field.fieldKey, 'price']}
                                                            rules={[{required: true, message: 'Missing price'}]}
                                                        >
                                                            <Input/>
                                                        </Form.Item>

                                                        <MinusCircleOutlined onClick={() => remove(field.name)}/>
                                                    </Space>
                                                ))}

                                                <Form.Item>
                                                    <Button type="dashed" onClick={() => add()} block
                                                            icon={<PlusOutlined/>}>
                                                        Добавить длину и цену
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </Form.Item>


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
