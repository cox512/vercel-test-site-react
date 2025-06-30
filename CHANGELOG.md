# Changelog - EJS to React/Next.js Conversion

## Overview
Converted the Express.js + EJS website to a React-based Next.js application for Vercel deployment.

## Latest Update - JWT Authentication Bug Fix (v4.1)

### **🐛 CRITICAL BUG FIXES**

#### **Fixed JSON Parsing Error During User Boot**
- **ISSUE**: `SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON` when booting users with user_id
- **ROOT CAUSE**: API route `/api/generate-jwt` was failing due to:
  1. Missing `jsonwebtoken` dependency in package.json
  2. Module syntax mismatch (mixing CommonJS `require()` with ES modules `export default`)

#### **Fixes Applied**
- **ADDED**: `jsonwebtoken` dependency to package.json via `npm install jsonwebtoken`
- **FIXED**: `api/generate-jwt.js` module syntax - changed `const jwt = require("jsonwebtoken");` to `import jwt from "jsonwebtoken";`
- **MOVED**: API route from incorrect location `api/generate-jwt.js` to proper App Router location `app/api/generate-jwt/route.js`
- **CONVERTED**: API route from Pages Router format to App Router format with proper `POST` export and Web API Request/Response objects
- **RESOLVED**: API route now properly returns JSON instead of HTML error pages

#### **Technical Details**
- **Package Added**: jsonwebtoken v9.0.2 (13 new packages installed)
- **Module System**: Standardized to ES modules throughout API route
- **Error Resolution**: JSON parsing now works correctly in JWT utility functions
- **Testing**: User boot with user_id now successfully generates and includes JWT tokens

#### **Files Changed**
- `package.json` - Added jsonwebtoken dependency
- `package-lock.json` - Updated with new dependency tree
- `api/generate-jwt.js` - DELETED (moved to App Router location)
- `app/api/generate-jwt/route.js` - CREATED with proper App Router format

### **Verification Steps**
1. ✅ `npm install jsonwebtoken` completed successfully
2. ✅ API route moved to correct App Router location
3. ✅ API route converted to proper App Router format
4. ✅ JWT API endpoint tested and confirmed working (returns valid JSON with JWT token)
5. ✅ JSON parsing errors resolved - user boot with user_id now works

## Previous Update - JWT Authentication Integration (v4.0)

### **🔒 JWT Authentication Implementation**

#### **New Files Created**
- **CREATED**: `api/generate-jwt.js` - Vercel serverless function for JWT token generation
  - Uses `jsonwebtoken` package to sign tokens with API secret
  - Validates required user_id parameter
  - Supports optional email and custom sensitive attributes
  - Returns signed JWT tokens with 1-hour expiration
  - Includes proper error handling and security validation

- **CREATED**: `utils/jwt.js` - JWT utility functions for frontend
  - `fetchJWT()` - Fetches JWT tokens from serverless function
  - `addJWTToBootData()` - Adds JWT to boot calls when user_id is present
  - `addJWTToUpdateData()` - Adds JWT to update calls when possible
  - Includes comprehensive error handling and fallback behavior

#### **Updated Components with JWT Integration**
- **UPDATED**: `components/UserDataForm.js` - Boot calls now include JWT tokens
  - Added JWT token generation before boot calls
  - Maintains backward compatibility if JWT generation fails
  - Enhanced logging to show JWT inclusion

- **UPDATED**: `components/ActionButtons.js` - Update calls now include JWT tokens
  - Added JWT token generation for empty update calls
  - Async update function implementation
  - Graceful fallback if JWT generation fails

- **UPDATED**: `components/CustomAttributesForm.js` - Custom attribute updates include JWT
  - Added JWT token generation for attribute update calls
  - Async form submission handling
  - Error handling for JWT generation failures

- **UPDATED**: `app/new-tab/page.js` - Navigation updates include JWT tokens
  - Added JWT token generation for page navigation updates
  - Async useEffect implementation for update calls
  - Proper error handling and logging

- **UPDATED**: `app/page-two/page.js` - Page navigation updates include JWT tokens
  - Added JWT token generation for page navigation updates
  - Async useEffect implementation for update calls
  - Consistent error handling across navigation

#### **Security Features**
- **JWT Token Generation**: Server-side signing with API secret
- **Token Expiration**: 1-hour expiration for security
- **User Validation**: Required user_id validation
- **Fallback Behavior**: Graceful degradation if JWT generation fails
- **Error Logging**: Comprehensive logging for debugging

