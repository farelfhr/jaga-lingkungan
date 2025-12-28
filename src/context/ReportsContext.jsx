import { createContext, useContext, useState, useEffect } from 'react';
import { reports as initialReports } from '../data/mockData';

const ReportsContext = createContext();

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error('useReports must be used within ReportsProvider');
  }
  return context;
};

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState(() => {
    // Load from localStorage or use initial data
    const saved = localStorage.getItem('reports_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialReports;
      }
    }
    return initialReports;
  });

  useEffect(() => {
    // Save to localStorage whenever reports change
    localStorage.setItem('reports_data', JSON.stringify(reports));
  }, [reports]);

  const addReport = (newReport) => {
    const report = {
      ...newReport,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      verifiedAt: null
    };
    setReports(prev => [report, ...prev]);
    return report;
  };

  const updateReport = (reportId, updates) => {
    setReports(prev =>
      prev.map(report =>
        report.id === reportId
          ? { ...report, ...updates }
          : report
      )
    );
  };

  return (
    <ReportsContext.Provider value={{ reports, addReport, updateReport }}>
      {children}
    </ReportsContext.Provider>
  );
};

