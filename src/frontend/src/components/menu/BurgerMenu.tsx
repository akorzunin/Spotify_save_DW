import { FC } from 'react';
import { cn } from '../../lib/utils';
import { Menu } from 'lucide-react';
import { Button } from '../../shadcn/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '../../shadcn/ui/sheet';
import { Link } from 'react-router';
import { OpenAPI } from '../../api/client';

interface IBurgerMenu {
  className?: string;
  userId?: string;
}

const BurgerMenu: FC<IBurgerMenu> = ({ className, userId }) => {
  return (
    <div className={cn('', className)}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="main-background flex max-w-60 flex-col gap-y-6">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <Button asChild>
            <Link to="/app/user/demo_user">Layout Demo</Link>
          </Button>
          <Button asChild>
            <Link to="/app/help">Help</Link>
          </Button>
          {userId ? (
            <>
              <Button asChild>
                <Link to="/app/">Home</Link>
              </Button>
              <Button variant="destructive" asChild>
                <Link to={'/app/'}>Logout</Link>
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link to={`${OpenAPI.BASE}/login`}>Login</Link>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BurgerMenu;
