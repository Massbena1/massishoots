export type ProjectPhase = "preparation" | "tournage" | "montage" | "retouche" | "livre";
export type DeliverableStatus = "pending" | "in_progress" | "delivered";
export type InvoiceStatus = "en_attente" | "payee";

export interface Deliverable {
  id: string;
  folder?: string;
  label: string;
  status: DeliverableStatus;
  deliveredDate?: string;
  downloadUrl?: string;
  note?: string;
}

export interface Invoice {
  id: string;
  label: string;
  amount: number;
  status: InvoiceStatus;
  date: string;
  url?: string;
}

export interface ClientPortal {
  id: string;
  createdAt: string;
  password: string;

  // Client
  name: string;
  company?: string;
  email: string;
  phone?: string;

  // Service
  packageName: string;
  serviceIncludes: string[];
  contractStart: string;
  contractEnd?: string;
  photosPerMonth?: number;
  videosPerMonth?: number;

  // Status
  currentPhase: ProjectPhase;
  nextStep?: string;
  nextDate?: string;

  // Livrables & factures
  deliverables: Deliverable[];
  invoices: Invoice[];

  // Communication
  message: string;
  internalNote?: string;
  clientNote?: string;
}
