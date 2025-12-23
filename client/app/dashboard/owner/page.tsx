"use client";
import HeaderDashboard from "@/components/header/HeaderDashboard";
import { useInstitutions } from "@/context/InstitutionsContext";
import { useAuth } from "@/hooks/useAuth";


export default function OwnerDashboard() {
  const { user } = useAuth()
  // const { institutions} = useInstitutions();
// const { phone } = institutions;
  // console.log("OWNER DASH INST", institutions);
  //   console.log("OWNER DASH USER", user);
  

  return (
    user?.role === "owner" ? (
    <section className="dashboard-user w-full">
          <HeaderDashboard />
    
    <h1>Panel del Owner de {user?.name} </h1>
    </section>) 
    : (null)
  )
};