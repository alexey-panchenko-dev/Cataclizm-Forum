import { Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/app/store/useAppStore';
import { events as initialEvents } from '@/entities/disaster/model/events';
import { EventCard } from '@/entities/disaster/ui/EventCard';
import { CreateEventModal } from '@/features/events/CreateEventModal/CreateEventModal';
import './EventsPage.css';

export function EventsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Все категории');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const profile = useAppStore((state) => state.profile);
  const customEvents = useAppStore((state) => state.customEvents);

  const allEvents = useMemo(
    () => [...initialEvents, ...customEvents],
    [customEvents],
  );

  const categories = useMemo(
    () => ['Все категории', ...new Set(allEvents.map((event) => event.category))],
    [allEvents],
  );

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return allEvents.filter((event) => {
      const matchesCategory = category === 'Все категории' || event.category === category;
      const searchableText = `${event.title} ${event.country} ${event.location}`.toLowerCase();
      return matchesCategory && searchableText.includes(normalizedQuery);
    });
  }, [allEvents, category, query]);

  function openCreateEvent() {
    if (!profile) {
      navigate('/profile');
      return;
    }

    setIsModalOpen(true);
  }

  return (
    <main className="page-shell">
      <header className="events-header">
        <div>
          <p className="eyebrow">Архив / {allEvents.length} событий</p>
          <h1>
            Катастрофы,
            <br />
            которые помнят.
          </h1>
          <p>
            Подтверждённые сведения о реальных событиях и место для личных свидетельств.
          </p>
        </div>
        <button className="secondary-button" type="button" onClick={openCreateEvent}>
          <Plus size={17} /> Добавить событие
        </button>
      </header>

      <div className="catalog-tools">
        <label className="catalog-search">
          <Search size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Поиск по названию, стране или месту"
          />
        </label>
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      {filteredEvents.length > 0 ? (
        <section className="event-grid">
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </section>
      ) : (
        <div className="catalog-empty">По вашему запросу ничего не найдено.</div>
      )}

      {isModalOpen && <CreateEventModal onClose={() => setIsModalOpen(false)} />}
    </main>
  );
}
