import { render, screen } from "@testing-library/react";
import App from "./App";
import LoginPage from "./pages/login/";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("render tombol login", () => {
  // case untuk to be in document

  // target component
  render(<LoginPage />);

  // target case
  const buttonText = screen.getByText(/Login With Spotify/i);

  expect(buttonText).toBeInTheDocument();
});
test("render user event", () => {
  // case untuk to be in document

  // target component
  render(<LoginPage />);

  // target case
  const buttonText = screen.getByText(/Login With Spotify/i);

  expect(buttonText).toBeInTheDocument();
});
