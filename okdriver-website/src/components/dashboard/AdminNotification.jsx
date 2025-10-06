"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Bell } from "lucide-react";
import { Inbox } from "@novu/react";

export const AdminNotification = () => {
  const appId = process.env.NEXT_PUBLIC_NOVU_APP_ID || "DJWatzYSNmOs";
  const [notificationCount, setNotificationCount] = useState(0);
  const [ready, setReady] = useState(false);

  const adminSubscriber = useMemo(() => {
    try {
      if (typeof window === "undefined") return null;

      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) return null;

      const payload = JSON.parse(atob(adminToken.split(".")[1] || ""));
      if (!payload?.id) return null;

      const subscriberId = `admin-${payload.id}`;
      return {
        id: subscriberId,
        adminId: payload.id,
        email: payload.email,
      };
    } catch (error) {
      console.error("Error parsing admin token:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    if (!appId || !adminSubscriber) {
      setReady(false);
    } else {
      setReady(true);
    }
  }, [appId, adminSubscriber]);

  if (!ready) {
    return (
      <button
        className="relative p-1 rounded-full hover:bg-gray-100 focus:outline-none"
        title={`Notifications disabled: ${!appId ? "Missing App ID" : "No Admin Token"}`}
        onClick={() => {
          console.warn("Notifications are not initialized.");
        }}
      >
        <Bell className="w-6 h-6 text-gray-400" />
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {notificationCount > 9 ? "9+" : notificationCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="relative">
      <Inbox
        applicationIdentifier={appId}
        subscriberId={adminSubscriber.id}
        onNotificationReceived={(notification) => {
          setNotificationCount((c) => c + 1);
        }}
        onUnseenCountChanged={(count) => {
          setNotificationCount(count);
        }}
        onNotificationClick={() => {
          setNotificationCount((c) => Math.max(0, c - 1));
        }}
        appearance={{
          elements: {
            bellIcon: "w-6 h-6 text-gray-600 hover:text-gray-800",
            notificationsList: "max-h-96 overflow-y-auto",
          },
        }}
      />

      {notificationCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {notificationCount > 9 ? "9+" : notificationCount}
        </span>
      )}
    </div>
  );
};
