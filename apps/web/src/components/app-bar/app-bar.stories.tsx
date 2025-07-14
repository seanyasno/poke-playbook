import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
// Mock function for actions
const mockFn = () => console.log("Action triggered");

// Mock the dependencies
const MockLink: React.FC<{
  to: string;
  children: React.ReactNode;
  className?: string;
  activeProps?: { className: string };
}> = ({ to, children, className }) => (
  <a href={to} className={className} onClick={mockFn}>
    {children}
  </a>
);

// Mock the auth hook
const createMockAuth = (user: { email: string } | null, loading: boolean) => ({
  user,
  loading,
  logout: mockFn,
});

// Wrapper component that provides mocked dependencies
const AppBarWrapper: React.FC<{
  user?: { email: string } | null;
  loading?: boolean;
}> = ({ user = null, loading = false }) => {
  // Mock the useAuth hook
  const mockAuth = createMockAuth(user, loading);

  // Mock the Link component from react-router
  React.useEffect(() => {
    // In a real scenario, you'd mock these at the module level
    // For demonstration, we'll just use our wrapper approach
  }, []);

  // Create a version of AppBar with mocked dependencies
  const AppBarWithMocks: React.FC = () => {
    return (
      <div className="border-b border-base-300 bg-base-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <MockLink
                to="/"
                className="text-xl font-medium text-base-content"
              >
                Poké Playbook
              </MockLink>

              {user && (
                <nav className="hidden md:flex gap-6">
                  <MockLink
                    to="/"
                    className="text-sm text-base-content/60 hover:text-base-content transition-colors"
                  >
                    Pokédex
                  </MockLink>
                  <MockLink
                    to="/teams"
                    className="text-sm text-base-content/60 hover:text-base-content transition-colors"
                  >
                    Teams
                  </MockLink>
                </nav>
              )}
            </div>

            <div className="flex items-center gap-3">
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : user ? (
                <>
                  <div className="text-sm text-base-content/50 hidden sm:block">
                    {user.email}
                  </div>
                  <button
                    className="text-sm text-base-content/60 hover:text-base-content transition-colors px-3 py-2"
                    onClick={mockAuth.logout}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <MockLink
                    to="/login"
                    className="text-sm text-base-content/60 hover:text-base-content transition-colors px-3 py-2"
                  >
                    Login
                  </MockLink>
                  <MockLink to="/register" className="btn btn-primary btn-sm">
                    Sign up
                  </MockLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <AppBarWithMocks />;
};

const meta: Meta<typeof AppBarWrapper> = {
  title: "Components/AppBar",
  component: AppBarWrapper,
  parameters: {
    layout: "fullscreen",
    actions: { argTypesRegex: "^on[A-Z].*" },
  },
  argTypes: {
    user: {
      control: "object",
      description: "User object when logged in",
    },
    loading: {
      control: "boolean",
      description: "Loading state",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    user: null,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    user: null,
    loading: true,
  },
};

export const LoggedIn: Story = {
  args: {
    user: {
      email: "user@example.com",
    },
    loading: false,
  },
};
