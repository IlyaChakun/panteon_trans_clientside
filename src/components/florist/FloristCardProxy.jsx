import React from 'react'

import { isAdmin } from '../../app/App'
import { useSelector } from 'react-redux'
import { authSelector } from '../../redux/reducers/AuthSliceReducer'
import FloristCard from './FloristCard'
import EditFloristModal from './EditFloristModal'


const FloristCardProxy = ({ cargo, history, updateList }) => {

  const { currentUser } = useSelector(authSelector)

  const editAction = (
    <div className={isAdmin(currentUser) ? '' : 'custom-hidden'}>
      <EditFloristModal
        floristId={cargo.id}
        updateList={updateList}
      />
    </div>
  )

  return (
    <FloristCard
      key={cargo.id}
      cargo={cargo}
      firstAction={editAction}
    />
  )
}

export default FloristCardProxy
