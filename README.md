Profile-builder
## 🚀 Features

### Core Functionality
- **Automated Profile Import**: Import talent data from multiple sources with minimal manual effort
- **Multi-Source Integration**: Support for Instagram, LinkedIn, Google Drive, websites, and resume uploads
- **Smart Profile Generation**: AI-powered profile structuring and enrichment
- **Searchable Database**: Advanced search and filtering capabilities
- **User Authentication**: Secure authentication with Supabase Auth
- **Responsive Design**: Beautiful, mobile-first UI built with Tailwind CSS

### Target Users
- Photographers, Videographers, Graphic Designers, Web Designers
- Film Directors, Content Creators, Artists and Painters
- Any creative professional looking to showcase their work

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** components with shadcn/ui
- **React Router** for navigation
- **React Query** for data fetching

### Backend
- **Supabase** for backend services
  - PostgreSQL database with Row Level Security (RLS)
  - Authentication and user management
  - Edge Functions for serverless processing
  - Real-time subscriptions

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── AuthForm.tsx          # Authentication form component
│   ├── profile/
│   │   ├── ProfileCard.tsx       # Profile display card
│   │   └── ProfileImportWizard.tsx # Multi-step import wizard
│   └── ui/                       # Shadcn/ui components
├── hooks/
│   └── useAuth.tsx              # Authentication context and hook
├── pages/
│   ├── Index.tsx                # Landing page
│   ├── Auth.tsx                 # Authentication page
│   ├── Dashboard.tsx            # Main dashboard
│   └── NotFound.tsx             # 404 page
├── integrations/
│   └── supabase/
│       ├── client.ts            # Supabase client configuration
│       └── types.ts             # Generated database types
└── lib/
    └── utils.ts                 # Utility functions

supabase/
├── config.toml                  # Supabase configuration
└── functions/                   # Edge functions (future implementation)
```

## 🗄️ Database Schema

### Tables

#### `profiles`
- User profile information and professional details
- Links to social media accounts and websites
- Bio, location, and verification status

#### `work_samples`  
- Portfolio items and work samples
- Media files with descriptions and source tracking
- Support for images, videos, documents, and links

#### `tags`
- Categorization system for skills, industries, and styles
- Hierarchical organization (skill, industry, style)

#### `profile_tags`
- Many-to-many relationship between profiles and tags

#### `import_sources`
- Tracking of import sources and processing status
- Error handling and retry logic for failed imports

### Security Features
- Row Level Security (RLS) enabled on all tables
- Proper authentication policies and user data isolation
- Secure file uploads and storage with Supabase Storage

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase project

### Quick Start

1. **Clone and install**
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
```

2. **Start development**
```bash
npm run dev
```

3. **Create your first profile**
   - Visit the application in your browser
   - Sign up for a new account
   - Follow the profile import wizard
   - Add your social media links and portfolio

## 🎯 Core Workflows

### 1. User Onboarding Flow
1. User registration with email/password
2. Profile import wizard with step-by-step guidance
3. Basic information collection (name, profession, bio, location)
4. Import sources selection (Instagram, LinkedIn, website, etc.)
5. Automated profile creation and import tracking

### 2. Profile Discovery
1. Browse talent profiles with search and filtering
2. Filter by profession, skills, and location
3. View detailed profile cards with social links
4. Contact and collaboration features (planned)

### 3. Profile Management
1. Edit profile information and bio
2. Add/remove social media links
3. Upload work samples and portfolio items
4. Manage tags and categorization

## 🔮 Future Enhancements

### Planned Features
- **AI Integration**: OpenAI/Claude API for automatic content analysis and profile enrichment
- **Advanced Import Processing**: Real-time data extraction from social platforms
- **Portfolio Management**: Advanced work sample organization and presentation
- **Recommendation System**: AI-powered talent matching and suggestions
- **Analytics Dashboard**: Profile performance and engagement metrics
- **Team Collaboration**: Multi-user workspace and project management
- **API Access**: RESTful API for external integrations

## 🔒 Security & Performance

### Security Measures
- JWT-based authentication with Supabase Auth
- Row Level Security (RLS) on all database operations
- Input validation and sanitization
- Secure file uploads with virus scanning
- Regular security audits and updates

### Performance Optimizations
- Optimized database queries with proper indexing
- Image optimization and CDN delivery
- Lazy loading for large datasets
- Efficient state management with React Query
- Progressive web app capabilities

## 🐛 Troubleshooting

### Common Issues

1. **Authentication Problems**
   - Verify Supabase configuration
   - Check email confirmation settings
   - Review RLS policies

2. **Profile Import Issues**
   - Validate source URLs and permissions
   - Check API rate limits
   - Review error logs in Supabase dashboard

3. **Database Connectivity**
   - Ensure proper migrations are applied
   - Verify user permissions and RLS policies

## 📊 Database Configuration

The application uses Supabase with the following configuration:
- **Database**: PostgreSQL with automatic backups
- **Authentication**: Email/password with social providers support
- **Storage**: File uploads for resumes and portfolio items
- **Edge Functions**: Serverless processing for data import
- **Real-time**: Live updates for collaborative features
