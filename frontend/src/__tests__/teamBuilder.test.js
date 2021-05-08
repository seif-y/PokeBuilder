import React from "react";
import { render, screen } from "@testing-library/react";
import mockAxios from "jest-mock-axios";
import TeamBuilder from "../components/team-builder/TeamBuilder";
import userEvent from "@testing-library/user-event";

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

    test("Save button exists and makes API request", () => {
        const saveButton = screen.getByText("Save");
        userEvent.click(saveButton);
        expect(mockAxios.get).toHaveBeenCalled();
    });

    afterEach(() => {
        mockAxios.reset();
    });
});
