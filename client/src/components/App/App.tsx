import './App.css';
import { Route, Routes } from 'react-router-dom';
import AppLayout from '../AppLayout/AppLayout';
import Intro from '../../pages/Intro/Intro';
import Chat from '../../pages/Chat/Chat';
import KnowledgeBase from '../../pages/KnowledgeBase/KnowledgeBase';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route element={<AppLayout />}>
        <Route path="/chat" element={<Chat />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
      </Route>
    </Routes>
  );
}

export default App;
