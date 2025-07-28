# CV Builder Frontend – Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Directory Structure](#directory-structure)
3. [Detailed File & Folder Explanations](#detailed-file--folder-explanations)
4. [Environment Variables](#environment-variables)
5. [Authentication Flow](#authentication-flow)
6. [State Management](#state-management)
7. [Component Architecture](#component-architecture)
8. [Testing Strategy](#testing-strategy)
9. [Development Workflow](#development-workflow)
10. [Deployment](#deployment)
11. [Troubleshooting & FAQ](#troubleshooting--faq)
12. [License](#license)

---

## Project Overview
This is the frontend for the CV Builder application, built with **React**, **Vite**, and **Tailwind CSS**. It provides an intuitive interface for users to create, edit, and download professional CVs. The application features JWT-based authentication, responsive design, and a rich text editing experience.

---

## Complete Project Structure

```
frontend/
├── .env                    # Environment variables (development)
├── .env.test               # Test environment variables
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Builder/        # CV builder related components
│   │   ├── FormSections/   # Form input components for CV sections
│   │   ├── CVPreview.jsx   # CV preview component
│   │   ├── CVSections.jsx  # CV sections management
│   │   ├── DownloadButton.jsx # CV download functionality
│   │   ├── Footer.jsx      # Application footer
│   │   ├── Header.jsx      # Navigation and user controls
│   │   └── ProtectedRoute.jsx # Route protection
│   ├── constants/          # Application constants
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── store/              # State management
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main application component
│   ├── App.css             # Global styles
│   ├── index.jsx           # Application entry point
│   └── index.css           # Global styles
├── __test__/              # Test files
├── .gitignore
├── babel.config.js        # Babel configuration
├── jest.config.js         # Jest test configuration
├── jest.setup.js          # Jest setup and mocks
├── package.json           # Project metadata and scripts
├── postcss.config.cjs     # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.js         # Vite configuration
```

## Configuration Files

### Build & Development
- **vite.config.js**: Vite build configuration
  - Defines plugins, server settings, and build options
  - Configures proxy for API requests in development

### Testing
- **jest.config.js**: Jest test runner configuration
  - Module mappers, test environment settings
  - Coverage reporting configuration
- **jest.setup.js**: Global test setup
  - Mock implementations and test utilities
  - Browser API mocks (e.g., ResizeObserver)

### Code Quality
- **eslint.config.js**: ESLint configuration
  - Code style and best practices
  - React and JavaScript rules
- **.gitignore**: Version control ignore rules
  - Node modules, build output, environment files

### Styling
- **tailwind.config.js**: Tailwind CSS configuration
  - Theme customization
  - Plugin configurations
- **postcss.config.cjs**: PostCSS configuration
  - Tailwind and autoprefixer setup

### Environment
- **.env**: Development environment variables
  - `VITE_API_URL`: Backend API base URL
  - `VITE_APP_NAME`: Application name
- **.env.test**: Test environment variables
  - Test-specific configurations

---

## Detailed File & Folder Explanations

### Root Files
- **.env**: Environment variables for development (see [Environment Variables](#environment-variables)).
- **.env.test**: Environment variables for testing.
- **babel.config.js**: Configures Babel for JSX and modern JavaScript features.
- **jest.config.js**: Configures Jest for testing, including module mappers and setup files.
- **vite.config.js**: Configures Vite development server and build settings.
- **tailwind.config.js**: Configures Tailwind CSS theming and plugins.
- **postcss.config.cjs**: Configures PostCSS with Tailwind and autoprefixer.

### src/
- **App.jsx**: Main application component with routing and layout.
- **main.jsx**: Application entry point, renders the root React component.

### src/components/
- **Builder/**: Components related to the CV building interface.
- **FormSections/**: Individual form components for each CV section.
- **CVPreview.jsx**: Displays a preview of the CV with current data.
- **CVSections.jsx**: Manages the different sections of the CV.
- **DownloadButton.jsx**: Handles CV download functionality.
- **Header.jsx**: Navigation bar with user controls and auth status.
- **ProtectedRoute.jsx**: HOC for protecting routes that require authentication.

### src/contexts/
- **AuthContext.jsx**: Manages authentication state and methods.
- **CVContext.jsx**: Manages CV data and operations.

### src/pages/
- Contains page-level components for different routes.

### src/utils/
- **api.js**: API client for backend communication.
- **auth.js**: Authentication utilities.
- **env.js**: Environment variable handling.

### Test Directory Structure (`__test__/`)

```
__test__/
├── component/                   # Component test files
│   ├── Builder/                 # Builder component tests
│   │   ├── BuilderForm.test.jsx
│   │   ├── BuilderLayout.test.jsx
│   │   └── SectionWrapper.test.jsx
│   ├── FormSections/            # Form section component tests
│   │   ├── Achievements.test.jsx
│   │   ├── Certifications.test.jsx
│   │   ├── EducationForm.test.jsx
│   │   ├── PersonalInfo.test.jsx
│   │   ├── Projects.test.jsx
│   │   ├── Skills.test.jsx
│   │   └── WorkExperience.test.jsx
│   ├── CVPreview.test.jsx       # CV preview component tests
│   ├── CVSections.test.jsx      # CV sections component tests
│   ├── DownloadButton.test.jsx  # Download functionality tests
│   ├── Footer.test.jsx          # Footer component tests
│   ├── Header.test.jsx          # Header component tests
│   ├── ProtectedRoute.test.jsx  # Route protection tests
│   └── SaveButton.test.jsx      # Save functionality tests
└── page/                        # Page component tests
    ├── Home.test.jsx           # Home page tests
    ├── LandingPage.test.jsx    # Landing page tests
    ├── SignIn.test.jsx         # Sign-in page tests
    └── SignUp.test.jsx         # Sign-up page tests
```

- **Component Tests**: Individual UI component tests with mocked dependencies
- **Page Tests**: Integration tests for complete page components
- **Test Naming**: Follows `ComponentName.test.jsx` pattern

---

## Environment Variables

### .env (Development)
```
VITE_BACKEND_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=CV Builder
```

### .env.test (Testing)
```
VITE_BACKEND_API_BASE_URL=http://localhost:5000/api
NODE_ENV=test
```

**Note**: Never commit sensitive data in these files.

---

## Authentication Flow

1. **Login/Signup**:
   - User submits credentials via the auth forms.
   - On success, receives JWT token from the backend.
   - Token is stored in localStorage and auth state is updated.

2. **Protected Routes**:
   - `ProtectedRoute` component checks for valid authentication.
   - Unauthorized users are redirected to the login page.

3. **API Requests**:
   - The token is automatically attached to requests via axios interceptors.
   - 401 responses trigger automatic logout.

---

## State Management

- **React Context**: Used for global state (auth, CV data).
- **Local State**: Used for component-specific state.
- **Custom Hooks**: For reusable stateful logic.

---

## Component Architecture

- **Presentational Components**:
  - Focus on UI, receive data via props.
  - Examples: Buttons, Form inputs, CV preview.

- **Container Components**:
  - Manage state and pass data to presentational components.
  - Examples: Pages, Form sections.

- **Layout Components**:
  - Define page structure (Header, Footer, Sidebar).

---

## Testing Strategy

The frontend uses a comprehensive testing approach with **Jest** and **React Testing Library**, focusing on component testing and user interaction simulations.

### Test Structure
- **Component Tests** (`__test__/component/`):
  - Test individual UI components in isolation
  - Mock child components and external dependencies
  - Test rendering, props, and basic interactions
  - Example: `CVPreview.test.jsx` verifies preview mode and scaling behavior

- **Page Tests** (`__test__/page/`):
  - Test complete page components
  - Verify routing and page-level functionality
  - Mock API calls and context providers

### Key Testing Patterns

1. **Mocking**
   - External dependencies are mocked using Jest's module mocking
   - Custom hooks and contexts are mocked to isolate component tests
   - Example:
     ```javascript
     jest.mock('../../src/components/CVSections', () => () => (
       <div data-testid="cv-sections">Mock CV Sections</div>
     ))
     ```

2. **Test Utilities**
   - Custom render functions with necessary providers
   - Global mocks for browser APIs (e.g., ResizeObserver)
   - Example:
     ```javascript
     global.ResizeObserver = class {
       constructor(callback) {}
       observe() {}
       unobserve() {}
       disconnect() {}
     };
     ```

3. **State Management Testing**
   - Store implementations are mocked for testing
   - State changes are verified through component updates
   - Example mock for zustand store:
     ```javascript
     jest.mock('../../src/store/cvStore', () => ({
       __esModule: true,
       default: {},
       useCVStore: jest.fn(() => ({
         sectionOrder: [],
         sectionData: {},
       })),
     }))
     ```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch

# Run a specific test file
npm test -- path/to/test/file.test.jsx
```

### Best Practices
- **Test Behavior, Not Implementation**: Focus on what users see and interact with
- **Use Semantic Queries**: Prefer `getByRole` and `getByLabelText` over test IDs
- **Mock Responsibly**: Only mock what's necessary for the test to run
- **Keep Tests Focused**: Each test should verify one specific behavior
- **Test Edge Cases**: Include tests for error states and boundary conditions

---

## Development Workflow

1. **Setup**:
   ```bash
   npm install
   ```

2. **Development Server**:
   ```bash
   npm run dev
   ```
   - Starts Vite dev server at `http://localhost:5173`

3. **Building for Production**:
   ```bash
   npm run build
   ```
   - Outputs to `dist/` directory

---

## Deployment

1. **Build the Application**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` Directory**:
   - Can be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

3. **Environment Variables**:
   - Set production environment variables in your hosting platform.

---

## Troubleshooting & FAQ

- **Build Failures**:
  - Ensure all dependencies are installed (`npm install`).
  - Check for syntax errors in the code.

- **API Connection Issues**:
  - Verify the backend server is running.
  - Check CORS settings on the backend.

- **Authentication Problems**:
  - Clear localStorage and refresh the page.
  - Ensure the JWT token is being set correctly.

- **Styling Issues**:
  - Check Tailwind CSS configuration.
  - Ensure PostCSS is properly set up.

---

## License

MIT

This is the frontend for the CV Builder application, built with React, Vite, and Tailwind CSS.
