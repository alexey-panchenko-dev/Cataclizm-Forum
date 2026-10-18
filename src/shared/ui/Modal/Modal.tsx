import { X } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import './Modal.css';

type ModalProps = {
  title: string;
  eyebrow: string;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ title, eyebrow, children, onClose }: ModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="modal__header">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id="modal-title">{title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Закрыть окно">
            <X />
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}
