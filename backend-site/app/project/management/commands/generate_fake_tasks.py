from django.core.management.base import BaseCommand
from faker import Faker
import random
from django.contrib.auth.models import User
from app.project.models import Project, Task


class Command(BaseCommand):
    help = 'Generate fake tasks for the database'

    def handle(self, *args, **kwargs):
        fake = Faker()
        num_tasks = 10
        projects = Project.objects.all()

        if not projects:
            self.stdout.write(self.style.ERROR('No projects found. Please create some projects first.'))
            return

        for _ in range(num_tasks):
            # Choose a random project
            project = random.choice(projects)

            # Generate fake task data
            title = fake.sentence(nb_words=6)
            description = fake.text(max_nb_chars=200)
            completed = random.choice([True, False])

            # Create a new task with fake data
            task = Task.objects.create(
                project=project,
                title=title,
                description=description,
                completed=completed
            )
            self.stdout.write(self.style.SUCCESS(f'Task created: {task.title} (Project: {project.title})'))
