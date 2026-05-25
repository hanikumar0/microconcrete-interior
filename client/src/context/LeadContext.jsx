import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { submitLead } from '../services/api.js';

const LeadContext = createContext(null);

export function LeadProvider({ children }) {
  const [status, setStatus] = useState('idle');
  const [serverErrors, setServerErrors] = useState([]);

  const sendLead = useCallback(async (payload) => {
    setStatus('loading');
    setServerErrors([]);

    try {
      const response = await submitLead(payload);
      setStatus('success');
      return response.data;
    } catch (error) {
      const errors = error?.response?.data?.errors || [
        { field: 'form', message: 'Unable to submit right now. Please try again.' }
      ];
      setServerErrors(errors);
      setStatus('error');
      throw errors;
    }
  }, []);

  const value = useMemo(
    () => ({ status, serverErrors, sendLead, resetLeadState: () => setStatus('idle') }),
    [sendLead, serverErrors, status]
  );

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

export function useLead() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLead must be used within LeadProvider');
  }
  return context;
}
