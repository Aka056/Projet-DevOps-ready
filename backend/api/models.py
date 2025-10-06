from django.db import models
import uuid

class Transaction(models.Model): # on fait hériter notre transaction de la classe Model

    #notre transaction sera d'abord caractériser par un id
    id = models.UUIDField(primary_key=True , default=uuid.uuid4 , editable=False) #on crée un champ id qui sera une  clé primaire de type UUID(uuid est une technique pr génerer un id aléatoire de style 123e4567-e89b-12d3-a456-426614174000)

    #ensuite notre transaction sera suivie d'un text pour décrire la transaction
    text = models.CharField(max_length=255) #on crée un champ text qui sera une chaîne de caractères d'une longueur maximale de 200
    
    #ensuite notre transaction sera suivie d'un amount pour décrire le montant de la transaction
    amount = models.DecimalField(max_digits=10 , decimal_places=2) #on crée un champ amount qui sera un nombre décimal avec 10 chiffres max et 2 chiffres après la virgule
    
    #nous voulons aussi la date de création de cette transaction 
    created_at = models.DateTimeField(auto_now_add=True) #on crée un champ created_at qui sera une date et heure et qui sera automatiquement rempli à la création de l'objet

    #on va mtn creer une meta data pour savoir dans quel ordre retourner la liste de nos transactions 
    class Meta:
        ordering = ['-created_at'] #on ordonne les transactions par date de création (la plus récente en premier)

    def __str__(self): #on crée une méthode __str__ pour retourner une instance de notre transaction sous forme de chaîne de caractères
        return f"{self.text} : {self.amount}" #on retourne le text et le amount de la transaction
