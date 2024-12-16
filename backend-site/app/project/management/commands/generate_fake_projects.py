from django.core.management.base import BaseCommand
from faker import Faker
import random
from django.contrib.auth.models import User
from app.project.models import Project, Task
class Command(BaseCommand):
    help = 'Generate fake projects for the database'

    def handle(self, *args, **kwargs):
        fake = Faker()
        num_projects = 10
        for _ in range(num_projects):
            title = fake.sentence(nb_words=5)  # Random project title
            description = fake.text(max_nb_chars=200)  # Random project description
            project = Project.objects.create(
                title=title,
                description=description,
            )

            self.stdout.write(self.style.SUCCESS(f'Project created: {project.title}'))
