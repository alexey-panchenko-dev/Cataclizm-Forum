import { Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';
import './EntryCard.css';

type EntryCardProps = {
  label: string;
  title: string;
  text: string;
  meta: ReactNode;
  onDelete?: () => void;
};

export function EntryCard({ label, title, text, meta, onDelete }: EntryCardProps) {
  return (
    <article className="entry-card">
      <span className="entry-card__label">{label}</span>
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="entry-card__meta">
        <span>{meta}</span>
        {onDelete && (
          <button type="button" onClick={onDelete} aria-label={`Удалить: ${title}`}>
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </article>
  );
}
