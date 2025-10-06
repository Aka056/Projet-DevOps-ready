# TUTO DJANGO REACT

Ce projet est un tutoriel DevOps pour créer et déployer une application web avec Django (backend) et React (frontend), en utilisant Docker pour la gestion des environnements.

## Prérequis

- Docker & Docker Compose
- Python 3.x
- Node.js & npm
- pip

## Installation

### Avec Docker (recommandé)

```bash
docker-compose up --build
```

Cela lance à la fois le backend Django et le frontend React dans des conteneurs séparés.

### Sans Docker

#### Backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # ou `venv\Scripts\activate` sous Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Frontend (React)

```bash
cd frontend
npm install
npm start
```

## Fonctionnalités

- Authentification utilisateur
- API REST avec Django REST Framework
- Interface utilisateur réactive avec React
- Déploiement et orchestration via Docker Compose

## Structure du projet

```
/backend        # Code Django
/frontend       # Code React
/docker-compose.yml  # Orchestration des services
/Dockerfile     # Image Docker personnalisée
```

## Lancer le projet

1. Lancer les services avec Docker Compose.
2. Accéder à l’application via `http://localhost:3000`.

## Auteur

Aka