#### **Technical Implementation**
- **Package Dependency**: Requires `jsonwebtoken` npm package
- **Environment Variables**: Requires `INTERCOM_API_SECRET` environment variable
- **Async Operations**: All JWT operations are asynchronous with proper error handling
- **Backward Compatibility**: All existing functionality preserved with JWT as enhancement

### **Package Installation Required**
```bash
npm install jsonwebtoken
```

### **Environment Variables Required**
```env
NEXT_PUBLIC_INTERCOM_APP_ID=your_intercom_app_id
INTERCOM_API_SECRET=your_intercom_api_secret
```

### **Vercel Deployment Setup**
1. Add `INTERCOM_API_SECRET` to Vercel environment variables
2. Ensure `jsonwebtoken` is installed in dependencies
3. Deploy - serverless function will be automatically available at `/api/generate-jwt`

### **JWT Integration Points**
- **Boot Calls**: JWT added to all user authentication/boot operations
- **Update Calls**: JWT added to user data updates, custom attributes, and navigation updates
- **Error Handling**: Comprehensive fallback behavior if JWT generation fails
- **Logging**: Enhanced logging to track JWT inclusion in all operations

## Latest Update - UI Improvements (v3.2)

### **Text Alignment Improvements**
- **UPDATED**: `app/page.js` - Centered h1 and p tag text using inline styles
  - Added `style={{textAlign: 'center'}}` to h1 element (title)
  - Added `style={{textAlign: 'center'}}` to p element (description)
- **IMPROVED**: Better visual hierarchy and user experience on main page

## Latest Update - Critical Intercom Bug Fixes (v3.1)

### **🚨 CRITICAL FIXES APPLIED**

#### **Fixed BotButtons.js Runtime Errors**
- **FIXED**: Added missing `trackEvent` import from `@intercom/messenger-js-sdk`
- **FIXED**: Renamed local functions to avoid shadowing SDK imports:
  - `startTour` → `handleStartTour` (was causing infinite recursion)
  - `startSurvey` → `handleStartSurvey` (was causing infinite recursion)
  - Added `handleTrackEvent` function for button clicks
- **RESOLVED**: All `trackEvent("event-click")` calls now work properly
- **ENHANCED**: Added proper error handling and logging for all Intercom operations

#### **Standardized IntercomProvider.js**
- **FIXED**: Updated to use consistent official SDK methods
- **CHANGED**: `window.Intercom("shutdown")` → `shutdown()` from SDK
- **ENHANCED**: Added try/catch blocks for initialization and cleanup
- **IMPROVED**: Better error logging and success confirmations

#### **Project Cleanup - Removed Outdated Files**
- **DELETED**: `public/scripts.js` - Legacy vanilla JavaScript (not referenced)
- **DELETED**: `public/globe.svg` - Unused Next.js default icon
- **DELETED**: `public/window.svg` - Unused Next.js default icon
- **DELETED**: `public/next.svg` - Unused Next.js default icon
- **DELETED**: `public/vercel.svg` - Unused Vercel default icon
- **DELETED**: `public/file.svg` - Unused SVG file
- **UPDATED**: `README.md` - Replaced generic Next.js template with project-specific documentation
- **RESULT**: Cleaner project structure with only necessary files

### **Issues Resolved**
1. **Runtime Error**: `trackEvent is not defined` in BotButtons component ✅
2. **Infinite Recursion**: Function shadowing in startTour/startSurvey ✅
3. **API Inconsistency**: Mixed old/new Intercom API usage ✅
4. **Missing Error Handling**: Unhandled Intercom initialization failures ✅
5. **Cleanup Issues**: Inconsistent shutdown methods ✅

### **Technical Improvements**
- **Error Handling**: All Intercom operations now wrapped in try/catch
- **Logging**: Comprehensive console logging for debugging
- **Consistency**: All components use official SDK methods
- **Safety**: Null checks and graceful degradation
- **Documentation**: Clear comments explaining API differences

## Previous Update - Official Intercom SDK Integration (v3.0)

### **Added Official Intercom SDK**
- **INSTALLED**: `@intercom/messenger-js-sdk` - Official Intercom React SDK
- **CREATED**: New `components/IntercomProvider.js` using official SDK
- **UPDATED**: All components now use the official Intercom SDK instead of custom implementation
- **IMPROVED**: Better error handling with try/catch blocks for all Intercom operations
- **ENHANCED**: Proper cleanup with Intercom shutdown on component unmount

