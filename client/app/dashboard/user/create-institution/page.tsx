"use client";

import CreateInstitutionForm from "@/components/forms/CreateInstitutionForm";
import HeaderDashboard from "@/components/header/HeaderDashboard";
import { useAuth } from "@/hooks/useAuth";


export default function UserDashboard() {
  const { user } = useAuth();
  console.log("create insti page", user);

  return (
    <section className="create-institution-page w-full lg:p-5 lg:space-y-5">
      <HeaderDashboard />
      <p className="lg:text-2xl font-medium ">Es necesario registrarse como empresa {user?.name}. <br />
        Luego, podrás ofrecer tus servicios.</p>
   
        <CreateInstitutionForm />

    </section>
  );
};