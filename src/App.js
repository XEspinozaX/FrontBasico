import React, { useState, useEffect } from "react";
import "./App.css";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { PostTodo, GetTodos, DeleteTodo, UpdateTodo } from "./api/api.js";
import dayjs from "dayjs";

function App() {
  // 1. Definir el estado inicial de las tareas y el nuevo formulario de tareas
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    tituloPendiente: "",
    subtituloPendiente: "",
    mensaje: "",
    comenatios: "",
    prioridad: "",
    fechaFinalizacion: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [editableTodo, setEditableTodo] = useState(null);

  // 2. Obtener las tareas cuando el componente se monta
  useEffect(() => {
    GetTodos().then((response) => {
      if (!response.error && response.codigo === 200) {
        setTodos(response.mensaje);
      } else {
        console.error("Error al obtener las tareas:", response);
      }
    });
  }, []);

  // 3. Función para agregar una nueva tarea
  const handleAddTodo = async () => {
    if (newTodo.tituloPendiente.trim()) {
      const response = await PostTodo(newTodo);
      if (!response.error && response.codigo === 200 && response.mensaje) {
        setTodos((prevTodos) => [...prevTodos, response.mensaje]);
        setNewTodo({
          tituloPendiente: "",
          subtituloPendiente: "",
          mensaje: "",
          comenatios: "",
          prioridad: "",
          fechaFinalizacion: "",
        });
      } else {
        console.error("Error al agregar la tarea:", response);
      }
    }
  };

  // 4. Función para eliminar una tarea
  const handleDeleteTodo = async (id) => {
    const response = await DeleteTodo(id);
    if (!response.error && response.codigo === 200) {
      setTodos(todos.filter((todo) => todo.idTarea !== id));
    } else {
      console.error("Error al eliminar la tarea:", response);
    }
  };

  // 5. Función para abrir el cuadro de diálogo de edición
  const handleClickOpen = (todo) => {
    setEditableTodo({ ...todo });
    setOpenDialog(true);
  };

  // 6. Función para cerrar el cuadro de diálogo de edición
  const handleClose = () => {
    setOpenDialog(false);
  };

  // 7. Función para manejar los cambios en los campos de entrada
  const handleChange = (e, field) => {
    const value = e.target.value;
    if (editableTodo) {
      setEditableTodo((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else {
      setNewTodo((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  // 8. Función para guardar las ediciones de una tarea
  const handleSave = async () => {
    if (editableTodo) {
      try {
        const response = await UpdateTodo(editableTodo);
        if (!response.error && response.codigo === 200) {
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.idTarea === editableTodo.idTarea
                ? { ...todo, ...editableTodo }
                : todo
            )
          );
          handleClose();
        } else {
          console.error("Error actualizando la tarea:", response);
        }
      } catch (error) {
        console.error("Error actualizando la tarea:", error);
      }
    }
  };

  // 9. Ordenar las tareas por prioridad y fecha de finalización
  const priorityOrder = { Alto: 1, Medio: 2, Bajo: 3 };

  const sortedTodos = [...todos].sort((a, b) => {
    if (priorityOrder[a.prioridad] === priorityOrder[b.prioridad]) {
      return new Date(a.fechaFinalizacion) - new Date(b.fechaFinalizacion);
    }
    return priorityOrder[a.prioridad] - priorityOrder[b.prioridad];
  });

  // 10. Renderizar la interfaz de usuario
  return (
    <div className="App">
      <header className="App-header">
        <TextField
          sx={{
            "& label": {
              color: "rgba(255, 255, 255, 0.7)",
            },
            "& .MuiInputBase-input": {
              color: "blue",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "blue",
              },
              "&:hover fieldset": {
                borderColor: "blue",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiInputBase-input": {
                color: "white",
              },
              "&.Mui-focused label": {
                color: "white",
              },
            },
          }}
          label="Título"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newTodo.tituloPendiente}
          onChange={(e) => handleChange(e, "tituloPendiente")}
        />
        <TextField
          sx={{
            "& label": {
              color: "rgba(255, 255, 255, 0.7)",
            },
            "& .MuiInputBase-input": {
              color: "blue",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "blue",
              },
              "&:hover fieldset": {
                borderColor: "blue",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiInputBase-input": {
                color: "white",
              },
              "&.Mui-focused label": {
                color: "white",
              },
            },
          }}
          label="Subtítulo"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newTodo.subtituloPendiente}
          onChange={(e) => handleChange(e, "subtituloPendiente")}
        />
        <TextField
          sx={{
            "& label": {
              color: "rgba(255, 255, 255, 0.7)",
            },
            "& .MuiInputBase-input": {
              color: "blue",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "blue",
              },
              "&:hover fieldset": {
                borderColor: "blue",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiInputBase-input": {
                color: "white",
              },
              "&.Mui-focused label": {
                color: "white",
              },
            },
          }}
          label="Mensaje"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newTodo.mensaje}
          onChange={(e) => handleChange(e, "mensaje")}
        />
        <TextField
          sx={{
            "& label": {
              color: "rgba(255, 255, 255, 0.7)",
            },
            "& .MuiInputBase-input": {
              color: "blue",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "blue",
              },
              "&:hover fieldset": {
                borderColor: "blue",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiInputBase-input": {
                color: "white",
              },
              "&.Mui-focused label": {
                color: "white",
              },
            },
          }}
          label="Comentarios"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newTodo.comenatios}
          onChange={(e) => handleChange(e, "comenatios")}
        />
        <TextField
          select
          sx={{
            "& label": {
              color: "rgba(255, 255, 255, 0.7)",
            },
            "& .MuiInputBase-input": {
              color: "blue",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "blue",
              },
              "&:hover fieldset": {
                borderColor: "blue",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiInputBase-input": {
                color: "white",
              },
              "&.Mui-focused label": {
                color: "white",
              },
            },
          }}
          label="Prioridad"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newTodo.prioridad}
          onChange={(e) => handleChange(e, "prioridad")}
        >
          <MenuItem value="Alto">Alto</MenuItem>
          <MenuItem value="Medio">Medio</MenuItem>
          <MenuItem value="Bajo">Bajo</MenuItem>
        </TextField>
        <TextField
          sx={{
            "& label": {
              color: "rgba(255, 255, 255, 0.7)",
            },
            "& .MuiInputBase-input": {
              color: "blue",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "blue",
              },
              "&:hover fieldset": {
                borderColor: "blue",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiInputBase-input": {
                color: "white",
              },
              "&.Mui-focused label": {
                color: "white",
              },
            },
          }}
          label="Fecha de finalización"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newTodo.fechaFinalizacion}
          onChange={(e) => handleChange(e, "fechaFinalizacion")}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" onClick={handleAddTodo}>
          Agregar Tarea
        </Button>
      </header>
      <Grid container spacing={2} style={{ padding: 20 }}>
        {sortedTodos.map((todo) => (
          <Grid item key={todo.idTarea} xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {todo.tituloPendiente}
                </Typography>
                <Typography color="textSecondary">
                  {todo.subtituloPendiente}
                </Typography>
                <Typography variant="body2" component="p">
                  {todo.mensaje}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Comentarios: {todo.comenatios}
                </Typography>
                <Typography variant="body2">
                  Prioridad: {todo.prioridad}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Finaliza: {dayjs(todo.fechaFinalizacion).format("DD-MM-YYYY")}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  aria-label="edit"
                  onClick={() => handleClickOpen(todo)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteTodo(todo.idTarea)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {editableTodo && (
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Editar Tarea</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Modifica los campos de la tarea.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Título"
              type="text"
              fullWidth
              value={editableTodo.tituloPendiente}
              onChange={(e) => handleChange(e, "tituloPendiente")}
            />
            <TextField
              margin="dense"
              id="subtitle"
              label="Subtítulo"
              type="text"
              fullWidth
              value={editableTodo.subtituloPendiente}
              onChange={(e) => handleChange(e, "subtituloPendiente")}
            />
            <TextField
              margin="dense"
              id="message"
              label="Mensaje"
              type="text"
              fullWidth
              value={editableTodo.mensaje}
              onChange={(e) => handleChange(e, "mensaje")}
            />
            <TextField
              margin="dense"
              id="comments"
              label="Comentarios"
              type="text"
              fullWidth
              value={editableTodo.comenatios}
              onChange={(e) => handleChange(e, "comenatios")}
            />
            <TextField
              select
              margin="dense"
              id="priority"
              label="Prioridad"
              type="text"
              fullWidth
              value={editableTodo.prioridad}
              onChange={(e) => handleChange(e, "prioridad")}
            >
              <MenuItem value="Alto">Alto</MenuItem>
              <MenuItem value="Medio">Medio</MenuItem>
              <MenuItem value="Bajo">Bajo</MenuItem>
            </TextField>
            <TextField
              margin="dense"
              id="endDate"
              label="Fecha de finalización"
              type="date"
              fullWidth
              value={dayjs(editableTodo.fechaFinalizacion).format("YYYY-MM-DD")}
              onChange={(e) => handleChange(e, "fechaFinalizacion")}
              InputLabelProps={{ shrink: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSave} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default App;
