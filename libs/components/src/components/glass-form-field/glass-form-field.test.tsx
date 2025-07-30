import { describe, expect, it } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { GlassFormField } from "./glass-form-field";

describe("GlassFormField", () => {
    it("renders with label", () => {
        render(
            <GlassFormField label="Email" glassEffect={{ intensity: "medium" }} animation="normal">
                <input type="email" />
            </GlassFormField>
        );

        expect(screen.getByText("Email")).toBeInTheDocument();
    });

    it("renders with helper text", () => {
        render(
            <GlassFormField label="Email" helperText="Enter your email address" glassEffect={{ intensity: "medium" }} animation="normal">
                <input type="email" />
            </GlassFormField>
        );

        expect(screen.getByText("Enter your email address")).toBeInTheDocument();
    });

    it("renders with error state", () => {
        render(
            <GlassFormField label="Email" error="Email is required" glassEffect={{ intensity: "medium" }} animation="normal">
                <input type="email" />
            </GlassFormField>
        );

        expect(screen.getByText("Email is required")).toBeInTheDocument();
        const helperText = screen.getByText("Email is required");
        expect(helperText).toHaveClass("text-red-400");
    });

    it("renders with success state", () => {
        render(
            <GlassFormField label="Email" success="Email looks good!" glassEffect={{ intensity: "medium" }} animation="normal">
                <input type="email" />
            </GlassFormField>
        );

        expect(screen.getByText("Email looks good!")).toBeInTheDocument();
        const helperText = screen.getByText("Email looks good!");
        expect(helperText).toHaveClass("text-green-400");
    });

    it("renders with warning state", () => {
        render(
            <GlassFormField label="Email" warning="Please check your email format" glassEffect={{ intensity: "medium" }} animation="normal">
                <input type="email" />
            </GlassFormField>
        );

        expect(screen.getByText("Please check your email format")).toBeInTheDocument();
        const helperText = screen.getByText("Please check your email format");
        expect(helperText).toHaveClass("text-yellow-400");
    });

    it("shows required indicator when required", () => {
        render(
            <GlassFormField label="Email" required glassEffect={{ intensity: "medium" }} animation="normal">
                <input type="email" />
            </GlassFormField>
        );

        expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("applies disabled state", () => {
        render(
            <GlassFormField label="Email" disabled glassEffect={{ intensity: "medium" }} animation="normal">
                <input type="email" />
            </GlassFormField>
        );

        const field = screen.getByRole("group");
        expect(field).toHaveClass("cursor-not-allowed", "opacity-50");
    });

    it("passes props to child input", () => {
        render(
            <GlassFormField label="Email" error="Invalid email" glassEffect={{ intensity: "medium" }} animation="normal">
                <input type="email" placeholder="Enter email" />
            </GlassFormField>
        );

        const input = screen.getByPlaceholderText("Enter email");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(input).toHaveAttribute("aria-describedby");
    });

    it("renders with different variants", () => {
        const { rerender } = render(
            <GlassFormField label="Email" variant="default" glassEffect={{ intensity: "medium" }} animation="normal">
                <input type="email" />
            </GlassFormField>
        );

        let field = screen.getByRole("group");
        // Default variant should not have card-specific classes
        expect(field).not.toHaveClass("rounded-xl", "border", "p-4");

        rerender(
            <GlassFormField label="Email" variant="card" glassEffect={{ intensity: "medium" }} animation="normal">
                <input type="email" />
            </GlassFormField>
        );

        field = screen.getByRole("group");
        expect(field).toHaveClass("rounded-xl", "border", "p-4");

        rerender(
            <GlassFormField label="Email" variant="inline" glassEffect={{ intensity: "medium" }} animation="normal">
                <input type="email" />
            </GlassFormField>
        );

        field = screen.getByRole("group");
        expect(field).toHaveClass("flex", "items-center");
    });

    it("renders with different sizes", () => {
        const { rerender } = render(
            <GlassFormField label="Email" size="sm" glassEffect={{ intensity: "medium" }} animation="normal">
                <input type="email" />
            </GlassFormField>
        );

        expect(screen.getByText("Email")).toHaveClass("text-xs");

        rerender(
            <GlassFormField label="Email" size="md" glassEffect={{ intensity: "medium" }} animation="normal">
                <input type="email" />
            </GlassFormField>
        );

        expect(screen.getByText("Email")).toHaveClass("text-sm");

        rerender(
            <GlassFormField label="Email" size="lg" glassEffect={{ intensity: "medium" }} animation="normal">
                <input type="email" />
            </GlassFormField>
        );

        expect(screen.getByText("Email")).toHaveClass("text-base");
    });

    it("associates label with input through htmlFor", () => {
        render(
            <GlassFormField label="Email" glassEffect={{ intensity: "medium" }} animation="normal">
                <input type="email" id="email-input" />
            </GlassFormField>
        );

        const label = screen.getByText("Email");
        const input = screen.getByLabelText("Email");
        expect(label).toHaveAttribute("for", "email-input");
        expect(input).toHaveAttribute("id", "email-input");
    });
});