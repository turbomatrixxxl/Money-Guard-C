import {
  formatData,
  getTransactionCategory,
} from '../../constants/TransactionConstants';
import icons from '../../images/icons/sprite.svg';
import styles from './TransactionTableRow.module.css';
import {
  setTrasactionForUpdate,
  setTrasactionIdForDelete,
} from '../../redux/transactions/slice';
import { useDispatch } from 'react-redux';
import { formatNumberWithSpaces } from 'components/common/formatNumberWithSpaces';

const TransactionTableRow = ({
  transaction,
  openDeleteModal,
  openEditModal,
}) => {
  const { type, categoryId, comment, amount, transactionDate } = transaction;

  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    openDeleteModal();
    dispatch(setTrasactionIdForDelete(transaction.id));
  };

  const handleEditClick = () => {
    openEditModal();
    dispatch(
      setTrasactionForUpdate({ id: transaction.id, type: transaction.type })
    );
  };

  let textClass = '';

  // Determine class based on data
  if (type === 'INCOME') {
    textClass = styles.incomeText; // Access class from CSS module
  } else if (type === 'EXPENSE') {
    textClass = styles.expenseText;
  }

  return (
    <tr className={styles.dataRow}>
      <td className={styles.TransactionDateColumn}>
        {formatData(transactionDate)}
      </td>
      <td className={styles.TransactionTypeColumn}>
        {type === 'INCOME' ? '+' : '-'}
      </td>
      <td className={styles.TransactionCategoryColumn}>
        {getTransactionCategory(categoryId)}
      </td>
      <td className={styles.TransactionCommentColumn}>{comment}</td>
      <td className={`${styles.TransactionAmountColumn} ${textClass}`}>
        {type === 'INCOME'
          ? formatNumberWithSpaces(amount)
          : formatNumberWithSpaces(amount * -1)}
      </td>

      <td className={styles.TransactionEditColumn}>
        <button
          className={styles.editButton}
          type="button"
          onClick={handleEditClick}
        >
          <svg className={styles.editIcon}>
            <use href={`${icons}#icon-edit`}></use>
          </svg>
        </button>
      </td>

      <td className={styles.TransactionDeleteColumn}>
        <button
          className={styles.deleteButton}
          type="button"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TransactionTableRow;
