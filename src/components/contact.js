import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function Contact() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        <MailOutlineIcon/> 
      </Button>

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
            width: "95%",
            maxWidth: "90vw",
            maxHeight: "90vh", // Set a maximum height for the modal
            overflowY: "auto", // Enable vertical scrolling if content exceeds the height
            bgcolor: "background.paper",
            color: "#474E68",
            boxShadow: 24,
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 1
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
  );
}

// Rest of your ContactForm remains the same

function ContactForm() {
  const [state, handleSubmit] = useForm("xrgjewbb");

  if (state.succeeded) {
    return (
      // <Typography variant="h6">
      //   Thank you for your message! I'll be in contact shortly.
      // </Typography>
      <Alert severity="success">Thanks!</Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
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
        <ValidationError
          prefix="Phone Number"
          field="phoneNumber"
          errors={state.errors}
        />
        <TextField
          id="message"
          label="Message"
          variant="outlined"
          fullWidth
          margin="normal"
          name="message"
          multiline
          rows={3}
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          disabled={state.submitting}
          sx={{ alignSelf: "flex-end" }} // Align the button to the right
        >
          Submit
        </Button>
      </Container>
    </form>
  );
}

export default Contact;
