'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';

const NotificationComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Mock notification data
  const notifications = [
    {
      id: 1,
      type: 'action',
      sender: 'SrmPyq',
      date: '1 Jul',
      message: 'Update your target API level by 31 August 2025 to release updates to your app'
    },
    {
      id: 2,
      type: 'info',
      sender: 'Sshubham2004',
      date: '1 Sept',
      message: 'Important tax changes in Romania'
    },
    {
      id: 3,
      type: 'info',
      sender: 'Sshubham2004',
      date: '1 Sept',
      message: 'Important tax changes in Benin'
    },
    {
      id: 4,
      type: 'alert',
      sender: 'Sshubham2004',
      date: '27 Aug',
      message: 'Get ready for new Android developer verification requirements'
    },
    {
      id: 5,
      type: 'chat',
      sender: 'Vehicle OK-CAR-001',
      date: '25 Aug',
      message: 'Driver has requested assistance'
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'action':
        return (
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-600 text-xs font-bold">!</span>
          </div>
        );
      case 'info':
        return (
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 text-xs">i</span>
          </div>
        );
      case 'alert':
        return (
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="text-yellow-600 text-xs">⚠</span>
          </div>
        );
      case 'chat':
        return (
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 text-xs">💬</span>
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-600 text-xs">•</span>
          </div>
        );
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell with indicator */}
      <button
        onClick={toggleDropdown}
        className="relative p-1 rounded-full hover:bg-gray-100 focus:outline-none"
      >
        <Bell className="w-6 h-6 text-gray-500" />
        <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500"></span>
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200 max-h-96 overflow-y-auto">
          <div className="p-3 border-b border-gray-200 bg-red-50 flex justify-between items-center">
            <div className="flex items-center">
              <Bell className="w-4 h-4 text-red-500 mr-2" />
              <span className="text-red-500 font-medium">Unread notifications</span>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
          
          <div className="p-2 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-blue-500 font-medium">All apps</span>
              <button className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-3 hover:bg-gray-50 ${notification.type === 'action' ? 'bg-red-50' : ''}`}>
                <div className="flex items-center mb-1">
                  {getNotificationIcon(notification.type)}
                  <span className="ml-2 text-sm font-medium">{notification.sender}</span>
                  <span className="ml-auto text-xs text-gray-500">{notification.date}</span>
                  <button className="ml-2 text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-700">{notification.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;