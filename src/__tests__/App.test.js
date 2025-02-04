import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';

// Newsletter Form - Initial State

// Test 1: Check that the form includes text inputs for name and email address
test("the form includes text inputs for name and email address", () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

// Test 2: Check that the form includes three checkboxes to select areas of interest
test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);

  const codingCheckbox = screen.getByRole('checkbox', { name: /coding/i });
  const designCheckbox = screen.getByRole('checkbox', { name: /design/i });
  const marketingCheckbox = screen.getByRole('checkbox', { name: /marketing/i });

  expect(codingCheckbox).toBeInTheDocument();
  expect(designCheckbox).toBeInTheDocument();
  expect(marketingCheckbox).toBeInTheDocument();
});

// Test 3: Check that the checkboxes are initially unchecked
test("the checkboxes are initially unchecked", () => {
  render(<App />);

  const codingCheckbox = screen.getByRole('checkbox', { name: /coding/i });
  const designCheckbox = screen.getByRole('checkbox', { name: /design/i });
  const marketingCheckbox = screen.getByRole('checkbox', { name: /marketing/i });

  expect(codingCheckbox).not.toBeChecked();
  expect(designCheckbox).not.toBeChecked();
  expect(marketingCheckbox).not.toBeChecked();
});

// Newsletter Form - Adding Responses

// Test 4: Check that the page shows information the user types into the name and email address form fields
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  userEvent.type(nameInput, 'John Doe');
  userEvent.type(emailInput, 'john.doe@example.com');

  expect(nameInput).toHaveValue('John Doe');
  expect(emailInput).toHaveValue('john.doe@example.com');
});

// Test 5: Check that the checked status of checkboxes changes when the user clicks them
test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);

  const codingCheckbox = screen.getByRole('checkbox', { name: /coding/i });
  const designCheckbox = screen.getByRole('checkbox', { name: /design/i });
  const marketingCheckbox = screen.getByRole('checkbox', { name: /marketing/i });

  userEvent.click(codingCheckbox);
  userEvent.click(designCheckbox);

  expect(codingCheckbox).toBeChecked();
  expect(designCheckbox).toBeChecked();
  expect(marketingCheckbox).not.toBeChecked();

  userEvent.click(marketingCheckbox);

  expect(marketingCheckbox).toBeChecked();
});

// Test 6: Check that a message is displayed when the user clicks the Submit button
test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const codingCheckbox = screen.getByRole('checkbox', { name: /coding/i });
  const designCheckbox = screen.getByRole('checkbox', { name: /design/i });
  const submitButton = screen.getByRole('button', { name: /submit/i });

  // Simulate typing in the name and email
  userEvent.type(nameInput, 'John Doe');
  userEvent.type(emailInput, 'john.doe@example.com');

  // Simulate checking interests
  userEvent.click(codingCheckbox);
  userEvent.click(designCheckbox);

  // Submit the form
  userEvent.click(submitButton);

  // Check if the success message contains the correct info
  expect(screen.getByText(/thank you for signing up, john doe/i)).toBeInTheDocument();
  expect(screen.getByText(/you are interested in coding, design/i)).toBeInTheDocument();
});
