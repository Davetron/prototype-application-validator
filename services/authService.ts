import { User } from '../types';

// This service simulates interaction with a Java/Spring Boot backend.
// In a real production environment, replace the mock logic with fetch() calls 
// to your backend endpoints (e.g., /api/auth/login).

const MOCK_DELAY = 1000;

export const login = async (email: string, password: string): Promise<User> => {
  // Simulate network request to Java backend
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  // Mock validation logic
  // In reality, the backend would validate the password hash
  if (password.length >= 6) { 
    return {
      id: 'user-' + Math.random().toString(36).substr(2, 5),
      email,
      name: email.split('@')[0], // Default name from email
      token: 'mock-jwt-session-token-' + Date.now()
    };
  }
  throw new Error('Invalid credentials. (Hint: use any password > 6 chars)');
};

export const register = async (name: string, email: string, password: string): Promise<User> => {
  // Simulate network request to Java backend
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  if (!email.includes('@')) {
    throw new Error('Please enter a valid email address.');
  }

  return {
    id: 'user-' + Math.random().toString(36).substr(2, 5),
    email,
    name,
    token: 'mock-jwt-session-token-' + Date.now()
  };
};

export const logout = async (): Promise<void> => {
  // Simulate backend session invalidation
  await new Promise(resolve => setTimeout(resolve, 500));
};
