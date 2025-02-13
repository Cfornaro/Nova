# Nova TP Final

## 📌 Descripción
Esta es una aplicación web desarrollada en **Node** para gestionar jugadores, personajes y equipos. Permite visualizar un ranking de jugadores, editar información de cada jugador, administrar sus personajes y equipos, y consultar detalles de cada jugador de manera detallada.

## 🚀 Características
- 📋 **Home** con listado de jugadores ordenado por ranking y barra de búsqueda.
- 🏅 **Gestión de Jugadores**: Crear y editar datos de un jugador.
- ⚔️ **Gestión de Personajes**: Agregar, quitar y editar personajes.
- 🏆 **Gestión de Equipos**: Crear, modificar y eliminar equipos de hasta 5 personajes.
- 🔎 **Detalle de Jugador**: Ver información detallada, sus equipos y personajes.

## 🛠️ Tecnologías Utilizadas
- **HTML** (Estructura)
- **CSS** (Estilos)
- **JavaScript** (Funcionalidad)
- **Node.js + Express** (Backend API)
- **Prisma** (ORM para base de datos)
- **PostgreSQL** (Base de datos)
- **Docker** (Contenedores)

## 📋 Gestión del Proyecto
Para la gestión del proyecto, utilizamos Trello como herramienta Kanban. Puedes ver nuestro tablero de Trello en el siguiente enlace:
[Trello Board](https://trello.com/b/zeoUz6lL/tp2-intro)

## 📊 Diagrama de Clases UML
Puedes ver el diagrama de clases UML del proyecto en el siguiente enlace:
[Diagrama de Clases UML](https://drive.google.com/file/d/1O0jRhZgKlRhU1zV4wbaQU_VkLyiBbAQB/view?usp=sharing)

## 🎨 Wireframe
Puedes ver el wireframe del proyecto en el siguiente enlace:
[Wireframe en Miro](https://miro.com/app/board/uXjVLiU2ETE=/)

## 📂 Estructura del Proyecto
```
/Nova
│── /public
│   ├── /pages
│   ├── /styles
│   └── /js
│       ├── /components
│       └── /api
│── /controllers
│── /prisma
│── /routes
│── app.js
│── package.json
│── Dockerfile
│── docker-compose.yml
└── README.md
```

## 🔧 Instalación y Uso
### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/Cfornaro/Nova.git
cd Nova
```

### 2️⃣ Instalar dependencias
Saltear este paso si ejecuta la aplicación con Docker.
```bash
npm install
```

### 3️⃣ Configurar variables de entorno
Crear un archivo **.env** en la raiz del proyecto con:
```env
HTTP_PORT=80
HTTP_IP=0.0.0.0
POSTGRES_USER=exampleuser
POSTGRES_PASSWORD=examplepass
POSTGRES_DB=exampledb
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@direccion:puerto/${POSTGRES_DB}"
```

### 4️⃣ Ejecutar la aplicación

#### Con Node.js
> **Nota:** Asegúrese de tener una base de datos PostgreSQL corriendo y configurada en el archivo `.env`.

```bash
# Iniciar la aplicacion
npm run start

# Iniciar la aplicacion en modo desarrollo
npm run dev
```

#### Con Docker
```bash
# Construir y levantar los contenedores
docker-compose up --build
```
