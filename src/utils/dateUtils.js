export const formatDate = (date) => {
  return new Date(date).toDateString();
};

export const isOverdue = (dueDate) => {
  return new Date(dueDate) < new Date();
};
