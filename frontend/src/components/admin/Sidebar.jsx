import { LayoutDashboard,BookOpen,Users,LogOut,} from"lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Sidebar = () => {

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {

    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    logout();

    navigate("/login");

  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-6 flex flex-col">

      {/* Logo */}

      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
        TechNova
      </h1>

      {/* Menu */}

      <nav className="space-y-3 flex-1">

        <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-800 transition">

          <LayoutDashboard size={22} />

          Dashboard

        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-800 transition">

          <BookOpen size={22} />

          Courses

        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-800 transition">

          <Users size={22} />

          Users

        </button>

      </nav>

      {/* Logout */}

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
      >
        <LogOut size={22} />

        Logout
      </button>

    </aside>
  );
};