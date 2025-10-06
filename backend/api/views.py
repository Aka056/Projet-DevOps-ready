from django.shortcuts import render
from rest_framework import generics
from .models import Transaction #on importe notre modèle Transaction
from .serializers import TransactionSerializer #on importe notre sérialiseur TransactionSerializer

# mise en place du views pour gerer le CRUD de notre api

class TransactionListCreateView(generics.ListCreateAPIView): #on crée une vue qui hérite de ListCreateAPIView pour lister et créer des transactions
    queryset = Transaction.objects.all() #on demande à Django de récupérer tous les objets Transaction de la base de données
    serializer_class = TransactionSerializer #on définit le sérialiseur comme étant TransactionSerializer
    #par défaut ListCreateAPIView gère les requêtes GET et POST donc on n'a pas besoin de définir des méthodes get() et post()

# On dispose donc du GET et du POST pour le Create et le Read de notre CRUD

#Occupons nous mtn du Update et du Delete
#pour cela on va créer une nouvelle vue qui va gérer les requêtes PUT, PATCH et DELETE

class TransactionRetrieveUpdateDestroyview(generics.RetrieveUpdateDestroyAPIView) : #Retrieve pour lire une transaction, Update pour la modifier et Destroy pour la supprimer
    queryset = Transaction.objects.all() 
    serializer_class = TransactionSerializer
    lookup_field = 'id' #on précise que l'on va chercher les transactions par leur id (par défaut c'est 'pk' pour primary key)