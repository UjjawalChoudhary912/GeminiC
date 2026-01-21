import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentChat = chats.find(chat => chat.id === currentChatId) || null;

  // Start a new chat
  const startNewChat = () => {
    const newChat = { id: Date.now(), messages: [] };
    setChats(prev => [...prev, newChat]);
    setCurrentChatId(newChat.id);
    return newChat.id;
  };

  // Select existing chat
  const selectChat = (id) => {
    setCurrentChatId(id);
  };

  // Send prompt (from input or card)
  const onSent = async (prompt) => {
    if (!prompt.trim()) return;

    let chatId = currentChatId;

    if (!chatId) {
      chatId = startNewChat();
    }

    // Add user message
    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, { type: "user", text: prompt }] }
          : chat
      )
    );

    setLoading(true);

    // Fake AI response (you can replace this with actual API later)
    await new Promise(res => setTimeout(res, 700)); // simulate delay
    const fakeResponse = `Gemini says: "${prompt}"`;

    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, { type: "ai", text: fakeResponse }] }
          : chat
      )
    );

    setLoading(false);
  };

  return (
    <Context.Provider
      value={{
        chats,
        currentChat,
        loading,
        onSent,
        startNewChat,
        selectChat
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
