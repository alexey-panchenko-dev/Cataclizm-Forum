import { Check, LogOut, MessageSquareText, Pencil, UserRound } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/app/store/useAppStore';
import { events as initialEvents } from '@/entities/disaster/model/events';
import { formatDate } from '@/shared/lib/formatDate';
import { useDocumentTitle } from '@/shared/lib/useDocumentTitle';
import './ProfilePage.css';

export function ProfilePage() {
  useDocumentTitle('Профиль');

  const [isEditing, setIsEditing] = useState(false);
  const profile = useAppStore((state) => state.profile);
  const comments = useAppStore((state) => state.comments);
  const customEvents = useAppStore((state) => state.customEvents);
  const saveProfile = useAppStore((state) => state.saveProfile);
  const clearProfile = useAppStore((state) => state.clearProfile);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    saveProfile({
      nickname: String(formData.get('nickname')),
      email: String(formData.get('email')),
    });
    setIsEditing(false);
  }

  if (profile) {
    const allEvents = [...initialEvents, ...customEvents];
    const userComments = comments.filter((comment) => comment.authorEmail === profile.email);

    return (
      <main className="profile-page">
        <section className="profile-summary">
          <div className="profile-avatar">
            <UserRound />
          </div>
          <p className="eyebrow">Личный профиль</p>
          <h1>{profile.nickname}</h1>
          <p>{profile.email}</p>
          <div className="preview-note">
            <Check size={16} /> Данные сохранены на этом устройстве
          </div>
          {isEditing ? (
            <form className="profile-edit-form" onSubmit={handleSubmit}>
              <label>
                Никнейм
                <input name="nickname" required minLength={2} defaultValue={profile.nickname} />
              </label>
              <label>
                Почта
                <input name="email" type="email" required defaultValue={profile.email} />
              </label>
              <div>
                <button type="submit">Сохранить</button>
                <button type="button" onClick={() => setIsEditing(false)}>Отмена</button>
              </div>
            </form>
          ) : (
            <div className="profile-actions">
              <button type="button" onClick={() => setIsEditing(true)}>
                <Pencil size={14} /> Изменить данные
              </button>
              <button type="button" onClick={clearProfile}>
                <LogOut size={15} /> Выйти из профиля
              </button>
            </div>
          )}
        </section>

        <section className="profile-history">
          <header>
            <div>
              <p className="eyebrow">История активности</p>
              <h2>Ваши комментарии</h2>
            </div>
            <span>{userComments.length} записей</span>
          </header>

          {userComments.length > 0 ? (
            <div className="profile-comments">
              {userComments.map((comment) => {
                const event = allEvents.find((item) => item.id === comment.eventId);

                return (
                  <Link
                    key={comment.id}
                    to={`/events/${comment.eventId}?comment=${comment.id}`}
                  >
                    <span>{event?.title ?? 'Событие'}</span>
                    <p>{comment.text}</p>
                    <time>{formatDate(comment.createdAt)}</time>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="profile-history__empty">
              <MessageSquareText />
              <p>Вы пока не оставляли комментариев.</p>
              <Link to="/events">Перейти к событиям</Link>
            </div>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="registration">
      <section className="registration__copy">
        <p className="eyebrow">Личный профиль</p>
        <h1>Ваш голос в общем архиве.</h1>
        <p>
          Профиль нужен, чтобы оставлять комментарии, добавлять события и публиковать
          материалы. Данные сохраняются только на вашем устройстве.
        </p>
      </section>

      <section className="registration__form-wrap">
        <div className="form-number">01 / регистрация</div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nickname">
            Никнейм
            <input
              id="nickname"
              name="nickname"
              required
              minLength={2}
              placeholder="Как к вам обращаться"
            />
          </label>
          <label htmlFor="email">
            Электронная почта
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="name@example.com"
            />
          </label>
          <label className="consent">
            <input type="checkbox" required />
            Я понимаю, что данные будут храниться на этом устройстве.
          </label>
          <button className="form-submit" type="submit">
            Создать профиль
          </button>
        </form>
      </section>
    </main>
  );
}
