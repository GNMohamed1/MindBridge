from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from base.models import Comment

class CommentSerializer(ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'username', 'body', 'created_at']
