export const convertTimestampToTehranDate = (timestamp: number): string => {
    if (timestamp === 0) return 'never';

    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('fa-IR', {
        timeZone: 'Asia/Tehran',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);
}; 