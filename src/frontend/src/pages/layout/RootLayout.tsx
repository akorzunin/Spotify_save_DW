import { Outlet } from 'react-router';
import Footer from '../../components/Footer';
import Button from '../../components/buttons/BaseButton';
import { OpenAPI } from '../../api/client';
import { ModeToggle } from '../../shadcn/ui/theme-toggle';

export function RootLayout() {
  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-6xl font-bold text-primary-foreground">
          <a href="/app/">DWMan</a>
        </h1>
        <div className="mr-4 mt-4 flex gap-x-3">
          <Button
            title="Layout Demo"
            link="/app/user/demo_user"
            color="bg-white"
          />
          <Button
            title="Help"
            link="/app/help" //use useNavigate
            color="bg-white"
          />
          <Button
            title="Login"
            link={`${OpenAPI.BASE}/login`}
            color="bg-white"
          />
          <ModeToggle />
        </div>
      </header>
      <main className="">
        <Outlet />
      </main>
      <Footer className="" />
    </>
  );
}
