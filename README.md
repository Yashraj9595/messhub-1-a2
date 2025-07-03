# MessMaster - React RBAC System

A complete Role-Based Access Control (RBAC) system built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Authentication System
- **Welcome Screen** - Landing page with platform overview
- **Login/Register** - User authentication with role selection
- **Forgot Password** - Password reset flow with OTP verification
- **Multi-step Registration** - Role selection and account setup

### Role-Based Dashboards
- **User Dashboard** - Browse menu, place orders, view order history
- **Mess Owner Dashboard** - Menu management, order processing, analytics
- **Admin Dashboard** - User management, admin creation, system settings

### Security Features
- **Protected Routes** - Role-based access control
- **Session Management** - Persistent login with localStorage
- **Permission System** - Granular permission checking
- **Role Hierarchy** - Hierarchical role access levels

## 🛠️ Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Context API** for state management
- **Lucide React** for icons
- **Local Storage** for session persistence

## 📁 Project Structure

\`\`\`
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── card.tsx
│   ├── auth/                  # Authentication screens
│   │   ├── WelcomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── ForgotPasswordScreen.tsx
│   │   ├── OTPVerificationScreen.tsx
│   │   ├── ResetPasswordScreen.tsx
│   │   └── SuccessScreen.tsx
│   ├── user/                  # User role components
│   │   └── UserDashboard.tsx
│   ├── mess-owner/            # Mess owner components
│   │   └── MessOwnerDashboard.tsx
│   ├── admin/                 # Admin components
│   │   └── AdminDashboard.tsx
│   └── ProtectedRoute.tsx     # Route protection
├── contexts/
│   └── AuthContext.tsx        # Authentication state
├── utils/
│   └── roleUtils.ts           # Role utilities
├── App.tsx                    # Main app component
├── index.tsx                  # React entry point
└── index.css                  # Tailwind styles
\`\`\`

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd messmaster-rbac
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Start development server**
\`\`\`bash
npm start
\`\`\`

4. **Open your browser**
Navigate to `http://localhost:3000`

## 🔐 Test Credentials

Use these credentials to test different roles:

- **User**: `user@example.com` / `123456`
- **Mess Owner**: `owner@example.com` / `123456`  
- **Admin**: `admin@example.com` / `123456`

## 🎯 Role Permissions

### User (Food Lover)
- Browse menu items
- Place orders
- View order history
- Update profile

### Mess Owner
- All User permissions
- Manage menu items
- Process orders
- View analytics
- Manage customers

### Project Admin
- All permissions
- User management
- Create new admins
- System settings
- View all data

## 🔧 Key Components

### Authentication Flow
1. **Welcome Screen** → Role-based entry point
2. **Login/Register** → User authentication
3. **Password Reset** → OTP-based recovery
4. **Success Screen** → Confirmation and next steps

### Dashboard Features
- **Responsive Design** - Mobile-first approach
- **Real-time Updates** - Dynamic content updates
- **Interactive UI** - Smooth animations and transitions
- **Data Visualization** - Charts and analytics

## 🎨 UI/UX Features

- **Modern Design** - Clean, professional interface
- **Responsive Layout** - Works on all devices
- **Smooth Animations** - Enhanced user experience
- **Accessibility** - WCAG compliant components
- **Dark/Light Theme** - Customizable appearance

## 🔒 Security Features

- **Role-based Access Control** - Granular permissions
- **Session Management** - Secure authentication
- **Input Validation** - Form security
- **Protected Routes** - Unauthorized access prevention

## 📱 Mobile Responsive

The application is fully responsive and optimized for:
- **Desktop** - Full feature set
- **Tablet** - Adapted layouts
- **Mobile** - Touch-optimized interface

## 🚀 Deployment

### Build for Production
\`\`\`bash
npm run build
\`\`\`

### Deploy to Vercel
\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

### Deploy to Netlify
\`\`\`bash
npm run build
# Upload dist folder to Netlify
\`\`\`

## 🔄 Future Enhancements

- [ ] Real backend integration
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Payment integration
- [ ] Mobile app version

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for beautiful icons
- TypeScript for type safety
\`\`\`

Create a .gitignore file:
