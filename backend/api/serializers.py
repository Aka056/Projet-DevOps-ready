from rest_framework import serializers
from .models import Transaction
class TransactionSerializer(serializers.ModelSerializer) : # transactionserializer heritera donc de modelserializers contenue dans serializers
    class Meta : #une classe meta contient des instructions ou des options de configuration plutôt que des données sur la classe principale
        model= Transaction #on précise le modèle pour lequel on fait le serializer
        fields = ["id", "text", "amount" , "created_at"] #on précise les champs que l'on veut inclure dans le serializer
        read_only_fields = ["id", "created_at"] #on précise les champs qui seront en lecture seule (non modifiable par l'utilisateur)
