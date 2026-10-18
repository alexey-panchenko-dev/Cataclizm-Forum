import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { DisasterEvent } from '@/entities/disaster/model/types';
import './EventCard.css';

type EventCardProps = {
  event: DisasterEvent;
  index: number;
};

export function EventCard({ event, index }: EventCardProps) {
  const cardNumber = String(index + 1).padStart(2, '0');

  return (
    <article className="event-card">
      <div className="event-card__visual">
        <span>{cardNumber}</span>
        <strong>{event.year}</strong>
        <small>{event.category}</small>
      </div>

      <div className="event-card__body">
        <div className="event-card__meta">
          <span>{event.date}</span>
          <span>{event.country}</span>
        </div>
        <h2>{event.title}</h2>
        <p>{event.summary}</p>
        <Link to={`/events/${event.id}`}>
          Открыть событие <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
