export type User = {
  id: string;
  name: string;
  phone: string;
  location: string;
  aadhaarId: string;
  pan: string;
};

export type Complaint = {
  id: string;
  userId: string;
  type: 'Private' | 'Public';
  category: string;
  subcategory: string;
  description: string;
  location: string;
  coords: { lat: number; lng: number };
  fileUrl?: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  upvotes: number;
  response?: string;
  createdAt: string;
};

export type Appointment = {
  id: string;
  userId: string;
  category: string;
  subcategory: string;
  date: Date;
  time: string;
  location: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
};

export type DocumentRequest = {
  id: string;
  userId: string;
  category: string;
  subcategory: string;
  status: 'Pending' | 'Resolved';
  createdAt: string;
  fileUrl?: string;
};

export type Bill = {
  id: string;
  userId: string;
  consumerId: string;
  utility: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending';
  serviceArea: string;
};

export type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};
