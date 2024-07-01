export const handleEdit = ({ data, setModalOpen, setEditdata }) => {
  setModalOpen(true);
  setEditdata(data);
};

export const getNameAndAmount = (data) => {
  const names = Object.keys(data);
  const amounts = Object.values(data).map((category) => category.totalAmount);
  return { names, amounts };
};
