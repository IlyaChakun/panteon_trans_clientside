import React, {Component} from 'react'

import s from "../../user/profile/Profile.module.css";
import {Button, Form, Select} from "antd";
import ImageLoader from "../../common/image/ImageLoader";
import {
    getCountriesRequest,
    getFlowerBouquetTypesRequest,
    getFlowerColorsRequest,
    getFlowerSortsRequest
} from "../../util/utilsAPI";
import {ERROR, SUCCESS} from "../../../constants";
import Input from "antd/es/input";

const Option = Select.Option;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};


export default class BouquetForm extends Component {


    state = {

        bouquetTypesValues: [],
        flowerSortsValues: [],
        flowerColorsValues: [],
        countiesValues: [],


        shopId: this.props.shopId,
        id: this.props.bouquet.id,

        dateOfLastUpdate: {
            value: this.props.bouquet.dateOfLastUpdate,
            validateStatus: this.props.validateStatus
        },

        bouquetType: {
            id: this.props.bouquet.bouquetType.id,
            value: this.props.bouquet.bouquetType.bouquetType,
            validateStatus: this.props.validateStatus
        },
        // flowerColors: {
        //     // values: this.props.bouquet.flowerColors,
        //     value: this.props.bouquet.flowerColors[0],
        //     validateStatus: this.props.validateStatus
        // },
        flowerColor: {
            // values: this.props.bouquet.flowerColors,
            value: this.props.bouquet.flowerColor,
            validateStatus: this.props.validateStatus
        },
        flowerLengthCosts: {
            value: this.props.bouquet.flowerLengthCosts,
            validateStatus: this.props.validateStatus
        },
        // flowerSorts: {
        //     // values: this.props.bouquet.flowerSorts,
        //     value: this.props.bouquet.flowerSorts[0],
        //     validateStatus: this.props.validateStatus
        // },
        flowerSort: {
            // values: this.props.bouquet.flowerSorts,
            value: this.props.bouquet.flowerSort,
            validateStatus: this.props.validateStatus
        },
        country: {
            id: this.props.bouquet.country.id,
            value: this.props.bouquet.country.countryNameRu,
            validateStatus: this.props.validateStatus
        },
        title: {
            value: this.props.bouquet.title,
            validateStatus: this.props.validateStatus
        },
        description: {
            value: this.props.bouquet.description,
            validateStatus: this.props.validateStatus
        },
        availableAmountOnStock: {
            value: this.props.bouquet.availableAmountOnStock,
            validateStatus: this.props.validateStatus
        },

        imageUrl: this.props.bouquet.image === null ? '' : this.props.bouquet.image.imageUrl
    }

    componentDidMount() {
        this.resolveCountries()
        this.resolveFlowerSorts()
        this.resolveBouquetTypes()
        this.resolveFlowerColors()
    }

    resolveCountries() {
        const promise = getCountriesRequest()

        console.log('resolve countries')

        promise
            .then(response => {

                this.setState({
                    countiesValues: response
                });

            }).catch(() => {

        });
    }

    resolveBouquetTypes() {
        const promise = getFlowerBouquetTypesRequest()

        console.log('resolve getFlowerBouquetTypesRequest')

        promise
            .then(response => {

                this.setState({
                    bouquetTypesValues: response
                });

            }).catch(() => {
        });
    }

    resolveFlowerSorts() {
        const promise = getFlowerSortsRequest()

        console.log('resolve getFlowerSortsRequest')

        promise
            .then(response => {

                this.setState({
                    flowerSortsValues: response
                });

            }).catch(() => {
        });
    }


