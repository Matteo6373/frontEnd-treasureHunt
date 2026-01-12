# 🏴‍☠️ Treasure Hunt – Frontend

Questo repository contiene il **frontend Angular** dell’applicazione Treasure Hunt.

Il frontend comunica con il backend Spring Boot tramite API REST esposte su:

```
http://localhost:8080/api
```

Il frontend e il backend vengono eseguiti in **Docker Compose separati** e comunicano tramite `localhost`.

---

## 📦 Backend (prerequisito)

Prima di avviare il frontend è necessario avviare il backend.

Repository backend:

```
https://github.com/Matteo6373/treasureHunt
```

Il backend sarà disponibile su:

```
http://localhost:8080
```

---

## ▶️ Avvio del frontend

Repository frontend:

```
https://github.com/Matteo6373/frontEnd-treasureHunt
```

Clona ed esegui il frontend:

```bash
git clone https://github.com/Matteo6373/frontEnd-treasureHunt
cd frontEnd-treasureHunt
docker compose up -d --build
```

---

## 🌐 Accesso all'applicazione

Una volta avviato, il frontend sarà disponibile su:

```
http://localhost:4200
```

Il frontend comunicherà con il backend tramite:

```
http://localhost:8080/api
```

---

## 🐳 Architettura

```
Browser
   |
   |  http://localhost:4200
   v
Angular Frontend (Docker)
   |
   |  http://localhost:8080/api
   v
Spring Boot Backend (Docker)
   |
   v
Database / AI / Services
```

I due progetti **non condividono la stessa rete Docker**: la comunicazione avviene tramite le porte esposte su `localhost`.

---

## 🛠️ Requisiti

- Docker
- Docker Compose
