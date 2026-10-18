import type { LucideIcon } from 'lucide-react';
import './EmptyState.css';

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  text: string;
  action: string;
  onAction?: () => void;
};

export function EmptyState({ icon: Icon, title, text, action, onAction }: EmptyStateProps) {
  return (
    <section className="empty-state">
      <Icon size={28} />
      <h2>{title}</h2>
      <p>{text}</p>
      <button type="button" disabled={!onAction} onClick={onAction}>
        {action}
      </button>
      {!onAction && <small>Сначала создайте профиль</small>}
    </section>
  );
}
