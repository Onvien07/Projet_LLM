import React, { useRef, useEffect } from 'react';
import './ConversationHistory.css';

/**
 * Composant ConversationHistory
 * Affiche l'historique complet des échanges avec l'IA
 * 
 * Props:
 * - history: tableau des échanges [{question, answer, timestamp, id}]
 * - onQuestionClick: fonction appelée quand on clique sur une question (pour la réutiliser)
 */
const ConversationHistory = ({ history = [], onQuestionClick }) => {
    const historyEndRef = useRef(null);

    // Auto-scroll vers le bas lors de nouveaux messages
    useEffect(() => {
        if (historyEndRef.current) {
            historyEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    // Si pas d'historique
    if (history.length === 0) {
        return (
            <div className="conversation-history empty">
                <div className="empty-history">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                        <path d="M32 8v48M8 32h48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                        <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
                    </svg>
                    <p>Aucun historique pour le moment</p>
                    <span>Vos conversations apparaîtront ici</span>
                </div>
            </div>
        );
    }

    // Formater la date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'À l\'instant';
        if (diffMins < 60) return `Il y a ${diffMins} min`;

        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `Il y a ${diffHours}h`;

        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Tronquer le texte
    const truncate = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className="conversation-history">
            <div className="history-header">
                <h3>Historique des conversations</h3>
                <span className="history-count">{history.length} {history.length > 1 ? 'échanges' : 'échange'}</span>
            </div>

            <div className="history-list">
                {history.map((item, index) => (
                    <div key={item.id || index} className="history-item fade-in">
                        <div className="history-item-header">
                            <span className="item-number">#{history.length - index}</span>
                            <span className="item-time">{formatDate(item.timestamp)}</span>
                        </div>

                        <div
                            className="history-question"
                            onClick={() => onQuestionClick && onQuestionClick(item.question)}
                            role="button"
                            tabIndex={0}
                            title="Cliquer pour réutiliser cette question"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M8 6v4M8 10h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            <strong>{item.question}</strong>
                        </div>

                        <div className="history-answer">
                            <div className="answer-badge">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M4 6l1.5 1.5L8.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                IA
                            </div>
                            <p>{truncate(item.answer, 200)}</p>
                        </div>
                    </div>
                ))}

                {/* Élément de référence pour auto-scroll */}
                <div ref={historyEndRef} />
            </div>
        </div>
    );
};

export default ConversationHistory;
