from django.conf.urls import url
from server import views

urlpatterns = [
    url(r'^tarefa/$', views.tarefa_lista),
    url(r'^tarefa/(?P<pk>[0-9]+)/$', views.tarefa_detalhada)
    ]
