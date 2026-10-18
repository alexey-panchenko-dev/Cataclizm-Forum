import { Navigate, Route, Routes } from 'react-router-dom';
import { EventDetailsPage } from '@/pages/EventDetailsPage/EventDetailsPage';
import { EventsPage } from '@/pages/EventsPage/EventsPage';
import { HomePage } from '@/pages/HomePage/HomePage';
import { ProfilePage } from '@/pages/ProfilePage/ProfilePage';
import { RequestsPage } from '@/pages/RequestsPage/RequestsPage';
import { SupportPage } from '@/pages/SupportPage/SupportPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:eventId" element={<EventDetailsPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/requests" element={<RequestsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
