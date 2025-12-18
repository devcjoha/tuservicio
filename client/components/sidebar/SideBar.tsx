type SidebarProps = {
  role: string;
};

function SideBar({ role }: SidebarProps) {
  return (
  <aside>{role}</aside>
)
}
export default SideBar;