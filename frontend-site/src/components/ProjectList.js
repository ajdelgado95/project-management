import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';

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
                <strong>Created at :</strong>{project.created_at}
              </Typography>
              <Typography textAlign="justify" variant="body2" sx={{ marginBottom: 2 }}>
                <strong>Updated at :</strong>{project.updated_at}
              </Typography>
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
