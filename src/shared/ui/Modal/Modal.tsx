import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import './Modal.css';

type ModalProps = {
  title: string;
  eyebrow: string;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ title, eyebrow, children, onClose }: ModalProps) {
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
