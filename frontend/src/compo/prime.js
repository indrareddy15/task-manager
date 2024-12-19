import React, { useState } from "react";
import {
    Box,
    Heading,
    Table,
    ButtonPrimary,
    ButtonDanger,
    TextInput,
    Select,
    Dialog,
    Text,
    IconButton,
} from "@primer/react";
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    DownloadIcon,
} from "@primer/octicons-react";

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
        description:
            "Resolve the bug where users are unable to login after password reset.",
        status: "TODO",
        linkedFile: "",
        deadline: new Date("2024-12-20T18:00:00Z"),
    },
    {
        title: "Release Version 1.2.0",
        description:
            "Prepare release notes and deploy version 1.2.0 to production.",
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

const TaskManager2 = () => {
    const [taskList, setTaskList] = useState(tasks);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
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

        setIsDialogOpen(false);
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
        setIsDialogOpen(true);
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
        <Box p={4}>
            <Heading as="h1" mb={4}>
                Task Manager
            </Heading>

            {/* Task Table */}
            <Table.Container>
                <Table>
                    <thead>
                        <Table.Row>
                            <Table.CellHeader>Title</Table.CellHeader>
                            <Table.CellHeader>Description</Table.CellHeader>
                            <Table.CellHeader>Status</Table.CellHeader>
                            <Table.CellHeader>Deadline</Table.CellHeader>
                            <Table.CellHeader>Actions</Table.CellHeader>
                        </Table.Row>
                    </thead>
                    <tbody>
                        {taskList.map((task, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>{task.title}</Table.Cell>
                                <Table.Cell>{task.description}</Table.Cell>
                                <Table.Cell>{task.status}</Table.Cell>
                                <Table.Cell>{task.deadline.toDateString()}</Table.Cell>
                                <Table.Cell>
                                    <IconButton
                                        icon={PencilIcon}
                                        aria-label="Edit"
                                        onClick={() => handleEditTask(index)}
                                        sx={{ marginRight: 2 }}
                                    />
                                    <IconButton
                                        icon={TrashIcon}
                                        aria-label="Delete"
                                        onClick={() => handleDeleteTask(index)}
                                        sx={{ marginRight: 2 }}
                                    />
                                    <IconButton
                                        icon={DownloadIcon}
                                        aria-label="Download"
                                        onClick={() => handleDownloadFile(task.linkedFile)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </tbody>
                </Table>
            </Table.Container>

            {/* Floating Plus Button */}
            <ButtonPrimary
                leadingIcon={PlusIcon}
                sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                    borderRadius: "50%",
                    padding: "12px",
                }}
                onClick={() => setIsDialogOpen(true)}
            >
                Add Task
            </ButtonPrimary>

            {/* Dialog for Adding or Editing Task */}
            {isDialogOpen && (
                <Dialog
                    title={editIndex !== null ? "Update Task" : "Add New Task"}
                    onClose={() => setIsDialogOpen(false)}
                >
                    <Box display="flex" flexDirection="column" gap={3}>
                        {/* Title Input */}
                        <TextInput
                            label="Title"
                            placeholder="Enter task title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                        />

                        {/* Description Input */}
                        <TextInput
                            label="Description"
                            placeholder="Enter task description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                        />

                        {/* Status Dropdown */}
                        <Select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({ ...formData, status: e.target.value })
                            }
                        >
                            <Select.Option value="TODO">TODO</Select.Option>
                            <Select.Option value="DONE">DONE</Select.Option>
                        </Select>

                        {/* Save Button */}
                        <ButtonPrimary onClick={handleSaveTask}>
                            {editIndex !== null ? "Update Task" : "Save Task"}
                        </ButtonPrimary>
                    </Box>
                </Dialog>
            )}
        </Box>
    );
};

export default TaskManager2;
