// Simple authentication utility
// In a real app, this would interact with a backend API
import { users } from '../data/mockData';

export const authService = {
  // Initialize mock users if not exists
  init: () => {
    if (!localStorage.getItem('mockUsers')) {
      localStorage.setItem('mockUsers', JSON.stringify(users));
    }
  },

  // Login function
  login: (username, password) => {
    // Ensure users are initialized
    authService.init();
    
    // This would normally be an API call
    // For now, we'll use localStorage
    const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    
    // Normalize username for comparison (case insensitive)
    const normalizedUsername = username.toLowerCase().trim();
    
    // Find user by username and password
    const user = mockUsers.find(
      u => u.username.toLowerCase() === normalizedUsername && u.password === password
    );
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    
    return { success: false, error: 'Username atau password salah' };
  },

  // Logout function
  logout: () => {
    localStorage.removeItem('currentUser');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('currentUser');
  },

  // Check if user has specific role
  hasRole: (role) => {
    const user = authService.getCurrentUser();
    return user && user.role === role;
  }
};

