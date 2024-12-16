from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from faker import Faker
import random

class Command(BaseCommand):
    help = 'Generate fake users for the database'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Number of users to create
        num_users = 10

        for _ in range(num_users):
            username = fake.user_name()
            email = fake.email()
            password = fake.password()
            first_name = fake.first_name()
            last_name = fake.last_name()

            # Create a new user with fake data
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name
            )

            # Optionally, print out the created user
            self.stdout.write(self.style.SUCCESS(f'User created: {user.username}'))
