import { Link, Outlet } from 'react-router';
import Footer from '../../components/Footer';
import { Button } from '../../shadcn/ui/button';
import { ModeToggle } from '../../shadcn/ui/theme-toggle';
import { OpenAPI } from '../../api/client';

export function RootLayout() {
  return (
    <div className="container relative">
      <header className="flex items-center justify-between py-4">
        <div className="text-6xl font-bold text-primary">
          <Link to="/app/">DWMan</Link>
        </div>
        <div className="flex gap-x-3">
          <Button asChild>
            <Link to="/app/user/demo_user">Layout Demo</Link>
          </Button>
          <Button asChild>
            <Link to="/app/help">Help</Link>
          </Button>
          <Button asChild>
            <Link to={`${OpenAPI.BASE}/login`}>Login</Link>
          </Button>
          <ModeToggle />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
