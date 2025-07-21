import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

const AdminPanel = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: number) => {
    try {
      await axios.delete(`http://localhost:500/api/messages/${id}`);
      setMessages(messages.filter(msg => msg.id !== id));
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading messages...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Contact Messages</h2>
      {messages.length === 0 ? (
        <p className="text-gray-600">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="bg-white p-6 rounded-lg shadow border">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">{message.name}</h3>
                  <p className="text-gray-60">{message.email}</p>
                  <p className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => deleteMessage(message.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-700">{message.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel; 