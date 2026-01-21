import { createContext, useState } from "react";
import { generateText } from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentChat =
    chats.find(chat => chat.id === currentChatId) || null;

  const startNewChat = () => {
    const newChat = {
      id: Date.now(),
      messages: []
    };
    setChats(prev => [...prev, newChat]);
    setCurrentChatId(newChat.id);
    return newChat.id;
  };

  const selectChat = (id) => {
    setCurrentChatId(id);
  };

  const onSent = async (prompt, retries = 2) => {
    if (!prompt.trim()) return;

    let chatId = currentChatId;

    // ✅ Ensure a chat always exists
    if (!chatId) {
      chatId = startNewChat();
    }

    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, { type: "user", text: prompt }]
            }
          : chat
      )
    );

    setLoading(true);

    const attempt = async (remainingRetries) => {
      try {
        const result = await generateText(prompt);
        const cleanResult = result
          .replace(/[#*]/g, "")
          .replace(/\n{2,}/g, "\n");

        setChats(prev =>
          prev.map(chat =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    { type: "ai", text: cleanResult }
                  ]
                }
              : chat
          )
        );

      } catch (error) {
        if (remainingRetries > 0) {
          return attempt(remainingRetries - 1);
        }

        const fallback =
          "Sorry, Gemini is currently overloaded. Please try again later.";

        setChats(prev =>
          prev.map(chat =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    { type: "ai", text: fallback }
                  ]
                }
              : chat
          )
        );
      }
    };

    await attempt(retries);
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
