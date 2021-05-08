import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import PokeType from "../components/global/PokeType";
import SearchBar from "../components/global/SearchBar";
import TextArea from "../components/global/TextArea";

test("PokeType renders without crashing", () => {
    render(<PokeType typeName="water" />);
});

test("SearchBar functions correctly", (done) => {
    const onInput = (query) => {
        expect(query).toBeDefined();
        if (query === "pidgey") {
            done();
        }
    };
    render(<SearchBar onSearch={onInput} />);
    const searchInput = screen.getByPlaceholderText("Search for a pokemon's name");
    userEvent.type(searchInput, "Pidgey");
});

test("TextArea functions correctly", (done) => {
    const onInput = (text) => {
        expect(text).toBeDefined();
        done();
    };
    render(<TextArea onChange={onInput} placeholder="type in me!" />);
    const textarea = screen.getByPlaceholderText("type in me!");
    userEvent.type(textarea, "Hello");
});
