import { ArrowLeft, ExternalLink, MessageSquareText } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getEventById } from '@/entities/disaster/model/events';
import './EventDetailsPage.css';

export function EventDetailsPage() {
  const { eventId = '' } = useParams();
  const event = getEventById(eventId);

  if (!event) {
    return (
      <main className="page-shell not-found">
        <p className="eyebrow">Ошибка 404</p>
        <h1>Событие не найдено</h1>
        <Link to="/events">Вернуться в каталог</Link>
      </main>
    );
  }

  return (
    <main className="event-details">
      <div className="event-details__top">
        <Link to="/events">
          <ArrowLeft size={16} /> Все события
        </Link>
        <span>{event.category}</span>
      </div>

      <header className="event-details__hero">
        <div>
          <p className="eyebrow">
            {event.date} · {event.country}
          </p>
          <h1>{event.title}</h1>
          <p>{event.summary}</p>
        </div>
        <aside>
          <span>Место</span>
          <strong>{event.location}</strong>
          <span>Источник</span>
          <a href={event.sourceUrl} target="_blank" rel="noreferrer">
            {event.sourceName} <ExternalLink size={13} />
          </a>
        </aside>
      </header>

      <section className="event-details__content">
        <article>
          <p className="eyebrow">О событии</p>
          <p className="lead-text">{event.description}</p>
        </article>
        <aside className="timeline">
          <p className="eyebrow">Хронология</p>
          {event.timeline.map((item) => (
            <div key={`${item.time}-${item.text}`}>
              <time>{item.time}</time>
              <p>{item.text}</p>
            </div>
          ))}
        </aside>
      </section>

      <section className="comments">
        <div className="comments__heading">
          <div>
            <p className="eyebrow">Личные свидетельства</p>
            <h2>Комментарии</h2>
          </div>
          <span>0 записей</span>
        </div>
        <div className="comments__empty">
          <MessageSquareText />
          <h3>Здесь пока нет комментариев</h3>
          <p>
            После регистрации пользователь сможет оставить первое свидетельство об этом
            событии.
          </p>
          <Link to="/profile">Перейти к регистрации</Link>
        </div>
      </section>
    </main>
  );
}
