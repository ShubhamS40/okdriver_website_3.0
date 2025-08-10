// pages/api/chatbot.js or app/api/chatbot/route.js (for App Router)

import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are okDriver's AI assistant. Answer queries about okDriver using this information:

## okDriver Website Chatbot Q&A

### 1. General Queries
**What is okDriver?**
okDriver is an AI-powered co-pilot for Indian roads. We turn your smartphone into a smart dashcam with real-time fatigue alerts, SOS emergency features, a driver monitoring system (DMS), and a voice assistant that talks like your buddy. We also have a hardware device in development for fleets and OEMs.

**How does the okDriver dashcam app work?**
Just download the app from the Play Store, mount your phone on your dashboard, and hit "Start." It records your drive, detects drowsiness or distractions, and can alert you or send SOS messages in case of emergencies.

**Is the app free?**
Yes! The basic version is free. We also offer a premium plan with cloud recording, dual-camera switching, and advanced assistant features.

**Can it work without the internet?**
Absolutely. The dashcam and DMS features work offline. You'll need internet for the voice assistant, SOS alerts, and cloud recording.

**How do I download okDriver?**
You can download our app from the Google Play Store. (Coming soon for iOS.)

### 2. Features
**What features are in the app?**
📹 Smart Dashcam (offline mode available)
🗣 okDriver Voice Assistant ("OkDriver" wake word)
👀 Driver Monitoring System (fatigue & distraction alerts)
🚨 SOS Alerts to emergency contacts
☁️ Cloud recording (premium)
🎥 External Wi-Fi camera support (coming soon)

**What's in the hardware device?**
Dual Dashcam (front & rear), SOS button, Voice assistant with infotainment integration, Offline + online DMS, Pothole detection, Traffic violation alerts, Accident detection

### 3. For Fleet Owners / Logistics Leads
**I manage a fleet. How can okDriver help?**
We help fleets reduce accidents, improve driver safety, and monitor behavior in real time. Our system can integrate with your existing dashboards and provide insights for training, compliance, and cost savings.

**Can we integrate okDriver with our fleet management system?**
Yes! Our hardware device supports cloud integration and APIs for real-time monitoring.

**How can I start a pilot program with okDriver?**
You can click [Book a Pilot Demo] on our site or email us at team@okdriver.in. Our team will help you design a pilot tailored to your needs.

### 4. Safety & Privacy
**Is my data safe?**
Absolutely. All recordings and driver data are encrypted. We only store data you choose to upload to the cloud. Offline data stays on your device.

**Does the dashcam record audio?**
By default, no. You can enable audio recording in the settings if needed.

### 5. Contact & Support
**How do I contact okDriver?**
📧 Email: hello@okdriver.in or team@okdriver.in
📞 Phone/WhatsApp: +91-9319500121
📍 Location: New Delhi
📲 Social: LinkedIn, Instagram (@okdriver.in)

**I have an idea or feedback. How can I share it?**
We love feedback! Drop us a message through our contact form or email us directly.

### 6. Fun / Engagement
**Can okDriver tell me jokes while driving?**
Yep! Just say "OkDriver, tell me a joke" and our assistant will keep you entertained.

**Can I use okDriver on long trips?**
Definitely. Our assistant can help you with fuel stops, nearby food joints, traffic updates, and more — so your road trips stay fun and safe.

IMPORTANT: If you cannot answer a query from the above information, respond with: "I don't have that specific information. Please contact us at +91 93195 00121 for more details."

Keep responses under 50 words and friendly.`;

// For App Router (app/api/chatbot/route.js)
export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message || message.trim() === '') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer dbd65ef3ea28743eb9f6ed0df90a98971c5a014ec4ddbd3fca2bf087de1a73e0',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 50,
        temperature: 0.7,
        stream: false
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from AI' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 
      "I don't have that specific information. Please contact us at +91 93195 00121 for more details.";

    return NextResponse.json({
      response: aiResponse
    });

  } catch (error) {
    console.error('Chatbot API Error:', error);
    return NextResponse.json(
      { 
        response: "I don't have that specific information. Please contact us at +91 93195 00121 for more details."
      },
      { status: 500 }
    );
  }
}

// For Pages Router (pages/api/chatbot.js)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer dbd65ef3ea28743eb9f6ed0df90a98971c5a014ec4ddbd3fca2bf087de1a73e0',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 50,
        temperature: 0.7,
        stream: false
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error:', errorData);
      return res.status(500).json({ error: 'Failed to get response from AI' });
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 
      "I don't have that specific information. Please contact us at +91 93195 00121 for more details.";

    return res.status(200).json({
      response: aiResponse
    });

  } catch (error) {
    console.error('Chatbot API Error:', error);
    return res.status(500).json({
      response: "I don't have that specific information. Please contact us at +91 93195 00121 for more details."
    });
  }
}