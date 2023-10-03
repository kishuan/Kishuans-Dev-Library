import React from "react"
import { useForm, ValidationError } from "@formspree/react"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Alert from "@mui/material/Alert"

function Contact() {
  return <ContactForm />
}

// Rest of your ContactForm remains the same

function ContactForm() {
  const [state, handleSubmit] = useForm("xrgjewbb")

  if (state.succeeded) {
    return (
      // <Typography variant="h6">
      //   Thank you for your message! I'll be in contact shortly.
      // </Typography>
      <Alert severity="success">
        Thank you! Your submission has been sent.
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container maxWidth="sm">
        <Typography variant="h6" gutterBottom>
          Contact me
        </Typography>
        <TextField
          id="name"
          label="Full Name"
          variant="filled"
          fullWidth
          margin="normal"
          name="name"
          autoComplete="off"
          required
        />
        <ValidationError
          name="name"
          prefix="Name"
          field="name"
          errors={state.errors}
        />
        <TextField
          id="email"
          label="Email Address"
          type="email"
          variant="filled"
          fullWidth
          margin="normal"
          name="email"
          autoComplete="off"
          required
        />
        <ValidationError
          name="email"
          prefix="Email"
          field="email"
          errors={state.errors}
        />
        <TextField
          id="phoneNumber"
          label="Phone Number"
          variant="filled"
          fullWidth
          margin="normal"
          name="phoneNumber"
          autoComplete="off"
        />
        <ValidationError
          name="phoneNumber"
          prefix="Phone Number"
          field="phoneNumber"
          errors={state.errors}
        />
        <TextField
          autoComplete="off"
          id="message"
          label="Message"
          variant="filled"
          fullWidth
          margin="normal"
          name="message"
          multiline
          rows={3}
          required
        />
        <ValidationError
          id="message"
          name="message"
          prefix="Message"
          field="message"
          errors={state.errors}
        />
        <Button
          id="submit"
          name="submit"
          color="secondary"
          variant="contained"
          type="submit"
          disabled={state.submitting}
          sx={{ alignSelf: `flex-end` }}
        >
          Submit
        </Button>
      </Container>
    </form>
  )
}

export default Contact
