import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, CircularProgress } from '@mui/material';
import axios from 'axios';

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState(project);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ marginBottom: 4, padding: 2, border: '1px solid #ccc', borderRadius: 2 }}
    >
      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      />
      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        required
        sx={{ marginBottom: 2 }}
      />
      <Box>
        <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 1 }}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectForm;
