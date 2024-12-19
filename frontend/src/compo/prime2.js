import React, { useState } from "react";
import {
    Box,
    Heading,
    ButtonPrimary,
    ButtonDanger,
    TextInput,
    Select,
    Dialog,
    IconButton,
    Text,
    Stack,
} from "@primer/react";
import { PlusIcon, PencilIcon, TrashIcon, DownloadIcon } from "@primer/octicons-react";

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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "TODO",
    });
    const [editIndex, setEditIndex] = useState(null);

    const handleSaveTask = () => {
        const newTask = {
            ...formData,
            deadline: new Date(),
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

    const handleDeleteTask = (index) => {
        const updatedTasks = taskList.filter((_, i) => i !== index);
        setTaskList(updatedTasks);
    };

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

            {/* Custom Table */}
            <Box borderWidth={1} borderStyle="solid" borderColor="border.default" borderRadius={6}>
                {/* Table Header */}
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(5, 1fr)"
                    bg="canvas.subtle"
                    p={3}
                    fontWeight="bold"
                    borderBottomWidth={1}
                    borderBottomStyle="solid"
                    borderBottomColor="border.default"
                >
                    <Text>Title</Text>
                    <Text>Description</Text>
                    <Text>Status</Text>
                    <Text>Deadline</Text>
                    <Text>Actions</Text>
                </Box>

                {/* Table Rows */}
                {taskList.map((task, index) => (
                    <Box
                        key={index}
                        display="grid"
                        gridTemplateColumns="repeat(5, 1fr)"
                        p={3}
                        borderBottomWidth={1}
                        borderBottomStyle="solid"
                        borderBottomColor="border.default"
                    >
                        <Text>{task.title}</Text>
                        <Text>{task.description}</Text>
                        <Text>{task.status}</Text>
                        <Text>{task.deadline.toDateString()}</Text>
                        <Box display="flex" gap={2}>
                            <IconButton
                                icon={PencilIcon}
                                aria-label="Edit"
                                onClick={() => handleEditTask(index)}
                            />
                            <IconButton
                                icon={TrashIcon}
                                aria-label="Delete"
                                onClick={() => handleDeleteTask(index)}
                            />
                            <IconButton
                                icon={DownloadIcon}
                                aria-label="Download"
                                onClick={() => handleDownloadFile(task.linkedFile)}
                            />
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Floating Add Task Button */}
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

            {/* Add/Edit Task Dialog */}
            {isDialogOpen && (
                <Dialog
                    title={editIndex !== null ? "Update Task" : "Add New Task"}
                    onClose={() => setIsDialogOpen(false)}
                >
                    <Box display="flex" flexDirection="column" gap={3}>
                        <TextInput
                            placeholder="Enter task title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                        />
                        <TextInput
                            placeholder="Enter task description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                        />
                        <Select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({ ...formData, status: e.target.value })
                            }
                        >
                            <Select.Option value="TODO">TODO</Select.Option>
                            <Select.Option value="DONE">DONE</Select.Option>
                        </Select>
                        <ButtonPrimary onClick={handleSaveTask}>
                            {editIndex !== null ? "Update Task" : "Save Task"}
                        </ButtonPrimary>
                    </Box>
                </Dialog>
            )}
        </Box>
    );
};

export default TaskManager;
