import './App.css';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '../AppLayout/AppLayout';
import Intro from '../../pages/Intro/Intro';
import Chat from '../../pages/Chat/Chat';
import KnowledgeBase from '../../pages/KnowledgeBase/KnowledgeBase';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
