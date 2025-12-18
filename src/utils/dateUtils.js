export const formatDate = (date) =>
  new Date(date).toLocaleDateString();

export const isOverdue = (dueDate) =>
  new Date(dueDate) < new Date();
