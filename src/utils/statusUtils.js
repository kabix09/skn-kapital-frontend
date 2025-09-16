export function getEventStatusTag(status) {
  switch (status) {
    case 'Planned':
      return 'info';
    case 'Ongoing':
      return 'secondary';
    case 'Completed':
      return 'success';
    case 'Cancelled':
      return 'warn';
    default:
      return null;
  }
}

export function getEventStatusLabel(status) {
  switch (status) {
    case 'Planned':
      return 'Zaplanowane';
    case 'Ongoing':
      return 'W trakcie';
    case 'Completed':
      return 'Zakończone';
    case 'Cancelled':
      return 'Anulowane';
    default:
      return 'Nieznany';
  }
}

export function getEventTaskStatusLabel(status) {
  switch (status) {
    case 'Planned':
      return 'Zaplanowane';
    case 'InProgress':
      return 'W trakcie';
    case 'Done':
      return 'Zakończone';
    case 'Canceled':
      return 'Anulowane';
    default:
      return null;
  }
}

export function getEventTaskStatusTag(status) {
  switch (status) {
    case 'Done':
      return 'success';
    case 'InProgress':
      return 'secondary';
    case 'Planned':
      return 'info';
    case 'Canceled':
      return 'warn';
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

export function getBooleanLabel(value) {
  switch (value) {
    case true:
      return 'success';
    case false:
      return 'danger';
    default:
      return null;
  } 
}