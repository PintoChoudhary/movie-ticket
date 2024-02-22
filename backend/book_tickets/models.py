from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    
    # Provide unique related names for groups and user_permissions
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_groups',  # Choose a unique related name
        blank=True,
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions',  # Choose a unique related name
        blank=True,
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
    )

    objects = CustomUserManager()
    
    
class Movie(models.Model):
    id = models.AutoField(primary_key=True)
    Title = models.CharField(max_length=255)
    Year = models.CharField(max_length=4)
    Rated = models.CharField(max_length=10)
    Released = models.DateField()
    Released = models.CharField(max_length=10)
    Genre = models.CharField(max_length=255)
    Director = models.CharField(max_length=255)
    Writer = models.TextField()
    Actors = models.TextField()
    Plot = models.TextField()
    Language = models.CharField(max_length=255)
    Country = models.CharField(max_length=255)
    Awards = models.TextField()
    Poster = models.URLField()
    Metascore = models.CharField(max_length=5)
    imdbRating = models.CharField(max_length=5)
    imdbVotes = models.CharField(max_length=20)
    imdbID = models.CharField(max_length=20)
    Type = models.CharField(max_length=20)
    Response = models.BooleanField()
    Images = models.URLField()
    
    def __str__(self):
        return self.Title


from django.db import models

class Cinemas(models.Model):
    cinema_id = models.IntegerField(primary_key=True)
    cinema_name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    address2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    county = models.CharField(max_length=100, blank=True)
    postcode = models.IntegerField()
    lat = models.FloatField()
    lng = models.FloatField()
    distance = models.FloatField()
    logo_url = models.URLField()

    def __str__(self):
        return self.cinema_name
