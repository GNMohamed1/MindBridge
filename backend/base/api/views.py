from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CommentSerializer
from base.models import Comment

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]

    return Response(routes)

@api_view(['GET'])
def getComments(request):
    comments = Comment.objects.all().order_by('-created_at')
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addComment(request):
    if request.user.is_authenticated:
        data = request.data
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    return Response({"detail": "Authentication credentials were not provied"}, status=401)