import './App.css';
import AppLayout from '../AppLayout/AppLayout';
import KnowledgeBase from '../../pages/KnowledgeBase/KnowledgeBase';

function App() {
  return (
    <div className="app">
      <AppLayout>
        <KnowledgeBase />
      </AppLayout>
    </div>
  );
}

export default App;
