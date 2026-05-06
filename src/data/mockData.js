export const mockTransactions = [
  { id: '1750000000001', type: 'income', amount: 45000, category: 'Product Sales', description: 'Daily sales - fruits section', timestamp: '2026-05-06T09:30:00.000Z' },
  { id: '1750000000002', type: 'expense', amount: 25000, category: 'Stock Purchase', description: 'Wholesale apples - 50kg', timestamp: '2026-05-06T08:15:00.000Z' },
  { id: '1750000000003', type: 'income', amount: 32000, category: 'Product Sales', description: 'Daily sales - vegetables', timestamp: '2026-05-05T18:45:00.000Z' },
  { id: '1750000000004', type: 'expense', amount: 8000, category: 'Transport', description: 'Delivery to warehouse', timestamp: '2026-05-05T07:00:00.000Z' },
  { id: '1750000000005', type: 'income', amount: 18500, category: 'Wholesale', description: 'Bulk order - onions', timestamp: '2026-05-04T14:20:00.000Z' },
  { id: '1750000000006', type: 'expense', amount: 35000, category: 'Stock Purchase', description: 'Weekly stock replenishment', timestamp: '2026-05-04T10:00:00.000Z' },
  { id: '1750000000007', type: 'income', amount: 52000, category: 'Product Sales', description: 'Weekend sales rush', timestamp: '2026-05-03T19:30:00.000Z' },
  { id: '1750000000008', type: 'expense', amount: 15000, category: 'Rent', description: 'Market stall rent - May', timestamp: '2026-05-03T09:00:00.000Z' },
  { id: '1750000000009', type: 'income', amount: 28000, category: 'Product Sales', description: 'Monday sales', timestamp: '2026-05-02T17:45:00.000Z' },
  { id: '1750000000010', type: 'expense', amount: 4500, category: 'Utilities', description: 'Electricity bill', timestamp: '2026-05-02T11:30:00.000Z' },
  { id: '1750000000011', type: 'income', amount: 41000, category: 'Product Sales', description: 'Daily sales - mixed goods', timestamp: '2026-05-01T18:00:00.000Z' },
  { id: '1750000000012', type: 'expense', amount: 12000, category: 'Salary', description: 'Employee salary - assistant', timestamp: '2026-05-01T10:00:00.000Z' },
  { id: '1750000000013', type: 'income', amount: 22000, category: 'Wholesale', description: 'Bulk potatoes order', timestamp: '2026-04-30T15:30:00.000Z' },
  { id: '1750000000014', type: 'expense', amount: 28000, category: 'Stock Purchase', description: 'Potatoes bulk purchase', timestamp: '2026-04-30T09:45:00.000Z' },
  { id: '1750000000015', type: 'income', amount: 38000, category: 'Product Sales', description: 'Thursday sales', timestamp: '2026-04-29T17:20:00.000Z' },
  { id: '1750000000016', type: 'expense', amount: 6000, category: 'Marketing', description: 'Banner advertisement', timestamp: '2026-04-29T08:00:00.000Z' },
  { id: '1750000000017', type: 'income', amount: 15000, category: 'Other Income', description: 'Cart rental income', timestamp: '2026-04-28T14:00:00.000Z' },
  { id: '1750000000018', type: 'expense', amount: 5500, category: 'Supplies', description: 'Packaging materials', timestamp: '2026-04-28T10:30:00.000Z' },
  { id: '1750000000019', type: 'income', amount: 48000, category: 'Product Sales', description: 'Friday weekend prep sales', timestamp: '2026-04-27T19:00:00.000Z' },
  { id: '1750000000020', type: 'expense', amount: 18000, category: 'Stock Purchase', description: 'Tomatoes and cucumbers', timestamp: '2026-04-27T07:30:00.000Z' },
  { id: '1750000000021', type: 'income', amount: 35000, category: 'Product Sales', description: 'Wednesday sales', timestamp: '2026-04-26T18:30:00.000Z' },
  { id: '1750000000022', type: 'expense', amount: 3000, category: 'Transport', description: 'Fuel for delivery van', timestamp: '2026-04-26T06:45:00.000Z' },
  { id: '1750000000023', type: 'income', amount: 29000, category: 'Wholesale', description: 'Carrots bulk order', timestamp: '2026-04-25T13:15:00.000Z' },
  { id: '1750000000024', type: 'expense', amount: 42000, category: 'Stock Purchase', description: 'Carrots and greens', timestamp: '2026-04-25T08:00:00.000Z' },
  { id: '1750000000025', type: 'income', amount: 55000, category: 'Product Sales', description: 'Saturday peak sales', timestamp: '2026-04-24T20:00:00.000Z' },
  { id: '1750000000026', type: 'expense', amount: 20000, category: 'Maintenance', description: 'Refrigerator repair', timestamp: '2026-04-24T11:00:00.000Z' },
  { id: '1750000000027', type: 'income', amount: 31000, category: 'Product Sales', description: 'Tuesday sales', timestamp: '2026-04-23T17:40:00.000Z' },
  { id: '1750000000028', type: 'expense', amount: 8500, category: 'Rent', description: 'Storage space rental', timestamp: '2026-04-23T09:30:00.000Z' },
  { id: '1750000000029', type: 'income', amount: 44000, category: 'Product Sales', description: 'Monday start of week', timestamp: '2026-04-22T18:15:00.000Z' },
  { id: '1750000000030', type: 'expense', amount: 22000, category: 'Stock Purchase', description: 'Weekly restocking', timestamp: '2026-04-22T07:00:00.000Z' },
];

export const mockUsers = [
  { id: '1', email: 'admin@bazaranet.com', name: 'Admin User', role: 'admin' },
  { id: '2', email: 'manager@bazaranet.com', name: 'Manager', role: 'manager' },
  { id: '3', email: 'worker@bazaranet.com', name: 'Worker', role: 'user' },
];

export const mockCategories = {
  income: [
    'Product Sales',
    'Wholesale',
    'Other Income',
  ],
  expense: [
    'Stock Purchase',
    'Transport',
    'Rent',
    'Utilities',
    'Salary',
    'Marketing',
    'Maintenance',
    'Supplies',
    'Other Expenses',
  ],
};

export const loadMockData = () => {
  localStorage.setItem('bazaranet_transactions', JSON.stringify(mockTransactions));
  localStorage.setItem('bazaranet_auth', JSON.stringify({ user: mockUsers[0] }));
  window.location.reload();
};

export const clearAllData = () => {
  localStorage.removeItem('bazaranet_transactions');
  localStorage.removeItem('bazaranet_auth');
  window.location.reload();
};