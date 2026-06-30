import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './Chat.css';
import { createChat, getChat, getChats } from '../../utils/api';
import type { Chat as ChatType, Message } from '../../utils/api';

export default function Chat() {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chatsError, setChatsError] = useState<string | null>(null);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [messagesError, setMessagesError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getChats();
        setChats(res.data || []);
      } catch {
        setChatsError('Failed to load chats.');
      } finally {
        setIsLoadingChats(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (!activeChatId) return;

    const load = async () => {
      setMessages([]);
      setMessagesError('');
      setIsLoadingMessages(true);

      try {
        const res = await getChat(activeChatId);
        setMessages(res.data?.messages || []);
      } catch {
        setMessagesError('Failed to load messages.');
      } finally {
        setIsLoadingMessages(false);
      }
    };

    load();
  }, [activeChatId]);

  const handleCreateChat = async () => {
    const title = newChatTitle.trim() || 'New Chat';

    setIsCreatingChat(false);
    setNewChatTitle('');

    try {
      const res = await createChat(title);
      if (res.data) {
        setChats((prev) => [res.data!, ...prev]);
        setActiveChatId(res.data._id);
        setMessages([]);
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
        {!messagesError && !isLoadingMessages && !activeChatId && (
          <div className="chat__no-messages">
            <h2>No chats yet</h2>
            <p>Create a new chat or select one from the sidebar.</p>
            <button
              className="chat__empty-btn"
              type="button"
              onClick={() => setIsCreatingChat(true)}
            >
              + New Chat
            </button>
          </div>
        )}

        {!messagesError &&
          !isLoadingMessages &&
          activeChatId &&
          messages.length === 0 && (
            <div className="chat__no-messages">
              <h2>No messages yet</h2>
              <p>Ask your first question in this chat.</p>
            </div>
          )}

        {activeChatId && isLoadingMessages && (
          <p className="chat__no-messages">Loading messages…</p>
        )}

        {activeChatId && messagesError && (
          <div className="chat__error">
            <h2>Something went wrong</h2>
            <p>{messagesError}</p>
          </div>
        )}

        {activeChatId && !isLoadingMessages && !messagesError && messages.length > 0 && (
          <ul className="chat__messages">
            {messages.map((msg) => (
              <li
                key={msg._id}
                className={
                  msg.role === 'user'
                    ? 'chat__message chat__message_user'
                    : 'chat__message chat__message_assistant'
                }
              >
                {msg.role === 'assistant' ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  msg.content
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
