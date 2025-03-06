export function getAvatarFallback(userData?: { first_name?: string; last_name?: string }): string {
    if (userData?.first_name && userData?.last_name) {
        const firstInitial = userData.first_name[0]?.toUpperCase() || '';
        const lastInitial = userData.last_name[0]?.toUpperCase() || '';
        return `${firstInitial}${lastInitial}`;
    }
    return 'EP';
}
