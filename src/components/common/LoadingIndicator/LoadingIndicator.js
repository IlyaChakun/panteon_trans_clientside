import React from 'react'
import { Spin } from 'antd'
import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined'

export default function LoadingIndicator () {
  const antIcon = <LoadingOutlined/>
  return (
    <Spin indicator={antIcon} size={'large'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 60px)' }}/>
  )
}
