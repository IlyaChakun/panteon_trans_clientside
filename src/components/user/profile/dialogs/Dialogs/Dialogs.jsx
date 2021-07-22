import React from 'react'
import { ChatEngine } from 'react-chat-engine'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

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
          // renderChatList={(chatAppState) => {}}
          // renderChatCard={(chat, index) => {}}
          renderNewChatForm={(creds) => {}}
          // renderChatFeed={(chatAppState) => {}}
          // renderChatHeader={(chat) => {}}
          // renderMessageBubble={(creds, chat, lastMessage, message, nextMessage) => {}}
          // renderSendingMessage={(creds, chat, lastMessage, message, nextMessage) => {}}
          // renderIsTyping={(typers) => {}}
          // renderNewMessageForm={(creds, chatId) => {}}
          renderChatSettings={(chatAppState) => {}}
          renderChatSettingsTop={(creds, chat) => {}}
          renderPeopleSettings={(creds, chat) => {}}
          renderPhotosSettings={(chat) => {}}
          renderOptionsSettings={(creds, chat) => {}}
        />
      )}
    </React.Fragment>
  )
}

export default withRouter(Dialogs)