    resolveFlowerColors() {
        const promise = getFlowerColorsRequest()

        console.log('resolve getFlowerColorsRequest')

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

    handleSubmit = () => {


        const flowerRequest = {

            "shop": {
                "id": this.state.shopId,
            },

            "id": this.state.id,
            "bouquetType": {
                "id": this.state.bouquetType.id
            },
            // "flowerColors": this.state.flowerColors.values,
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
            // "flowerSorts": this.state.flowerSorts.values,

            "country":
                {
                    "id": this.state.country.id
                }
            ,
            "title": this.state.title.value,
            "description": this.state.description.value,
            "availableAmountOnStock": this.state.availableAmountOnStock.value,
            "image": {
                "imageUrl":
                this.state.imageUrl
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
                <Option key={element.id} value={element.colorName}>
                    {element.colorName}
                </Option>
        )

        const bouquetTypesOptions = this.state.bouquetTypesValues.map(
            element =>
                <Option key={element.id} value={element.bouquetType}>
                    {element.bouquetType}
                </Option>
        )

        const flowerSortsOptions = this.state.flowerSortsValues.map(
            element =>
                <Option key={element.id} value={element.sortNameRu}>
                    {element.sortNameRu}
                </Option>
        )


        return (

            <div>
                <div>

                    <div>
                        <Form {...layout}
                              onFinish={this.handleSubmit}
                              initialValues={{}}
                        >

                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <ImageLoader
                                            imageUrl={this.state.imageUrl}
                                            handleImageUrlChange={this.handleImageUrlChange}
                                        />
                                    </div>

                                    <div className="col-sm-6">

                                        <Form.Item
                                            className={s.formItem}
                                            label={'Страна поставщик'}
                                            validateStatus={this.state.country.validateStatus}
                                            hasFeedback
                                            help={this.state.country.errorMsg}
                                            // name="country"
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
                                            className={s.formItem}
                                            label={'Тип букета'}
                                            validateStatus={this.state.bouquetType.validateStatus}
                                            hasFeedback
                                            help={this.state.bouquetType.errorMsg}
                                            // name="bouquetType"
                                        >

                                            <Select
                                                name="flowerType"
                                                value={this.state.bouquetType.value}
                                                showSearch
                                                style={{width: 200}}
                                                placeholder="Выберите тип букета"
                                                onChange={this.onChangeBouquetTypeSelect}
                                            >
                                                {bouquetTypesOptions}
                                            </Select>

                                        </Form.Item>


                                        <Form.Item
                                            className={s.formItem}
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
                                            className={s.formItem}
                                            label={'Сорта'}
                                            validateStatus={this.state.flowerSort.validateStatus}
                                            hasFeedback
                                            help={this.state.flowerSort.errorMsg}
                                            // name="flowerSorts"
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
                                            className={s.formItem}
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
                                            // name="description"
                                        >
                                            <Input.TextArea
                                                name="description"
                                                value={this.state.description.value}
                                                placeholder={'описание'}
                                                style={{fontSize: '16px'}}
                                                autosize={{minRows: 3, maxRows: 6}}/>
                                        </Form.Item>

                                        <Form.Item
                                            className={s.formItem}
                                            label={'Название'}
                                            validateStatus={this.state.title.validateStatus}
                                            hasFeedback
                                            onChange={(event) => this.handleInputChange(event, this.validateTitle)}
                                            help={this.state.title.errorMsg}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Пожалуйста, введите описание!',
                                                },
                                            ]}
                                            // name="title"
                                        >
                                            <Input
                                                type={"text"}
                                                name="title"
                                                value={this.state.title.value}
                                                placeholder={'название'}
                                                style={{fontSize: '16px'}}
                                                autosize={{minRows: 3, maxRows: 6}}/>
                                        </Form.Item>


                                        <Form.Item
                                            className={s.formItem}
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
                                            // name="availableAmountOnStock"
                                        >
                                            <Input
                                                type={"number"}
                                                min={0}
                                                max={10_000}
                                                name="availableAmountOnStock"
                                                value={this.state.availableAmountOnStock.value}
                                                placeholder={'колво на складе'}
                                                style={{fontSize: '16px'}}
                                                autosize={{minRows: 3, maxRows: 6}}/>
                                        </Form.Item>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8"></div>
                                    <div className="col-4">
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
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>


                </div>

            </div>


        )
    }

    handleInputChange = (event, validationFun) => {
        const target = event.target
        const inputName = target.name
        const inputValue = target.value

        console.log('handle input change')
        console.log('inputName= ' + inputName)
        console.log('inputValue= ' + inputValue)

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

    onChangeBouquetTypeSelect = (input, option) => {
        this.setState({
            bouquetType: {
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

    // onChangeColorsSelect = (keys, value) => {
    //     console.log(value)
    //     value.map(item => {
    //         this.state.flowerColors.values.push({
    //             "id": item.key
    //         });
    //     })
    // }
    //
    //
    // onChangeFlowerSortsSelect = (keys, value) => {
    //     console.log(value)
    //
    //
    //     value.map(item => {
    //         this.state.flowerSorts.values.push({
    //             "id": item.key
    //         });
    //     })
    //
    // }


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

    validateTitle = (title) => {
        if (title === undefined || title.length > 35) {
            return {
                validateStatus: ERROR,
                errorMsg: 'Название слишком длинное'
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


function validateId(id) {
    return {
        validateStatus: SUCCESS,
        errorMsg: null
    }
}
