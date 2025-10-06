# Étape 1 : Choisir une image Python officielle
FROM python:3.12-slim

# Étape 2 : Définir le répertoire de travail dans le container
WORKDIR /app

# Étape 3 : Installer les dépendances système nécessaires
RUN apt-get update && apt-get install -y \ 
    gcc \
    libpq-dev \ 
    && rm -rf /var/lib/apt/lists/*

# Étape 4 : Copier le fichier requirements.txt dans l’image
COPY requirements.txt .

# Étape 5 : Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Étape 6 : Copier tout le code du backend dans le container
COPY . .

# Étape 7 : Exposer le port 8000 (Django tourne dessus)
EXPOSE 8000

# Étape 8 : Commande de lancement
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
