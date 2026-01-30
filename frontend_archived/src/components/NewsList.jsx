import React, { useState } from 'react';
import './NewsList.css';

/**
 * Composant NewsList
 * Affiche la liste des actualités récentes avec actions rapides
 * 
 * Props:
 * - news: tableau d'articles [{id, title, date, summary, source}]
 * - onSummaryClick: fonction appelée pour résumer un article
 * - onExplainClick: fonction appelée pour expliquer un article
 * - isLoading: indique si les articles sont en chargement
 */
const NewsList = ({ news = [], onSummaryClick, onExplainClick, isLoading = false }) => {
    const [expandedId, setExpandedId] = useState(null);

    // Toggle expansion d'un article
    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    // Formater la date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / 3600000);

        if (diffHours < 1) return 'Il y a moins d\'1h';
        if (diffHours < 24) return `Il y a ${diffHours}h`;

        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) return `Il y a ${diffDays}j`;

        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: diffDays > 365 ? 'numeric' : undefined,
        });
    };

    // Skeleton loader pendant chargement
    if (isLoading) {
        return (
            <div className="news-list">
                <div className="news-header">
                    <h2>Actualités Récentes</h2>
                </div>
                <div className="news-grid">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="news-card skeleton">
                            <div className="skeleton-tag"></div>
                            <div className="skeleton-title"></div>
                            <div className="skeleton-text"></div>
                            <div className="skeleton-text short"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Si aucune actualité
    if (news.length === 0) {
        return (
            <div className="news-list empty">
                <div className="empty-news">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                        <rect x="12" y="16" width="40" height="36" rx="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M20 24h24M20 32h24M20 40h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <p>Aucune actualité disponible</p>
                </div>
            </div>
        );
    }

    return (
        <div className="news-list">
            <div className="news-header">
                <div>
                    <h2>Actualités Récentes</h2>
                    <p className="news-subtitle">{news.length} articles disponibles</p>
                </div>
                <button className="btn btn-ghost refresh-btn" title="Actualiser">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M18 10a8 8 0 1 1-2.636-5.95M15 2v6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <div className="news-grid">
                {news.map((article) => {
                    const isExpanded = expandedId === article.id;

                    return (
                        <article key={article.id} className="news-card fade-in">
                            <div className="news-card-header">
                                {article.source && (
                                    <span className="news-source badge badge-primary">
                                        {article.source}
                                    </span>
                                )}
                                <span className="news-date">{formatDate(article.date)}</span>
                            </div>

                            <h3 className="news-title">{article.title}</h3>

                            <p className={`news-summary ${isExpanded ? 'expanded' : ''}`}>
                                {article.summary}
                            </p>

                            {article.summary && article.summary.length > 150 && (
                                <button
                                    className="expand-btn"
                                    onClick={() => toggleExpand(article.id)}
                                >
                                    {isExpanded ? 'Voir moins' : 'Voir plus'}
                                </button>
                            )}

                            <div className="news-actions">
                                <button
                                    className="btn btn-secondary action-btn"
                                    onClick={() => onSummaryClick && onSummaryClick(article)}
                                    title="Résumer cet article"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    Résumer
                                </button>

                                <button
                                    className="btn btn-secondary action-btn"
                                    onClick={() => onExplainClick && onExplainClick(article)}
                                    title="Expliquer cet article"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M8 6v4M8 10h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    Expliquer
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
};

export default NewsList;
