"use client";

import CreateInstitutionForm from "@/components/forms/CreateInstitutionForm";
import HeaderDashboard from "@/components/header/HeaderDashboard";
import { useAuth } from "@/hooks/useAuth";


export default function UserDashboard() {
  const { user } = useAuth();
  console.log("create insti page", user);

  return (
    <section className="create-institution-page w-full lg:p-10">
          <HeaderDashboard />
            <p className="text-2xl">{user?.name}, para ofrecer un servicio debes registrarte como empresa, desde ese momento disfrutarás de otras opciones.</p>
            <div className="form-createInst-container lg:p-20">
      <CreateInstitutionForm />
      </div>


    </section>
  );
};