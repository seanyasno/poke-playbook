import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

const MockLoginForm: React.FC<{
  loading?: boolean;
  error?: string;
  hasErrors?: boolean;
}> = ({ loading = false, error, hasErrors = false }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const MockLink = ({ to, children, className }: any) => (
    <a href={to} className={className}>
      {children}
    </a>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Login form submitted!");
  };

  return (
    <div className="h-full flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center justify-center mb-6">
            Welcome back to Pokédex
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input input-bordered w-full ${
                  hasErrors ? "input-error" : ""
                }`}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={loading}
              />
              {hasErrors && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    Email is required
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className={`input input-bordered w-full ${
                  hasErrors ? "input-error" : ""
                }`}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                disabled={loading}
              />
              {hasErrors && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    Password is required
                  </span>
                </label>
              )}
            </div>

            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>

          <div className="divider">OR</div>

          <div className="text-center">
            <p className="text-sm text-base-content/70">
              Don't have an account?{" "}
              <MockLink
                to="/register"
                className="link link-primary font-medium"
              >
                Sign up here
              </MockLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockLoginForm> = {
  title: "Features/Authentication/LoginForm",
  component: MockLoginForm,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    loading: {
      control: { type: "boolean" },
    },
    hasErrors: {
      control: { type: "boolean" },
    },
    error: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
    hasErrors: false,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    hasErrors: false,
  },
};

export const WithValidationErrors: Story = {
  args: {
    loading: false,
    hasErrors: true,
  },
};

export const WithAuthError: Story = {
  args: {
    loading: false,
    hasErrors: false,
    error: "Invalid email or password",
  },
};
