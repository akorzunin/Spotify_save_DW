import { Link, Outlet, useParams } from 'react-router';
import Footer from '../../components/Footer';
import { Button } from '../../shadcn/ui/button';
import { ModeToggle } from '../../shadcn/ui/theme-toggle';
import { OpenAPI } from '../../api/client';
import UserCard from '../../components/UserCard';
import { useAtomValue } from 'jotai';
import SongCard from '../../components/SongCard';
import { CurrentSongAtom } from '../../store/store';
import { Menu } from 'lucide-react';

export function RootLayout() {
  const { userId } = useParams();
  const CurrentSong = useAtomValue(CurrentSongAtom);

  return (
    <div className="container relative">
      <header className="flex p-4">
        {userId ? (
          <div className="flex w-full items-center justify-between">
            <UserCard />
            <SongCard
              className="w-80"
              song={CurrentSong}
              index={NaN}
              isDeletable={false}
            />
            <div className="gap-x-3 desktop:hidden">
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </div>
            <div className="hidden gap-x-3 desktop:flex">
              <Button asChild>
                <Link to="/app/">Home</Link>
              </Button>
              <Button asChild>
                <Link to="/app/help">Help</Link>
              </Button>
              <Button variant="destructive" asChild>
                <Link to={'/app/'}>Logout</Link>
              </Button>
              <ModeToggle />
            </div>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between">
            <div className="text-6xl font-bold text-primary-foreground">
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
          </div>
        )}
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
