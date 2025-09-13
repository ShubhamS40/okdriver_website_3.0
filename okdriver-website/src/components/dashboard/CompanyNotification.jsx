"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { Bell, RefreshCw, Bug } from "lucide-react";
import { Inbox } from "@novu/react";

export const CompanyNotification = () => {
  const appId = process.env.NEXT_PUBLIC_NOVU_APP_ID || "DJWatzYSNmOs";
  const [notificationCount, setNotificationCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [debugInfo, setDebugInfo] = useState({});
  const [lastNotification, setLastNotification] = useState(null);
  const [allNotifications, setAllNotifications] = useState([]);
  const [wsStatus, setWsStatus] = useState('unknown');
  const [showDebug, setShowDebug] = useState(false);
  const inboxRef = useRef(null);

  // Check if current user is admin or company
  const subscriberInfo = useMemo(() => {
    try {
      if (typeof window === "undefined") return null;
      
      // Check for admin token first
      const adminToken = localStorage.getItem("adminToken");
      if (adminToken) {
        const payload = JSON.parse(atob(adminToken.split(".")[1] || ""));
        if (payload?.id) {
          const subscriberId = `admin-${payload.id}`;
          console.log("🔔 Admin subscriber ID:", subscriberId);
          
          setDebugInfo({
            type: 'admin',
            adminId: payload.id,
            subscriberId,
            email: payload.email,
            tokenExists: true
          });
          
          return { 
            id: subscriberId,
            type: 'admin',
            adminId: payload.id,
            email: payload.email 
          };
        }
      }

      // Check for company token
      const companyToken = localStorage.getItem("companyToken") || localStorage.getItem("token");
      if (companyToken) {
        const payload = JSON.parse(atob(companyToken.split(".")[1] || ""));
        if (payload?.id || payload?.companyId) {
          const companyId = payload.id || payload.companyId;
          const subscriberId = `company-${companyId}`;
          console.log("🔔 Company subscriber ID:", subscriberId);
          
          setDebugInfo({
            type: 'company',
            companyId: companyId,
            subscriberId,
            email: payload.email,
            tokenExists: true
          });
          
          return { 
            id: subscriberId,
            type: 'company',
            companyId: companyId,
            email: payload.email 
          };
        }
      }
      
      console.warn("🔔 No valid token found in localStorage");
      return null;
    } catch (error) {
      console.error("🔔 Error parsing token:", error);
      return null;
    }
  }, []);

  // Manual fetch notifications function
  const fetchNotifications = async () => {
    try {
      if (!subscriberInfo?.id || !appId) return;
      
      console.log("🔔 Manually fetching notifications...");
      
      const response = await fetch(`https://api.novu.co/v1/subscribers/${subscriberInfo.id}/notifications`, {
        headers: {
          'Authorization': `ApiKey ${process.env.NEXT_PUBLIC_NOVU_APP_ID}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        console.error("🔔 Failed to fetch notifications:", response.status);
        return;
      }
      
      const data = await response.json();
      console.log("🔔 Fetched notifications manually:", data);
      setAllNotifications(data.data || []);
      
    } catch (error) {
      console.error("🔔 Error fetching notifications:", error);
    }
  };

  // Test function to simulate notification
  const testNotification = () => {
    console.log("🔔 Testing notification simulation...");
    const mockNotification = {
      id: 'test-' + Date.now(),
      templateIdentifier: 'company-ticket-in-progress',
      subject: 'Test Notification',
      body: 'This is a test notification',
      payload: {
        ticketId: '40',
        subject: 'tata',
        status: 'IN_PROGRESS',
        action: 'IN_PROGRESS'
      },
      createdAt: new Date().toISOString(),
      read: false,
      seen: false
    };
    
    setLastNotification(mockNotification);
    setNotificationCount(c => c + 1);
  };

  useEffect(() => {
    console.log("🔔 CompanyNotification Debug Info:");
    console.log("🔔 App ID:", appId);
    console.log("🔔 Subscriber Info:", subscriberInfo);
    console.log("🔔 Ready status:", Boolean(appId && subscriberInfo));
    
    if (!appId) {
      console.warn("🔔 ❌ NEXT_PUBLIC_NOVU_APP_ID is missing");
      console.warn("🔔 Add NEXT_PUBLIC_NOVU_APP_ID=DJWatzYSNmOs to your .env.local");
    }
    
    if (!subscriberInfo) {
      console.warn("🔔 ❌ No valid subscriber found");
      console.warn("🔔 Check if adminToken or companyToken exists in localStorage");
    }
    
    setReady(Boolean(appId && subscriberInfo));

    // Check WebSocket connection
    if (typeof window !== 'undefined') {
      const checkWebSocket = () => {
        // Monitor WebSocket connections
        const originalWebSocket = window.WebSocket;
        window.WebSocket = function(url, protocols) {
          console.log("🔔 WebSocket connection attempt:", url);
          const ws = new originalWebSocket(url, protocols);
          
          ws.addEventListener('open', () => {
            console.log("🔔 ✅ WebSocket connected:", url);
            setWsStatus('connected');
          });
          
          ws.addEventListener('close', () => {
            console.log("🔔 ❌ WebSocket disconnected:", url);
            setWsStatus('disconnected');
          });
          
          ws.addEventListener('error', (error) => {
            console.error("🔔 ❌ WebSocket error:", error);
            setWsStatus('error');
          });
          
          ws.addEventListener('message', (event) => {
            console.log("🔔 📨 WebSocket message received:", event.data);
            try {
              const data = JSON.parse(event.data);
              if (data.type === 'notification') {
                console.log("🔔 🔔 Real-time notification:", data);
              }
            } catch (e) {
              console.log("🔔 Non-JSON WebSocket message:", event.data);
            }
          });
          
          return ws;
        };
      };
      
      checkWebSocket();
    }
  }, [appId, subscriberInfo]);

  // Periodic fetch to check for missed notifications
  useEffect(() => {
    if (!ready) return;
    
    const interval = setInterval(() => {
      console.log("🔔 Periodic notification check...");
      fetchNotifications();
    }, 10000); // Check every 10 seconds
    
    return () => clearInterval(interval);
  }, [ready, subscriberInfo]);

  // Debug component to show current state
  const DebugPanel = () => {
    if (!showDebug) return null;
    
    return (
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.9)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '11px',
        zIndex: 9999,
        maxWidth: '400px',
        maxHeight: '500px',
        overflow: 'auto',
        border: '1px solid #333'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <strong>🔔 Novu Debug Panel</strong>
          <button 
            onClick={() => setShowDebug(false)}
            style={{ background: 'red', color: 'white', border: 'none', borderRadius: '3px', padding: '2px 6px' }}
          >
            ✕
          </button>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <div><strong>Config:</strong></div>
          <div>App ID: {appId || 'Missing'}</div>
          <div>Type: {debugInfo.type || 'None'}</div>
          <div>Subscriber: {subscriberInfo?.id || 'None'}</div>
          <div>ID: {debugInfo.adminId || debugInfo.companyId || 'None'}</div>
          <div>Ready: {ready ? '✅' : '❌'}</div>
          <div>WS Status: <span style={{ color: wsStatus === 'connected' ? 'lime' : 'red' }}>{wsStatus}</span></div>
          <div>Count: {notificationCount}</div>
        </div>

        {lastNotification && (
          <div style={{ marginBottom: '10px', borderTop: '1px solid #333', paddingTop: '8px' }}>
            <div><strong>Last Notification:</strong></div>
            <div>ID: {lastNotification.id}</div>
            <div>Template: {lastNotification.templateIdentifier}</div>
            <div>Subject: {lastNotification.payload?.subject || lastNotification.subject || 'N/A'}</div>
            <div>Status: {lastNotification.payload?.status || 'N/A'}</div>
            <div>Action: {lastNotification.payload?.action || 'N/A'}</div>
            <div>Time: {new Date(lastNotification.createdAt).toLocaleTimeString()}</div>
          </div>
        )}

        {allNotifications.length > 0 && (
          <div style={{ borderTop: '1px solid #333', paddingTop: '8px' }}>
            <div><strong>All Notifications ({allNotifications.length}):</strong></div>
            <div style={{ maxHeight: '150px', overflow: 'auto' }}>
              {allNotifications.slice(0, 5).map((notif, idx) => (
                <div key={idx} style={{ fontSize: '10px', margin: '2px 0', padding: '2px', background: 'rgba(255,255,255,0.1)' }}>
                  {notif.templateIdentifier} - {notif.payload?.subject || notif.subject || 'No Subject'}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '10px', borderTop: '1px solid #333', paddingTop: '8px' }}>
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
            <button 
              onClick={fetchNotifications}
              style={{ background: 'blue', color: 'white', border: 'none', borderRadius: '3px', padding: '4px 8px', fontSize: '10px' }}
            >
              Fetch Manual
            </button>
            <button 
              onClick={testNotification}
              style={{ background: 'green', color: 'white', border: 'none', borderRadius: '3px', padding: '4px 8px', fontSize: '10px' }}
            >
              Test Notif
            </button>
            <button 
              onClick={() => window.location.reload()}
              style={{ background: 'orange', color: 'white', border: 'none', borderRadius: '3px', padding: '4px 8px', fontSize: '10px' }}
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!ready) {
    return (
      <>
        <DebugPanel />
        <div className="relative flex items-center gap-2">
          <button
            className="relative p-1 rounded-full hover:bg-gray-100 focus:outline-none"
            title={`Notifications disabled: ${!appId ? 'Missing App ID' : 'No Valid Token'}`}
            onClick={() => {
              console.log("🔔 Debug click - Current state:");
              console.log("🔔 App ID:", appId);
              console.log("🔔 Subscriber Info:", subscriberInfo);
              console.log("🔔 LocalStorage adminToken:", localStorage.getItem("adminToken"));
              console.log("🔔 LocalStorage companyToken:", localStorage.getItem("companyToken"));
              console.log("🔔 LocalStorage token:", localStorage.getItem("token"));
            }}
          >
            <Bell className="w-6 h-6 text-gray-400" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>
          
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
            title="Toggle Debug Panel"
          >
            <Bug className="w-4 h-4" />
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <DebugPanel />
      <div className="relative flex items-center gap-2">
        <div className="relative">
          <Inbox
            ref={inboxRef}
            applicationIdentifier={appId}
            subscriberId={subscriberInfo.id}
            onNotificationReceived={(notification) => {
              console.log("🔔 ===== NEW NOTIFICATION RECEIVED =====");
              console.log("🔔 Full notification object:", notification);
              console.log("🔔 Notification ID:", notification.id);
              console.log("🔔 Template identifier:", notification.templateIdentifier);
              console.log("🔔 Subject:", notification.subject);
              console.log("🔔 Body:", notification.body);
              console.log("🔔 Payload:", notification.payload);
              console.log("🔔 Created at:", notification.createdAt);
              console.log("🔔 Read status:", notification.read);
              console.log("🔔 Seen status:", notification.seen);
              console.log("🔔 =====================================");
              
              setLastNotification(notification);
              setNotificationCount((c) => c + 1);
              
              // Add to all notifications list
              setAllNotifications(prev => [notification, ...prev]);
            }}
            onUnseenCountChanged={(count) => {
              console.log("🔔 ===== UNSEEN COUNT CHANGED =====");
              console.log("🔔 New unseen count:", count);
              console.log("🔔 Previous count:", notificationCount);
              console.log("🔔 ================================");
              setNotificationCount(count);
            }}
            onNotificationClick={(notification) => {
              console.log("🔔 ===== NOTIFICATION CLICKED =====");
              console.log("🔔 Clicked notification:", notification);
              console.log("🔔 Template:", notification.templateIdentifier);
              console.log("🔔 ================================");
              setNotificationCount((c) => Math.max(0, c - 1));
            }}
            // Enhanced appearance configuration
            appearance={{
              elements: {
                bellIcon: "w-6 h-6 text-gray-600 hover:text-gray-800",
                notificationsList: "max-h-96 overflow-y-auto",
                notificationItem: "p-3 border-b border-gray-100 hover:bg-gray-50",
                notificationTitle: "font-medium text-gray-900",
                notificationContent: "text-sm text-gray-600 mt-1",
                unseenBadge: "bg-blue-500"
              }
            }}
            // Additional props for better debugging
            onLoad={(data) => {
              console.log("🔔 Inbox component loaded:", data);
              setWsStatus('loaded');
              // Fetch initial notifications
              setTimeout(() => fetchNotifications(), 1000);
            }}
            onError={(error) => {
              console.error("🔔 Inbox error:", error);
              setWsStatus('error');
            }}
          />
          
          {/* Custom notification count badge */}
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </div>

        {/* Debug and Refresh buttons */}
        <button
          onClick={() => setShowDebug(!showDebug)}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
          title="Toggle Debug Panel"
        >
          <Bug className="w-4 h-4" />
        </button>
        
        <button
          onClick={fetchNotifications}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
          title="Manually Refresh Notifications"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};