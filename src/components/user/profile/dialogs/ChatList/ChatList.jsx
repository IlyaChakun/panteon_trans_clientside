import React from 'react'
import { ChatEngine } from 'react-chat-engine'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ChatList = (props) => {
  const { currentUser } = useSelector(state => state.authState)
  console.log(props)
  return (
    <React.Fragment>
      Hello
    </React.Fragment>
  )
}

export default ChatList