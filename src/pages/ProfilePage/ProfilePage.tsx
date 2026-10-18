import { Check, UserRound } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import './ProfilePage.css';

type PreviewProfile = {
  nickname: string;
  email: string;
};

export function ProfilePage() {
  const [profile, setProfile] = useState<PreviewProfile | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nickname = formData.get('nickname');
    const email = formData.get('email');

    if (typeof nickname === 'string' && typeof email === 'string') {
      setProfile({ nickname, email });
    }
  }

  if (profile) {
    return (
      <main className="page-shell profile-preview">
        <div className="profile-avatar">
          <UserRound />
        </div>
        <p className="eyebrow">Профиль текущего сеанса</p>
        <h1>{profile.nickname}</h1>
        <p>{profile.email}</p>
        <div className="preview-note">
          <Check size={16} />
          На первом этапе профиль сохраняется только до перезагрузки страницы.
        </div>
      </main>
    );
  }

  return (
    <main className="registration">
      <section className="registration__copy">
        <p className="eyebrow">Личный профиль</p>
        <h1>Ваш голос в общем архиве.</h1>
        <p>
          Профиль нужен, чтобы оставлять комментарии, сохранять события и добавлять материалы.
          На следующем этапе данные будут сохраняться на этом устройстве.
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
