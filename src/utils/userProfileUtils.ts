
export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const getPlanColor = (plan: string) => {
  switch (plan) {
    case 'pro': return '#0195ee';
    case 'premium': return '#ee5a01';
    default: return '#707070';
  }
};

export const getPlanLabel = (plan: string) => {
  switch (plan) {
    case 'pro': return 'Pro';
    case 'premium': return 'Premium';
    default: return 'Gratuit';
  }
};
