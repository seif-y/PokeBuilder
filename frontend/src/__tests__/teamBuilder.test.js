import React from "react";
import { render, screen } from "@testing-library/react";
import TeamBuilder from "../components/team-builder/TeamBuilder";

describe("General TeamBuilder Tests", () => {
    beforeEach(() => {
        render(<TeamBuilder />);
    });

    test("TeamBuilder contains team name input", () => {
        const teamNameInput = screen.getByPlaceholderText("Team Name");
        expect(teamNameInput).toBeDefined();
    });

    test("TeamBuilder contains team description text area", () => {
        const descriptionTextArea = screen.getByPlaceholderText("Team description");
        expect(descriptionTextArea).toBeDefined();
    });

    test("Save button exists", () => {
        const saveButton = screen.getByText("Save");
        expect(saveButton).toBeDefined();
    });
});
