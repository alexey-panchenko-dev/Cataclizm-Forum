import { ArrowLeft, ExternalLink, MessageSquareText, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppStore } from '@/app/store/useAppStore';
import { events as initialEvents } from '@/entities/disaster/model/events';
import { CommentForm } from '@/features/comments/CommentForm/CommentForm';
import { formatDate } from '@/shared/lib/formatDate';
import { useDocumentTitle } from '@/shared/lib/useDocumentTitle';
import './EventDetailsPage.css';

export function EventDetailsPage() {
  const { eventId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [highlightedCommentId, setHighlightedCommentId] = useState<string | null>(null);
  const customEvents = useAppStore((state) => state.customEvents);
  const comments = useAppStore((state) => state.comments);
  const profile = useAppStore((state) => state.profile);
  const removeEvent = useAppStore((state) => state.removeEvent);
  const removeComment = useAppStore((state) => state.removeComment);

  const event = [...initialEvents, ...customEvents].find((item) => item.id === eventId);
  const eventComments = useMemo(
    () => comments.filter((comment) => comment.eventId === eventId),
    [comments, eventId],
  );
  const commentFromProfile = searchParams.get('comment');
  useDocumentTitle(event?.title ?? 'Событие не найдено');

  useEffect(() => {
    if (!commentFromProfile || !eventComments.some((item) => item.id === commentFromProfile)) {
      return;
    }

    setHighlightedCommentId(commentFromProfile);
    document.getElementById(`comment-${commentFromProfile}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    const timeout = window.setTimeout(() => setHighlightedCommentId(null), 3000);
    return () => window.clearTimeout(timeout);
  }, [commentFromProfile, eventComments]);

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
        <div className="event-details__actions">
          <span>{event.category}</span>
          {event.creatorEmail === profile?.email && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Удалить это событие и все его комментарии?')) {
                  removeEvent(event.id);
                  navigate('/events');
                }
              }}
            >
              <Trash2 size={13} /> Удалить
            </button>
          )}
        </div>
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
          {event.sourceUrl ? (
            <a href={event.sourceUrl} target="_blank" rel="noreferrer">
              {event.sourceName} <ExternalLink size={13} />
            </a>
          ) : (
            <strong>{event.sourceName}</strong>
          )}
        </aside>
      </header>

      <section className="event-details__content">
        <article>
          <p className="eyebrow">О событии</p>
          <p className="lead-text">{event.description}</p>
        </article>

        <aside className="timeline">
          <p className="eyebrow">Хронология</p>
          {event.timeline.length > 0 ? (
            event.timeline.map((item) => (
              <div key={`${item.time}-${item.text}`}>
                <time>{item.time}</time>
                <p>{item.text}</p>
              </div>
            ))
          ) : (
            <p className="timeline__empty">Для этого события отдельная хронология не указана.</p>
          )}
        </aside>
      </section>

      <section className="comments">
        <div className="comments__heading">
          <div>
            <p className="eyebrow">Личные свидетельства</p>
            <h2>Комментарии</h2>
          </div>
          <span>{eventComments.length} записей</span>
        </div>

        <CommentForm eventId={event.id} />

        {eventComments.length > 0 ? (
          <div className="comments__list">
            {eventComments.map((comment) => (
              <article
                id={`comment-${comment.id}`}
                key={comment.id}
                className={
                  highlightedCommentId === comment.id
                    ? 'comment-card comment-card--highlighted'
                    : 'comment-card'
                }
              >
                <header>
                  <div>
                    <strong>{comment.author}</strong>
                    <time>{formatDate(comment.createdAt)}</time>
                  </div>
                  {comment.authorEmail === profile?.email && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Удалить комментарий?')) {
                          removeComment(comment.id);
                        }
                      }}
                      aria-label="Удалить комментарий"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </header>
                <p>{comment.text}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="comments__empty">
            <MessageSquareText />
            <h3>Здесь пока нет комментариев</h3>
            <p>Вы можете оставить первое свидетельство об этом событии.</p>
          </div>
        )}
      </section>
    </main>
  );
}
