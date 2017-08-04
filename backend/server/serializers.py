from rest_framework import serializers
from server.models import Tarefa

class TarefaSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=64)
    completed = serializers.BooleanField(default=False)
    created = serializers.DateTimeField()
    
    def create(self, validated_data):
        return Tarefa.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.completed = validated_data.get('completed', instance.completed)
        instance.save()
        return instance