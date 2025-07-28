import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../../src/contexts/AuthContext';
import SignIn from '../../src/pages/SignIn';

jest.mock('../../src/contexts/AuthContext');
jest.mock('../../src/utils/env', () => ({ getEnv: jest.fn(() => 'http://localhost:5000') }));

const mockNavigate = jest.fn();
const mockLocation = { state: undefined };
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  };
});

describe('SignIn Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock login function for every test
    useAuth.mockReturnValue({ login: jest.fn() });
    mockNavigate.mockReset();
    mockLocation.state = undefined;
  });

  it('renders inputs and buttons', () => {
    // Render SignIn page inside router context
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    // Check if email input with placeholder is present
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    // Check if password input is present
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    // Check if Sign In button is present
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    // Check if Sign up link text is rendered
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
  });

  it('shows errors for invalid input and login flow', async () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    const passInput = screen.getByPlaceholderText('••••••••');
    const form = emailInput.closest('form'); // Get the form element

    // Submit empty form to trigger "fields required" error
    fireEvent.submit(form);
    await waitFor(() => 
      expect(screen.getByText(/Please enter both email and password/i)).toBeInTheDocument()
    );

    // Enter invalid email format and a password
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.change(passInput, { target: { value: 'abcdef' } });
    // Submit form again to check email validation error
    fireEvent.submit(form);
    await waitFor(() => 
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument()
    );
  });

  it('shows error on 401 response', async () => {
    // Mock fetch to simulate API returning 401 Unauthorized
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: false, status: 401, json: () => Promise.resolve({}) })
    );

    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    // Fill inputs with valid email but wrong password
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'wrongpass' } });
    // Submit the form to trigger login attempt
    fireEvent.submit(screen.getByPlaceholderText(/Enter your email/i).closest('form'));

    // Wait for error message related to invalid credentials to show up
    await waitFor(() => expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument());
  });

  it('logs in and navigates on success', async () => {
    const mockLogin = jest.fn();
    // Mock the login function so we can verify it was called
    useAuth.mockReturnValue({ login: mockLogin });

    // Mock successful fetch response with user data and token
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            token: 'abc',
            user: { id: 1, name: 'Test', email: 'test@example.com' },
          }),
      })
    );

    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    // Fill inputs with valid credentials
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'password123' } });
    // Submit form to trigger login
    fireEvent.submit(screen.getByPlaceholderText(/Enter your email/i).closest('form'));

    // Wait for login function and navigation to be called after success
    await waitFor(() => {
      // Check if login function was called with correct token and user
      expect(mockLogin).toHaveBeenCalledWith({
        token: 'abc',
        user: { id: 1, name: 'Test', email: 'test@example.com' },
      });
      // Check if navigation to /home happened with replace option
      expect(mockNavigate).toHaveBeenCalledWith('/home', { replace: true });
    });
  });
});
