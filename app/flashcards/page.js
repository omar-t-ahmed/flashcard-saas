"use client";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Container,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Button,
    Box
} from "@mui/material";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import db from "@/firebase";

export default function Flashcard() {
    const { user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return;
            const docRef = doc(collection(db, "users"), user.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log(docSnap.data());
                const collections = docSnap.data().flashcardSets || [];
                setFlashcards(collections);
            } else {
                await setDoc(docRef, { flashcards: [] });
            }
        }
        getFlashcards();
    }, [user]);

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`);
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Button variant="contained" color="secondary" href="/">
                    Home
                </Button>
            </Box>
            <Grid container spacing={3} sx={{ mt: 4 }}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardActionArea
                                onClick={() => handleCardClick(flashcard.name)}
                            >
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {flashcard.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
