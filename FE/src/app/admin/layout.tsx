import { FooterAdmin, HeaderAdmin } from "@/components/admin";
import SidebarAdmin from "@/components/admin/sidebar-admin/SidebarAdmin";
import { BreadcrumbAdmin } from "@/components/breadcrumb";

import { PrivateRouter } from "@/components/privateRouter";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PrivateRouter allowedRoles={['admin']}>
        <div className="flex md:flex-row flex-col">
          <SidebarAdmin />
          <main className="home-section  relative w-full bg-gray-50 min-h-screen transition-all main ">
            <BreadcrumbAdmin/>
            {children}
            <FooterAdmin />
          </main>
        </div>
      </PrivateRouter>
    </div>
  );
};

export default MainLayout;
