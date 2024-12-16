import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const ProjectList = ({ projects, onEdit, onDelete }) => {
  return (
    <Grid spacing={1}>
      {projects.map((project) => (
        <Grid item xs={12} sm={12} md={12} key={project.id} mt="1em">
          <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
            <CardContent sx={{ padding: 3 }}>
              <Typography textAlign="left" variant="h4" component="h2" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                {project.title}
              </Typography>
              <Typography textAlign="justify" variant="body2" sx={{ marginBottom: 2 }}>
                {project.description}
              </Typography>
              <Typography textAlign="justify" variant="body2" sx={{ marginBottom: 2 }}>
                <strong>Created at :</strong> {project.created_at}
              </Typography>
              <Typography textAlign="justify" variant="body2" sx={{ marginBottom: 2 }}>
                <strong>Updated at :</strong> {project.updated_at}
              </Typography>

              {/* Displaying the list of tasks */}
              {project.tasks && project.tasks.length > 0 && (
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                    Tasks:
                  </Typography>
                  <ul>
                    {project.tasks.map((task) => (
                      <li key={task.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        {/* Task Icon */}
                        {task.completed ? (
                          <CheckCircleIcon sx={{ color: 'green', marginRight: 1 }} />
                        ) : (
                          <RadioButtonUncheckedIcon sx={{ color: 'red', marginRight: 1 }} />
                        )}
                        <Typography variant="body2" sx={{ textAlign: 'left' }}>
                          <strong>{task.title}</strong> - {task.completed ? 'Completed' : 'In Progress'}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onEdit(project)}
                  sx={{ marginRight: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => onDelete(project.id)}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectList;
