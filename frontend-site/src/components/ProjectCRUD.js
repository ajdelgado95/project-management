import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';

const API_URL = 'http://localhost:8000/api/projects/';

const ProjectCRUD = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

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

  const handleCreate = async (newProject) => {
    try {
      const response = await axios.post(API_URL, newProject);
      setProjects([...projects, response.data]);
      setSelectedProject(null); // Close the form after creating
    } catch (err) {
      setError('Failed to create project');
    }
  };

  const handleUpdate = async (updatedProject) => {
    try {
      const response = await axios.put(`${API_URL}${updatedProject.id}/`, updatedProject);
      setProjects(
        projects.map((project) =>
          project.id === updatedProject.id ? response.data : project
        )
      );
      setSelectedProject(null); // Close the form after updating
    } catch (err) {
      setError('Failed to update project');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      setProjects(projects.filter((project) => project.id !== id));
    } catch (err) {
      setError('Failed to delete project');
    }
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
      {selectedProject && (
        <ProjectForm
          project={selectedProject}
          onSave={selectedProject.id ? handleUpdate : handleCreate}
          onCancel={() => setSelectedProject(null)} // Close form on cancel
        />
      )}
      <ProjectList
        projects={projects}
        onEdit={setSelectedProject} // Trigger form with selected project
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default ProjectCRUD;
