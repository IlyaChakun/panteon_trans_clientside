import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Modal from 'antd/es/modal'
import ProductForm from './ProductForm'
import { saveProductRequest } from '../../util/utilsAPI'
import { localizedStrings } from '../../util/localization'
import { Button, notification } from 'antd'

class AddProductModal extends Component {

  state = {
    product: {
      id: '',
      dateOfLastUpdate: '',
      flowerType: '',
      flowerColor: '',
      flowerLengthCosts: [],
      flowerSort: '',
      country: '',
      description: '',
      availableAmountOnStock: '',
      image: null
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = e => {
    console.log(e)
    this.setState({
      visible: false
    })
  }


  handleSubmitButton = (productRequest) => {

    console.log('product request: ' + { ...productRequest })

    saveProductRequest(productRequest)
      .then(() => {
        notification.success({
          message: localizedStrings.alertAppName,
          description: 'Продукт сохранен!'
        })

        this.props.updateList()

        this.handleCancel()

      }).catch(error => {
      notification.error({
        message: localizedStrings.alertAppName,
        description: 'Чет пошло не так. сорян'
      })
    })
  }


  render() {

    return (
      <div className='pt-3 float-right'>
        <Button type='primary'
                style={{ background: 'black', color: 'white' }}
                shape='round'
                onClick={this.showModal}
        >
          Добавить продукт
        </Button>

        <Modal
          title='Добавить продукт'
          visible={this.state.visible}
          okButtonProps={{ style: { display: 'none' } }}
          onCancel={this.handleCancel}
          centered
          width={1200}
        >

          <ProductForm
            product={this.state.product}
            action={'Добавить'}
            validateStatus={''}
            shopId={this.props.shopId}
            handleSubmitButton={this.handleSubmitButton}
          />

        </Modal>
      </div>
    )
  }


}

export default withRouter(AddProductModal)
