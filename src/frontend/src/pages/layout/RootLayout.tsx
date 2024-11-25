import React, { useEffect } from 'react';
import { Outlet, redirect, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Button from '../../components/buttons/BaseButton';
import { OpenAPI } from '../../api/client';
import { ModeToggle } from '../../shadcn/ui/theme-toggle';

export function RootLayout() {
  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-6xl font-bold text-primary-foreground">DWMan</h1>
        <div className="mr-4 mt-4 flex gap-x-3">
          <Button
            title="Layout Demo"
            link="/app/user/demo_user"
            color="bg-white"
          />
          <Button
            title="Help"
            link="/help" //use useNavigate
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
