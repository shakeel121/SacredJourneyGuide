# Authentic Hajj & Umrah Guide

A comprehensive virtual learning application for Hajj, Umrah, and Masjid e Nabawi guidance with authentic references from Saudi Salafi Ulema and advertisement capabilities.

![Hero Image](https://images.unsplash.com/photo-1537031934600-7046ab816a21?q=80&w=1200&auto=format&fit=crop)

## Features

- 📚 **Comprehensive Learning Content**: Step-by-step guides for Hajj, Umrah, and Masjid e Nabawi
- 🕋 **Authentic References**: All content is based on authentic references from Saudi Salafi Ulema
- 🌙 **Bilingual Support**: Full English and Arabic language support
- 🔖 **Bookmarking System**: Save and organize your favorite duas and guides
- 🎬 **Video Tutorials**: Watch detailed video explanations and demonstrations
- 🗺️ **Interactive Maps**: Explore important locations with interactive maps
- 📱 **Mobile Responsive**: Optimized experience across all devices
- 🔐 **User Authentication**: Secure sign-in options (Email/Password and Google)
- 👤 **User Profiles**: Personalized experience with progress tracking
- 🌓 **Dark Mode**: Comfortable viewing experience day or night
- 📝 **Blog System**: Keep updated with latest articles and information
- 🧠 **Content Management**: Admin panel for easy content management

## Installation Guide

### Prerequisites

- Node.js 18+ installed
- Git installed
- Firebase account (for authentication)
- PostgreSQL database (optional, can use in-memory storage for development)

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/hajj-umrah-guide.git
cd hajj-umrah-guide
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database (Optional - only needed if using PostgreSQL)
DATABASE_URL=your_postgres_connection_string

# Firebase Authentication
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

### Step 4: Configure Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Add a web app to your Firebase project
4. Enable Authentication methods:
   - Email/Password
   - Google Sign-In
5. Add your application domain to the authorized domains list
6. Copy the Firebase configuration details to your `.env` file

### Step 5: Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Step 6: Build for Production (When Ready)

```bash
npm run build
```

## Usage Guide

### For Users

#### Authentication

- **Sign Up**: Users can create an account using email/password or Google sign-in
- **Sign In**: Existing users can log in using their credentials
- **Profile**: Access and manage your profile from the top-right user menu

#### Content Navigation

- **Home**: Overview of all available resources
- **Hajj Guide**: Comprehensive step-by-step guide for Hajj rituals
- **Umrah Guide**: Detailed instructions for performing Umrah
- **Masjid Guide**: Information about Masjid e Nabawi
- **Duas Collection**: Collection of authentic duas with references
- **Scholars**: Information about respected scholars

#### Features Usage

- **Language Switch**: Toggle between English and Arabic using the language selector in the header
- **Dark Mode**: Toggle dark/light mode using the theme button in the header
- **Bookmarks**: Click the bookmark icon on any dua or guide to save it for later
- **Video Tutorials**: Click the play button on video content to view demonstrations
- **Interactive Maps**: Use the map controls to zoom, pan, and explore locations
- **Profile Progress**: Track your learning progress in your profile page

### For Administrators

#### Accessing Admin Panel

1. Sign in with an admin account
2. Click on your profile picture in the header
3. Select "Admin Dashboard" from the dropdown menu

#### Content Management

- **Add New Content**: Use the "Add New" button in each section to create new content
- **Edit Content**: Click the edit icon on any item to modify its details
- **Delete Content**: Use the delete icon to remove unwanted content
- **Toggle Visibility**: Enable/disable the visibility of certain items

#### Advertisement Management

- **Add New Ads**: Create new advertisements with title, description, image, and link
- **Manage Ad Locations**: Assign ads to specific locations in the application
- **Toggle Ads**: Enable/disable advertisements as needed

## Mobile Experience

The application is fully responsive and optimized for mobile devices:

- Collapsible navigation menu for small screens
- Touch-friendly interactive elements
- Optimized media playback for mobile
- Responsive layout that adapts to any screen size

## Troubleshooting

### Common Issues

1. **Authentication Errors**:
   - Make sure Firebase is properly configured
   - Check if your authorized domains are correctly set up

2. **Content Not Loading**:
   - Check your internet connection
   - Verify that the API endpoints are responding

3. **Database Connection Issues**:
   - Confirm that your DATABASE_URL is correct
   - Ensure PostgreSQL service is running if using a local database

### Getting Help

If you encounter any issues or have questions, please:

1. Check the documentation
2. Look for similar issues in the repository's issue tracker
3. Create a new issue with a detailed description of the problem

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.