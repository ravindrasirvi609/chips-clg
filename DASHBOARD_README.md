# PharmaNEST Dashboard

## Overview

A comprehensive admin dashboard for the PharmaNEST project that provides real-time statistics and insights about registrations and abstract submissions.

## Features

### 📊 Key Statistics

- **Total Registrations**: Complete count of all registered participants
- **Total Abstracts**: Number of abstract submissions
- **Payment Status**: Completed, pending, and failed payments tracking
- **Revenue Analytics**: Total revenue and average payment amounts
- **Accommodation Requests**: Number of participants needing accommodation
- **Gala Dinner Inclusions**: Count of participants including gala dinner

### 📈 Interactive Charts

- **Payment Status Distribution**: Donut chart showing payment completion rates
- **Abstract Status Breakdown**: Visual representation of abstract review stages
- **Registration Types**: Bar chart of different registration categories
- **Monthly Trends**: Time-series visualization of registration patterns
- **Gender Distribution**: Demographic analytics

### 🎯 Key Insights

- **Payment Success Rate**: Percentage of completed payments with trends
- **Abstract Submission Rate**: Ratio of abstracts to registrations
- **Average Payment Amount**: Financial insights per transaction
- **Revenue Tracking**: Total income generated from registrations

### 📋 Recent Activities

- **Latest Registrations**: Real-time list of new participant registrations
- **Recent Abstracts**: Latest abstract submissions with status updates
- **Status Tracking**: Visual indicators for registration and abstract statuses

### 🗓️ Date Range Filtering

- **Flexible Time Periods**: Custom date range selection
- **Quick Presets**: Today, Last 7 days, Last month, Last 3 months, This year
- **Real-time Updates**: Automatic data refresh when date range changes

### 💡 Smart Recommendations

Automated suggestions based on current metrics:

- Follow-up reminders for pending payments
- Abstract submission deadline alerts
- Revenue optimization suggestions

## File Structure

```
src/
├── app/admin/
│   ├── dashboard/
│   │   └── page.tsx              # Main dashboard page
│   └── layout.tsx                # Admin layout with navigation
├── components/
│   ├── DashboardStats.tsx        # Statistics cards component
│   ├── DashboardCharts.tsx       # Charts and visualizations
│   ├── DashboardSummary.tsx      # Key insights and recommendations
│   ├── RecentActivities.tsx      # Recent registrations and abstracts
│   └── DateRangePicker.tsx       # Date range selection component
└── app/api/dashboard/
    └── route.ts                  # Dashboard API endpoint
```

## API Endpoints

### POST /api/dashboard

Returns comprehensive dashboard data including:

- Registration and abstract statistics
- Chart data for visualizations
- Recent activities
- Performance metrics and insights

**Request Body:**

```json
{
  "startDate": "2024-01-01",
  "endDate": "2024-12-31"
}
```

**Response:**

```json
{
  "stats": {
    "totalRegistrations": 150,
    "totalAbstracts": 98,
    "completedPayments": 120,
    "pendingPayments": 25,
    "failedPayments": 5,
    "accommodationRequests": 45,
    "galaDinnerInclusions": 85,
    "totalRevenue": 450000
  },
  "chartData": {
    "paymentStatus": { ... },
    "abstractStatus": { ... },
    "registrationTypes": { ... },
    "monthlyRegistrations": { ... }
  },
  "recentRegistrations": [...],
  "recentAbstracts": [...],
  "summary": {
    "paymentCompletionRate": 80,
    "abstractSubmissionRate": 65,
    "averagePaymentAmount": 3750
  }
}
```

## Navigation

The dashboard is integrated into the admin panel with a sidebar navigation:

- **Dashboard**: Main analytics overview
- **Registrations**: Detailed registration management
- **Abstracts**: Abstract submission management
- **Back to Main Site**: Return to public website

## Responsive Design

The dashboard is fully responsive and works seamlessly across:

- **Desktop**: Full-featured layout with sidebar navigation
- **Tablet**: Adapted layouts with collapsible components
- **Mobile**: Touch-optimized interface with hamburger menu

## Technologies Used

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom components
- **Icons**: React Icons (Feather Icons)
- **Charts**: Custom SVG-based visualizations
- **API**: Next.js API Routes
- **Database**: MongoDB with Mongoose

## Access

Navigate to `/admin/dashboard` to access the dashboard.

## Key Benefits

1. **Real-time Insights**: Live data updates with customizable date ranges
2. **Visual Analytics**: Easy-to-understand charts and graphs
3. **Actionable Intelligence**: Smart recommendations based on current metrics
4. **Mobile-first Design**: Optimized for all device sizes
5. **Performance Optimized**: Fast loading with efficient data fetching
6. **User-friendly Interface**: Intuitive navigation and clean design

## Future Enhancements

- Export functionality for reports
- Email notifications for key metrics
- Advanced filtering and search capabilities
- Comparative analytics (year-over-year)
- Real-time WebSocket updates
- Custom dashboard widgets
