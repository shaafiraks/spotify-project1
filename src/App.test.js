import { render, screen } from "@testing-library/react";
import App from "./App";
import LoginPage from "./pages/login/";
import userEvent from "@testing-library/user-event";

test("render tombol login", () => {
  // case untuk to be in document

  // tentuin target component
  render(<LoginPage />);

  // nge get button dengan tulisan login with spotify,
  // jika ketemu, buttonText menyimpan div dari komponen.
  // jika g ketemu, buttonText bakal undefined.
  const buttonText = screen.getByText(/Login With Spotify/i);

  // nge set ekspetasi buttonText ada di dokumen, ga undefined.
  expect(buttonText).toBeInTheDocument();

  // jika true, maka test passed, kalau false failed.
});

test("user event click login", async () => {
  // definisiin mock function, yang bertindak sebagai repository( dalam case ini, fungsi untuk login spotify)
  const mockCallBack = jest.fn();

  // tentuin target component
  render(<LoginPage />);

  // nge get button dengan tulisan login with spotify,
  const loginButton = screen.getByText(/Login With Spotify/i);

  // nge set ekspetasi buttonText ada di dokumen, ga undefined.
  expect(loginButton).not.toBeDisabled();

  // manipulate of clicking a button
  userEvent.click(loginButton);

  // ekspeting to be clicked
  expect(mockCallBack.mock.calls.length).toEqual(0);
});
