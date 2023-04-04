import React from "react"
import { useForm, ValidationError } from "@formspree/react"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Chip from "@mui/material/Chip"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

function Contact() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Chip
        sx={{
          backgroundColor: `#F5F3C1`,
          color: `#333`,
          "&:hover": {
            backgroundColor: `#edea90`,
            color: `#474E68`
          },
        }}
        label="contact me"
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <ContactForm />
        </Paper>
      </Modal>
    </div>
  )
}

function ContactForm() {
  const [state, handleSubmit] = useForm("xrgjewbb")
  if (state.succeeded) {
    return <Typography variant="h6">Thanks for joining!</Typography>
  }
  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Typography variant="h6" gutterBottom>
          Contact me
        </Typography>
        <TextField
          id="email"
          label="Email Address"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <TextField
          id="message"
          label="Message"
          variant="outlined"
          fullWidth
          margin="normal"
          name="message"
          multiline
          rows={4}
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
        <Button variant="contained" type="submit" disabled={state.submitting}>
          Submit
        </Button>
      </Container>
    </form>
  )
}

export default Contact
