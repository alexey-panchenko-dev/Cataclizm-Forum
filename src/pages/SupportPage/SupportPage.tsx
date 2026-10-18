import { HeartHandshake, Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/app/store/useAppStore';
import { CreateSupportModal } from '@/features/support/CreateSupportModal/CreateSupportModal';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState';
import { EntryCard } from '@/shared/ui/EntryCard/EntryCard';

export function SupportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const profile = useAppStore((state) => state.profile);
  const resources = useAppStore((state) => state.supportResources);

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
          <p className="eyebrow">Полезные материалы</p>
          <h1>Центр поддержки</h1>
          <p>
            Контакты, инструкции и организации, которые пользователи добавляют
            самостоятельно.
          </p>
        </header>
        {resources.length > 0 && (
          <button className="secondary-button" type="button" onClick={openForm}>
            <Plus size={17} /> Добавить материал
          </button>
        )}
      </div>

      {resources.length > 0 ? (
        <section className="entry-grid">
          {resources.map((resource) => (
            <EntryCard
              key={resource.id}
              label={resource.category}
              title={resource.title}
              text={resource.description}
              meta={resource.contact}
            />
          ))}
        </section>
      ) : (
        <EmptyState
          icon={HeartHandshake}
          title="Материалов пока нет"
          text="Добавьте контакт психологической, медицинской, юридической или волонтёрской помощи."
          action="Добавить материал"
          onAction={openForm}
        />
      )}

      {isModalOpen && <CreateSupportModal onClose={() => setIsModalOpen(false)} />}
    </main>
  );
}
