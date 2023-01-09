import css from "../styles/BalanceTags/BalanceTag.module.css";

const BalanceTag = ({ item }) => {
  return (
    <>
      <div className={css.tag}>
        <em>{item?.title}</em>
        <em>{item?.amount}</em>
      </div>
    </>
  );
};

export default BalanceTag;
