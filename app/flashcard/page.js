"use client";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
    Container,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Box,
} from "@mui/material";
import db from "../../firebase";
import { collection, doc, getDoc } from "firebase/firestore";

export default function Flashcard() {
    const { user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState({});
    const searchParams = useSearchParams();
    const search = searchParams.get("id");

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return;
            const docRef = doc(db, "users", user.id, "flashcardSets", search);

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const flashcards = data.flashcards || [];

                setFlashcards(flashcards);
                console.log(flashcards);
            } else {
                console.log("No such document!");
            }
        }

        getFlashcard();
    }, [search, user]);

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id], // Toggle the flip state for the card with the given id
        }));
    };

    return (
        <Container maxWidth="md">
            <Grid container spacing={3} sx={{ mt: 4 }}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ perspective: "1000px" }}>
                            <CardActionArea
                                onClick={() => handleCardClick(index)}
                            >
                                <CardContent
                                    sx={{
                                        position: "relative",
                                        height: "200px",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            width: "100%",
                                            height: "100%",
                                            transition: "transform 0.6s",
                                            transformStyle: "preserve-3d",
                                            transform: flipped[index]
                                                ? "rotateY(180deg)"
                                                : "rotateY(0deg)",
                                        }}
                                    >
                                        {/* Front of the card */}
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                width: "100%",
                                                height: "100%",
                                                backfaceVisibility: "hidden",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                                component="div"
                                            >
                                                {flashcard.front}
                                            </Typography>
                                        </Box>

                                        {/* Back of the card */}
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                width: "100%",
                                                height: "100%",
                                                backfaceVisibility: "hidden",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                transform: "rotateY(180deg)",
                                                // Add horizontal padding (px property controls padding-left and padding-right)
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                                component="div"
                                            >
                                                {flashcard.back}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
