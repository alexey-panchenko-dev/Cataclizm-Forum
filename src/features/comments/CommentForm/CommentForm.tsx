import { Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/app/store/useAppStore';
import './CommentForm.css';

type CommentFormProps = {
  eventId: string;
};

export function CommentForm({ eventId }: CommentFormProps) {
  const [text, setText] = useState('');
  const profile = useAppStore((state) => state.profile);
  const addComment = useAppStore((state) => state.addComment);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!profile || !text.trim()) return;

    addComment({
      eventId,
      author: profile.nickname,
      authorEmail: profile.email,
      text: text.trim(),
    });
    setText('');
  }

  if (!profile) {
    return (
      <div className="comment-login-note">
        Чтобы оставить комментарий, сначала <Link to="/profile">создайте профиль</Link>.
      </div>
    );
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <label htmlFor="comment-text">Ваш комментарий</label>
      <textarea
        id="comment-text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        required
        minLength={3}
        placeholder="Расскажите о своём опыте или поделитесь важной информацией"
      />
      <div>
        <span>От имени: {profile.nickname}</span>
        <button type="submit">
          Опубликовать <Send size={15} />
        </button>
      </div>
    </form>
  );
}
