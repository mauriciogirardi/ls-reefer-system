interface MailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'suporte@sistemalsreefer.com',
      name: 'Equipe Ls Reefer',
    },
  },
} as MailConfig;
