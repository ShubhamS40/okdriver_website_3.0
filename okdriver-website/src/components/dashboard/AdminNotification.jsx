"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Bell } from "lucide-react";
import { Inbox } from "@novu/react";

export const AdminNotification = () => {
  const appId = process.env.NEXT_PUBLIC_NOVU_APP_ID || "DJWatzYSNmOs";
  const [notificationCount, setNotificationCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [debugInfo, setDebugInfo] = useState({});

  const adminSubscriber = useMemo(() => {
    try {
      if (typeof window === "undefined") return null;
      
      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) {
        console.warn("🔔 No adminToken found in localStorage");
        return null;
      }
      
      const payload = JSON.parse(atob(adminToken.split(".")[1] || ""));
      if (!payload?.id) {
        console.warn("🔔 No admin ID found in token payload");
        return null;
      }
      
      const subscriberId = `admin-${payload.id}`;
      console.log("🔔 Admin subscriber ID:", subscriberId);
      console.log("🔔 Admin payload:", payload);
      
      setDebugInfo({
        adminId: payload.id,
        subscriberId,
        email: payload.email,
        tokenExists: !!adminToken
      });
      
      return { 
        id: subscriberId,
        adminId: payload.id,
        email: payload.email 
      };
    } catch (error) {
      console.error("🔔 Error parsing admin token:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    console.log("🔔 AdminNotification Debug Info:");
    console.log("🔔 App ID:", appId);
    console.log("🔔 Admin Subscriber:", adminSubscriber);
    console.log("🔔 Ready status:", Boolean(appId && adminSubscriber));
    
    if (!appId) {
      console.warn("🔔 ❌ NEXT_PUBLIC_NOVU_APP_ID is missing");
      console.warn("🔔 Add NEXT_PUBLIC_NOVU_APP_ID=DJWatzYSNmOs to your .env.local");
    }
    
    if (!adminSubscriber) {
      console.warn("🔔 ❌ Admin subscriber could not be created");
      console.warn("🔔 Check if adminToken exists in localStorage");
    }
    
    setReady(Boolean(appId && adminSubscriber));
  }, [appId, adminSubscriber]);

  // Debug component to show current state
  const DebugPanel = () => {
    if (process.env.NODE_ENV === 'production') return null;
    
    return (
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'black',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 9999,
        maxWidth: '300px'
      }}>
        <div>🔔 Novu Debug</div>
        <div>App ID: {appId || 'Missing'}</div>
        <div>Subscriber: {adminSubscriber?.id || 'None'}</div>
        <div>Admin ID: {debugInfo.adminId || 'None'}</div>
        <div>Ready: {ready ? '✅' : '❌'}</div>
        <div>Count: {notificationCount}</div>
      </div>
    );
  };

  if (!ready) {
    return (
      <>
        <DebugPanel />
        <button
          className="relative p-1 rounded-full hover:bg-gray-100 focus:outline-none"
          title={`Notifications disabled: ${!appId ? 'Missing App ID' : 'No Admin Token'}`}
          onClick={() => {
            console.log("🔔 Debug click - Current state:");
            console.log("🔔 App ID:", appId);
            console.log("🔔 Admin Subscriber:", adminSubscriber);
            console.log("🔔 LocalStorage adminToken:", localStorage.getItem("adminToken"));
          }}
        >
          <Bell className="w-6 h-6 text-gray-400" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>
      </>
    );
  }

  return (
    <>
      <DebugPanel />
      <div className="relative">
        <Inbox
          applicationIdentifier={appId}
          subscriberId={adminSubscriber.id}
          onNotificationReceived={(notification) => {
            console.log("🔔 New notification received:", notification);
            setNotificationCount((c) => c + 1);
          }}
          onUnseenCountChanged={(count) => {
            console.log("🔔 Unseen count changed:", count);
            setNotificationCount(count);
          }}
          onNotificationClick={(notification) => {
            console.log("🔔 Notification clicked:", notification);
            setNotificationCount((c) => Math.max(0, c - 1));
          }}
          // Add styling props
          appearance={{
            elements: {
              bellIcon: "w-6 h-6 text-gray-600 hover:text-gray-800",
              notificationsList: "max-h-96 overflow-y-auto",
            }
          }}
        />
        
        {/* Custom notification count badge */}
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {notificationCount > 9 ? '9+' : notificationCount}
          </span>
        )}
      </div>
    </>
  );
};