### **Form Updates with Official SDK**
- **UserDataForm**: Uses `Intercom('boot', data)` with official SDK
- **CustomAttributesForm**: Uses `Intercom('update', data)` with official SDK
- **TrackEventForm**: Uses `Intercom('trackEvent', name, metadata)` with official SDK
- **TourForm**: Uses `Intercom('startTour', id)` with official SDK
- **ActionButtons**: Uses `Intercom('update')` and `Intercom('shutdown')` with official SDK
- **BotButtons**: Uses `Intercom('startTour')`, `Intercom('startSurvey')`, and `Intercom('trackEvent')` with official SDK

### **Technical Improvements**
- **Error Handling**: All Intercom calls wrapped in try/catch blocks
- **Console Logging**: Detailed logging for debugging and monitoring
- **User Feedback**: Success/error alerts for all operations
- **Modern API**: Using the latest official Intercom React SDK
- **Type Safety**: Better integration with React and Next.js

### **Restored Functionality**
- **External Links**: All original Intercom help center and survey links restored
- **Tour Integration**: Original tour IDs (279111, 279727) restored
- **Survey Integration**: Original survey IDs (24407803, 24407890) restored
- **Event Tracking**: Full event tracking with metadata support
- **User Authentication**: Complete user booting with company data

## Previous Update - Intercom Removal (v2.0)

### **Removed Intercom Integration** (Now Restored with Official SDK)
- **REMOVED**: `components/IntercomProvider.js` - Intercom script loader (Now replaced with official SDK)
- **UPDATED**: All forms now use console logging and alerts instead of Intercom API calls (Now restored with SDK)
- **UPDATED**: Site title changed from "Intercom Test Site" to "React Test Site" (Now restored)
- **UPDATED**: Main page heading changed from "Log in to Intercom" to "Contact Forms Demo" (Now restored)
- **CONVERTED**: All Intercom-specific functionality to general demo functionality (Now restored with SDK)

## Major Changes

### 1. Project Structure
- **CREATED**: New Next.js project with App Router
- **REMOVED**: Express.js server (app.js, routes/, ecosystem.config.js, nodemon.json)
- **MIGRATED**: Views converted to React components
- **PRESERVED**: All CSS styles
- **ADDED**: Official Intercom SDK integration

### 2. New Files Created

#### Core App Files
- `app/layout.js` - Main layout with metadata and official Intercom provider
- `app/page.js` - Landing page (converted from landing.ejs, with official Intercom integration)
- `app/new-tab/page.js` - New tab page (converted from new-tab.ejs)
- `app/page-two/page.js` - Page two with color selector (converted from page-two.ejs)
- `app/globals.css` - Minimal global styles (Next.js requirement)

#### React Components
- `components/IntercomProvider.js` - Official Intercom SDK provider
- `components/UserDataForm.js` - User authentication form with official SDK
- `components/CustomAttributesForm.js` - Custom attributes form with official SDK
- `components/TrackEventForm.js` - Event tracking form with official SDK
- `components/TourForm.js` - Tour triggering form with official SDK
- `components/ActionButtons.js` - Update and shutdown buttons with official SDK
- `components/BotButtons.js` - Interactive buttons and navigation with official SDK

### 3. Functionality Restored with Official SDK
- **Intercom Integration**: Full Intercom functionality using official React SDK
  - User booting with dynamic data
  - Custom attribute updates
  - Event tracking with metadata
  - Tour triggering
  - Survey launching
  - Empty updates and shutdown
- **Form Handling**: All forms converted to React with state management
- **Navigation**: Internal links converted to Next.js Link components
- **Styling**: All original CSS preserved and working
- **Background Color Changer**: Page Two functionality maintained with React hooks

### 4. Technical Improvements
- **Client-Side Routing**: Next.js file-based routing
- **React State Management**: Forms now use React hooks instead of DOM manipulation
- **Component Architecture**: Modular, reusable components
- **Modern JavaScript**: ES6+ syntax throughout
- **Performance**: Static site generation where possible
- **Official SDK**: Using the latest Intercom React SDK for better reliability

### 5. Configuration Updates
- `package.json` - Updated for Next.js with official Intercom SDK dependency
- `vercel.json` - Simplified for Next.js framework detection
- **CSS**: Preserved all original styles in `public/styles.css`

