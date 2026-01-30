<img src="./public/thumbnail.webp" alt="Signalist Banner" width="100%">
 <h1>🎓 Express Lane </h1>
  <p><strong>Course generation just got easy</strong></p>

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js) ![React](https://img.shields.io/badge/React-blue?style=for-the-badge&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css) ![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

[Overview](#-application-overview) • [Getting Started](#-getting-started) • [Dashboard](#-dashboard) • [Create Course](#-create-course) • [Course Management](#-course-management) • [Explore Courses](#-explore-courses) • [Tech Stack](#️-tech-stack)

---

## 📚 Application Overview

**ExpressLane** is an intelligent, full-stack AI-powered course generator that revolutionizes the way educational content is created. Built with cutting-edge technologies including Next.js, React, TailwindCSS, Google Gemini AI, Clerk authentication, and Drizzle ORM, ExpressLane empowers educators, content creators, and lifelong learners to generate comprehensive, professional courses in minutes rather than weeks.

### Key Features

* **AI-Powered Course Generation**: Automatically create complete course structures using Google Gemini AI
* **Intelligent Chapter Creation**: Generate detailed chapter content with AI-driven insights
* **Automatic Video Integration**: Seamlessly integrate relevant YouTube videos for each chapter
* **Custom Course Layouts**: Define course difficulty, duration, and number of chapters
* **Image Upload & Management**: Add custom cover images to personalize your courses
* **Real-time Editing**: Edit course information and chapter content on the fly
* **Secure Authentication**: Enterprise-grade user management powered by Clerk
* **Course Library**: Browse and explore courses created by the community
* **Personal Dashboard**: Manage all your courses in one centralized location
* **Instant Deployment**: Production-ready with one-click deployment capabilities

Built for educators, entrepreneurs, and knowledge sharers who want to transform their expertise into structured, engaging online courses without the traditional time investment.

---

## 🚀 Getting Started

### For New Users

<div align="center">
  <img src="https://img.shields.io/badge/Sign_Up-Get_Started-blue?style=for-the-badge" alt="Sign Up">
</div>

#### Create Your Account

1. **Sign Up**: Navigate to the landing page and click "Get Started" or "Sign Up"
2. **Secure Authentication**: Create your account using Clerk's authentication system
   - Email/Password registration
   - Social sign-on options (Google, GitHub, and more)
   - Multi-factor authentication available
3. **Verify Your Email**: Complete email verification for account security
4. **Access Dashboard**: Upon successful registration, you'll be redirected to your personalized dashboard
5. **Start Creating**: Begin generating your first AI-powered course immediately

Our streamlined onboarding process gets you from signup to course creation in under 2 minutes.

<div align="center">
  <img src="https://img.shields.io/badge/Already_Registered-Sign_In-green?style=for-the-badge" alt="Sign In">
</div>

---

### For Existing Users

#### Welcome Back

1. **Sign In**: Use your registered credentials to access your account
2. **Secure Sessions**: Powered by Clerk for enterprise-grade security and session management
3. **Instant Access**: Redirected directly to your personalized dashboard
4. **Resume Work**: All your courses, drafts, and preferences are automatically loaded
5. **Continue Creating**: Pick up exactly where you left off

Your data is securely stored and synchronized across all your devices for seamless access.

---

## 📊 Dashboard

<div align="center">
  <img src="https://img.shields.io/badge/Your_Command_Center-Dashboard-purple?style=for-the-badge" alt="Dashboard">
</div>

Once you sign in, you'll land on your **personalized dashboard**—your central hub for managing all your AI-generated courses. The dashboard is designed with clarity and efficiency in mind, giving you complete control over your course creation journey.

### Dashboard Overview

The dashboard provides a comprehensive view of your course creation activities with an intuitive, clean interface that includes:

**Header Section**:
- Welcome message with your personalized greeting
- Quick "Create New Course" button for instant course generation
- User profile menu with account settings and logout options

**Course Statistics**:
- Total number of courses created
- Recently accessed courses
- Course creation timeline
- Storage usage metrics

### Your Course Library

Your courses are displayed in a **responsive grid layout** featuring interactive course cards. Each course card displays:

**Course Information**:
- **Course Title**: Clear, prominent display of your course name
- **Category Badge**: Visual indicator of the course subject area
- **Course Banner**: Custom uploaded image or AI-generated placeholder
- **Course Level**: Difficulty indicator (Beginner, Intermediate, Advanced, All Levels)
- **Duration**: Estimated time to complete (in hours)
- **Chapter Count**: Number of modules included in the course
- **Creation Date**: When the course was generated

**Quick Actions**:
- **View Course**: Navigate to the full course view with all chapters and content
- **Edit Course**: Modify course details, chapters, and content
- **Delete Course**: Remove courses you no longer need (with confirmation prompt)
- **Share Course**: Generate shareable links for your published courses

### Empty State Experience

If you haven't created any courses yet, the dashboard displays an engaging empty state with:
- Motivational illustration
- "Create Your First Course" call-to-action button
- Quick tips on getting started with course generation
- Examples of popular course topics

### Navigation Sidebar

The left sidebar provides quick access to:
- **Dashboard**: Your home base (current page)
- **Create Course**: Jump directly to the course creation wizard
- **Explore**: Browse courses created by the community
- **My Courses**: Filtered view of all your created courses
- **Settings**: Account preferences and customization options

The dashboard automatically refreshes to show your latest courses and updates, ensuring you always have the most current information at your fingertips.

---

## 🎨 Create Course

<div align="center">
  <img src="https://img.shields.io/badge/AI_Powered-Course_Creation-orange?style=for-the-badge" alt="Create Course">
</div>

The **Create Course** feature is where ExpressLane's AI capabilities truly shine. This multi-step wizard guides you through creating a complete, professional course in minutes using the power of Google Gemini AI.

### Step 1: Course Category & Topic

**Select Your Category**:
Choose from a wide range of predefined categories to help the AI understand your course context:
- Programming & Development
- Business & Entrepreneurship
- Design & Creativity
- Marketing & Sales
- Personal Development
- Health & Fitness
- Language Learning
- Data Science & Analytics
- And many more...

**Define Your Topic**:
- Enter a descriptive topic for your course (e.g., "Introduction to React Hooks")
- Provide additional context or specific focus areas
- Add keywords to help the AI generate more targeted content

### Step 2: Course Configuration

**Course Details**:
- **Course Title**: Auto-generated by AI or manually customize
- **Course Description**: AI-generated overview that you can edit
- **Difficulty Level**: Choose from:
  - 🟢 **Beginner**: For complete newcomers to the topic
  - 🟡 **Intermediate**: For those with foundational knowledge
  - 🔴 **Advanced**: For experienced learners seeking deep expertise
  - 🔵 **All Levels**: Comprehensive courses suitable for everyone

**Course Structure**:
- **Number of Chapters**: Select between 1-15 chapters
- **Course Duration**: Specify estimated completion time (1-50+ hours)
- **Include Videos**: Toggle automatic YouTube video integration
- **Include Quizzes**: Option to add AI-generated assessment questions

### Step 3: AI Generation Process

Once you've configured your course preferences, click **"Generate Course with AI"** to initiate the intelligent creation process:

**Generation Workflow**:

1. **Course Layout Generation** (15-30 seconds):
   - AI analyzes your topic and configuration
   - Creates a comprehensive course outline
   - Generates chapter titles and descriptions
   - Structures learning progression logically
   - Displays a loading skeleton with progress indicators

2. **Chapter Content Generation** (30-60 seconds):
   - For each chapter, AI generates:
     - Detailed explanations and learning objectives
     - Key concepts and definitions
     - Practical examples and use cases
     - Code snippets (for programming courses)
     - Best practices and tips
   - Content is optimized for readability and engagement

3. **YouTube Video Integration** (20-40 seconds):
   - Automatically searches for relevant educational videos
   - Matches video content to each chapter topic
   - Embeds high-quality tutorial videos
   - Provides video metadata (title, channel, duration)
   - Filters for reputable educational content

4. **Course Finalization**:
   - Saves complete course structure to database
   - Generates unique course ID
   - Creates shareable course link
   - Redirects to course editing interface

**Real-time Feedback**:
Throughout the generation process, you'll see:
- Progress bars indicating completion percentage
- Status messages for each generation step
- Loading animations and skeleton screens
- Success notifications upon completion

### Step 4: Course Customization

After AI generation completes, you're taken to the **Course Editing Interface** where you can:

**Edit Course Information**:
- Modify course title and description
- Change difficulty level or duration
- Update category selection
- Add custom tags and metadata

**Upload Custom Banner**:
- Click "Upload Image" to add a course cover
- Supports JPG, PNG, and WebP formats
- Automatic image optimization and resizing
- Preview before saving
- Cloud storage integration for fast loading

**Chapter Management**:
- Reorder chapters with drag-and-drop
- Edit chapter titles and descriptions
- Modify AI-generated content
- Add or remove chapters
- Adjust chapter duration estimates

**Video Management**:
- Replace auto-selected videos with custom choices
- Add additional video resources
- Remove videos that don't fit
- Embed videos from multiple platforms

**Content Enhancement**:
- Add rich text formatting (bold, italics, lists)
- Insert code blocks with syntax highlighting
- Include images and diagrams
- Create downloadable resources
- Add external links and references

### Save & Publish

Once you're satisfied with your course:
- Click **"Save Changes"** to update the course
- Set course visibility (Private, Unlisted, Public)
- Generate shareable links for distribution
- Export course content in various formats
- Publish to the Explore page for community access

The entire course creation process—from initial concept to publishable course—can be completed in **5-10 minutes**, revolutionizing how quickly you can transform knowledge into structured learning experiences.

---

## 📝 Course Management

<div align="center">
  <img src="https://img.shields.io/badge/Manage-Your_Courses-teal?style=for-the-badge" alt="Course Management">
</div>

ExpressLane provides comprehensive tools for managing your course library, ensuring you have full control over every aspect of your educational content.

### View Course Interface

When you click on any course from your dashboard, you're taken to the **detailed course view**—a beautifully designed interface that presents your course in its full glory.

**Course Header**:
- Large, prominent course banner image
- Course title and subtitle
- Category badge and difficulty indicator
- Author information (your profile)
- Social sharing buttons
- Enrollment statistics (if public)

**Course Overview Section**:
- Comprehensive course description
- Learning objectives and outcomes
- Prerequisites (if any)
- Estimated completion time
- Total chapter count
- Target audience information

**Chapter Navigation**:
The left sidebar displays a **collapsible chapter list** with:
- Sequential chapter numbering
- Chapter titles and duration
- Progress indicators (for enrolled students)
- Video availability icons
- Quick jump navigation to any chapter
- Completed chapter checkmarks

**Chapter Content Display**:
When you select a chapter, the main content area shows:

1. **Chapter Title & Overview**:
   - Clear chapter heading
   - Brief introduction to the topic
   - Learning objectives for this specific chapter

2. **Rich Content Section**:
   - AI-generated explanatory content
   - Formatted text with headings and paragraphs
   - Code blocks with syntax highlighting (for technical courses)
   - Bullet points and numbered lists
   - Embedded images and diagrams
   - Callout boxes for important notes

3. **Video Integration**:
   - Embedded YouTube video player
   - Video title and channel information
   - Video duration display
   - Full-screen viewing option
   - Playback controls
   - Related videos suggestions

4. **Additional Resources**:
   - Downloadable materials (PDFs, code files, etc.)
   - External links and references
   - Practice exercises or quizzes
   - Discussion prompts

**Navigation Controls**:
- **Previous Chapter** button: Navigate to the preceding module
- **Next Chapter** button: Continue to the next module
- **Back to Course Overview**: Return to the main course page
- **Progress Tracker**: Visual indicator of course completion

### Edit Course Functionality

Click the **"Edit Course"** button from any course view to enter editing mode:

**Course Information Editing**:
- Inline editing for course title and description
- Dropdown menus for category and difficulty changes
- Duration adjustment slider
- Tag management interface
- Metadata editing (keywords, prerequisites, etc.)

**Chapter Editing Interface**:
Each chapter can be edited individually with:
- **Title Editor**: Click to edit chapter titles directly
- **Content Editor**: Rich text editor for modifying chapter content
  - WYSIWYG (What You See Is What You Get) interface
  - Formatting toolbar (bold, italic, underline, etc.)
  - Insert images, links, and code blocks
  - Markdown support for advanced users
- **Video Editor**: 
  - Replace current video with a different YouTube link
  - Search and insert new videos directly
  - Adjust video start time and playback settings
- **Duration Adjuster**: Modify estimated chapter completion time

**Bulk Operations**:
- **Reorder Chapters**: Drag and drop to reorganize course structure
- **Duplicate Chapters**: Create copies for similar content
- **Delete Chapters**: Remove unwanted modules (with undo option)
- **Add New Chapters**: Insert additional modules anywhere in the sequence

**Auto-Save Feature**:
- Changes are automatically saved as you edit
- Draft indicator shows unsaved changes
- Manual "Save" button for explicit control
- Version history to revert changes if needed

### Upload Course Image

The **Upload Image** feature allows you to personalize your course with custom branding:

**Image Upload Process**:
1. Click the "Upload Image" button on the course editing page
2. Choose from:
   - **Upload from Computer**: Select JPG, PNG, or WebP files
   - **Drag & Drop**: Simply drag an image file onto the upload area
   - **URL Input**: Paste a direct image link
3. **Image Preview**: See how your image will look before confirming
4. **Automatic Optimization**:
   - Images are automatically resized to optimal dimensions
   - File size compression for fast loading
   - Format conversion for web optimization
5. **Cloud Storage**: Images are uploaded to secure cloud storage
6. **CDN Delivery**: Fast image loading through content delivery network

**Image Specifications**:
- Recommended dimensions: 1200x600 pixels
- Maximum file size: 5MB
- Supported formats: JPG, PNG, WebP
- Aspect ratio: 2:1 (automatically cropped if different)

**Fallback Options**:
- If no custom image is uploaded, a default AI-generated gradient banner is used
- Banner color scheme matches your course category
- Course title overlay on default images

### Delete Course

Remove courses you no longer need with the **Delete Course** functionality:

**Deletion Process**:
1. Navigate to your dashboard or course view
2. Click the **"Delete"** button (trash icon) on the course card
3. **Confirmation Dialog** appears with:
   - Warning message about permanent deletion
   - Course details reminder (title, creation date, chapter count)
   - "Are you sure?" confirmation prompt
4. **Two-Step Confirmation**:
   - Click "Delete" in the dialog
   - Enter course title to confirm (prevents accidental deletion)
5. **Permanent Removal**:
   - Course is immediately removed from your dashboard
   - All chapters and content are deleted from the database
   - Associated images are removed from cloud storage
   - Related data is purged from the system

**Safety Features**:
- Deleted courses cannot be recovered (no trash bin)
- Clear warning messages before deletion
- Type-to-confirm requirement for added safety
- Undo option available for 10 seconds after deletion

---

## 🌐 Explore Courses

<div align="center">
  <img src="https://img.shields.io/badge/Discover-Community_Courses-indigo?style=for-the-badge" alt="Explore Courses">
</div>

The **Explore Page** is your gateway to discovering courses created by the ExpressLane community. Browse, search, and enroll in courses shared by educators and creators from around the world.

### Explore Page Features

**Course Discovery Grid**:
- Responsive grid layout displaying all public courses
- Beautiful course cards with hover effects
- Thumbnail images and category badges
- Quick course information at a glance

**Search & Filter**:
- **Search Bar**: Find courses by title, topic, or keywords
- **Category Filter**: Browse courses by subject area
- **Difficulty Filter**: Filter by Beginner, Intermediate, Advanced, or All Levels
- **Sort Options**:
  - Most Recent: Newest courses first
  - Most Popular: Highest enrollment courses
  - Highest Rated: Best-reviewed courses (if rating system enabled)
  - A-Z: Alphabetical by title

**Course Preview**:
Each course card on the Explore page displays:
- Course banner image
- Course title and description excerpt
- Author name and profile picture
- Category and difficulty badges
- Chapter count and total duration
- Enrollment count (number of students)
- Quick "View Course" button

**Course Details**:
Click on any course to view:
- Full course description and syllabus
- Complete chapter list with titles
- Author bio and credentials
- Student reviews and ratings (if available)
- Enrollment button to add to your learning library

### Community Features

**Course Sharing**:
- Publish your courses to the Explore page
- Share courses via direct links
- Embed courses on external websites
- Social media integration for promotion

**Engagement Metrics**:
- View count tracking
- Enrollment statistics
- Completion rates
- Student feedback and ratings

**Quality Standards**:
- Community guidelines for course content
- Moderation for inappropriate or low-quality courses
- Reporting system for policy violations
- Featured courses section for high-quality content

The Explore page transforms ExpressLane from a personal course generator into a vibrant learning community where knowledge is freely shared and accessible to all.

---

## ⚙️ Tech Stack

ExpressLane is built with a modern, powerful technology stack designed for performance, scalability, and developer experience.

### Core Framework & Language

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js">
</div>

**Next.js**

A powerful React framework for building full-stack web applications with server-side rendering, static site generation, API routes, and optimized performance. Next.js provides the foundation for ExpressLane's lightning-fast user experience and SEO-friendly architecture.

<div align="center">
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React">
</div>

**React**

A JavaScript library for building dynamic, component-based user interfaces. React's declarative approach and virtual DOM enable ExpressLane's interactive course editing features and real-time UI updates.

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
</div>

**TypeScript**

A statically typed superset of JavaScript that enhances code quality, improves developer productivity with intelligent autocomplete, and catches errors before runtime. TypeScript ensures ExpressLane's codebase remains maintainable and bug-free as it scales.

---

### AI & Content Generation

<div align="center">
  <img src="https://img.shields.io/badge/Google_Gemini-AI-blue?style=for-the-badge&logo=google" alt="Gemini AI">
</div>

**Google Gemini API**

Google's advanced multimodal AI model that powers ExpressLane's intelligent course generation. Gemini AI analyzes course topics, generates structured course outlines, creates detailed chapter content, and provides intelligent recommendations—transforming simple prompts into comprehensive educational materials.

**Key Capabilities**:
- Natural language understanding for topic analysis
- Structured content generation with proper formatting
- Context-aware chapter progression
- Educational content optimization
- Multi-language support
- High-quality, coherent long-form text generation

<div align="center">
  <img src="https://img.shields.io/badge/YouTube_API-Video_Integration-red?style=for-the-badge&logo=youtube" alt="YouTube API">
</div>

**YouTube Data API v3**

Enables automatic discovery and embedding of relevant educational videos for each course chapter. The API searches YouTube's vast library, filters for high-quality educational content, and retrieves video metadata for seamless integration into course materials.

**Features Used**:
- Video search with topic-specific queries
- Content filtering and relevance scoring
- Video metadata retrieval (title, description, duration, thumbnail)
- Embed URL generation for player integration
- Channel information and verification

---

### Authentication & User Management

<div align="center">
  <img src="https://img.shields.io/badge/Clerk-Authentication-blue?style=for-the-badge" alt="Clerk">
</div>

**Clerk**

A complete user management platform that handles authentication, user profiles, and session management. Clerk provides ExpressLane with enterprise-grade security, beautiful pre-built UI components, and a developer-friendly API.

**Authentication Features**:
- Email/password authentication
- Social sign-on (Google, GitHub, Apple, Microsoft, and more)
- Multi-factor authentication (MFA)
- Magic link passwordless login
- Session management and JWT tokens
- User profile management
- Role-based access control (RBAC)
- Secure password reset flows

**Developer Benefits**:
- Pre-built, customizable UI components
- React hooks for seamless integration
- Middleware for protecting routes
- Webhook support for user events
- Analytics and user insights

---

### Database & ORM

<div align="center">
  <img src="https://img.shields.io/badge/Drizzle_ORM-TypeScript_ORM-green?style=for-the-badge" alt="Drizzle ORM">
</div>

**Drizzle ORM**

A lightweight, type-safe TypeScript ORM that provides an excellent developer experience for database operations. Drizzle ensures data integrity with full TypeScript support while maintaining high performance and flexibility.

**Key Features**:
- Type-safe queries with autocompletion
- Zero-cost abstractions for optimal performance
- SQL-like syntax for familiarity
- Automatic migrations and schema versioning
- Relational query builder
- Connection pooling for scalability

**Database Schema**:
ExpressLane uses a relational database structure with the following main entities:
- **Users**: Managed by Clerk, referenced by user ID
- **Courses**: Course metadata (title, description, category, difficulty, etc.)
- **Chapters**: Individual course modules with content and video links
- **UserProgress**: Tracking student course completion
- **CourseEnrollments**: Many-to-many relationship for course access

<div align="center">
  <img src="https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql" alt="PostgreSQL">
</div>

**PostgreSQL** (or compatible database)

A powerful, open-source relational database system that stores all course data, user information, and application state. PostgreSQL's ACID compliance ensures data integrity, while its advanced features support complex queries and scalability.

---

### UI & Styling

<div align="center">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="TailwindCSS">
</div>

**TailwindCSS**

A utility-first CSS framework that enables rapid UI development with pre-defined classes. Tailwind's approach allows for creating custom, responsive designs without writing custom CSS, while maintaining consistency across the application.

**Benefits**:
- Rapid prototyping and development
- Responsive design with mobile-first approach
- Dark mode support built-in
- Custom design system with configuration
- Purging unused CSS for minimal bundle size
- JIT (Just-In-Time) compilation for instant builds

<div align="center">
  <img src="https://img.shields.io/badge/Shadcn_UI-Components-black?style=for-the-badge" alt="Shadcn UI">
</div>

**Shadcn UI**

A collection of beautifully designed, accessible React components built with Radix UI and styled with TailwindCSS. Unlike traditional component libraries, Shadcn UI components are copied into your project, giving you full ownership and customization control.

**Components Used**:
- **Forms**: Input fields, textareas, select dropdowns, radio buttons
- **Buttons**: Primary, secondary, ghost, and icon buttons
- **Cards**: Course cards, chapter cards, information displays
- **Dialogs**: Modal windows for confirmations and forms
- **Alerts**: Success, error, warning, and info notifications
- **Skeleton Loaders**: Loading states during AI generation
- **Tabs**: Navigation between course sections
- **Dropdowns**: Context menus and action menus
- **Progress Indicators**: Course completion tracking
- **Tooltips**: Helpful hints and information

**Accessibility Features**:
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Semantic HTML structure

---

### Additional Libraries & Tools

**React Hook Form**
- Form state management and validation
- Used for course creation and editing forms
- Reduces re-renders for better performance

**Zod**
- Schema validation for forms and API requests
- Type-safe validation with TypeScript integration
- User input sanitization and error handling

**Axios / Fetch**
- HTTP client for API requests
- Gemini AI and YouTube API integration
- Error handling and retry logic

**React Icons**
- Comprehensive icon library
- Consistent iconography across the application
- Lightweight SVG icons

**Next.js Image**
- Optimized image loading and delivery
- Automatic image resizing and format conversion
- Lazy loading for performance

**ESLint & Prettier**
- Code linting and formatting
- Consistent code style across the project
- Automated code quality checks

---

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      ExpressLane Platform                       │
├─────────────────────────────────────────────────────────────────┤
│          Frontend: Next.js + React + TypeScript                 │
│                  UI: TailwindCSS + Shadcn UI                    │
├─────────────────────────────────────────────────────────────────┤
│              Authentication: Clerk                              │
├─────────────────────────────────────────────────────────────────┤
│        AI Generation: Google Gemini API                         │
│        Video Integration: YouTube Data API v3                   │
├─────────────────────────────────────────────────────────────────┤
│              Database: PostgreSQL + Drizzle ORM                 │
├─────────────────────────────────────────────────────────────────┤
│      API Routes: Next.js App Router + Server Actions            │
├─────────────────────────────────────────────────────────────────┤
│         Deployment: Vercel (recommended) or any platform        │
└─────────────────────────────────────────────────────────────────┘
```

### Development Workflow

1. **Local Development**:
   - Next.js development server with hot reload
   - TypeScript type checking in real-time
   - Environment variable management with `.env.local`

2. **AI Integration**:
   - Gemini API for course and content generation
   - YouTube API for video discovery and embedding
   - Error handling and fallback mechanisms

3. **Data Flow**:
   - User inputs course parameters in the frontend
   - Next.js API routes process requests
   - Gemini AI generates course structure and content
   - YouTube API fetches relevant videos
   - Drizzle ORM saves data to PostgreSQL
   - Frontend receives and displays generated course

4. **Deployment**:
   - Build-time optimizations with Next.js
   - Static generation for public pages
   - Server-side rendering for dynamic content
   - Database migrations with Drizzle Kit
   - Environment variable configuration
   - One-click deployment to Vercel

This powerful, modern tech stack enables ExpressLane to deliver fast, reliable, and intelligent course generation with an exceptional user experience.

---


### Project Structure

```
expresslane/
├── app/                      # Next.js App Router pages
│   ├── (auth)/              # Authentication pages
│   ├── (dashboard)/         # Dashboard and course pages
│   ├── api/                 # API routes
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── ui/                  # Shadcn UI components
│   ├── course/              # Course-related components
│   └── shared/              # Shared/common components
├── lib/                     # Utility functions and configurations
│   ├── db/                  # Database configuration and schema
│   ├── ai/                  # Gemini AI integration
│   └── youtube/             # YouTube API integration
├── public/                  # Static assets
├── styles/                  # Global styles
└── types/                   # TypeScript type definitions
```

---

## 🌟 Key Highlights

### Why ExpressLane?

**⚡ Speed**: Generate a complete course in 5-10 minutes instead of weeks
**🤖 AI-Powered**: Leverage Google Gemini's advanced language model for intelligent content
**🎥 Video Integration**: Automatic YouTube video discovery for every chapter
**🎨 Beautiful UI**: Modern, responsive design built with TailwindCSS and Shadcn UI
**🔒 Secure**: Enterprise-grade authentication with Clerk
**📱 Responsive**: Works seamlessly on desktop, tablet, and mobile devices
**♿ Accessible**: WCAG compliant with keyboard navigation and screen reader support
**🚀 Fast**: Optimized with Next.js for blazing-fast performance
**💾 Reliable**: Type-safe database operations with Drizzle ORM
**🌐 Scalable**: Built on modern architecture that grows with your needs

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Your Name** (Replace with your name)

- LinkedIn: [linkedin.com/in/AprajitaRanjan](https://www.linkedin.com/in/aprajita-ranjan-961a0523b)
- Email: beliefinaprajita@gmail.com

---

<div align="center">

Made with ❤️ by Aprajita Ranjan

⭐ **Star this repository if you find it helpful!**

![GitHub stars](https://img.shields.io/github/stars/yourusername/expresslane?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/expresslane?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yourusername/expresslane?style=social)

</div>
