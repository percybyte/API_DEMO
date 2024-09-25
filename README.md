# 🌟 Gestión de Clientes

API para gestionar clientes mediante operaciones CRUD.

## 1. 🚀 Registrar un Cliente

- **Método**: `POST /api/v1/clients`
- **Campos Requeridos**:
  - **name**: _Obligatorio_
  - **lastName**: _Obligatorio_
  - **email**: _Único y debe tener formato válido_
  - **password**: _Deberá estar encriptada_
  - **phone**: _Opcional_

## 2. 📋 Obtener Clientes

- **Método**: `GET /api/v1/clients`
- **Filtrado**: Puedes filtrar por correo electrónico:
  - `?email=correo@example.com`

## 3. ✏️ Actualizar un Cliente

- **Método**: `PUT /api/v1/clients/{id}`
- **Ejemplo de Cuerpo**:

  ```json
  {
    "name": "Nuevo Nombre",
    "prone": "987654321"
  }
  ```

## 4. ✏️ Eliminar un Cliente

- **Método**: `DELETE /api/v1/clients/{id}`
- **Descripción**: Cambia el estado del cliente a inactivo.