### 6. Deployment Ready
- **Build Process**: Successfully builds without errors
- **Vercel Compatible**: Ready for immediate Vercel deployment
- **Static Assets**: All CSS and fonts properly linked
- **Official SDK**: Modern Intercom integration ready for production

## Fixes Applied

### Issue Resolution
- **FIXED**: Missing package.json - Consolidated all Next.js files into the original directory
- **FIXED**: Missing globals.css - Created minimal global styles file required by Next.js
- **FIXED**: Node modules path issues - Reinstalled dependencies in correct location
- **VERIFIED**: Build process works successfully
- **VERIFIED**: Development server runs correctly

## Migration Notes

### What Was Converted
1. **EJS Templates → React Components**: All views converted to functional React components
2. **Server-Side Routing → Client-Side Routing**: Express routes converted to Next.js pages
3. **DOM Manipulation → React State**: JavaScript functions converted to React hooks
4. **Form Handling**: Traditional form submissions converted to React event handlers
5. **Intercom Integration → Demo Functionality**: All Intercom calls converted to console logs and alerts

### What Was Preserved
1. **User Experience**: Same interaction patterns with demo functionality
2. **Styling**: Identical visual appearance
3. **Form Structure**: All forms maintain their original structure and validation
4. **Navigation**: Internal page navigation maintained

### Dependencies
- **Added**: React, Next.js, @intercom/messenger-js-sdk
- **Removed**: Express, EJS, Express-session, Cookie-session, UUID, Intercom-client (server-side), Nodemon, PM2

## Deployment Instructions
1. Push to GitHub repository
2. Connect to Vercel
3. Deploy (Vercel will auto-detect Next.js)
4. Configure Intercom app ID if different from 'bwfz4uhe'

## Current Status
✅ **FULLY FUNCTIONAL** - The site builds successfully and runs in development mode. All React components work correctly with full Intercom integration using the official SDK.

The site is now a modern React/Next.js application with official Intercom SDK integration, ready for production deployment on Vercel!

## [1.0.0] - 2025-01-27

### Added
- **GitHub Repository Setup**: Successfully pushed entire React/Next.js application to GitHub
  - Repository: https://github.com/cox512/vercel-test-site-react
  - Initialized local git repository with `git init`
  - Added all project files (22 files, 6,677 lines)
  - Created initial commit: "Initial commit: Add Next.js React app with Intercom integration"
  - Set up remote origin pointing to GitHub repository
  - Resolved merge conflict with existing remote README.md file
  - Merged comprehensive local README documentation with remote repository
  - Successfully pushed to main branch with upstream tracking

### Technical Details
- **Files Added**: 22 files including Next.js app structure, React components, configuration files
- **Total Lines**: 6,677 insertions
- **Git Operations**: init → add → commit → remote add → pull with merge → push
- **Merge Resolution**: Kept comprehensive local README.md over simple remote version

### Repository Structure
- Complete Next.js 15.3.4 application with App Router
- Intercom integration components and forms
- Vercel deployment configuration
- Development and production build setup

## [Unreleased]

### Added
- **Sidebar Navigation**: Added a collapsible sidebar navigation on the left side of the page
  - Created new `Sidebar.js` component with all BotButtons functionality
  - Created `LayoutWrapper.js` component to manage sidebar state
  - Sidebar automatically displays when page loads but can be hidden via toggle button
  - All content in sidebar is left-justified as requested
  - Responsive design that adapts to mobile screens
  - Smooth animations for sidebar show/hide transitions
  - Added "Workflows" section heading above Bot Button 1
  - Added "Events" section heading above Event-Click Event button
  - Centered sidebar title text to prevent overlap with toggle button
  - Replaced Help Center text button with black circular icon button using helpcenter-svgrepo-com.svg
  - Sized Help Center button to match height of other sidebar buttons (40px)
  - Left-justified Help Center button and added z-index to prevent overlap with other elements
  - Made all sidebar buttons green except Help Center button (changed secondary buttons from blue to green)
  - Reduced sidebar width from 280px to 200px and optimized button widths to fit content
  - Set button min-width to accommodate longest button text ("Event-Click Event")
  - Reduced sidebar padding from 20px to 15px for better proportions
  - Restored Help Center button to circular shape (40px diameter) while keeping other buttons optimized
  - Removed obsolete BotButtons.js component (functionality moved to Sidebar.js)
  - Updated README.md to reflect current component structure
  - Fixed main content centering when sidebar is closed (content now properly centers on page)
  - Improved responsive layout with proper width calculations and padding for all screen sizes
