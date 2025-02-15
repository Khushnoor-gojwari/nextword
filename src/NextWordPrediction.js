import React, { useState } from 'react';
import axios from 'axios';

function NextWordPrediction() {
    const [text, setText] = useState('');
    const [numWords, setNumWords] = useState(1);
    const [predictedText, setPredictedText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPredictedText('');

        try {
            const response = await axios.post('http://localhost:8000/predict', {
                text: text,
                num_words: parseInt(numWords, 10),
            });
            setPredictedText(response.data.predicted_text);
        } catch (error) {
            console.error('Error predicting next word:', error);
            setPredictedText('Error: Could not generate prediction.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundImage: "url('./ai2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
            <div style={{
                fontFamily: 'Arial, sans-serif',
                width: "500px",
                minHeight: "600px",
                border: "1px solid black",
                boxShadow: "5px 5px 15px rgba(154, 188, 185, 0.3)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "10px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                padding: "20px"
            }}>
                <h1 style={{ color: 'white' }}>Next Word Prediction</h1>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text"
                        style={{ padding: '10px', width: '300px' }}
                    />
                    <input 
                        type="number"
                        value={numWords}
                        onChange={(e) => setNumWords(e.target.value)}
                        placeholder="Number of words"
                        min="1"
                        style={{ padding: '10px', width: '100px', marginTop: "20px" }}
                    />
                    <button type="submit" style={{
                        width: "300px",
                        marginTop: "30px",
                        padding: '10px'
                    }}>Predict</button>
                </form>

                {loading && (
                    <div style={{ marginTop: '20px', fontSize: '18px', color: 'grey' }}>
                        <p>Loading...</p>
                    </div>
                )}

                {!loading && predictedText && (
                    <div style={{
                        marginTop: '20px', 
                        fontSize: '18px', 
                        color: 'white', 
                        textAlign: 'left', 
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        maxHeight: "200px",  // 👈 Fixed height to limit size
                        overflowY: "auto",   // 👈 Enables scrolling
                        backgroundColor: "rgba(255, 255, 255, 0.1)", // Light transparent background
                        padding: "10px",
                        borderRadius: "5px"
                    }}>
                        <h2>Predicted Text:</h2>
                        <p>{predictedText}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NextWordPrediction;
