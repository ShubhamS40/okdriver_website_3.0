'use client'
import React from 'react';

const ChatSection = ({ chatRooms }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-black">Active Chat Rooms</h3>
          <p className="text-sm text-gray-600">Monitor conversations between drivers, clients, and support</p>
        </div>
        <div className="divide-y divide-gray-200">
          {chatRooms.map((room) => (
            <div key={room.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-black">{room.vehicle} Chat Room</h4>
                  <p className="text-sm text-gray-600">
                    Participants: {room.participants.join(', ')}
                  </p>
                  <p className="text-xs text-gray-500">Last message: {room.lastMessage}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    room.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : room.status === 'idle'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {room.status}
                  </span>
                  <button className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800 transition-colors">
                    Join Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatSection;