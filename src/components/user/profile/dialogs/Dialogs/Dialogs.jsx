import React from 'react'
import { ChatEngine } from 'react-chat-engine'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ChatFeed from '../ChatFeed/ChatFeed'

const Dialogs = () => {
  const { currentUser } = useSelector(state => state.authState)

  return (
    <React.Fragment>
      {currentUser && (
        <ChatEngine
          height={'100%'}
          projectID='7f101024-0f40-4be8-a1fd-7435d1005b18'
          userName={currentUser.userName}
          userSecret={currentUser.userSecret}
          // renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState}/>}
        />
      )}
    </React.Fragment>
  )
}

export default withRouter(Dialogs)