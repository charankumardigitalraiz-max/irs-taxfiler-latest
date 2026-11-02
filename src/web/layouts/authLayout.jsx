import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="">

      {/* SAME main wrapper as MainLayout (but without header/footer) */}
      <main className="">
        <Outlet />
      </main>

    </div>
  );
};

export default AuthLayout;
