/*
  Noor public configuration.
  Keep only PUBLIC client configuration here.
  Never put Stripe secret keys or Supabase service-role keys in this file.
*/
window.NOOR_CONFIG = window.NOOR_CONFIG || {
  supabase: {
    url: '',
    anonKey: ''
  },
  stripe: {
    monthlyUrl: '',
    yearlyUrl: '',
    trialDays: 7,
    customerPortalUrl: ''
  },
  community: {
    maxPostsPerHour: 10
  },
  review: {
    url: '',
    feedbackEmail: ''
  }
};
