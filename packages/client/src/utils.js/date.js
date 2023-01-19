export const formatDate = (timestamp) => {
  timestamp = new Date(timestamp);

  return timestamp.toDateString();
};
