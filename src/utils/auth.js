// Simple authentication utility
// In a real app, this would interact with a backend API

export const authService = {
  // Login function
  login: (username, password) => {
    // This would normally be an API call
    // For now, we'll use localStorage
    const user = JSON.parse(localStorage.getItem('mockUsers') || '[]').find(
      u => u.username === username && u.password === password
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

