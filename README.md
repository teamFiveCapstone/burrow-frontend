# Burrow Frontend

A React TypeScript application for document processing and management with a modern, professional interface.

## What This App Is

Burrow Frontend is a document management dashboard that provides:

- **File Upload**: Upload documents for processing
- **Pipeline Summary**: View overview of document processing status
- **Document Management**: Browse documents with status filtering and pagination
- **Modern UI**: Clean, responsive interface with a professional design

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd burrow-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local development URL (usually `http://localhost:5173`)

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the app for production


## Component Structure

The application is built with a modular component architecture:


### Core Components

#### `Upload` (`src/components/Upload.tsx`)
- **Purpose**: File upload form with drag-and-drop interface
- **Features**: File selection, upload button, file validation
- **Props**: `onUpload` callback for handling file uploads

#### `SummaryDashboard` (`src/components/SummaryDashboard.tsx`)
- **Purpose**: Display pipeline overview and summary statistics
- **Features**: Status summaries, processing metrics
- **Props**: `statusSummaries` array for displaying status counts

#### `StatusSummary` (`src/components/StatusSummary.tsx`)
- **Purpose**: Individual status display component
- **Features**: Shows status name and count
- **Props**: `data` object with status and count

#### `DocumentsDashboard` (`src/components/DocumentsDashboard.tsx`)
- **Purpose**: Main document management interface
- **Features**:
  - Status filter buttons (all, pending, running, failed, finished)
  - Document list with pagination
  - Responsive layout
- **Props**: `documents`, pagination handlers (`onNext`, `onPrevious`, `hasNext`, `hasPrevious`)

#### `Document` (`src/components/Document.tsx`)
- **Purpose**: Individual document display
- **Features**: Shows document name, status, and upload date
- **Props**: `document` object with file information

#### `Pagination` (`src/components/Pagination.tsx`)
- **Purpose**: Cursor-style navigation controls
- **Features**: Back/Forward buttons with disabled states
- **Props**: Navigation handlers and state flags

### Styling

- **Framework**: Custom CSS with modern design system
- **Design**: Professional, clean interface with:
  - Card-based layout with subtle shadows
  - Consistent spacing and typography
  - Blue accent color scheme (#3b82f6)
  - Responsive flexbox layout
- **File**: All styles consolidated in `src/App.css`

### Data Types

```typescript
// Document data structure
interface DocumentData {
  fileName: string;
  status: string;
  createdAt: string;
}

// Status summary structure
interface StatusSummaryData {
  status: string;
  count: number;
}
```

## Development Notes

- Built with **React 19** and **TypeScript**
- Uses **Vite** for fast development and building
- **ESLint** configured for code quality
- Modular component design for easy maintenance and testing
- All styling consolidated in a single CSS file for simplicity

## TODOS

- Add real API integration for document processing
- Implement status filtering functionality
- Add search and sorting capabilities
- Include drag-and-drop file upload
- Add loading states and error handling
- Implement responsive design for mobile devices