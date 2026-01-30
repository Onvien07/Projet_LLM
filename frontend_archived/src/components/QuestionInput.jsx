import React, { useState } from 'react';
import './QuestionInput.css';

/**
 * Composant QuestionInput
 * Zone de texte pour poser des questions au LLM avec bouton d'envoi
 * 
 * Props:
 * - onSubmit: fonction appelée lors de l'envoi (reçoit la question)
 * - isLoading: indique si une requête est en cours
 * - placeholder: texte par défaut dans le champ
 */
const QuestionInput = ({ onSubmit, isLoading = false, placeholder = "Posez votre question sur l'actualité..." }) => {
    const [question, setQuestion] = useState('');
    const [error, setError] = useState('');

    /**
     * Gère la soumission du formulaire
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!question.trim()) {
            setError('Veuillez entrer une question');
            return;
        }

        if (question.trim().length < 3) {
            setError('La question doit contenir au moins 3 caractères');
            return;
        }

        // Reset erreur et envoi
        setError('');
        onSubmit(question.trim());

        // Optionnel: vider le champ après envoi
        // setQuestion('');
    };

    /**
     * Gère les changements dans le textarea
     */
    const handleChange = (e) => {
        setQuestion(e.target.value);
        if (error) setError(''); // Efface l'erreur lors de la saisie
    };

    /**
     * Gère la soumission avec Enter (Shift+Enter pour nouvelle ligne)
     */
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="question-input-container">
            <form onSubmit={handleSubmit} className="question-form">
                <div className="input-wrapper">
                    <textarea
                        className={`question-textarea ${error ? 'error' : ''}`}
                        value={question}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        disabled={isLoading}
                        rows={3}
                        maxLength={1000}
                        aria-label="Zone de question"
                    />

                    {error && (
                        <div className="error-message fade-in">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zm0-6H7V4h2v2z" fill="currentColor" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <div className="input-footer">
                        <span className="character-count">
                            {question.length}/1000
                        </span>

                        <button
                            type="submit"
                            className="btn btn-primary submit-btn"
                            disabled={isLoading || !question.trim()}
                            aria-label="Envoyer la question"
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    En cours...
                                </>
                            ) : (
                                <>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M2 10l16-8-6 16-2-8-8-0z" fill="currentColor" />
                                    </svg>
                                    Envoyer
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>

            <div className="input-hint">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 0C3.1 0 0 3.1 0 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm.7 10.5H6.3V6.3h1.4v4.2zm0-5.6H6.3V3.5h1.4v1.4z" fill="currentColor" />
                </svg>
                Appuyez sur <kbd>Entrée</kbd> pour envoyer, <kbd>Shift+Entrée</kbd> pour une nouvelle ligne
            </div>
        </div>
    );
};

export default QuestionInput;
