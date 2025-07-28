import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../../src/contexts/AuthContext';
import SignUp from '../../src/pages/SignUp';

// Mock AuthContext to avoid real authentication calls
jest.mock('../../src/contexts/AuthContext');
// Mock environment variables to avoid network calls
jest.mock('../../src/utils/env', () => ({ getEnv: jest.fn(() => 'http://localhost:5000') }));

// Mock useNavigate to track navigation without real routing
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('SignUp Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Provide a mock login function so component doesn't break
    useAuth.mockReturnValue({ login: jest.fn() });
  });

  // Check that all important inputs and buttons render properly
  it('renders all input fields and buttons', () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
    expect(screen.getByText(/Already have an account/i)).toBeInTheDocument();
  });

  // Test validation: name should not accept numbers or invalid characters
  it('shows error if name is invalid', async () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: '1234' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'abcdef' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'abcdef' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    await waitFor(() => {
      expect(screen.getByText(/Name can only contain letters and spaces/i)).toBeInTheDocument();
    });
  });

  // Check that invalid email triggers proper error message
  it('shows error if email is invalid', async () => {
    const { container } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalidemail' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'abcdef' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'abcdef' } });
    
    // Submit the form by targeting the actual <form> element, no role used
    fireEvent.submit(container.querySelector('form'));
    
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  // Verify error if password and confirm password don't match
  it('shows error if passwords do not match', async () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'abcdef' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'abc123' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });
  });

  // Check that short passwords trigger validation error
  it('shows error if password is too short', async () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'abc' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'abc' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });
});
