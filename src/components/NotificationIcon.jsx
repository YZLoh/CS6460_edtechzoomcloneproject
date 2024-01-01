import React from 'react';
import './notificationItem.css'

const NotificationIcon = ({ count }) => {
  return (
    <div className="notification-icon">
      {count > 0 && <span className="notification-count">{count}</span>}
    </div>
  );
};

export default NotificationIcon;
