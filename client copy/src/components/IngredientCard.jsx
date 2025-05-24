import { daysBetween } from "../utils/expirationUtils";

function IngredientCard({ name, quantity, expiration_date, onDelete }) {

  const currentDate = new Date();
  const parseLocalDate = (dateString) => {
    dateString = dateString.split('T')[0];
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  return (
    <div className="ingredient-card bg-white">
      <div>
        <strong>{name}</strong> — {quantity}
        <br />
        <small>
          Expires in {daysBetween(currentDate, parseLocalDate(expiration_date))} days
        </small>
      </div>
      <button onClick={onDelete}>❌</button>
    </div>
  );
}

export default IngredientCard;