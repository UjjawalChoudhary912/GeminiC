import React, { useState, useContext, useRef, useEffect } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Main = () => {
  const { currentChat, loading, onSent } = useContext(Context);
  const [prompt, setPrompt] = useState('');
  const chatEndRef = useRef(null);

  const chatHistory = currentChat?.messages ?? [];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, loading]);

  const handleSend = async (text = prompt) => {
    if (!text.trim()) return;
    await onSent(text);
    setPrompt('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  // Handle card click: set prompt and send immediately
  const handleCardClick = async (text) => {
    setPrompt(text);
    await handleSend(text);
  };

  return (
    <div className='main'>
      <div className="nav">
        <div className='gemini'>
          <p>Gemini</p>
          <img src={assets.geminiicon} alt="" />
        </div>
        <img src={assets.profileicon} alt="" />
      </div>

      <div className="main-container">
        {/* Greeting */}
        <div className="greet">
          <p><span>Hello , Developer.</span></p>
          <p>How can I help you today?</p>
        </div>

        {/* Cards */}
        <div className="cards">
          <div className="card" onClick={() => handleCardClick("Suggest beautiful places to see on an upcoming road trip")}>
            <p>Suggest beautiful places to see on an upcoming road trip</p>
            <img src={assets.compassicon} alt="" />
          </div>
          <div className="card" onClick={() => handleCardClick("Briefly summarize this concept: urban planning")}>
            <p>Briefly summarize this concept: urban planning</p>
            <img src={assets.ideaicon} alt="" />
          </div>
          <div className="card" onClick={() => handleCardClick("Brainstorm team bonding activities for our work retreat")}>
            <p>Brainstorm team bonding activities for our work retreat</p>
            <img src={assets.messageicon} alt="" />
          </div>
          <div className="card" onClick={() => handleCardClick("Improve the readability of the following code")}>
            <p>Improve the readability of the following code.</p>
            <img src={assets.codeicon} alt="" />
          </div>
        </div>

        {/* Chat messages scroll below cards */}
        <div className="ai-response-container">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`chat-msg-wrapper ${msg.type}`}>
              {msg.type === 'ai' && (
                <img
                  src={assets.geminiicon}
                  alt="Gemini"
                  className="gemini-icon"
                />
              )}
              <div className={`chat-msg ${msg.type}`}>
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="chat-msg-wrapper ai">
              <img src={assets.geminiicon} alt="" className="gemini-icon" />
              <div className="typing-multi-line full-width-lines">
                <hr className="typing-hr" />
                <hr className="typing-hr" />
                <hr className="typing-hr" />
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <div>
              <img src={assets.galleryicon} alt="" />
              <img src={assets.micicon} alt="" />
              <img
                src={assets.sendicon}
                alt=""
                onClick={() => handleSend()}
              />
            </div>
          </div>

          <p className="bottom-info">
            Gemini may display inaccurate info, including about people.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
