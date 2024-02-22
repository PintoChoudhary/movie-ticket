from django.urls import path
from . import views

urlpatterns = [
    path('movies/', views.MovieListView.as_view(), name='movie-list'),
    path('movies/<int:id>/', views.SingleMovieView.as_view(), name='single-movie'),
    path('register/', views.UserRegistrationView.as_view(), name='user-registration'),
    path('login/', views.UserLoginView.as_view(), name='user-login'),
    path('cinemas/', views.CinemasView.as_view(), name='Cinemas'),
]
