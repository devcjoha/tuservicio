"use client";
// import { useAuth } from "@/hooks/useAuth";

import CreateInstitutionForm from "@/components/forms/CreateInstitutionForm";

export default function UserDashboard() {
  // const { user } = useAuth();

  return (
    <section className="create-institution-page w-full lg:p-5 lg:space-y-5">
      {/* <p className="lg:text-2xl font-medium ">Es necesario registrarse como empresa {user?.name}. <br />
        Luego, podrás ofrecer tus servicios.</p> */}  
        <CreateInstitutionForm />
    </section>
  );
};