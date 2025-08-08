import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getEvent, updateEvent } from '@/services/api';

export default function EditEvent() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    venue: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    if (id) {
      loadEvent();
    }
  }, [id]);

  const loadEvent = async () => {
    try {
      const event = await getEvent(id);
      setFormData({
        title: event.title || '',
        description: event.description || '',
        venue: event.venue || '',
        date: event.date || '',
        time: event.time || ''
      });
    } catch (error) {
      alert('Error loading event');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateEvent(id, formData);
      router.push('/events');
    } catch (error) {
      alert('Error updating event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Edit Event</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Venue:</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
        </div>

        <div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '10px 20px', 
              fontSize: '16px', 
              marginRight: '10px',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none'
            }}
          >
            {loading ? 'Updating...' : 'Update Event'}
          </button>
          
          <button 
            type="button" 
            onClick={() => router.push('/events')}
            style={{ padding: '10px 20px', fontSize: '16px' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}