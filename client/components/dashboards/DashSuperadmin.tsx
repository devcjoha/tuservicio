import { useAuth } from "@/hooks/useAuth";
import IconLucide from "../ui/IconLucide";

export default function DashSuperAdmin() {
  const { user, permissions } = useAuth();
  // Filtramos solo los que queremos mostrar como Cards en el Dashboard
  const actionCards = Object.entries(permissions || {})
  .filter(([_, data]) => data.category === "setting" || data.category === "action")
  .map(([id, data]) => ({ id, ...data }));
  
  console.log("DASH SUPERADMIN", actionCards);
  return (
    <section className="dashsuperadmin p-6">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">Accesos de Administración</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {actionCards.map((card) => (
            <div
              key={card.id}
              // onClick={() => handleNavigation(card.href)}
              className="cursor-pointer p-6 bg-white border rounded-xl hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-blue-50 text-secondary rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary-hover group-hover:text-success transition-colors">
                <IconLucide name={card.icon} />
              </div>
              <h3 className="font-bold text-gray-800">{card.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}; 