import type { FormEvent } from 'react';
import { useAppStore } from '@/app/store/useAppStore';
import { Modal } from '@/shared/ui/Modal/Modal';

export function CreateSupportModal({ onClose }: { onClose: () => void }) {
  const profile = useAppStore((state) => state.profile);
  const addSupportResource = useAppStore((state) => state.addSupportResource);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile) return;

    const form = new FormData(event.currentTarget);
    addSupportResource({
      title: String(form.get('title')),
      category: String(form.get('category')),
      contact: String(form.get('contact')),
      description: String(form.get('description')),
      creatorEmail: profile.email,
    });
    onClose();
  }

  return (
    <Modal eyebrow="Полезный контакт" title="Добавить материал" onClose={onClose}>
      <form className="data-form" onSubmit={handleSubmit}>
        <label className="full-width">
          Название
          <input name="title" required placeholder="Название организации или материала" />
        </label>
        <label>
          Категория
          <select name="category" required defaultValue="">
            <option value="" disabled>Выберите категорию</option>
            <option>Психологическая помощь</option>
            <option>Медицинская помощь</option>
            <option>Юридическая помощь</option>
            <option>Волонтёрство</option>
            <option>Другое</option>
          </select>
        </label>
        <label>
          Контакт
          <input name="contact" required placeholder="Телефон, адрес или сайт" />
        </label>
        <label className="full-width">
          Описание
          <textarea name="description" required placeholder="Чем этот материал может помочь" />
        </label>
        <button className="data-form__submit" type="submit">Добавить материал</button>
      </form>
    </Modal>
  );
}
