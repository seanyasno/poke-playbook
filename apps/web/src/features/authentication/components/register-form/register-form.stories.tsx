import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

const MockRegisterForm: React.FC<{
  loading?: boolean;
  error?: string;
  hasErrors?: boolean;
  success?: boolean;
}> = ({ loading = false, error, hasErrors = false, success = false }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const MockLink = ({ to, children, className }: any) => (
    <a href={to} className={className}>
      {children}
    </a>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Register form submitted!");
  };

  if (success) {
    return (
      <div className="h-full flex items-center justify-center bg-base-200">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="card-title text-2xl font-bold justify-center mb-4">
              Welcome to Pokédex!
            </h2>
            <p className="text-base-content/70 mb-6">
              Your account has been created successfully. Please check your
              email to verify your account.
            </p>
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-md"></span>
            </div>
            <p className="text-sm text-base-content/50 mt-2">
              Redirecting you to the app...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center justify-center mb-6">
            Join the Pokédex
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
                placeholder="Create a password (min. 6 characters)"
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
                    Password must be at least 6 characters
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className={`input input-bordered w-full ${
                  hasErrors ? "input-error" : ""
                }`}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                disabled={loading}
              />
              {hasErrors && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    Passwords do not match
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
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </div>
          </form>

          <div className="divider">OR</div>

          <div className="text-center">
            <p className="text-sm text-base-content/70">
              Already have an account?{" "}
              <MockLink to="/login" className="link link-primary font-medium">
                Sign in here
              </MockLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockRegisterForm> = {
  title: "Features/Authentication/RegisterForm",
  component: MockRegisterForm,
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
    success: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
    hasErrors: false,
    success: false,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    hasErrors: false,
    success: false,
  },
};

export const WithValidationErrors: Story = {
  args: {
    loading: false,
    hasErrors: true,
    success: false,
  },
};

export const WithAuthError: Story = {
  args: {
    loading: false,
    hasErrors: false,
    success: false,
    error: "Email already exists",
  },
};

export const Success: Story = {
  args: {
    loading: false,
    hasErrors: false,
    success: true,
  },
};
