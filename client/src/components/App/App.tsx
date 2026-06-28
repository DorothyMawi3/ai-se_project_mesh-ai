import './App.css';
import AppLayout from '../AppLayout/AppLayout';
import Intro from '../../pages/Intro/Intro';
import Chat from '../../pages/Chat/Chat';
import KnowledgeBase from '../../pages/KnowledgeBase/KnowledgeBase';

function App() {
  return (
    <div className="app">
      <AppLayout>
        <Intro />
        <KnowledgeBase />
        <Chat />
      </AppLayout>
    </div>
  );
}

export default App;