- Intercom update method call for navigation buttons:
  - Added update call with `last_request_at` timestamp when "Link to a new tab" page loads
  - Added update call with `last_request_at` timestamp when "Page Two" page loads
  - Both navigation buttons now trigger Intercom user update after navigation on the destination pages

### Changed
- Updated main page layout to show modal trigger buttons in place of direct form rendering
- Modified form container styling to work properly within modals
- Changed modal section header from "Forms" to "Modals" with centered alignment
- Enhanced form submission behavior:
  - Forms now clear automatically upon submission
  - Modals dismiss automatically after form submission
  - Track Events form shows success/error messages with event name
  - Both forms close modal on successful submission or error
- Made Trigger Tour modal a blocking modal:
  - Cannot be dismissed by clicking outside the modal
  - Cannot be dismissed with ESC key
  - Requires explicit user action (Submit, Cancel, or X button)
  - Background UI is non-interactive when modal is open
  - Added Cancel button to TourForm for explicit dismissal
- Enhanced dropdown styling for perfect visual consistency:
  - Both dropdowns now have identical width, padding, font size, and colors
  - Standardized min-height to 40px for both dropdowns
  - Added consistent focus states with blue border and subtle shadow
  - Improved padding and spacing for better visual alignment
  - Added font-family inheritance and line-height for text consistency
- **Layout Structure**: Updated `layout.js` to use new `LayoutWrapper` component
- **Main Content**: Main content area now dynamically adjusts margin when sidebar is open/closed
- **Component Organization**: Moved all BotButtons functionality into sidebar navigation

### Removed
- **BotButtons from Main Page**: Removed `BotButtons` component from main page (`page.js`) since functionality moved to sidebar

### Styled
- **Sidebar Styling**: Added comprehensive CSS for sidebar positioning, styling, and responsiveness
  - Fixed positioning with smooth transitions
  - Left-justified content layout
  - Organized sections with clear visual hierarchy
  - Hover effects and interactive feedback
  - Mobile-responsive breakpoints

### Technical Details
- Created `components/Modal.js`

## [Layout Centering Fix] - 2025-01-27

### Fixed
- **Main Content Centering**: Fixed layout centering issues on the main landing page
  - Main content now properly centers in the available space regardless of sidebar state
  - Changed `.main-content.sidebar-open` from `align-items: stretch` to `align-items: center`
  - Content remains centered both when sidebar is open and closed

- **Responsive Layout for Developer Tools**: Added responsive handling for narrow viewports
  - Added media query at 700px to stack form columns vertically when sidebar is open and space is limited
  - Added media query at 900px to reduce padding and gaps for better space utilization
  - Form columns now stack vertically instead of getting pushed off-screen when developer tools are opened
  - Improved handling of reduced viewport width scenarios

### Technical Changes
- **CSS Updates**: Modified `public/styles.css` with four key improvements:
  1. Fixed `.main-content.sidebar-open` alignment to keep content centered
  2. Fixed `.main-content.sidebar-closed` padding to allow perfect centering
  3. Added `@media (max-width: 700px)` rule for sidebar-open responsive stacking
  4. Added `@media (max-width: 900px)` rule for improved spacing on smaller screens
- **Responsive Behavior**: Content now adapts gracefully to viewport width changes
- **Developer Experience**: Layout remains usable when browser developer tools are opened

### Additional Fix
- **Perfect Centering When Sidebar Closed**: Removed ALL padding from `.main-content.sidebar-closed`
  - **Main Fix**: Changed from `padding: 0 20px` to `padding: 0`
  - **Critical Fix**: Removed padding overrides in responsive media queries:
    - `@media (max-width: 768px)`: Changed `.main-content.sidebar-closed` from `padding: 0 15px` to `padding: 0`
    - `@media (max-width: 480px)`: Split combined rule and set `.main-content.sidebar-closed` to `padding: 0`
  - **FINAL FIX**: Fixed 900px media query that was breaking centering:
    - Changed `.forms-container` to `.main-content.sidebar-open .forms-container`
    - The global `.forms-container` rule was removing `margin: auto` centering at viewports ≤ 900px
    - Now margin reduction only applies when sidebar is open, preserving centering when closed
  - **Result**: Content now perfectly centers on the page when sidebar is closed at ALL screen sizes
  - **Maintains**: Appropriate padding and spacing for `.main-content.sidebar-open` state
  - The `.forms-container` handles its own centering with `margin: 20px auto`

