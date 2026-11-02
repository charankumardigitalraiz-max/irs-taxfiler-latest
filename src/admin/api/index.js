import apiClient from './client';
import usersApi from './endpoints/users';
import workflowApi from './endpoints/workflow';
import schedulingApi from './endpoints/scheduling';
import documentsApi from './endpoints/documents';
import taxprepApi from './endpoints/taxprep';
import paymentsApi from './endpoints/payments';
import filingApi from './endpoints/filing';
import teamApi from './endpoints/team';
import auditApi from './endpoints/audit';
import emailApi from './endpoints/email';

export const api = {
  client: apiClient,
  users: usersApi,
  workflow: workflowApi,
  scheduling: schedulingApi,
  documents: documentsApi,
  taxprep: taxprepApi,
  payments: paymentsApi,
  filing: filingApi,
  team: teamApi,
  audit: auditApi,
  email: emailApi,
};

export default api;
