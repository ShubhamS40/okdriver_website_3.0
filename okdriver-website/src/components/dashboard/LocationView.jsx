import React, { useEffect, useRef } from 'react';

function LocationView() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Load Leaflet CSS and JS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const leafletCSS = document.createElement('link');
      leafletCSS.rel = 'stylesheet';
      leafletCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
      document.head.appendChild(leafletCSS);
    }

    if (!window.L) {
      const leafletJS = document.createElement('script');
      leafletJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
      leafletJS.onload = initializeMap;
      document.head.appendChild(leafletJS);
    } else {
      initializeMap();
    }

    function initializeMap() {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // Initialize map centered on New Delhi, India
      const map = window.L.map(mapRef.current, {
        center: [28.6139, 77.2090], // New Delhi coordinates
        zoom: 12,
        zoomControl: false
      });

      mapInstanceRef.current = map;

      // Add custom zoom controls
      window.L.control.zoom({
        position: 'bottomright'
      }).addTo(map);

      // Add OpenStreetMap tiles
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      // Create Uber/Ola style icons
      const createVehicleIcon = (color, type, size = 32) => {
        let iconSVG = '';
        
        if (type === 'car') {
          iconSVG = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-1.92-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          `;
        } else if (type === 'bus') {
          iconSVG = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
            </svg>
          `;
        } else if (type === 'truck') {
          iconSVG = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
          `;
        }

        return window.L.divIcon({
          html: `
            <div style="
              background: ${color}; 
              border-radius: 50%; 
              width: ${size}px; 
              height: ${size}px; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              border: 3px solid white; 
              box-shadow: 0 4px 8px rgba(0,0,0,0.25);
              position: relative;
            ">
              ${iconSVG}
              <div style="
                position: absolute;
                bottom: -8px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 8px solid ${color};
              "></div>
            </div>
          `,
          iconSize: [size, size + 8],
          iconAnchor: [size/2, size + 8],
          className: 'custom-vehicle-marker'
        });
      };

      const carIcon = createVehicleIcon('#00D084', 'car', 28); // Uber Green
      const busIcon = createVehicleIcon('#1976D2', 'bus', 32); // Blue
      const truckIcon = createVehicleIcon('#FF6B35', 'truck', 30); // Orange

      // Vehicle data with different locations around Delhi
      const vehicles = [
        { id: 1, type: 'car', name: 'Car A1-2345', lat: 28.6139, lng: 77.2090, icon: carIcon, driver: 'Rahul Kumar', status: 'Available' },
        { id: 2, type: 'car', name: 'Car B2-3456', lat: 28.6304, lng: 77.2177, icon: carIcon, driver: 'Amit Singh', status: 'On Trip' },
        { id: 3, type: 'car', name: 'Car C3-4567', lat: 28.5921, lng: 77.2507, icon: carIcon, driver: 'Priya Sharma', status: 'Available' },
        { id: 4, type: 'car', name: 'Car D4-5678', lat: 28.6469, lng: 77.2167, icon: carIcon, driver: 'Vikash Gupta', status: 'Available' },
        
        { id: 5, type: 'bus', name: 'Bus DL-1C-5789', lat: 28.5706, lng: 77.1956, icon: busIcon, driver: 'Suresh Yadav', status: 'On Route' },
        { id: 6, type: 'bus', name: 'Bus DL-1D-6890', lat: 28.6562, lng: 77.2410, icon: busIcon, driver: 'Rajesh Kumar', status: 'Available' },
        { id: 7, type: 'bus', name: 'Bus DL-1E-7901', lat: 28.6234, lng: 77.2855, icon: busIcon, driver: 'Manoj Tiwari', status: 'On Route' },
        
        { id: 8, type: 'truck', name: 'Truck HR-26-8012', lat: 28.6040, lng: 77.2664, icon: truckIcon, driver: 'Deepak Rana', status: 'Loading' },
        { id: 9, type: 'truck', name: 'Truck UP-80-9123', lat: 28.5355, lng: 77.3910, icon: truckIcon, driver: 'Santosh Kumar', status: 'Available' },
        { id: 10, type: 'truck', name: 'Truck RJ-14-0234', lat: 28.6692, lng: 77.4538, icon: truckIcon, driver: 'Ravi Sharma', status: 'In Transit' }
      ];

      // Add markers for each vehicle
      vehicles.forEach(vehicle => {
        const marker = window.L.marker([vehicle.lat, vehicle.lng], {
          icon: vehicle.icon
        }).addTo(map);

        const statusColor = vehicle.status === 'Available' ? '#00D084' : 
                           vehicle.status === 'On Trip' || vehicle.status === 'On Route' || vehicle.status === 'In Transit' ? '#FF9500' : 
                           '#DC2626';

        // Add popup with vehicle information
        marker.bindPopup(`
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; min-width: 200px;">
            <div style="border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 8px;">
              <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">${vehicle.name}</h3>
              <div style="display: inline-block; background: ${statusColor}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 500; margin-top: 4px;">
                ${vehicle.status}
              </div>
            </div>
            <div style="font-size: 14px; line-height: 1.4;">
              <div style="margin-bottom: 4px;">
                <strong style="color: #333;">Driver:</strong> <span style="color: #666;">${vehicle.driver}</span>
              </div>
              <div style="margin-bottom: 4px;">
                <strong style="color: #333;">Type:</strong> <span style="color: #666; text-transform: capitalize;">${vehicle.type}</span>
              </div>
              <div style="font-size: 12px; color: #888; margin-top: 8px;">
                📍 ${vehicle.lat.toFixed(4)}, ${vehicle.lng.toFixed(4)}
              </div>
            </div>
          </div>
        `, {
          maxWidth: 250,
          className: 'custom-popup'
        });

        // Add click event
        marker.on('click', function() {
          this.openPopup();
        });
      });

      // Vehicle count by type
      const carCount = vehicles.filter(v => v.type === 'car').length;
      const busCount = vehicles.filter(v => v.type === 'bus').length;
      const truckCount = vehicles.filter(v => v.type === 'truck').length;

      // Add a custom control for vehicle stats
      const statsControl = window.L.control({ position: 'topright' });
      statsControl.onAdd = function() {
        const div = window.L.DomUtil.create('div', 'vehicle-stats');
        div.innerHTML = `
          <div style="background: white; padding: 16px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; min-width: 200px;">
            <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #1a1a1a; font-weight: 600; border-bottom: 1px solid #eee; padding-bottom: 8px;">Vehicle Summary</h4>
            
            <div style="display: flex; align-items: center; margin: 8px 0; padding: 6px 0;">
              <div style="background: #00D084; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-1.92-5.99z"/>
                </svg>
              </div>
              <div style="flex: 1;">
                <span style="font-size: 13px; color: #333; font-weight: 500;">Cars</span>
                <div style="font-size: 16px; font-weight: 600; color: #00D084;">${carCount}</div>
              </div>
            </div>
            
            <div style="display: flex; align-items: center; margin: 8px 0; padding: 6px 0;">
              <div style="background: #1976D2; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10z"/>
                </svg>
              </div>
              <div style="flex: 1;">
                <span style="font-size: 13px; color: #333; font-weight: 500;">Buses</span>
                <div style="font-size: 16px; font-weight: 600; color: #1976D2;">${busCount}</div>
              </div>
            </div>
            
            <div style="display: flex; align-items: center; margin: 8px 0; padding: 6px 0;">
              <div style="background: #FF6B35; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z"/>
                </svg>
              </div>
              <div style="flex: 1;">
                <span style="font-size: 13px; color: #333; font-weight: 500;">Trucks</span>
                <div style="font-size: 16px; font-weight: 600; color: #FF6B35;">${truckCount}</div>
              </div>
            </div>
            
            <div style="border-top: 1px solid #eee; margin-top: 12px; padding-top: 8px; font-size: 12px; color: #888; text-align: center;">
              Total: ${vehicles.length} vehicles
            </div>
          </div>
        `;
        return div;
      };
      statsControl.addTo(map);

      // Add custom styles
      const style = document.createElement('style');
      style.textContent = `
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .custom-vehicle-marker {
          transition: transform 0.2s ease;
        }
        .custom-vehicle-marker:hover {
          transform: scale(1.1);
        }
      `;
      document.head.appendChild(style);
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      height: 'calc(100vh - 80px)', 
      position: 'relative', 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: '#f8fafc'
    }}>
      <div 
        ref={mapRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #e2e8f0'
        }}
      />
    </div>
  );
}

export default LocationView;