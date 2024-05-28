# Practiie Report-Backend

Este proyecto es una aplicación web desarrollada con React en el frontend y Express con Postgres en el backend. La aplicación incluye funcionalidades de registro e inicio de sesión para los usuarios.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Dependencias](#dependencias)
- [Instalación e inicialización](#instalación)


## Requisitos 
Asegúrate de tener las siguientes herramientas instaladas:
- Node.js (v14 o superior)
- npm (v6 o superior)
- PostgreSQL (v12 o superior)
- Git

## Dependencias
Estas son las principales dependencias utilizadas en el proyecto:
- @prisma/client: ^5.14.0
- bcrypt: ^5.1.1
- cors: ^2.8.5
- dotenv: ^16.4.5
- express: ^4.19.2
- jsonwebtoken: ^9.0.2
- @types/bcrypt: ^5.0.2
- @types/cors: ^2.8.17
- @types/express: ^4.17.21
- @types/jsonwebtoken: ^9.0.6
- @types/node: ^20.12.12
- nodemon: ^3.1.0
- prisma: ^5.14.0
- ts-node: ^10.9.2
- typescript: ^5.4.5

## Instalación e inicialización
#### 1. Clona este repositorio en tu máquina local:

```bash
  https://github.com/Julius266/Backend-PR.git
```

#### 2. Inicia el contenedor Docker:

```bash
docker-compose up -d
```

#### 2.1 Ver si los contenedores estan funcionando.
```bash
docker ps
```
#### 2.2. Detener docker.
```bash
docker-compose down
```
#### 2.3. Resetear el docker.
```bash
docker restart
```

