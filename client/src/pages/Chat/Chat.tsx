import { useEffect, useState } from 'react';
import './Chat.css';
import { createChat, getChats } from '../../utils/api';
import type { Chat as ChatType } from '../../utils/api';

export default function Chat() {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chatsError, setChatsError] = useState<string | null>(null);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getChats();
        setChats(res.data || []);
        setActiveChatId(res.data?.[0]?._id || null);
      } catch {
        setChatsError('Failed to load chats.');
      } finally {
        setIsLoadingChats(false);
      }
    };

    load();
  }, []);

  const handleCreateChat = async () => {
    const title = newChatTitle.trim() || 'New Chat';
    setIsCreatingChat(false);
    setNewChatTitle('');

    try {
      const res = await createChat(title);
      if (res.data) {
        setChats((prev) => [res.data!, ...prev]);
        setActiveChatId(res.data._id);
      }
    } catch {
      setChatsError('Failed to create chat.');
    }
  };

  return (
    <div className="chat">
      <aside className="chat__sidebar">
        <button
          className="chat__new-btn"
          type="button"
          onClick={() => setIsCreatingChat(true)}
        >
          + New Chat
        </button>

        {isCreatingChat && (
          <input
            className="chat__title-input"
            type="text"
            placeholder="Chat name"
            value={newChatTitle}
            onChange={(e) => setNewChatTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateChat();
              if (e.key === 'Escape') {
                setIsCreatingChat(false);
                setNewChatTitle('');
              }
            }}
            autoFocus
          />
        )}

        {isLoadingChats && <p className="chat__sidebar-message">Loading…</p>}
        {chatsError && <p className="chat__sidebar-message">{chatsError}</p>}

        <ul className="chat__list">
          {chats.map((chat) => (
            <li key={chat._id}>
              <button
                className={`chat__item ${
                  activeChatId === chat._id ? 'chat__item_active' : ''
                }`}
                type="button"
                onClick={() => setActiveChatId(chat._id)}
              >
                {chat.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="chat__main">
        <p className="chat__main-placeholder">
          Select a chat to start asking questions.
        </p>
      </div>
    </div>
  );
}
