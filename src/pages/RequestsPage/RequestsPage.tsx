import { HandHelping } from 'lucide-react';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState';

export function RequestsPage() {
  return (
    <main className="page-shell">
      <header className="simple-page-header">
        <p className="eyebrow">Локальная доска</p>
        <h1>Запросы о помощи</h1>
        <p>
          Запросы, предложения помощи и поиск информации. Записи будут храниться только на
          текущем устройстве.
        </p>
      </header>
      <EmptyState
        icon={HandHelping}
        title="Запросов пока нет"
        text="После создания профиля здесь можно будет опубликовать первый запрос или предложение помощи."
        action="Создать запрос"
      />
    </main>
  );
}
