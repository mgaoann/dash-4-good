export const orgInfo = {
  id: "org_001",
  name: "Green Valley Food Bank",
  email: "contact@greenvalley.com",
  phone: "(555) 123-4567",
  website: "https://greenvalley.example.org",
  description: "We partner with local stores to donate fresh food to community food banks.",
};

export const orgPendingRequests = [
  {
    id: "pr_1",
    organizationId: "org_001",
    organization: "Green Valley Food Bank",
    title: "Bread & Dairy Pickup",
    pickup: "Sunrise Bakery",
    dropoff: "Green Valley Food Bank",
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
    organization: "Green Valley Food Bank",
    title: "Fresh Produce Delivery",
    pickup: "Farmers Market",
    dropoff: "Green Valley Food Bank",
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
    organization: "Green Valley Food Bank",
    title: "Canned Goods Donation",
    pickup: "Local SuperMart",
    dropoff: "Green Valley Food Bank",
    items: "50 cans of vegetables + 30 cans of soup",
    volunteer: "Mike Chen",
    volunteerPhone: "(555) 987-6543",
    completedAt: "2025-10-01 14:20",
  },
  {
    id: "cd_2",
    organizationId: "org_001",
    organization: "Green Valley Food Bank",
    title: "Bread & Dairy Delivery",
    pickup: "Sunrise Bakery",
    dropoff: "Green Valley Food Bank",
    items: "15 loaves of bread + 10 milk cartons",
    volunteer: "Ava Patel",
    volunteerPhone: "(555) 222-7788",
    completedAt: "2025-10-03 09:45",
  },
  {
    id: "cd_3",
    organizationId: "org_001",
    organization: "Green Valley Food Bank",
    title: "Prepared Meals Pickup",
    pickup: "Corner Deli",
    dropoff: "Green Valley Food Bank",
    items: "30 prepared meal boxes",
    volunteer: "Sarah Johnson",
    volunteerPhone: "(555) 444-1122",
    completedAt: "2025-10-05 12:30",
  },
  {
    id: "cd_4",
    organizationId: "org_001",
    organization: "Green Valley Food Bank",
    title: "Produce Rescue",
    pickup: "Fresh Farm Market",
    dropoff: "Green Valley Food Bank",
    items: "20 boxes of mixed produce",
    volunteer: "Sam K",
    volunteerPhone: "(555) 666-3344",
    completedAt: "2025-10-07 16:00",
  },
];


