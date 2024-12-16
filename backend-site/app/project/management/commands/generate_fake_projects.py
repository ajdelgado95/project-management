from django.core.management.base import BaseCommand
from faker import Faker
import random
from django.contrib.auth.models import User
from app.project.models import Project  # Adjust this import based on your app name

class Command(BaseCommand):
    help = 'Generate fake projects for the database'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Number of projects to create
        num_projects = 10

        # Get all users to assign as project owners
        users = User.objects.all()

        for _ in range(num_projects):
            title = fake.sentence(nb_words=5)  # Random project title
            description = fake.text(max_nb_chars=200)  # Random project description
            # Create a new project with fake data
            project = Project.objects.create(
                title=title,
                description=description,
            )

            # Optionally, print out the created project
            self.stdout.write(self.style.SUCCESS(f'Project created: {project.title}'))
