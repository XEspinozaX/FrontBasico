const Base = 'http://localhost:3005'; // Asegúrate de incluir http://

export const PostTodo = async (data) => {
    try {
        const response = await fetch(`${Base}/Tareas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        console.error("Error posting todo:", error);
        throw error;
    }
};

export const GetTodos = async () => {
    try {
        const response = await fetch(`${Base}/Tareas/`);
        return await response.json();
    } catch (error) {
        console.error("Error getting todos:", error);
        throw error;
    }
}

export const GetOne = async (id) => {
    try {
        const response = await fetch(`${Base}/Tareas/one/${id}`);
        return await response.json();
    } catch (error) {
        console.error("Error getting one todo:", error);
        throw error;
    }
}

export const DeleteTodo = async (id) => {
    try {
        const response = await fetch(`${Base}/Tareas/eliminar/${id}`, {
            method: 'DELETE',
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting todo:", error);
        throw error;
    }
}

export const UpdateTodo = async (data) => {
    try {
        const response = await fetch(`${Base}/Tareas/actualizar/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        console.error("Error updating todo:", error);
        throw error;
    }
}
