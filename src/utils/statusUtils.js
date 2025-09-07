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

export function getMemberStatusLabel(status) {
  switch (status) {
    case 'ACTIVE':
      return 'success';
    case 'INACTIVE':
      return 'danger';
    case 'SUSPENDED':
      return 'warn';
    default:
      return null;
  }
}