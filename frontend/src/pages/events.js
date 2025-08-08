import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getEvents, deleteEvent } from '@/services/api';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      alert('Error loading events');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setDeleting(id);
      try {
        await deleteEvent(id);
        loadEvents();
      } catch (error) {
        alert('Error deleting event');
      } finally {
        setDeleting(null);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <>
      <div className="events-container">
        <div className="header">
          <h1>Events</h1>
          <Link href="/create" className="create-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create Event
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>No events yet</h3>
            <p>Create your first event to get started</p>
            <Link href="/create" className="create-first-btn">
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-header">
                  <h3 className="event-title">{event.title}</h3>
                  <div className="event-actions">
                    <Link href={`/edit/${event.id}`} className="edit-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m18 2 4 4-14 14H4v-4L18 2z"></path>
                      </svg>
                    </Link>
                    <button 
                      onClick={() => handleDelete(event.id)}
                      className="delete-btn"
                      disabled={deleting === event.id}
                    >
                      {deleting === event.id ? (
                        <div className="mini-spinner"></div>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3,6 5,6 21,6"></polyline>
                          <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="event-details">
                  <div className="detail-row">
                    <span className="detail-icon">📅</span>
                    <span className="detail-text">{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-icon">🕒</span>
                    <span className="detail-text">{event.time}</span>
                  </div>
                  
                  {event.venue && (
                    <div className="detail-row">
                      <span className="detail-icon">📍</span>
                      <span className="detail-text">{event.venue}</span>
                    </div>
                  )}
                </div>

                {event.description && (
                  <div className="event-description">
                    <p>{event.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .events-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .create-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .create-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          color: #666;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 15px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          margin-bottom: 10px;
          color: #333;
        }

        .empty-state p {
          margin-bottom: 30px;
          font-size: 1.1rem;
        }

        .create-first-btn {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 15px 30px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 25px;
        }

        .event-card {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 1px solid #e1e5e9;
        }

        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .event-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .event-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
          flex: 1;
          margin-right: 15px;
          line-height: 1.4;
        }

        .event-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .edit-btn, .delete-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .edit-btn {
          background: #f8f9fa;
          color: #495057;
          text-decoration: none;
        }

        .edit-btn:hover {
          background: #e9ecef;
          color: #212529;
        }

        .delete-btn {
          background: #fff5f5;
          color: #e53e3e;
        }

        .delete-btn:hover:not(:disabled) {
          background: #fed7d7;
          color: #c53030;
        }

        .delete-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .mini-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .event-details {
          margin-bottom: 15px;
        }

        .detail-row {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          gap: 12px;
        }

        .detail-icon {
          font-size: 1.1rem;
          width: 20px;
          text-align: center;
        }

        .detail-text {
          color: #4a5568;
          font-weight: 500;
        }

        .event-description {
          border-top: 1px solid #e2e8f0;
          padding-top: 15px;
          margin-top: 15px;
        }

        .event-description p {
          color: #718096;
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 768px) {
          .events-container {
            padding: 15px;
          }

          .header {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
          }

          .header h1 {
            font-size: 2rem;
            margin-bottom: 15px;
          }

          .events-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .event-card {
            padding: 20px;
          }

          .event-header {
            flex-direction: column;
            gap: 15px;
          }

          .event-actions {
            align-self: flex-end;
          }
        }
      `}</style>
    </>
  );
}