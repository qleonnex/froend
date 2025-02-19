import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import NavMenu from "../nav-menu/NavMenu";

function PageLayout() {
  return (
    <div className="overfow-x-hidden w-screen overflow-y-scroll scroll-smooth pb-[24vw] font-sans text-gray">
      <Header />
      <Outlet />
      <NavMenu />
    </div>
  );
}

export default PageLayout;
