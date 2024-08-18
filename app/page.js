import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { AppBar, Toolbar, Typography, Box, Grid, Button } from '@mui/material';

export default function Home() {
  return (
    <main className="bg-zinc-900 min-h-screen text-white">

      <MaxWidthWrapper className="py-4">
        <div>
          Flashcard App
        </div>

        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Flashcard SaaS
            </Typography>
            <SignedOut>
              <Button color="inherit" href="/sign-in">Login</Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>

        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Flashcard SaaS
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            The easiest way to create flashcards from your text.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} href="/generate">
            Get Started
          </Button>
          <Button variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }} href="/flashcards">
            View Flashcards
          </Button>
        </Box>

        <Box sx={{ my: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
          <Grid container spacing={4}>
            {/* Feature items */}
          </Grid>
        </Box>

        <Box sx={{ my: 6, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6">Basic Plan</Typography>
              <Typography>$5/month</Typography>
              <Typography>100 Flashcards</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6">Pro Plan</Typography>
              <Typography>$10/month</Typography>
              <Typography>Unlimited Flashcards</Typography>
            </Grid>
          </Grid>
        </Box>
      </MaxWidthWrapper>
    </main>
  );
}
