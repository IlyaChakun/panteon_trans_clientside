import React, {useEffect, useState} from 'react'
import {Button, Form, Input, message, Select, Steps, Row, Col, Typography, Divider, Tabs} from 'antd'
import {withRouter, Link, Route, Redirect, Switch} from 'react-router-dom'
import TransportCardProxy from '../../../../transport/TransportCardProxy/TransportCardProxy'
import {useDispatch, useSelector} from 'react-redux'
import {getProfileTransports} from '../../../../../redux/actions/profile'
import EditFormModal from '../../../modal/EditFormModal/EditFormModal'
import DeleteFormModal from '../../../modal/DeleteFormModal/DeleteFormModal'

const {TabPane} = Tabs

const Trucks = (props) => {

    const dispatch = useDispatch()
    const { transports } = useSelector(state => state.profileState)
    const { currentUser } = useSelector(state => state.authState)

    console.log("transports truck path: ", props.location.pathname)

    useEffect(() => {
        if (currentUser) {
            dispatch(getProfileTransports(currentUser.id)).then((data) => {
                console.log('cargos data: ', data)
            })
        }
        console.log('curr user ', currentUser)
        console.log('curr transports ', transports)
    }, [currentUser])

    return (
        <React.Fragment>
            <Button type={"primary"}><Link style={{textDecoration: 'none'}} to={'/transports/add'}>Добавить
                транспорт</Link></Button>
            {transports.length &&
            transports.map((transport) => (
                    <Row style={{backgroundColor: '#fff', marginBottom: '20px', padding: '15px'}}>
                        <Row>
                            <TransportCardProxy transport={transport}/>
                        </Row>
                        <Row>
                            <EditFormModal style={{marginRight: '10px'}} transport={transport} isTransport={true}/>
                            <DeleteFormModal transport={transport} isTransport={true}/>
                        </Row>
                    </Row>
                )
            )}
        </React.Fragment>
    )
}

export default withRouter(Trucks)