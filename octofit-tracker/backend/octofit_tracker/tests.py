from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from .models import Team, User, Activity, Leaderboard, Workout

class APITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.team = Team.objects.create(name='Marvel')
        self.user = User.objects.create_user(username='ironman', email='ironman@marvel.com', password='1234', team=self.team)
        self.workout = Workout.objects.create(name='Pushups', description='Do 20 pushups', difficulty='easy')
        self.activity = Activity.objects.create(user=self.user, type='run', duration=30, calories=300)
        self.leaderboard = Leaderboard.objects.create(user=self.user, score=1000)

    def test_user_list(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, 200)

    def test_team_list(self):
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, 200)

    def test_activity_list(self):
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, 200)

    def test_leaderboard_list(self):
        response = self.client.get('/api/leaderboards/')
        self.assertEqual(response.status_code, 200)

    def test_workout_list(self):
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, 200)
