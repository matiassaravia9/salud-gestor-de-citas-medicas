
import React, { useState, useEffect } from 'react';
import { User, Appointment } from './types';
import Login from './components/Login';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import { AlertTriangle } from 'lucide-react';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  // Load state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAppointments = localStorage.getItem('appointments');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedAppointments) setAppointments(JSON.parse(savedAppointments));
  }, []);

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
    localStorage.setItem('user', JSON.stringify(loggedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addAppointment = (newAppt: Omit<Appointment, 'id' | 'status'>) => {
    const appointment: Appointment = {
      ...newAppt,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending'
    };
    setAppointments([...appointments, appointment]);
  };

  const updateAppointment = (updatedAppt: Appointment) => {
    if (editingIndex === null) return;
    const updatedList = [...appointments];
    updatedList[editingIndex] = updatedAppt;
    setAppointments(updatedList);
    setEditingIndex(null);
  };

  const confirmDelete = () => {
    if (deletingIndex !== null) {
      setAppointments(appointments.filter((_, i) => i !== deletingIndex));
      setDeletingIndex(null);
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="flex-grow">
        {user.role === 'paciente' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            <Hero />
            <Services />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <AIAssistant />
                </div>
              </div>
              
              <div className="lg:col-span-2 space-y-12">
                <AppointmentForm
                  addAppointment={addAppointment}
                  updateAppointment={updateAppointment}
                  editingAppointment={editingIndex !== null ? appointments[editingIndex] : null}
                  patientName={user.fullName || user.username}
                />
                <AppointmentList
                  appointments={appointments.filter(a => a.patientName === (user.fullName || user.username))}
                  deleteAppointment={(idx) => setDeletingIndex(idx)}
                  setEditingIndex={setEditingIndex}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <AdminPanel
              appointments={appointments}
              deleteAppointment={(idx) => setDeletingIndex(idx)}
              setEditingIndex={setEditingIndex}
            />
          </div>
        )}
      </main>

      {/* Cancellation Warning Modal */}
      {deletingIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-6 border border-red-900/50">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Confirmar Cancelación</h3>
              <p className="text-slate-400 mb-8">La cita será eliminada. ¿Estás seguro de que deseas continuar?</p>
              
              <div className="flex flex-col w-full gap-3">
                <button
                  onClick={confirmDelete}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-red-900/20"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => setDeletingIndex(null)}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all border border-slate-700"
                >
                  Regresar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
