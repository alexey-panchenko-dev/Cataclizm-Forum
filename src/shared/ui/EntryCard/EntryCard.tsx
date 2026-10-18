import type { ReactNode } from 'react';
import './EntryCard.css';

type EntryCardProps = {
  label: string;
  title: string;
  text: string;
  meta: ReactNode;
};

export function EntryCard({ label, title, text, meta }: EntryCardProps) {
  return (
    <article className="entry-card">
      <span className="entry-card__label">{label}</span>
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="entry-card__meta">{meta}</div>
    </article>
  );
}
