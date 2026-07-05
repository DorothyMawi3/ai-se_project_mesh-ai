import { useNavigate } from 'react-router-dom';
import './Intro.css';

const cards = [
  {
    className: 'intro__card-icon intro__card-icon_document',
    text: 'Bring all your documents into one secure AI workspace',
  },
  {
    className: 'intro__card-icon intro__card-icon_folder',
    text: 'Organize and manage the documents that power your AI',
  },
  {
    className: 'intro__card-icon intro__card-icon_sparkle',
    text: 'Your knowledge base, accessible through a simple chat interface',
  },
];

export default function Intro() {
  const navigate = useNavigate();

  return (
    <main className="intro">
      <section className="intro__content">
        <h1 className="intro__title">
          Welcome to Mesh AI <span className="intro__logo-mark" />
        </h1>

        <ul className="intro__cards">
          {cards.map((card) => (
            <li className="intro__card" key={card.text}>
              <div className={card.className} />
              <p className="intro__card-text">{card.text}</p>
            </li>
          ))}
        </ul>

        <p className="intro__lead">
          Start by creating your Organization’s Knowledge Base
        </p>

        <button
          className="intro__button"
          type="button"
          onClick={() => navigate('/knowledge')}
        >
          Start
        </button>
      </section>
    </main>
  );
}
