# SoftServe Graduate Management System

A full-stack web application for managing graduate information, built with ASP.NET Core backend and React frontend.

## Tech Stack

**Frontend:**

- React 18
- React Router
- Tailwind CSS
- JavaScript/JSX

**Backend:**

- ASP.NET Core 6+
- Entity Framework Core
- SQL Server
- RESTful API

## Project Structure

```
AspNetCore-React-SqlServer/
├── _LevelUpAssessment-main/    # React Frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── Backend/                    # ASP.NET Core API
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   └── Backend.csproj
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- .NET 6+ SDK
- SQL Server

### Backend Setup

1. Navigate to Backend folder:
   ```bash
   cd Backend
   ```
2. Restore packages:
   ```bash
   dotnet restore
   ```
3. Update connection string in `appsettings.json`
4. Run migrations:
   ```bash
   dotnet ef database update
   ```
5. Start the API:
   ```bash
   dotnet run
   ```

### Frontend Setup

1. Navigate to frontend folder:
   ```bash
   cd _LevelUpAssessment-main
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm start
   ```

## Features

- Graduate management system
- Modern React UI with SoftServe branding
- RESTful API with Entity Framework
- Responsive design
- Database integration

## API Endpoints

- `GET /api/graduate/getall` - Get all graduates
- `GET /api/graduate/getbyid/{id}` - Get single graduate
- `POST /api/graduate/register` - Create graduate
- `PUT /api/graduate/update/{id}` - Update graduate
- `DELETE /api/graduate/delete/{id}` - Delete graduate

## Development

The application runs on:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5122
