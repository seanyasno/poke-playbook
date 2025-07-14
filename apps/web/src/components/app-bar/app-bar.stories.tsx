import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

// Mock version of AppBar for Storybook to avoid router dependencies
const MockAppBar: React.FC<{
  userState: "loading" | "loggedIn" | "loggedOut";
  user?: { email: string };
}> = ({ userState, user }) => {
  const MockLink = ({
    to,
    children,
    className,
    activeProps,
    ...props
  }: any) => (
    <a href={to} className={className} {...props}>
      {children}
    </a>
  );

  return (
    <div className="border-b border-base-300 bg-base-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <MockLink to="/" className="text-xl font-medium text-base-content">
              Poké Playbook
            </MockLink>

            {userState === "loggedIn" && (
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
            {userState === "loading" ? (
              <span className="loading loading-spinner loading-sm" />
            ) : userState === "loggedIn" ? (
              <>
                <div className="text-sm text-base-content/50 hidden sm:block">
                  {user?.email || "User"}
                </div>
                <button
                  className="text-sm text-base-content/60 hover:text-base-content transition-colors px-3 py-2"
                  onClick={() => alert("Sign out clicked")}
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

const meta: Meta<typeof MockAppBar> = {
  title: "Components/AppBar",
  component: MockAppBar,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    userState: {
      control: { type: "select" },
      options: ["loading", "loggedIn", "loggedOut"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    userState: "loggedOut",
  },
};

export const Loading: Story = {
  args: {
    userState: "loading",
  },
};

export const LoggedIn: Story = {
  args: {
    userState: "loggedIn",
    user: {
      email: "user@example.com",
    },
  },
};
