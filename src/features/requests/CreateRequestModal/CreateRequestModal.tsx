import type { FormEvent } from 'react';
import { useAppStore } from '@/app/store/useAppStore';
import { Modal } from '@/shared/ui/Modal/Modal';

export function CreateRequestModal({ onClose }: { onClose: () => void }) {
  const profile = useAppStore((state) => state.profile);
  const addHelpRequest = useAppStore((state) => state.addHelpRequest);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile) return;

    const form = new FormData(event.currentTarget);
    addHelpRequest({
      title: String(form.get('title')),
      type: String(form.get('type')) as 'Нужна помощь' | 'Могу помочь',
      contact: String(form.get('contact')),
      description: String(form.get('description')),
      author: profile.nickname,
    });
    onClose();
  }

  return (
    <Modal eyebrow="Локальная доска" title="Создать запрос" onClose={onClose}>
      <form className="data-form" onSubmit={handleSubmit}>
        <label className="full-width">
          Заголовок
          <input name="title" required placeholder="Коротко опишите запрос" />
        </label>
        <label>
          Тип записи
          <select name="type" required>
            <option>Нужна помощь</option>
            <option>Могу помочь</option>
          </select>
        </label>
        <label>
          Контакт
          <input name="contact" required placeholder="Как с вами связаться" />
        </label>
        <label className="full-width">
          Описание
          <textarea name="description" required placeholder="Расскажите подробнее" />
        </label>
        <button className="data-form__submit" type="submit">Опубликовать</button>
      </form>
    </Modal>
  );
}
