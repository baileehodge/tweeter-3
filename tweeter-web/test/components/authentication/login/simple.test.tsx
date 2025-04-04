// simple.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/react";

test("renders Hello World", () => {
    render(<div>Hello World</div>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
});
