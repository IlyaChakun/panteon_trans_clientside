import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Modal from "antd/es/modal";
import ProductForm from "./ProductForm.jsx";
import {getFlowersByIdRequest, updateFlowerRequest} from "../../util/utilsAPI";
import {localizedStrings} from "../../util/localization";
import {notification} from "antd";
import {isAdmin} from "../../../app/App";
import SettingOutlined from "@ant-design/icons/lib/icons/SettingOutlined";
import LoadingIndicator from "../../common/util/LoadingIndicator";
import {SUCCESS} from "../../../constants";

class EditProductModal extends Component {

    state = {
        shopId: this.props.shopId,

        productId: this.props.productId,

        loading: true,
        product: null
    }


    componentDidMount() {

        const product = getFlowersByIdRequest(this.state.productId);

        product
            .then(response => {

                console.log('product after find by id')
                console.log(response)

                this.setState({
                    product: {

                        id: response.id,
                        dateOfLastUpdate: response.dateOfLastUpdate,
                        flowerType: response.flowerType,
                        flowerColor: response.flowerColor,
                        flowerSort: response.flowerSort,
                        flowerLengthCosts: response.flowerLengthCosts,
                        country: response.country,
                        description: response.description,
                        availableAmountOnStock: response.availableAmountOnStock,

                    }
                });

                console.log('response.flowerColors ' + response.flowerColors)


               // this.state.product.flowerColors = response.flowerColors.map(item => item.id)

                // response.flowerColors.map(item => {
                //     this.state.product.flowerColors.push({
                //         "id": item.id
                //     });
                // })

            })
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = e => {
        console.log({e});
        this.setState({
            visible: false,
        });
    };


    handleSubmitButton = (flowerRequest) => {

        console.log('flower request: ' + flowerRequest.shop.id)

        updateFlowerRequest(flowerRequest.id, flowerRequest)
            .then(() => {
                notification.success({
                    message: localizedStrings.alertAppName,
                    description: 'Цветок обновлен!',
                })
                this.handleCancel()

            }).catch(error => {
            notification.error({
                message: localizedStrings.alertAppName,
                description: 'Чет пошло не так. сорян'
            })
        })
    }


    render() {

        const loadingIndicatorOrReadyFlowerForm = this.state.product === null ?
            (
                <LoadingIndicator/>
            ) : (
                <ProductForm
                    product={this.state.product}
                    action={'Изменить'}
                    validateStatus={SUCCESS}
                    handleSubmitButton={this.handleSubmitButton}
                />
            );


        return (
            <div>
                <span className={isAdmin(this.props.currentUser) ? '' : 'custom-hidden'}>
                      <SettingOutlined style={{fontSize: '25px'}} onClick={this.showModal}/>
                </span>

                <Modal
                    title="Изменить цветок"
                    visible={this.state.visible}
                    okButtonProps={{style: {display: 'none'}}}
                    onCancel={this.handleCancel}
                    centered
                    width={1200}
                >
                    {loadingIndicatorOrReadyFlowerForm}
                </Modal>
            </div>
        );
    }


}

export default withRouter(EditProductModal)
