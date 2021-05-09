import React from "react";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import TeamBuilder from "../../components/team-builder/TeamBuilder";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

jest.mock("axios");

describe("General TeamBuilder Tests", () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <TeamBuilder />
            </MemoryRouter>
        );
    });

    test("TeamBuilder contains team name input", () => {
        const teamNameInput = screen.getByPlaceholderText("Team Name");
        expect(teamNameInput).toBeDefined();
    });

    test("TeamBuilder contains team description text area", () => {
        const descriptionTextArea = screen.getByPlaceholderText("Team description");
        expect(descriptionTextArea).toBeDefined();
    });

    test("Save button does POST on click", async () => {
        const saveButton = screen.getByText("Save");
        expect(saveButton).toBeDefined();
        axios.post.mockImplementation(() => Promise.resolve({ data: { _id: "" } }));
        userEvent.click(saveButton);
        expect(axios.post).toHaveBeenCalledWith("/api/teams", expect.any(Object), expect.any(Object));
    });
});

test("TeamBuilder snapshot test", () => {
    const tree = renderer.create(<TeamBuilder />).toJSON();
    expect(tree).toMatchSnapshot();
});
