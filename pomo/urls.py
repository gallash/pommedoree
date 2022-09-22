from django.urls import path
from . import views

urlpatterns = [
    path('', views.main_page, name="main-page"),
    path('about/', views.about_page, name="about-page")
]