import { HandHelping, Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/app/store/useAppStore';
import { CreateRequestModal } from '@/features/requests/CreateRequestModal/CreateRequestModal';
import { formatDate } from '@/shared/lib/formatDate';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState';
import { EntryCard } from '@/shared/ui/EntryCard/EntryCard';
import { useDocumentTitle } from '@/shared/lib/useDocumentTitle';

export function RequestsPage() {
  useDocumentTitle('Запросы о помощи');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const profile = useAppStore((state) => state.profile);
  const requests = useAppStore((state) => state.helpRequests);
  const removeRequest = useAppStore((state) => state.removeHelpRequest);

  function openForm() {
    if (!profile) {
      navigate('/profile');
      return;
    }
    setIsModalOpen(true);
  }

  return (
    <main className="page-shell">
      <div className="content-page-header">
        <header className="simple-page-header">
          <p className="eyebrow">Локальная доска</p>
          <h1>Запросы о помощи</h1>
          <p>Здесь можно попросить о помощи или предложить её другим пользователям.</p>
        </header>
        {requests.length > 0 && (
          <button className="secondary-button" type="button" onClick={openForm}>
            <Plus size={17} /> Создать запрос
          </button>
        )}
      </div>

      {requests.length > 0 ? (
        <section className="entry-grid">
          {requests.map((request) => (
            <EntryCard
              key={request.id}
              label={request.type}
              title={request.title}
              text={request.description}
              meta={`${request.author} · ${request.contact} · ${formatDate(request.createdAt)}`}
              onDelete={
                profile?.email === request.authorEmail
                  ? () => {
                      if (window.confirm('Удалить этот запрос?')) {
                        removeRequest(request.id);
                      }
                    }
                  : undefined
              }
            />
          ))}
        </section>
      ) : (
        <EmptyState
          icon={HandHelping}
          title="Запросов пока нет"
          text="Опубликуйте просьбу о помощи или расскажите, чем можете помочь другим."
          action="Создать запрос"
          onAction={openForm}
        />
      )}

      {isModalOpen && <CreateRequestModal onClose={() => setIsModalOpen(false)} />}
    </main>
  );
}
