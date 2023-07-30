import React from "react"
import { useForm, ValidationError } from "@formspree/react"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

function Contact() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Chip
        sx={{
          backgroundColor: "#474E68",
          color: "#ECF2FF",
          "&:hover": {
            backgroundColor: "#474E68",
            color: "#F0F0F0",
          },
          border: "1px solid #F0F0F0",
          borderRadius: "4px", // set the border radius to 4px
        }}
        label="contact me"
        onClick={handleOpen}
        outlined
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",  // 80% of the viewport's width
            maxWidth: "800px",  // will not exceed 800px
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <ContactForm />
        </Box>
      </Modal>
    </div>
  )
}

function ContactForm() {
  const [state, handleSubmit] = useForm("xrgjewbb")
  if (state.succeeded) {
    return (
      <Typography variant="h6">
        Thank you for your message! I'll be in contact shortly.
      </Typography>
    )
  }
  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Typography variant="h6" gutterBottom>
          Contact me
        </Typography>
        <TextField
          id="name"
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
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
          id="phoneNumber"
          label="Phone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          name="phoneNumber"
        />
        <ValidationError prefix="Phone Number" field="phoneNumber" errors={state.errors} />
        <TextField
          id="companyName"
          label="Company Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="companyName"
        />
        <ValidationError prefix="Company Name" field="companyName" errors={state.errors} />
        <TextField
          id="jobTitle"
          label="Job Title"
          variant="outlined"
          fullWidth
          margin="normal"
          name="jobTitle"
        />
        <ValidationError prefix="Job Title" field="jobTitle" errors={state.errors} />
        <TextField
          id="website"
          label="Website"
          variant="outlined"
          fullWidth
          margin="normal"
          name="website"
        />
        <ValidationError prefix="Website" field="website" errors={state.errors} />
        <TextField
          id="areaOfInterest"
          label="Area of Interest"
          variant="outlined"
          fullWidth
          margin="normal"
          name="areaOfInterest"
        />
        <ValidationError prefix="Area of Interest" field="areaOfInterest" errors={state.errors} />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          name="description"
          multiline
          rows={4}
        />
        <ValidationError prefix="Description" field="description" errors={state.errors} />
        <Button variant="contained" type="submit" disabled={state.submitting}>
          Submit
        </Button>
      </Container>
    </form>
  )
}

export default Contact
