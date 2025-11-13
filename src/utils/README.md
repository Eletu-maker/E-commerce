# Notification System

This project uses React Toastify for displaying styled notifications.

## Installation

React Toastify has been installed as a dependency:

```bash
npm install react-toastify
```

## Setup

1. The ToastContainer is added to [src/main.jsx](file:///c:/Users/Dell/OneDrive/Documents/e-commere/E-commerce/src/main.jsx)
2. CSS import for Toastify styles is included in [src/main.jsx](file:///c:/Users/Dell/OneDrive/Documents/e-commere/E-commerce/src/main.jsx)
3. Utility functions are available in [src/utils/notification.js](file:///c:/Users/Dell/OneDrive/Documents/e-commere/E-commerce/src/utils/notification.js)

## Usage

Import the notification functions in your component:

```javascript
import { showSuccess, showError, showInfo, showWarning } from '../../utils/notification';
```

Then use them in your code:

```javascript
// Success notification
showSuccess('Operation completed successfully!');

// Error notification
showError('Something went wrong!');

// Info notification
showInfo('This is an informational message.');

// Warning notification
showWarning('This is a warning message.');
```

## Examples

Check the following components for usage examples:
- [src/Pages/Login/Login.jsx](file:///c:/Users/Dell/OneDrive/Documents/e-commere/E-commerce/src/Pages/Login/Login.jsx)
- [src/Pages/Cart/Cart.jsx](file:///c:/Users/Dell/OneDrive/Documents/e-commere/E-commerce/src/Pages/Cart/Cart.jsx)
- [src/Pages/Home/Home.jsx](file:///c:/Users/Dell/OneDrive/Documents/e-commere/E-commerce/src/Pages/Home/Home.jsx)

## Customization

You can customize the notification options by modifying the functions in [src/utils/notification.js](file:///c:/Users/Dell/OneDrive/Documents/e-commere/E-commerce/src/utils/notification.js). Available options include:

- position: Placement of the notification
- autoClose: Auto-close timeout in milliseconds
- hideProgressBar: Show/hide progress bar
- closeOnClick: Close on click
- pauseOnHover: Pause timer on hover
- draggable: Enable drag to dismiss