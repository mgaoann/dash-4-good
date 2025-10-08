export const orgInfo = {
  id: "org_001",
  name: "Green Valley Grocers",
  email: "contact@greenvalley.com",
  phone: "(555) 123-4567",
  website: "https://greenvalley.example.org",
  description: "We partner with local stores to donate fresh food to community food banks.",
};

export const orgPendingRequests = [
  {
    id: "pr_1",
    organizationId: "org_001",
    organization: "Green Valley Grocers",
    title: "Bread & Dairy Pickup",
    pickup: "Sunrise Bakery",
    dropoff: "Community Kitchen",
    items: "15 loaves of bread + 10 milk cartons",
    distance: "3 km",
    estimatedTime: "15 min",
    createdAt: "2 hours ago",
  },
];

export const orgActiveRequests = [
  {
    id: "ar_1",
    organizationId: "org_001",
    organization: "Green Valley Grocers",
    title: "Fresh Produce Delivery",
    pickup: "Farmers Market",
    dropoff: "Downtown Food Bank",
    items: "10 bags of fruits and vegetables",
    volunteer: "Sarah Johnson",
    estimatedTime: "20 min",
    volunteerPhone: "(555) 123-4567",
    status: "in_progress",
  },
];

export const orgCompletedDeliveries = [
  {
    id: "cd_1",
    organizationId: "org_001",
    organization: "Green Valley Grocers",
    title: "School Supplies",
    pickup: "Stationery Warehouse",
    dropoff: "Riverdale Elementary",
    items: "50 notebooks + 20 pens",
    volunteer: "Mike Chen",
    volunteerPhone: "(555) 987-6543",
    completedAt: "2025-10-01 14:20",
  },
  {
    id: "cd_2",
    organizationId: "org_001",
    organization: "Green Valley Grocers",
    title: "Bread & Dairy",
    pickup: "Sunrise Bakery",
    dropoff: "Community Kitchen",
    items: "15 loaves of bread + 10 milk cartons",
    volunteer: "Ava Patel",
    volunteerPhone: "(555) 222-7788",
    completedAt: "2025-10-03 09:45",
  },
];


