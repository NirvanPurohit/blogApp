import React, { useMemo } from "react";
import { Container, Logo, LogoutButton } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion"; // Import Framer Motion

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = useMemo(
    () => [
      { name: "Home", slug: "/", active: true },
      { name: "Login", slug: "/login", active: !authStatus },
      { name: "Signup", slug: "/signup", active: !authStatus },
      { name: "All Posts", slug: "/all-posts", active: authStatus },
      { name: "Add Post", slug: "/add-post", active: authStatus },
    ],
    [authStatus]
  );

  return (
    <header className="bg-white shadow-md py-4">
      <Container>
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo className="w-12 h-12" />
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <motion.button
                      onClick={() => navigate(item.slug)}
                      className="px-6 py-2 text-gray-700 font-medium bg-gray-100 rounded-lg shadow-md transition-all"
                      whileHover={{
                        y: -6, // Subtle lift
                        scale: 1.08, // Slightly bigger
                        boxShadow: "0px 8px 16px rgba(0,0,0,0.15)", // Softer shadow
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }} // Smooth animation
                      whileTap={{ scale: 0.96 }} // Click effect
                    >
                      {item.name}
                    </motion.button>
                  </li>
                )
            )}
          </ul>

          {/* Logout Button */}
          {authStatus && <LogoutButton />}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
