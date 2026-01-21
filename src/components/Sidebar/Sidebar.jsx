import React, { useState, useContext } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Sidebar = ({ setActivePanel }) => {
  const [extended, setExtended] = useState(false);
  const { chats, startNewChat, selectChat } = useContext(Context);

  return (
    <div className={`sidebar ${extended ? 'expanded' : 'collapsed'}`}>
      <div className="top">
        <img
          onClick={() => setExtended(prev => !prev)}
          className="menu"
          src={assets.menuicon}
          alt="Menu"
        />

        <div className="new-chat" onClick={startNewChat}>
          <img src={assets.plusicon} alt="" />
          <p>New Chat</p>
        </div>

        <div className="recent">
          <p className="recent-title">Recent</p>
          {chats.map(chat => {
            const firstUserMsg = chat.messages.find(msg => msg.type === 'user');
            if (!firstUserMsg) return null;

            return (
              <div
                key={chat.id}
                className="recent-entry"
                onClick={() => selectChat(chat.id)}
              >
                <img src={assets.messageicon} alt="" />
                <p>{firstUserMsg.text.slice(0, 25)}...</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bottom">
        <div
          className="bottom-item recent-entry"
          onClick={() =>
            setActivePanel(prev => (prev === 'help' ? null : 'help'))
          }
        >
          <img src={assets.questionicon} alt="" />
          <p>Help</p>
        </div>
        <div
          className="bottom-item recent-entry"
          onClick={() =>
            setActivePanel(prev => (prev === 'activity' ? null : 'activity'))
          }
        >
          <img src={assets.historyicon} alt="" />
          <p>Activity</p>
        </div>
        <div
          className="bottom-item recent-entry"
          onClick={() =>
            setActivePanel(prev => (prev === 'settings' ? null : 'settings'))
          }
        >
          <img src={assets.settingicon} alt="" />
          <p>Settings</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
