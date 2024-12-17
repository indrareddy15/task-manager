import React, { useState } from "react";
import {
    AppBar,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Modal,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    Typography,
    Fab,
    IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import Paper from '@mui/material/Paper';

// Mock task data
const tasks = [
    {
        title: "Complete Project Documentation",
        description: "Write the final report and documentation for the project.",
        status: "TODO",
        linkedFile: "http://example.com/file.pdf",
        deadline: new Date("2024-12-31T23:59:59Z"),
    },
    {
        title: "Fix Bug in User Login",
        description: "Resolve the bug where users are unable to login after password reset.",
        status: "TODO",
        linkedFile: "",
        deadline: new Date("2024-12-20T18:00:00Z"),
    },
    {
        title: "Release Version 1.2.0",
        description: "Prepare release notes and deploy version 1.2.0 to production.",
        status: "DONE",
        linkedFile: "http://example.com/release-notes.pdf",
        deadline: new Date("2024-12-15T00:00:00Z"),
    },
    {
        title: "Design New Feature UI",
        description: "Create wireframes and mockups for the new search feature.",
        status: "TODO",
        linkedFile: "",
        deadline: new Date("2024-12-22T17:00:00Z"),
    },
];

const TaskManager = () => {
    const [taskList, setTaskList] = useState(tasks);
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "TODO",
    });
    const [editIndex, setEditIndex] = useState(null);

    // Handle Add or Update task
    const handleSaveTask = () => {
        const newTask = {
            ...formData,
            deadline: new Date(), // Placeholder for now
            linkedFile: "",
        };

        if (editIndex !== null) {
            const updatedTasks = [...taskList];
            updatedTasks[editIndex] = newTask;
            setTaskList(updatedTasks);
        } else {
            setTaskList([...taskList, newTask]);
        }

        setOpenModal(false);
        setFormData({ title: "", description: "", status: "TODO" });
        setEditIndex(null);
    };

    // Handle Edit Task
    const handleEditTask = (index) => {
        const task = taskList[index];
        setFormData({
            title: task.title,
            description: task.description,
            status: task.status,
        });
        setEditIndex(index);
        setOpenModal(true);
    };

    // Handle Delete Task
    const handleDeleteTask = (index) => {
        const updatedTasks = taskList.filter((_, i) => i !== index);
        setTaskList(updatedTasks);
    };

    // Handle File Download
    const handleDownloadFile = (fileUrl) => {
        if (fileUrl) {
            window.open(fileUrl, "_blank");
        } else {
            alert("No file linked to this task.");
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <AppBar position="static">
                <Typography variant="h4" sx={{ marginBottom: 2 }}>
                    Task Manager
                </Typography>
            </AppBar>

            {/* Task Table */}
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Deadline</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {taskList.map((task, index) => (
                            <TableRow key={index}>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>{task.status}</TableCell>
                                <TableCell>{task.deadline.toDateString()}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEditTask(index)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDeleteTask(index)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => handleDownloadFile(task.linkedFile)}
                                    >
                                        <DownloadIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Floating Action Button */}
            <Fab
                color="primary"
                aria-label="add"
                onClick={() => setOpenModal(true)}
                sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                }}
            >
                <AddIcon />
            </Fab>

            {/* Modal for Adding or Editing Task */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    sx={{
                        width: 400,
                        backgroundColor: "white",
                        padding: 3,
                        margin: "10% auto",
                        borderRadius: 2,
                        boxShadow: 24,
                    }}
                >
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        {editIndex !== null ? "Update Task" : "Add New Task"}
                    </Typography>

                    {/* Title Input */}
                    <TextField
                        label="Title"
                        fullWidth
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        sx={{ marginBottom: 2 }}
                    />

                    {/* Description Input */}
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                        sx={{ marginBottom: 2 }}
                    />

                    {/* Status Dropdown */}
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({ ...formData, status: e.target.value })
                            }
                            label="Status"
                        >
                            <MenuItem value="TODO">TODO</MenuItem>
                            <MenuItem value="DONE">DONE</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Save Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSaveTask}
                    >
                        {editIndex !== null ? "Update" : "Save"}
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default TaskManager;
