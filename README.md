# BreadButter - Smart Talent Profile Builder

BreadButter is a full-stack platform that automatically creates structured, searchable profiles for creative talent by importing data from various sources like Instagram, LinkedIn, Google Drive, websites, and resumes.

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
- Supabase project (automatically configured)

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

## Project Links

**Lovable Project**: https://lovable.dev/projects/2c160c76-4964-44cf-a2b4-7aea4178b2a1

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2c160c76-4964-44cf-a2b4-7aea4178b2a1) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2c160c76-4964-44cf-a2b4-7aea4178b2a1) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
