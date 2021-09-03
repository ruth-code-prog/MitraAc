export const getChatTime = date => {
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
};

export const setDateChat = oldDate => {
  const year = oldDate.getFullYear();
  const month = ("0" + (oldDate.getMonth() + 1)).slice(-2);
  const date = ("0" + oldDate.getDate()).slice(-2);

  return `${year}-${month}-${date}`;
};
