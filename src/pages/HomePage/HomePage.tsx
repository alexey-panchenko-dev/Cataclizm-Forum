import { ArrowUpRight, BookOpen, HeartHandshake, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const steps = [
  {
    icon: BookOpen,
    title: 'Найдите событие',
    text: 'Откройте каталог реальных катастроф и изучите подтверждённую информацию.',
  },
  {
    icon: HeartHandshake,
    title: 'Поделитесь опытом',
    text: 'Создайте профиль и оставьте собственное свидетельство на странице события.',
  },
  {
    icon: UserRound,
    title: 'Сохраните важное',
    text: 'Позже здесь появятся личная история, сохранённые события и полезные материалы.',
  },
];

export function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">Память · поддержка · свидетельства</p>
          <h1>Здесь собрана информация о крупных катастрофах и людях, которые их пережили.</h1>
          <p className="hero__text">
            «После катастрофы» — пространство для людей, переживших крупные события, их
            близких, свидетелей и тех, кто готов помочь. Здесь сохраняются факты, личные
            голоса и полезная информация.
          </p>
          <Link className="primary-link" to="/events">
            Посмотреть события <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="hero-document" aria-label="Архивная карточка проекта">
          <div className="hero-document__top">
            <span>АРХИВ / 001</span>
            <span>ОТКРЫТ</span>
          </div>
          <div className="hero-document__title">
            <span>После</span>
            <strong>катастрофы</strong>
          </div>
          <div className="hero-document__sections">
            <span>Истории</span>
            <span>События</span>
            <span>Поддержка</span>
          </div>
        </div>

        <div className="scroll-note">
          <span>01</span> Листайте, чтобы узнать больше
        </div>
      </section>

      <section className="how-it-works">
        <div className="section-heading">
          <p className="eyebrow">Как работает платформа</p>
          <h2>
            Один общий архив.
            <br />
            Множество личных историй.
          </h2>
        </div>

        <div className="steps-grid">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <Link className="archive-callout" to="/events">
          <div>
            <p className="eyebrow">Архив событий</p>
            <h2>Реальные события и истории людей</h2>
          </div>
          <span>
            Открыть каталог <ArrowUpRight />
          </span>
        </Link>
      </section>
    </main>
  );
}
