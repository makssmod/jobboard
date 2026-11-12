// Theme 9 — Startup Job Board (routes from api/routes.json)
export const endpoints = {
  jobs: "/topic9/jobs",
  job: (id) => `/topic9/jobs/${id}`,
  companies: "/topic9/companies",
  applications: "/topic9/applications",
  jobApplications: (id) => `/topic9/jobs/${id}/applications`
};
