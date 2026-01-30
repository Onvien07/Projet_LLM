import React, { useState, useEffect } from 'react';
import QuestionInput from './components/QuestionInput';
import AIResponse from './components/AIResponse';
import ConversationHistory from './components/ConversationHistory';
import NewsList from './components/NewsList';
import { getNews, askQuestion, getSummary, getExplanation } from './services/apiService';
import './App.css';

/**
 * Composant principal NewsPulse
 * Orchestre toute l'application et gère l'état global
 */
function App() {
    // États principaux
    const [news, setNews] = useState([]);
    const [newsLoading, setNewsLoading] = useState(true);
    const [currentResponse, setCurrentResponse] = useState(null);
    const [responseLoading, setResponseLoading] = useState(false);
    const [responseError, setResponseError] = useState(null);
    const [conversationHistory, setConversationHistory] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    /**
     * Charger les actualités au démarrage
     */
    useEffect(() => {
        loadNews();
    }, []);

    /**
     * Récupère les actualités
     */
    const loadNews = async () => {
        try {
            setNewsLoading(true);
            const articles = await getNews(12);
            setNews(articles.data || articles);
        } catch (error) {
            console.error('Erreur chargement actualités:', error);
            // En cas d'erreur, utiliser des données mock (le backend fournira des mock data)
        } finally {
            setNewsLoading(false);
        }
    };

    /**
     * Gère la soumission d'une question
     */
    const handleQuestionSubmit = async (question) => {
        try {
            setResponseLoading(true);
            setResponseError(null);
            setCurrentResponse(null);

            const response = await askQuestion(question);

            const newResponse = {
                id: Date.now(),
                question: question,
                answer: response.answer || response.data?.answer || 'Réponse reçue',
                timestamp: new Date().toISOString(),
            };

            setCurrentResponse(newResponse);

            // Ajouter à l'historique
            setConversationHistory(prev => [...prev, newResponse]);

        } catch (error) {
            console.error('Erreur lors de la question:', error);
            setResponseError(error.message || 'Impossible d\'obtenir une réponse');
        } finally {
            setResponseLoading(false);
        }
    };

    /**
     * Gère le clic sur "Résumer" un article
     */
    const handleSummaryClick = async (article) => {
        try {
            setResponseLoading(true);
            setResponseError(null);
            setCurrentResponse(null);

            const response = await getSummary(article.id, article.summary);

            const newResponse = {
                id: Date.now(),
                question: `Résume l'article: "${article.title}"`,
                answer: response.summary || response.data?.summary || 'Résumé généré',
                timestamp: new Date().toISOString(),
            };

            setCurrentResponse(newResponse);
            setConversationHistory(prev => [...prev, newResponse]);

            // Scroll vers le haut pour voir la réponse
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error('Erreur lors du résumé:', error);
            setResponseError(error.message || 'Impossible de générer le résumé');
        } finally {
            setResponseLoading(false);
        }
    };

    /**
     * Gère le clic sur "Expliquer" un article
     */
    const handleExplainClick = async (article) => {
        try {
            setResponseLoading(true);
            setResponseError(null);
            setCurrentResponse(null);

            const response = await getExplanation(article.title, article.summary);

            const newResponse = {
                id: Date.now(),
                question: `Explique l'article: "${article.title}"`,
                answer: response.explanation || response.data?.explanation || 'Explication générée',
                timestamp: new Date().toISOString(),
            };

            setCurrentResponse(newResponse);
            setConversationHistory(prev => [...prev, newResponse]);

            // Scroll vers le haut
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error('Erreur lors de l\'explication:', error);
            setResponseError(error.message || 'Impossible de générer l\'explication');
        } finally {
            setResponseLoading(false);
        }
    };

    /**
     * Réutilise une question de l'historique
     */
    const handleHistoryQuestionClick = (question) => {
        handleQuestionSubmit(question);
    };

    /**
     * Toggle sidebar
     */
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="app">
            {/* Header */}
            <header className="app-header">
                <div className="header-content">
                    <button
                        className="sidebar-toggle btn btn-ghost"
                        onClick={toggleSidebar}
                        aria-label="Toggle sidebar"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>

                    <div className="logo">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
                            <path d="M10 16l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h1>NewsPulse</h1>
                    </div>

                    <div className="header-actions">
                        <span className="status-indicator online">
                            <span className="status-dot"></span>
                            En ligne
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <div className="app-layout">
                {/* Sidebar - Historique */}
                <aside className={`app-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                    <ConversationHistory
                        history={conversationHistory}
                        onQuestionClick={handleHistoryQuestionClick}
                    />
                </aside>

                {/* Main Content */}
                <main className="app-main">
                    {/* Section Question/Réponse */}
                    <section className="interaction-section">
                        <div className="section-header">
                            <h2>Posez vos questions sur l'actualité</h2>
                            <p>Utilisez l'intelligence artificielle pour comprendre l'actualité mondiale</p>
                        </div>

                        <QuestionInput
                            onSubmit={handleQuestionSubmit}
                            isLoading={responseLoading}
                        />

                        <AIResponse
                            response={currentResponse}
                            isLoading={responseLoading}
                            error={responseError}
                        />
                    </section>

                    {/* Section Actualités */}
                    <section className="news-section">
                        <NewsList
                            news={news}
                            isLoading={newsLoading}
                            onSummaryClick={handleSummaryClick}
                            onExplainClick={handleExplainClick}
                        />
                    </section>
                </main>
            </div>

            {/* Footer */}
            <footer className="app-footer">
                <p>
                    NewsPulse - Actualités alimentées par l'IA
                    <span className="separator">•</span>
                    Propulsé par Deepseek
                </p>
            </footer>
        </div>
    );
}

export default App;
