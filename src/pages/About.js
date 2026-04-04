import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedFeature: null,
    };
    this.toggleFeature = this.toggleFeature.bind(this);
  }

  toggleFeature(index) {
    this.setState((prev) => ({
      expandedFeature: prev.expandedFeature === index ? null : index,
    }));
  }

  render() {
    const features = [
      {
        title: 'Browse & Search',
        desc: 'Explore a curated collection of top-rated movies and TV shows. Filter by type or genre, and search by title instantly.',
      },
      {
        title: 'Smart Watchlist',
        desc: 'Add any title to your personal watchlist with one click. Your list is saved in your browser — no account needed.',
      },
      {
        title: 'Track Your Progress',
        desc: 'Mark titles as "Want to Watch", "Watching", or "Watched". See your progress stats at a glance on the Watchlist page.',
      },
      {
        title: 'Detail Pages',
        desc: 'Every movie and show has its own dedicated page with rating, genre, cast, director, and more.',
      },
    ];

    const techStack = [
      { label: 'React 18', note: 'UI library' },
      { label: 'React Router v6', note: 'Client-side routing' },
      { label: 'Context API', note: 'Global state' },
      { label: 'PropTypes', note: 'Props validation' },
      { label: 'Hooks', note: 'useState, useEffect, useMemo' },
      { label: 'localStorage', note: 'Persistent watchlist' },
    ];

    return (
      <div className="about-page">
        <div className="about-hero">
          <h1 className="about-title">
            About <span className="about-title-serif">CineTrack</span>
          </h1>
          <p className="about-lead">
            CineTrack is a minimal movie and TV show tracker built with React.
            Save titles you want to watch, mark what you're currently watching,
            and keep a record of everything you've seen.
          </p>
          <Link to="/" className="about-cta">Start Browsing →</Link>
        </div>

        <section className="about-section">
          <h2 className="about-section-title">Features</h2>
          <div className="features-list">
            {features.map((f, i) => (
              <div
                key={i}
                className={`feature-item ${this.state.expandedFeature === i ? 'expanded' : ''}`}
              >
                <button className="feature-header" onClick={() => this.toggleFeature(i)}>
                  <span className="feature-title">{f.title}</span>
                  <span className="feature-toggle">
                    {this.state.expandedFeature === i ? '−' : '+'}
                  </span>
                </button>
                {this.state.expandedFeature === i && (
                  <p className="feature-desc">{f.desc}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">Built With</h2>
          <div className="tech-grid">
            {techStack.map((t) => (
              <div key={t.label} className="tech-card">
                <span className="tech-label">{t.label}</span>
                <span className="tech-note">{t.note}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section about-react-concepts">
          <h2 className="about-section-title">React Concepts Used</h2>
          <div className="concepts-grid">
            {[
              'JSX',
              'Class Components',
              'Functional Components',
              'useState',
              'useEffect',
              'useMemo',
              'useContext',
              'Custom Hooks',
              'Props & PropTypes',
              'Context API',
              'React Router v6',
              'CSS Modules',
            ].map((c) => (
              <span key={c} className="concept-tag">{c}</span>
            ))}
          </div>
        </section>
      </div>
    );
  }
}

export default About;
