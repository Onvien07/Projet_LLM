import React from 'react';
import './AIResponse.css';

/**
 * Composant AIResponse
 * Affiche la réponse de l'IA de manière claire et structurée
 * 
 * Props:
 * - response: objet contenant la réponse { answer, timestamp, question }
 * - isLoading: indique si la réponse est en cours de génération
 * - error: message d'erreur si la requête a échoué
 */
const AIResponse = ({ response, isLoading = false, error = null }) => {

    // Affichage pendant le chargement
    if (isLoading) {
        return (
            <div className="ai-response-container loading">
                <div className="response-card">
                    <div className="response-header">
                        <div className="ai-badge pulse">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            IA en réflexion...
                        </div>
                    </div>

                    <div className="skeleton-loader">
                        <div className="skeleton-line" style={{ width: '90%' }}></div>
                        <div className="skeleton-line" style={{ width: '80%' }}></div>
                        <div className="skeleton-line" style={{ width: '85%' }}></div>
                        <div className="skeleton-line" style={{ width: '60%' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    // Affichage des erreurs
    if (error) {
        return (
            <div className="ai-response-container error-state fade-in">
                <div className="response-card error">
                    <div className="error-icon">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
                            <path d="M24 14v12M24 30v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <h3>Une erreur est survenue</h3>
                    <p>{error}</p>
                    <button className="btn btn-secondary retry-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M14 8A6 6 0 1 1 8 2v4l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    // Pas de réponse à afficher
    if (!response) {
        return (
            <div className="ai-response-container empty">
                <div className="empty-state">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                        <path d="M32 20v24M20 32h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <p>Posez une question pour commencer</p>
                </div>
            </div>
        );
    }

    // Formater la date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: 'short',
        });
    };

    // Affichage de la réponse
    return (
        <div className="ai-response-container fade-in">
            <div className="response-card">
                <div className="response-header">
                    <div className="ai-badge">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Réponse de l'IA
                    </div>
                    {response.timestamp && (
                        <span className="timestamp">{formatDate(response.timestamp)}</span>
                    )}
                </div>

                {response.question && (
                    <div className="original-question">
                        <strong>Votre question :</strong> {response.question}
                    </div>
                )}

                <div className="response-content">
                    {/* Formater la réponse en paragraphes */}
                    {response.answer.split('\n').map((paragraph, index) => (
                        paragraph.trim() && <p key={index}>{paragraph}</p>
                    ))}
                </div>

                <div className="response-footer">
                    <button className="btn btn-ghost action-btn" title="Copier la réponse">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="5" y="5" width="9" height="9" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M3 11V3h8" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        Copier
                    </button>
                    <button className="btn btn-ghost action-btn" title="Partager">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="4" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="12" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M6 7l4-2M6 9l4 2" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        Partager
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIResponse;
