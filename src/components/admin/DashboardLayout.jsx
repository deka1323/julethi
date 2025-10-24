import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import {
  LayoutDashboard,
  Package,
  Plus,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navigation = [
    { name: "Overview", path: "/admin", icon: LayoutDashboard },
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "Add Product", path: "/admin/products/add", icon: Plus },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 font-sans">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-100 transition-transform duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            } shadow-xl md:shadow-none`}
        >
          {/* Logo Section */}
          <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-yellow-400 tracking-wide">
                Julethi
              </h1>
              <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-widest">
                Admin Dashboard
              </p>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-slate-400 hover:text-slate-200 md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="px-3 py-5 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${isActive
                      ? "bg-yellow-400 text-slate-900 font-medium shadow-sm"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                >
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-slate-900" : "text-slate-400"
                      }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg w-full text-sm text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Overlay for Mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-30 shadow-sm">
            <div className="px-6 py-3 flex items-center justify-between">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden text-slate-600 hover:text-slate-900 transition"
              >
                {isSidebarOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

              <h2 className="text-sm md:text-base font-semibold text-slate-700 tracking-tight">
                Dashboard
              </h2>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 md:p-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 md:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
