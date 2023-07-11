import React, { useState, useRef, useEffect } from "react";
import { TodoItem } from "./TodoItem";
import { v4 as uuid } from 'uuid';

const KEY = "todolist-todos"; // el nombre que tendrá el arreglo en el localStorage

export function TodoList() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem(KEY)) ? JSON.parse(localStorage.getItem(KEY)) : []
  );
  const nameRef = useRef();
  const apellidoRef = useRef();
  const contactRef = useRef();
  const rutRef = useRef();

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]); // cuando cambie el todos lo guarda en localStorage

  const agregarTarea = () => {
    const name = nameRef.current.value;
    const apellido = apellidoRef.current.value;
    const contact = contactRef.current.value;
    const rut = rutRef.current.value;
    const id = uuid();

    if (name === '' || apellido === '' || contact === '' || rut === '') return;

    setTodos((prevTodos) => {
      const newTask = {
        id: id,
        name: name,
        apellido: apellido,
        contact: contact,
        rut: rut,
        complete: false
      };
      return [...prevTodos, newTask];
    });

    nameRef.current.value = '';
    apellidoRef.current.value = '';
    contactRef.current.value = '';
    rutRef.current.value = '';
  };

  const ResumenTareas = () => {
    const cantidad = cantidadTareas();
    if (cantidad > 1) {
      return (
        <div className="alert alert-danger">
          Te quedan {cantidad} trabajadores pendientes!
        </div>
      );
    } else if (cantidad === 1) {
      return (
        <div className="alert alert-danger">
          Te queda {cantidad} trabajador pendiente!
        </div>
      );
    } else {
      return (
        <div className="alert alert-success">
          No te quedan trabajadores pendientes!
        </div>
      );
    }
  };

  const cantidadTareas = () => {
    return todos.filter((todo) => !todo.complete).length;
  };

  const cambiarEstadoTarea = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  };

  const eliminarTareasCompletadas = () => {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  };

  const editarTarea = (id, fieldName, newValue) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo[fieldName] = newValue;
    setTodos(newTodos);
  };

  return (
    <>
      <div className="container" style={{ display: 'flex' }}>
        <div style={{ flex: '1' }}>
          <h1>Ficha Social</h1>

          <div className="mb-3">
            <div className="mb-3">
              <label htmlFor="" className="form-label">Nombre</label>
              <input ref={nameRef} type="text" className="form-control" id="" name="" placeholder="Ingrese nombre" />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="form-label">Apellido</label>
              <input ref={apellidoRef} type="text" className="form-control" id="" placeholder="Ingrese apellido" />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="form-label">Contacto</label>
              <input ref={contactRef} type="```jsxtext" className="form-control" id="" placeholder="Ingrese numero de contacto ejemplo: +569 12345678" />
            </div>

            <div className="mb-3">
              <label htmlFor="" className="form-label">rut</label>
              <input ref={rutRef} type="text" className="form-control" id="" placeholder="Ingrese su rut" />
            </div>

            <button onClick={agregarTarea} className="btn btn-outline-success"><i class="bi bi-person-fill-add">
                </i> Agregar </button>
            <button onClick={eliminarTareasCompletadas} className="btn btn-outline-danger"><i class="bi bi-archive">
                </i> Borrar </button>
          </div>
        </div>

        <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="../registro-1.png" width={300} alt=""></img>
        </div>
      </div>

      <table  class="table table-dark table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Contacto</th>
            <th>rut</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} cambiarEstado={cambiarEstadoTarea} editarTarea={editarTarea}/>
          ))}
        </tbody>
      </table>
      <ResumenTareas />
    </>
  );
};
