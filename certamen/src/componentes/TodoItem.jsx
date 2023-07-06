import React from "react";

export function TodoItem({ todo, cambiarEstado }) {
  const { id, name, apellido, contact, rut, complete } = todo;

  const handleChange = () => {
    cambiarEstado(id);
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{apellido}</td>
      <td>{contact}</td>
      <td>{rut}</td>
      <td>
        <input
          type="checkbox"
          checked={complete}
          onChange={handleChange}
        />
      </td>
    </tr>
  );
}