### Next.js Viewport Fix
- **Fixed Next.js Warning**: Moved viewport configuration from metadata export to separate viewport export
  - Resolved: "Unsupported metadata viewport is configured in metadata export"
  - **Changed**: `app/layout.js` - Split viewport into separate export as per Next.js App Router best practices
  - **Result**: Eliminates console warning and ensures proper viewport handling

### Styling Consolidation
- **Moved All Styling to CSS**: Consolidated all inline styles and styling code to `public/styles.css`
  - **Removed Inline Styles**: Replaced all `style={{}}` attributes with CSS classes
  - **Added CSS Classes**:
    - `.page-title` - for main page heading centering
    - `.page-description` - for main page description centering
    - `.modal-section-container` - for modal section centering
    - `.status-text` - for page-two status text styling (margin-top: 10px, text-align: center)
  - **Updated Components**:
    - `app/page.js` - Replaced 3 inline styles with CSS classes
    - `app/page-two/page.js` - Replaced 2 inline styles with CSS classes
  - **Result**: All styling is now centralized in CSS file, improving maintainability and performance

### Fixed Environment Variables Issue
- **Fixed Environment Variables for Client Components**: Properly configured Intercom tour and survey IDs
  - **Problem**: Environment variables without `NEXT_PUBLIC_` prefix don't work in client components
  - **Solution**: Updated `.env.local` file to add required prefixes and updated component:
    - `TRIGGER_TOUR_ID` → `NEXT_PUBLIC_TRIGGER_TOUR_ID=598573`
    - `TOUR_LINK_ID` → `NEXT_PUBLIC_TOUR_LINK_ID=617424`
    - `LARGE_SURVEY_ID` → `NEXT_PUBLIC_LARGE_SURVEY_ID=24407803`
    - `SMALL_SURVEY_ID` → `NEXT_PUBLIC_SMALL_SURVEY_ID=24407890`
    - `SURVEY_LINK_ID` → `NEXT_PUBLIC_SURVEY_LINK_ID=24407890`
  - **Updated**: `components/Sidebar.js` to use properly prefixed environment variables
  - **Result**: All sidebar buttons and links work correctly with environment variables (not hardcoded values)

### FINAL LAYOUT CENTERING FIX - RESOLVED
- **Successfully Fixed Layout Centering Issue**: Content now properly centers when sidebar is closed
  - **Root Cause**: Unwanted CSS transforms were being applied to main content area
  - **Solution**: Added `transform: translateX(0px)` to `.main-content.sidebar-closed` to override unwanted transforms
  - **Key Properties**:
    - `display: flex` + `flex-direction: column` + `align-items: center` for vertical centering
    - `transform: translateX(0px)` to cancel any interfering transforms
    - `transition: none !important` for immediate positioning without animation
  - **Result**: ✅ Content perfectly centers when sidebar is closed, works normally when sidebar is open
  - **Cleaned**: Removed all temporary debug backgrounds and borders

### **Modal Overlay Z-Index Fix**
- **Fixed Modal Overlay Interaction Blocking**: Implemented comprehensive solution to disable sidebar when modals are open
  - **Issue**: Sidebar remained responsive to clicks when modals were open despite z-index adjustments
  - **Root Cause**: Complex stacking context and pointer event conflicts
  - **Solution**: Multi-layered approach for guaranteed interaction blocking:
    - **Z-Index Restructuring**: Separated z-index values to eliminate stacking context issues:
      - Modal overlay: z-index increased from 1000 → 9999 (highest priority)
      - Sidebar: z-index reduced from 1000 → 100 (low priority)
      - Sidebar toggle: z-index reduced from 1001 → 101 (above sidebar, below modal)
    - **Enhanced Modal Overlay**: Added explicit viewport coverage (`width: 100vw`, `height: 100vh`) and `pointer-events: auto`
    - **Body Class Management**: Modal component now adds `modal-open` class to body when any modal is open
    - **Pointer Events Blocking**: Added CSS rule `body.modal-open .sidebar, body.modal-open .sidebar-toggle { pointer-events: none; }`
  - **Result**: ✅ Sidebar and toggle now completely unresponsive when modals are open through both z-index hierarchy and explicit pointer event blocking
