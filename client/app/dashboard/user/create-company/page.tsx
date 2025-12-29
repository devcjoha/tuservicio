"use client";
// import { useAuth } from "@/hooks/useAuth";

import CreateCompanyForm from "@/components/forms/CreateCompanyForm";

export default function UserDashboard() {
  // const { user } = useAuth();

  return (
    <section className="create-company-page w-full lg:p-5 lg:space-y-5">
      {/* <p className="lg:text-2xl font-medium ">Es necesario registrarse como empresa {user?.name}. <br />
        Luego, podrás ofrecer tus servicios.</p> */}
      <CreateCompanyForm />
    </section>
  );
};