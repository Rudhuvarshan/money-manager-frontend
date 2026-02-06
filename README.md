# Money Manager Frontend

A modern React application for managing personal finances with income and expense tracking.

## Features

- **Dashboard**: Comprehensive overview of financial data
- **Transaction Management**: Add, edit, and delete income/expense transactions
- **Multiple Views**: 
  - Monthly income/expense charts
  - Weekly income/expense charts  
  - Yearly income/expense charts
- **Advanced Filtering**: Filter by type, category, division, and date range
- **Transaction History**: View all transactions with detailed information
- **Category Summary**: Track spending by category
- **12-Hour Edit Window**: Edit transactions only within 12 hours of creation
- **Real-time Updates**: UI refreshes automatically after changes
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Project Structure

```
src/
├── components/
│   ├── AddTransactionModal.jsx  # Modal for adding new transactions
│   ├── Charts.jsx               # Income/Expense charts
│   ├── Dashboard.jsx            # Main dashboard component
│   ├── Filters.jsx              # Transaction filtering options
│   ├── Summary.jsx              # Summary cards (balance, income, expenses)
│   └── TransactionHistory.jsx   # Transaction list with actions
├── pages/
│   └── Home.jsx                 # Home page
├── services/
│   └── api.js                   # Axios API client
├── App.jsx                      # Root component
├── index.css                    # Global styles
└── main.jsx                     # Entry point
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

## Installation

```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```
Application will run on `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check code quality

## Configuration

The API base URL is configured in `src/services/api.js`:

```javascript
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});
```

Update this if your backend is running on a different address.

## Features Explained

### Dashboard
Main interface showing:
- Balance summary cards
- Income/Expense charts with timeframe selection
- Advanced filters
- Complete transaction history

### Add Transaction Modal
Two-tab interface for adding:
- **Income**: Money received (salary, bonus, investment, etc.)
- **Expense**: Money spent (food, fuel, utilities, etc.)

### Filtering
Filter transactions by:
- Type (Income/Expense)
- Category (25+ predefined categories)
- Division (Personal/Office)
- Date range (from-to dates)

### Transaction History
View and manage transactions:
- See all transaction details
- Click to expand and view timestamps
- Edit transactions (within 12 hours of creation)
- Delete transactions
- Status indicator for edit availability

### Charts
Visual representation of:
- Weekly income/expense breakdown
- Monthly income/expense breakdown
- Yearly income/expense breakdown

## UI Components

- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Interactive Tables** - Sortable and expandable rows
- **Modal Dialogs** - Clean form interfaces
- **Toast Notifications** - Feedback on actions
- **Responsive Grid** - Mobile-first design

## Categories Supported

### Income
- Salary
- Bonus
- Investment
- Other

### Expense
- Fuel
- Food
- Movie
- Loan
- Medical
- Entertainment
- Shopping
- Utilities
- Transport
- Other

## Divisions

- **Personal** - Personal spending
- **Office** - Business/work related spending

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons
- **ESLint** - Code quality

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Tips & Tricks

1. **Quick Filtering**: Use the filter pills to remove individual filters quickly
2. **12-Hour Window**: You can edit a transaction only within 12 hours of creation
3. **Date Range**: Use the date filters to analyze spending patterns
4. **Category Tracking**: Monitor spending by category to identify trends
5. **Division Split**: Separate personal and office expenses for better tracking

## Dependencies

- `react` - React library
- `react-dom` - React DOM rendering
- `axios` - HTTP client
- `lucide-react` - Icon library
- `tailwindcss` - CSS framework

## Development

For development with hot module replacement (HMR):

```bash
npm run dev
```

The application will reload automatically when you make changes.

## Build Output

The production build is optimized and minified:

```bash
npm run build
```

Output will be in the `dist/` directory.

## Troubleshooting

### "Cannot GET /api/transactions"
- Ensure the backend server is running on `http://localhost:5000`
- Check the API base URL in `src/services/api.js`

### Styles not loading
- Ensure you have run `npm install`
- Clear the browser cache
- Rebuild with `npm run build`

### Changes not reflecting
- Check the browser console for errors
- Ensure the backend is responding correctly
- Try refreshing the page

## Notes

- All times are stored in UTC
- Amounts are stored in rupees (₹)
- Transactions are displayed in reverse chronological order (newest first)
- Edit window is exactly 12 hours from creation time
