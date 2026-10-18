import { Plus, Search } from 'lucide-react';
import { events } from '@/entities/disaster/model/events';
import { EventCard } from '@/entities/disaster/ui/EventCard';
import './EventsPage.css';

export function EventsPage() {
  return (
    <main className="page-shell">
      <header className="events-header">
        <div>
          <p className="eyebrow">Архив / {events.length} событий</p>
          <h1>
            Катастрофы,
            <br />
            которые помнят.
          </h1>
          <p>
            Подтверждённые сведения о реальных событиях и место для будущих личных
            свидетельств.
          </p>
        </div>
        <button className="secondary-button" type="button" disabled>
          <Plus size={17} /> Добавить событие
        </button>
      </header>

      <div className="catalog-tools">
        <Search size={17} />
        <span>Поиск и фильтры появятся на следующем этапе</span>
      </div>

      <section className="event-grid">
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </section>
    </main>
  );
}
