import React, { useState } from 'react';
import { useApi } from '../hooks';
import { supportService } from '../services';
import { formatDate } from '../utils/helpers';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Support = () => {
  const { data: tickets, loading, error, refetch } = useApi(() => supportService.getTickets(), []);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
  });

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    setCreateError('');

    if (!formData.subject.trim() || !formData.description.trim()) {
      setCreateError('Please fill in all fields');
      return;
    }

    try {
      setCreateLoading(true);
      await supportService.createTicket(formData);
      setFormData({ subject: '', description: '' });
      setShowCreateForm(false);
      refetch(); // Refresh the tickets list
    } catch (err) {
      setCreateError(err.response?.data?.message || 'Failed to create ticket');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading && !tickets) {
    return <LoadingSpinner message="Loading support tickets..." />;
  }

  if (error) {
    return (
      <div className="error-page">
        <h1>Error Loading Tickets</h1>
        <p>{error}</p>
        <button onClick={refetch} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="support-page">
      <div className="container">
        <div className="page-header">
          <h1>Customer Support</h1>
          <p>Get help with your orders and account</p>
          <button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="btn btn-primary"
          >
            {showCreateForm ? 'Cancel' : 'Create New Ticket'}
          </button>
        </div>

        {showCreateForm && (
          <div className="create-ticket-form">
            <div className="form-card">
              <h2>Create Support Ticket</h2>
              <form onSubmit={handleCreateTicket}>
                {createError && <div className="error-message">{createError}</div>}
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Please provide detailed information about your issue"
                    rows="5"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={createLoading}
                  >
                    {createLoading ? 'Creating...' : 'Create Ticket'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowCreateForm(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="tickets-section">
          <h2>Your Support Tickets</h2>
          
          {!tickets || tickets.length === 0 ? (
            <div className="empty-tickets">
              <div className="empty-tickets-icon">🎧</div>
              <h3>No support tickets</h3>
              <p>You haven't created any support tickets yet. If you need help, feel free to create one.</p>
            </div>
          ) : (
            <div className="tickets-list">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="ticket-card">
                  <div className="ticket-header">
                    <div className="ticket-info">
                      <h3>#{ticket.id} - {ticket.subject}</h3>
                      <p className="ticket-date">Created on {formatDate(ticket.createdAt)}</p>
                    </div>
                    <div className="ticket-status">
                      <span className={`status-badge status-${ticket.status.toLowerCase()}`}>
                        {ticket.status}
                      </span>
                    </div>
                  </div>

                  <div className="ticket-description">
                    <p>{ticket.description}</p>
                  </div>

                  {ticket.response && (
                    <div className="ticket-response">
                      <h4>Support Response:</h4>
                      <p>{ticket.response}</p>
                      <small>Responded on {formatDate(ticket.responseDate)}</small>
                    </div>
                  )}

                  <div className="ticket-actions">
                    <button className="btn btn-secondary">View Details</button>
                    {ticket.status === 'Open' && (
                      <button className="btn btn-outline">Add Comment</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="support-info">
          <h3>Other Ways to Get Help</h3>
          <div className="support-options">
            <div className="support-option">
              <h4>📧 Email Support</h4>
              <p>Send us an email at support@ecommerce.com</p>
            </div>
            <div className="support-option">
              <h4>📞 Phone Support</h4>
              <p>Call us at 1-800-SUPPORT (Mon-Fri, 9AM-6PM)</p>
            </div>
            <div className="support-option">
              <h4>💬 Live Chat</h4>
              <p>Chat with our support team (Available 24/7)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;