export function getStatusLabel(status) {
  switch (status) {
    case 'DONE':
      return 'success';
    case 'IN_PROGRESS':
      return 'warn';
    case 'PLANNED':
      return 'info';
    default:
      return null;
  }
}
