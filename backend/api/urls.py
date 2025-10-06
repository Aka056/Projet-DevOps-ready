from django.contrib import admin
from django.urls import path
from . import views #ici "." signifie le répertoire courant (api) et on importe views.py


urlpatterns = [
    path('transactions/', views.TransactionListCreateView().as_view(), name='transaction-list-create'), #on crée une route pour accéder à notre vue TransactionListCreateView, on rajoute  .as_view() pour convertir la classe en vue exploitable  
    path('transactions/<uuid:id>/', views.TransactionRetrieveUpdateDestroyview.as_view(), name='transaction-detail'), #on crée une route pour accéder à notre vue TransactionRetrieveUpdateDestroyview, on met <uuid:id> en argument car c'est l'id de la transaction (de type uuid) que l'on veut modifier ou supprimer
]
