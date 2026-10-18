import { HeartHandshake } from 'lucide-react';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState';

export function SupportPage() {
  return (
    <main className="page-shell">
      <header className="simple-page-header">
        <p className="eyebrow">Полезные материалы</p>
        <h1>Центр поддержки</h1>
        <p>
          Контакты, инструкции и организации, которые пользователи смогут добавлять
          самостоятельно.
        </p>
      </header>
      <EmptyState
        icon={HeartHandshake}
        title="Материалов пока нет"
        text="Здесь появятся контакты психологической, медицинской, юридической и волонтёрской помощи."
        action="Добавить материал"
      />
    </main>
  );
}
