# UpMySalary Resume Optimizer

An AI-powered resume optimization web application that transforms basic resumes into professional, ATS-friendly documents using advanced OpenAI GPT-4 technology.

## Features

### 🔥 Three Optimization Modes

1. **Standard Polish** - Upload your existing resume for AI enhancement with better phrasing, structure, and metrics
2. **Job Tailoring** - Upload resume + job descriptions to get perfectly tailored versions for each opportunity
3. **Start from Scratch** - No resume? Input your work history and we'll create a professional resume from scratch

### ⚡ Key Benefits

- **Lightning Fast**: Get optimized resumes in under 60 seconds
- **ATS Optimized**: Beat applicant tracking systems with keyword optimization
- **Multiple Formats**: Download as Word (.docx) or PDF
- **Email Notifications**: Get notified when your resume is ready
- **Professional Formatting**: Bold capitals, proper spacing, clean structure

## Tech Stack

### Frontend
- **React.js** with TypeScript
- **Tailwind CSS** for styling
- **Wouter** for routing
- **TanStack Query** for data fetching
- **Radix UI** components
- **Framer Motion** for animations

### Backend
- **Express.js** server
- **PostgreSQL** database with Drizzle ORM
- **OpenAI GPT-4** for intelligent optimization
- **SendGrid** for email notifications
- **Multer** for file uploads

### File Processing
- **PDF parsing** with pdfjs-dist
- **Word document** creation with docx library
- **Multi-format** export capabilities

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- OpenAI API key
- SendGrid API key

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd upmysalary-resume-optimizer
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file with:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/resume_optimizer
OPENAI_API_KEY=your_openai_api_key
SENDGRID_API_KEY=your_sendgrid_api_key
```

4. **Initialize the database**
```bash
npm run db:push
```

5. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and API client
│   │   └── hooks/          # Custom React hooks
├── server/                 # Express backend
│   ├── lib/                # Business logic
│   │   ├── openai.ts       # AI optimization
│   │   ├── file-parser.ts  # Document parsing
│   │   ├── email.ts        # Email notifications
│   │   └── pdf-generator.ts # PDF creation
│   ├── routes.ts           # API endpoints
│   └── storage.ts          # Database operations
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schema
└── attached_assets/        # Sample resumes and assets
```

## API Endpoints

### Resume Optimization
- `POST /api/resume/optimize/standard` - Standard resume polish
- `POST /api/resume/optimize/advanced` - Job tailoring with multiple descriptions

### Job Management
- `GET /api/resume/job/:id/status` - Check job status
- `GET /api/resume/job/:id/results` - Get optimization results

### File Downloads
- `GET /api/download/:fileId` - Download optimized resume
- `GET /api/view/:fileId` - View resume in browser

## Database Schema

### Resume Jobs
- Job tracking with status (pending, processing, completed, failed)
- Stores original content and optimization results
- Links to generated files

### Stored Files
- File storage with expiration (24 hours)
- Base64 encoded content for Word/PDF documents
- Download URL generation

## Key Features Implementation

### AI Optimization
- Uses OpenAI GPT-4 for intelligent resume enhancement
- Enforces professional formatting rules
- Removes fabricated contact information
- Maintains original facts while improving presentation

### Document Processing
- Parses PDF and Word documents
- Generates clean, ATS-friendly output
- Creates properly formatted Word documents with bold capitals
- Exports to multiple formats

### Email Notifications
- Welcome email when job starts
- Completion notification with download links
- Professional HTML email templates

## Development Scripts

```bash
npm run dev          # Start development server
npm run db:push      # Push schema changes to database
npm run build        # Build for production
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 | Yes |
| `SENDGRID_API_KEY` | SendGrid API key for emails | Yes |
| `NODE_ENV` | Environment (development/production) | No |

## Deployment

The application is designed for deployment on Replit with:
- Automatic environment variable management
- Built-in PostgreSQL database
- Zero-config deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software. All rights reserved.

## Support

For support or questions, contact: support@upmysalary.com

---

Built with ❤️ for professionals who want better resumes, faster.