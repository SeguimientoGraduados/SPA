import React, { useState } from "react";

const Dropdown = ({ user, onDatos, onLogout, mostrarDatos }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left z-50">
      <div>
        <button
          onClick={toggleDropdown}
          className="bg-sky-600 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded"
        >
          Hola, {user}
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {mostrarDatos && (
              <button
                onClick={onDatos}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                role="menuitem"
              >
                Mis datos
              </button>
            )}
            <button
              onClick={onLogout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
