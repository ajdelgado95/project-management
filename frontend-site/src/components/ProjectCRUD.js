import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, CircularProgress, Alert, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';

const API_URL = 'http://localhost:8000/api/projects/';
const TASK_API_URL = 'http://localhost:8000/api/tasks/';  // Assuming your Task API is at this endpoint

const ProjectCRUD = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [taskData, setTaskData] = useState({ title: '', description: '', completed: false, project: '' });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setProjects(response.data);
    } catch (err) {
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (newProject) => {
    try {
      const response = await axios.post(API_URL, newProject);
      setProjects([...projects, response.data]);
      setSelectedProject(null); // Close the form after creating
    } catch (err) {
      setError('Failed to create project');
    }
  };

  const handleCreateTask = async () => {
    try {
      const response = await axios.post(TASK_API_URL, taskData);
      setOpenTaskModal(false); // Close the modal after creating
      setTaskData({ title: '', description: '', completed: false, project: '' }); // Reset task data
      fetchProjects(); // Refresh project data to show the new task
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Project Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setSelectedProject({ title: '', description: '', owner: '' })}
        sx={{ marginBottom: 2 }}
      >
        Create New Project
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpenTaskModal(true)}
        sx={{ marginBottom: 2, marginLeft: 2 }}
      >
        Create New Task
      </Button>
      {selectedProject && (
        <ProjectForm
          project={selectedProject}
          onSave={selectedProject.id ? handleCreateProject : handleCreateProject}
          onCancel={() => setSelectedProject(null)} // Close form on cancel
        />
      )}
      <ProjectList
        projects={projects}
        onEdit={setSelectedProject} // Trigger form with selected project
        onDelete={handleCreateProject}
      />
      
      {/* Task Modal */}
      <Dialog open={openTaskModal} onClose={() => setOpenTaskModal(false)}>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Title"
            fullWidth
            margin="normal"
            name="title"
            value={taskData.title}
            onChange={handleTaskInputChange}
          />
          <TextField
            label="Task Description"
            fullWidth
            margin="normal"
            name="description"
            value={taskData.description}
            onChange={handleTaskInputChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Project</InputLabel>
            <Select
              name="project"
              value={taskData.project}
              onChange={handleTaskInputChange}
            >
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Completed</InputLabel>
            <Select
              name="completed"
              value={taskData.completed}
              onChange={handleTaskInputChange}
            >
              <MenuItem value={false}>Not Completed</MenuItem>
              <MenuItem value={true}>Completed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTaskModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateTask} color="primary">
            Create Task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectCRUD;
