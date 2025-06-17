# UpMySalary - AI Resume Optimizer

## Overview

UpMySalary is a web application that uses AI to optimize resumes, offering both standard optimization and advanced job-tailored resume generation. The application provides a complete solution for job seekers to enhance their resumes with ATS optimization, professional formatting, and job-specific tailoring.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **File Processing**: Mammoth for Word docs, custom PDF parsing
- **Document Generation**: docx library for Word files, jsPDF for PDFs

### Database Schema
- **resume_jobs**: Main job tracking table with status, content, and metadata
- **stored_files**: File storage with base64 content and expiration (24 hours)
- Uses JSON fields for job descriptions and output file metadata

## Key Components

### File Processing Pipeline
1. **Upload Validation**: Supports PDF and DOCX files up to 10MB
2. **Content Extraction**: Text parsing from uploaded documents
3. **AI Optimization**: OpenAI GPT-4o for resume enhancement
4. **Document Generation**: Professional formatting in both PDF and Word formats

### AI Integration
- **Primary Model**: OpenAI GPT-4o for resume optimization
- **Standard Mode**: General resume polishing and ATS optimization
- **Advanced Mode**: Job-specific tailoring with keyword matching
- **Safety**: Content validation to prevent fabricated information

### Document Generation
- **PDF Generation**: Custom jsPDF implementation with professional formatting
- **Word Generation**: docx library with proper styling and structure
- **Format Enforcement**: Consistent section headers, spacing, and layout

### Authentication & Sessions
- Session-based tracking without user accounts
- Email collection optional for completion notifications
- File access through secure temporary URLs

## Data Flow

1. **File Upload**: User uploads resume and optionally job descriptions
2. **Content Parsing**: Extract text content from uploaded files
3. **AI Processing**: Send content to OpenAI for optimization
4. **Document Creation**: Generate formatted PDF and Word versions
5. **Storage**: Store files temporarily with download URLs
6. **Notification**: Send completion email if provided
7. **Download**: Secure file access through temporary URLs

## External Dependencies

### Required Services
- **OpenAI API**: GPT-4o model for resume optimization
- **SendGrid**: Email notifications for completion alerts
- **PostgreSQL**: Database for job tracking and file storage

### Development Dependencies
- **Drizzle Kit**: Database schema management and migrations
- **Vite**: Development server and build optimization
- **TypeScript**: Type safety across frontend and backend

### File Processing Libraries
- **mammoth**: Word document text extraction
- **jszip**: ZIP file creation for batch downloads
- **docx**: Word document generation
- **jspdf**: PDF document generation
- **multer**: File upload handling

## Deployment Strategy

### Production Environment
- **Platform**: Replit with auto-scaling deployment
- **Database**: PostgreSQL 16 with connection pooling
- **Build Process**: Vite build for frontend, esbuild for backend
- **Port Configuration**: External port 80, internal port 5000

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: OpenAI API access token
- `SENDGRID_API_KEY`: Email service authentication

### File Storage Strategy
- Temporary storage in database as base64 encoded content
- 24-hour expiration for security and storage management
- Secure download URLs with unique identifiers

## Changelog

- June 17, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.