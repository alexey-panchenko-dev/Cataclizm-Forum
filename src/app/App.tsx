import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@/app/router/AppRouter';
import { SiteFooter } from '@/widgets/SiteFooter/SiteFooter';
import { SiteHeader } from '@/widgets/SiteHeader/SiteHeader';

export function App() {
  return (
    <BrowserRouter>
      <div className="site">
        <SiteHeader />
        <AppRouter />
        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}
