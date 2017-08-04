from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from server.models import Tarefa
from server.serializers import TarefaSerializer

@csrf_exempt
def tarefa_lista(request):
    if request.method == 'GET':
        tarefa = Tarefa.objects.all()
        serializer = TarefaSerializer(tarefa, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TarefaSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def tarefa_detalhada(request, pk):
    try:
        tarefa = Tarefa.objects.get(pk=pk)
    except Tarefa.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = TarefaSerializer(tarefa)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = TarefaSerializer(tarefa, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=202)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        tarefa.delete()
        return HttpResponse(status=204)