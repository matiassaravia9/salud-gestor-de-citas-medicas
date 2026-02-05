
export type UserRole = 'admin' | 'paciente';

export interface User {
  username: string;
  role: UserRole;
  fullName?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  date: string;
  specialty: string;
  symptoms?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Specialty {
  name: string;
  description: string;
  icon: string;
}
