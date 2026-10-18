import type { LucideIcon } from 'lucide-react';
import './EmptyState.css';

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  text: string;
  action: string;
};

export function EmptyState({ icon: Icon, title, text, action }: EmptyStateProps) {
  return (
    <section className="empty-state">
      <Icon size={28} />
      <h2>{title}</h2>
      <p>{text}</p>
      <button type="button" disabled>
        {action}
      </button>
      <small>Добавление станет доступно на следующем этапе</small>
    </section>
  );
}
