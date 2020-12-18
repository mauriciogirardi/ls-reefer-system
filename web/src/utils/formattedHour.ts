import { format, parseISO } from 'date-fns';

const formattedHoud = (date: string): string => format(parseISO(date), 'HH:mm');
export default formattedHoud;
