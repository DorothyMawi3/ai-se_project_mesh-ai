const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export type KnowledgeDoc = {
  _id: string;
  title: string;
  fileName: string;
  userId: string;
  createdAt: string;
};

export type Chat = {
  _id: string;
  title: string;
  userId: string;
  createdAt: string;
};

export type Message = {
  _id: string;
  chatId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  error: { message: string } | null;
};

export const getDocuments = async (): Promise<ApiResponse<KnowledgeDoc[]>> => {
  await delay(700);
  return {
    success: true,
    data: [
      {
        _id: "1",
        title: "Code Review Guidelines",
        fileName: "code-review-guidelines.pdf",
        userId: "u1",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "2",
        title: "API Reference",
        fileName: "api-reference.pdf",
        userId: "u1",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "3",
        title: "Onboarding Guide",
        fileName: "onboarding-guide.pdf",
        userId: "u1",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "4",
        title: "Code of Conduct",
        fileName: "code_of_conduct.pdf",
        userId: "u1",
        createdAt: new Date().toISOString(),
      },
    ],
    error: null,
  };
};

export const getChats = async (): Promise<ApiResponse<Chat[]>> => {
  await delay(700);
  return {
    success: true,
    data: [
      {
        _id: 'chat-1',
        title: 'What is posthog',
        userId: 'u1',
        createdAt: new Date().toISOString(),
      },
      {
        _id: 'chat-2',
        title: 'Who are our users',
        userId: 'u1',
        createdAt: new Date().toISOString(),
      },
      {
        _id: 'chat-3',
        title: 'Marketing Hypothesis',
        userId: 'u1',
        createdAt: new Date().toISOString(),
      },
    ],
    error: null,
  };
};

export const createChat = async (title: string): Promise<ApiResponse<Chat>> => {
  await delay(500);
  return {
    success: true,
    data: {
      _id: Date.now().toString(),
      title,
      userId: 'local',
      createdAt: new Date().toISOString(),
    },
    error: null,
  };
};

export const getChat = async (
  id: string,
): Promise<ApiResponse<{ chat: Chat; messages: Message[] }>> => {
  await delay(700);

  return {
    success: true,
    data: {
      chat: {
        _id: id,
        title: 'Who are our users',
        userId: 'u1',
        createdAt: new Date().toISOString(),
      },
      messages: [
        {
          _id: 'm1',
          chatId: id,
          role: 'user',
          content: 'Who are our users?',
          createdAt: new Date().toISOString(),
        },
        {
          _id: 'm2',
          chatId: id,
          role: 'assistant',
          content:
            '**Our users** are early-stage product teams, marketers, and founders who need fast insight from uploaded documents.',
          createdAt: new Date().toISOString(),
        },
        {
          _id: 'm3',
          chatId: id,
          role: 'user',
          content: 'Can you summarize them?',
          createdAt: new Date().toISOString(),
        },
        {
          _id: 'm4',
          chatId: id,
          role: 'assistant',
          content:
            '### Summary\n\n- Product teams\n- Marketing teams\n- Startup founders\n\nThey use MeshAI to ask questions about their knowledge base.',
          createdAt: new Date().toISOString(),
        },
      ],
    },
    error: null,
  };
};

export const sendMessage = async (
  chatId: string,
  content: string,
): Promise<ApiResponse<Message>> => {
  await delay(1500);

  return {
    success: true,
    data: {
      _id: Date.now().toString(),
      chatId,
      role: 'assistant',
      content: `You asked: **${content}**\n\nThis is a mock assistant response.`,
      createdAt: new Date().toISOString(),
    },
    error: null,
  };
};
