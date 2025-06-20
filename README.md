# Intercom Test Site - React

A React/Next.js application for testing Intercom integration functionality, converted from an Express.js + EJS application.

## Features

- **User Authentication**: Boot users into Intercom with custom data
- **Event Tracking**: Track custom events with metadata
- **Tour Management**: Launch Intercom product tours
- **Survey Integration**: Trigger Intercom surveys
- **Custom Attributes**: Update user attributes dynamically
- **Bot Interactions**: Interactive buttons for testing Intercom functionality

## Tech Stack

- **Framework**: Next.js 15.3.4 with App Router
- **Intercom**: Official `@intercom/messenger-js-sdk`
- **Styling**: Custom CSS with responsive design
- **Deployment**: Vercel-ready configuration

## Getting Started

1. **Install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
Create a `.env.local` file with:
```
NEXT_PUBLIC_INTERCOM_APP_ID=your_intercom_app_id
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Open [http://localhost:3000](http://localhost:3000)** to see the application.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.js          # Root layout with Intercom provider
│   ├── page.js            # Home page with all forms
│   ├── new-tab/           # New tab test page
│   └── page-two/          # Page with background color selector
├── components/            # React components
│   ├── IntercomProvider.js    # Intercom SDK initialization
│   ├── UserDataForm.js        # User authentication form
│   ├── TrackEventForm.js      # Event tracking form
│   ├── TourForm.js            # Tour launching form
│   ├── CustomAttributesForm.js # User attributes form
│   ├── BotButtons.js          # Interactive test buttons
│   └── ActionButtons.js       # Update/shutdown actions
└── public/
    └── styles.css         # Project styles
```

## Intercom Integration

This application uses the official Intercom React SDK to test various Intercom functionalities:

- **Initialization**: Automatic Intercom setup on app load
- **User Management**: Dynamic user booting and attribute updates
- **Event Tracking**: Custom event tracking with optional metadata
- **Tours & Surveys**: Programmatic tour and survey triggering
- **Error Handling**: Comprehensive error catching and logging

## Deployment

Deploy to Vercel:

1. Connect your GitHub repository to Vercel
2. Add your `NEXT_PUBLIC_INTERCOM_APP_ID` environment variable
3. Deploy automatically on push

## Development Notes

- All forms use React state management
- Intercom calls are wrapped in try/catch blocks
- Console logging available for debugging
- Responsive design for mobile testing
