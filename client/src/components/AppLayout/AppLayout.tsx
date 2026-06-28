import './AppLayout.css';
import Header from '../Header/Header';

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-layout__main">{children}</main>
    </div>
  );
}
