import React from "react";
import { Link } from "@tanstack/react-router";
import { useAuth, useAuthForm } from "../../../hooks";
import { loginFormSchema } from "./login-form-types";

export const LoginForm: React.FC = () => {
  const { signIn } = useAuth();

  const {
    register,
    formState: { errors },
    loading,
    error,
    onSubmit,
  } = useAuthForm({
    schema: loginFormSchema,
    submitFn: async ({ email, password }) => signIn(email, password),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center justify-center mb-6">
            Welcome back to Pokédex
          </h2>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                {...register("email")}
                disabled={loading}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {typeof errors.email === "string"
                      ? errors.email
                      : errors.email.message}
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
                  errors.password ? "input-error" : ""
                }`}
                {...register("password")}
                disabled={loading}
              />
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {typeof errors.password === "string"
                      ? errors.password
                      : errors.password.message}
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
              <Link to="/register" className="link link-primary font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
