# Inventory Management
A SPA that manages that manages inventory


## Assumptions
- Update and delete are done locally and can reverted by reload

## Architecture
 ### Data Fetching and State Management
 Both are handled by react-query for sharing data among components like roles.
 Date fetching is done via js Fetch api, And is wrapped with react-query

### Component Hierarchy
- UserSelector
- Dashboard
  - Navbar
  - Stats
  - Table
  - Modal

Components insider dashboard share a common state will pe passed via props

Antd UI component are used for Modal and Table
