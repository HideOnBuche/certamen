import React, {useState} from "react";

export function TodoItem({ todo, cambiarEstado, editarTarea }) { 
  // Declara el componente TodoItem y lo exporta para que pueda ser utilizado en otros archivos. 
  // acepta tres propiedades (todo, cambiarEstado, editarTarea) que se pasan al componente desde
  // su contenedor o componente padre
  
  const { id, name, apellido, contact, rut, complete } = todo; //desestructura el objeto todo, para extraer las propiedades se asignan a variables con los mismos nombres para ser utilizadas
  const [editing, setEditing] = useState(false); // editing es una variable iniciada como  false y setEditing es una función que permite modificar el valor de editing
  const [editedValues, setEditedValues] = useState({ // editedValues es una variable objeto 
    name, // contiene las propiedades name, apellido, contact y rut con sus respectivos valores iniciales.
    apellido,
    contact,
    rut,
  });

  const handleCheckboxChange = () => { // se ejecuta cuando se produce un cambio en el estado del checkbox.
    cambiarEstado(id); // Llama a la función cambiarEstado pasándole como argumento el id del todo.
  };

  const handleEditClick = () => { // Esta función se ejecuta cuando se hace clic en el botón de editar. 
    setEditing(true); // Establece el valor de editing en true, lo que indica que se debe activar el modo de edición.
  };

  const handleSaveClick = () => { // Esta función se ejecuta cuando se hace clic en el botón de guardar
    // Guardar los valores editados
    editarTarea(id, "name", editedValues.name);
    editarTarea(id, "apellido", editedValues.apellido);
    editarTarea(id, "contact", editedValues.contact);
    editarTarea(id, "rut", editedValues.rut);

    setEditing(false); // Luego establece editing en false para salir del modo de edición.
  };

  const handleCancelClick = () => {
    setEditing(false);
    setEditedValues({
      name,
      apellido,
      contact,
      rut,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <tr>
      <td>{id}</td>
      <td>
        {editing ? (
          <input
            type="text"
            name="name"
            value={editedValues.name}
            onChange={handleInputChange}
          />
        ) : (
          name
        )}
      </td>
      <td>
        {editing ? (
          <input
            type="text"
            name="apellido"
            value={editedValues.apellido}
            onChange={handleInputChange}
          />
        ) : (
          apellido
        )}
      </td>
      <td>
        {editing ? (
          <input
            type="text"
            name="contact"
            value={editedValues.contact}
            onChange={handleInputChange}
          />
        ) : (
          contact
        )}
      </td>
      <td>
        {editing ? (
          <input
            type="text"
            name="rut"
            value={editedValues.rut}
            onChange={handleInputChange}
          />
        ) : (
          rut
        )}
      </td>
      <td>
        <input
          type="checkbox"
          checked={complete}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>
        {editing ? (
          <>
            <button className="btn btn-success" onClick={handleSaveClick}>Guardar</button>
            <button className="btn btn-danger" onClick={handleCancelClick}>Cancelar</button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={handleEditClick}>Editar</button>
        )}
      </td>
    </tr>
  );
}