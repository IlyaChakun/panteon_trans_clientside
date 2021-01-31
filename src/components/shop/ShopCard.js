import React, {Component} from 'react'

import './ShopCard.css'
import {Card} from 'antd'
import {withRouter} from "react-router-dom";

const {Meta} = Card

class ShopCard extends Component {

    state = {
        dateOfCreation: this.props.shop.dateOfCreation,
        dateOfLastUpdate: this.props.shop.dateOfLastUpdate,
        contacts: this.props.shop.contacts,
        workingHours: this.props.shop.workingHours,
        imageUrl: this.props.shop.image === undefined ? '' : this.props.shop.image.imageUrl
    }

    render() {
        return (
            <div className="site-card-wrapper">
                <Card
                    hoverable
                    style={{marginTop: 16}}
                    extra={''}
                    title={<a href="#">{this.state.contacts.city} {this.state.contacts.address}</a>}
                    actions={[this.props.firstAction]}>

                    <Meta
                        style={{padding: 0}}
                        avatar={<img src={this.state.imageUrl} alt=""/>}

                        title={
                            <p>
                            <span className="text_wrap" data-coordinates="53.930613,27.588529">
                                <i className="fas fa-map-marker-alt"/>
                                <span className="text"> Показать на карте</span>
                            </span>
                            </p>
                        }

                        description={
                            <div>
                                <div>
                                    <i className="far fa-clock"/>
                                    <span className="text  muted777">{this.state.workingHours.hours}</span>
                                </div>
                                <div className="phone">
                                    <a href="tel:{contacts.firstPhoneNumber}" className="black">
                                        {this.state.contacts.firstPhoneNumber}</a>
                                </div>
                                <div className="phone">
                                    <a href="tel:{contacts.firstPhoneNumber}" className="black">
                                        {this.state.contacts.secondPhoneNumber}</a>
                                </div>

                                <div>
                                    Последнее обновление: {this.state.dateOfLastUpdate}
                                    <br/>
                                    Дата открытия: {this.state.dateOfCreation}
                                </div>
                            </div>
                        }
                    />
                </Card>
            </div>
        )
    }
}

export default withRouter(ShopCard)

