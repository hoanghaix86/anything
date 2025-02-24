# API File Management

## Tech Stack

- **Framework**: NestJS with TypeORM
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Storage**: LocalDisk
- **Authentication**: Token-based authentication
- **Package Manager**: PNPM
- **Architecture**: Domain Driven Design (DDD) + Hexagonal Architecture + Clean Architecture

## Features

### Authentication

- User Sign Up
- User Sign In
- Change Password

### Storage Management

- Default storage quota of 15GiB per account
- Quota management
  - View current usage
  - Change quota limits
  - Automatic quota tracking

### File Operations

- Upload Files
  - Support for various file types
  - Automatic size validation against quota
- File Management
  - Rename files
  - Move files between folders
  - Soft delete (move to trash)
  - Hard delete (permanent removal)
  - Size tracking and quota updates

### Folder Operations

- Create new folders
- Rename existing folders
- Move folders (including subfolders)
- Delete folders
  - Soft delete (move to trash)
  - Hard delete (permanent removal)

### Search Functionality

- Search across files and folders
- Results include:
  - Item ID
  - Item name
  - Item type (file/folder)

## Project Structure

The project follows a clean architecture pattern with three main layers:

```txt
src/
├── domain/        # Business logic and entities
├── application/   # Use cases and application services
└── infrastructure/# Framework-specific code and implementations
```

## Usage
