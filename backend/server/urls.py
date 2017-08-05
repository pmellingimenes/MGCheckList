from django.conf.urls import url
from server import views

urlpatterns = [
    url(r'^rest/tarefa/$', views.tarefa_lista),
    url(r'^rest/tarefa/(?P<pk>[0-9]+)/$', views.tarefa_detalhada)
    ]
