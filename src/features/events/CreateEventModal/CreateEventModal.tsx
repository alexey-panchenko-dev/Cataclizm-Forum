import type { FormEvent } from 'react';
import { useAppStore } from '@/app/store/useAppStore';
import { Modal } from '@/shared/ui/Modal/Modal';

type CreateEventModalProps = {
  onClose: () => void;
};

function parseTimeline(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [time, ...textParts] = line.split('—');
      return {
        time: textParts.length > 0 ? time.trim() : String(index + 1),
        text: textParts.length > 0 ? textParts.join('—').trim() : time.trim(),
      };
    });
}

export function CreateEventModal({ onClose }: CreateEventModalProps) {
  const profile = useAppStore((state) => state.profile);
  const addEvent = useAppStore((state) => state.addEvent);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const dateValue = String(form.get('date'));

    if (!profile) return;

    addEvent({
      id: `event-${Date.now()}`,
      title: String(form.get('title')),
      date: new Date(`${dateValue}T00:00:00`).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      year: dateValue.slice(0, 4),
      location: String(form.get('location')),
      country: String(form.get('country')),
      category: String(form.get('category')),
      summary: String(form.get('summary')),
      description: String(form.get('description')),
      sourceName: String(form.get('sourceName') || 'Добавлено пользователем'),
      sourceUrl: String(form.get('sourceUrl') || ''),
      timeline: parseTimeline(String(form.get('timeline') || '')),
      creatorEmail: profile.email,
    });

    onClose();
  }

  return (
    <Modal eyebrow="Новое событие" title="Добавить катастрофу" onClose={onClose}>
      <form className="data-form" onSubmit={handleSubmit}>
        <label className="full-width">
          Название
          <input name="title" required placeholder="Название события" />
        </label>
        <label>
          Дата
          <input name="date" type="date" required />
        </label>
        <label>
          Категория
          <input name="category" required placeholder="Например, землетрясение" />
        </label>
        <label>
          Страна
          <input name="country" required placeholder="Страна или несколько стран" />
        </label>
        <label>
          Место
          <input name="location" required placeholder="Город или регион" />
        </label>
        <label className="full-width">
          Краткое описание
          <textarea name="summary" required placeholder="Коротко о том, что произошло" />
        </label>
        <label className="full-width">
          Полное описание
          <textarea name="description" required placeholder="Подробности события" />
        </label>
        <label className="full-width">
          Хронология
          <textarea
            name="timeline"
            placeholder={'Каждое событие с новой строки. Например:\n08:30 — началась эвакуация'}
          />
        </label>
        <label>
          Название источника
          <input name="sourceName" placeholder="Необязательно" />
        </label>
        <label>
          Ссылка на источник
          <input name="sourceUrl" type="url" placeholder="https://..." />
        </label>
        <button className="data-form__submit" type="submit">
          Добавить событие
        </button>
      </form>
    </Modal>
  );
}
